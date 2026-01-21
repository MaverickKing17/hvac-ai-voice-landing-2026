
import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Modality } from '@google/genai';
import { Waveform } from './Waveform';

// Audio Helpers
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

const getSystemInstruction = () => {
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-CA', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = now.toLocaleTimeString('en-CA', { hour: '2-digit', minute: '2-digit' });

  return `You are a dual-persona AI voice system for 'Green Choice Heating & Cooling' (Peel Heating). 
Today is ${dateStr}. The current time in Toronto/GTA is ${timeStr}. 

## PERSONA 1: Chloe (Front-Desk / Rebates)
- Tone: Friendly, patient, and ethical.
- Expertise: 2026 Home Renovation Savings (HRS) program.
- Logic: If a caller mentions "rebates" or "heat pumps," explain they can get up to $7,500 (Electric heat) or $2,000 (Gas). 
- Task: Follow the REBATE QUALIFIER CHECKLIST: Ask about primary heating source (Electric/Gas/Oil), property type (Detached/Semi/Row), and if they are an Enbridge or Ontario power grid customer.

## PERSONA 2: Sam (Emergency Dispatch)
- Tone: Calm, fast, and authoritative. 
- Trigger: Mention of "gas smell," "no heat," "water leak," or "banging noises."
- Hand-off: Chloe must say: "That sounds urgent. Let me get Sam, our emergency specialist, on the line for you."
- Task: Ask for home address and confirm 4-hour response.

## MANDATORY SAFETY RULE
If "gas smell" is mentioned, you MUST say: "For your safety, please hang up, leave the house immediately, and call 911. Once you are safe, call us back and we will dispatch a tech."

Keep responses concise. Speak with a natural Canadian accent.`;
};

export const LiveDemo: React.FC = () => {
  const [isLive, setIsLive] = useState(false);
  const [status, setStatus] = useState<string>('Ready to test');
  const [transcript, setTranscript] = useState<{ speaker: string; text: string }[]>([]);
  const [showTechnical, setShowTechnical] = useState(false);
  
  const sessionRef = useRef<any>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const outputAudioContextRef = useRef<AudioContext | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());

  const stopCall = () => {
    if (sessionRef.current) {
      sessionRef.current.close();
      sessionRef.current = null;
    }
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();
    setIsLive(false);
    setStatus('Call ended');
  };

  const startCall = async () => {
    try {
      setStatus('Connecting to AI...');
      setIsLive(true);
      setTranscript([]);

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 16000 });
      outputAudioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-12-2025',
        callbacks: {
          onopen: () => {
            setStatus('Live: Speak Now');
            const source = audioContextRef.current!.createMediaStreamSource(stream);
            const scriptProcessor = audioContextRef.current!.createScriptProcessor(4096, 1, 1);
            
            scriptProcessor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              const int16 = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                int16[i] = inputData[i] * 32768;
              }
              const pcmBlob = {
                data: encode(new Uint8Array(int16.buffer)),
                mimeType: 'audio/pcm;rate=16000',
              };
              sessionPromise.then(session => session.sendRealtimeInput({ media: pcmBlob }));
            };

            source.connect(scriptProcessor);
            scriptProcessor.connect(audioContextRef.current!.destination);
          },
          onmessage: async (message) => {
            if (message.serverContent?.outputTranscription) {
              const text = message.serverContent.outputTranscription.text;
              setTranscript(prev => {
                const last = prev[prev.length - 1];
                if (last?.speaker === 'AI Agent') return [...prev.slice(0, -1), { ...last, text: last.text + text }];
                return [...prev, { speaker: 'AI Agent', text }];
              });
            } else if (message.serverContent?.inputTranscription) {
              const text = message.serverContent.inputTranscription.text;
              setTranscript(prev => {
                const last = prev[prev.length - 1];
                if (last?.speaker === 'You') return [...prev.slice(0, -1), { ...last, text: last.text + text }];
                return [...prev, { speaker: 'You', text }];
              });
            }

            const base64Audio = message.serverContent?.modelTurn?.parts[0]?.inlineData?.data;
            if (base64Audio && outputAudioContextRef.current) {
              const ctx = outputAudioContextRef.current;
              nextStartTimeRef.current = Math.max(nextStartTimeRef.current, ctx.currentTime);
              const audioBuffer = await decodeAudioData(decode(base64Audio), ctx, 24000, 1);
              const source = ctx.createBufferSource();
              source.buffer = audioBuffer;
              source.connect(ctx.destination);
              source.start(nextStartTimeRef.current);
              nextStartTimeRef.current += audioBuffer.duration;
              sourcesRef.current.add(source);
              source.onended = () => sourcesRef.current.delete(source);
            }

            if (message.serverContent?.interrupted) {
              sourcesRef.current.forEach(s => s.stop());
              sourcesRef.current.clear();
              nextStartTimeRef.current = 0;
            }
          },
          onerror: (e) => {
            console.error('Gemini Error:', e);
            stopCall();
          },
          onclose: () => stopCall(),
        },
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: { voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } } },
          systemInstruction: getSystemInstruction(),
          outputAudioTranscription: {},
          inputAudioTranscription: {},
        }
      });

      sessionRef.current = await sessionPromise;
    } catch (err) {
      console.error('Start Call Error:', err);
      setStatus('Failed to start call');
      setIsLive(false);
    }
  };

  return (
    <section id="demo" className="py-24 bg-white dark:bg-[#0A0A0A]">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-[#003A87] dark:text-[#FF6B35] mb-4">Dual-Persona Demo</h2>
            <p className="text-xl text-gray-500 font-medium">Test Chloe (Rebates) and Sam (Emergencies) in real-time.</p>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <div className="flex items-center gap-2 bg-green-500/10 px-4 py-2 rounded-xl border border-green-500/20">
              <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-green-700 dark:text-green-400 uppercase tracking-widest">LiveKit Production Connected</span>
            </div>
            <span className="text-[9px] font-bold text-gray-400 uppercase">Agent ID: CA_FbNDoLYraenP</span>
          </div>
        </div>

        <div className="glass-card rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden min-h-[550px] flex flex-col relative border-white/50">
          <div className="flex flex-wrap items-center justify-between gap-6 mb-12 pb-8 border-b border-gray-100 dark:border-white/5">
            <div className="flex items-center gap-6">
              <button 
                onClick={isLive ? stopCall : startCall}
                className={`w-20 h-20 rounded-full flex items-center justify-center text-white transition-all shadow-2xl transform hover:scale-110 active:scale-95 ${isLive ? 'bg-red-500 animate-pulse' : 'bg-[#FF6B35]'}`}
              >
                {isLive ? (
                   <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
                ) : (
                   <svg className="w-8 h-8 fill-current ml-1" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                )}
              </button>
              <div>
                <h4 className="font-black text-[#003A87] dark:text-white uppercase tracking-tighter text-xl">
                  {isLive ? 'Call in Progress...' : 'Start Voice Test'}
                </h4>
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{status}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setShowTechnical(!showTechnical)}
                className="px-4 py-2 bg-gray-100 dark:bg-white/5 rounded-lg text-[10px] font-black uppercase tracking-widest hover:bg-[#003A87] hover:text-white transition-all"
              >
                {showTechnical ? 'Hide Debug' : 'Technical Details'}
              </button>
            </div>
          </div>

          {showTechnical && (
            <div className="mb-8 p-6 bg-black text-green-400 font-mono text-xs rounded-2xl animate-in slide-in-from-top-4 duration-300">
              <p className="mb-1">{`> LIVEKIT_AGENT_ID: "CA_FbNDoLYraenP"`}</p>
              <p className="mb-1">{`> SYSTEM_DATE: "${new Date().toLocaleDateString()}"`}</p>
              <p className="mb-1">{`> PERSONA_MODES: ["CHLOE", "SAM"]`}</p>
              <p>{`> SAFETY_TRIGGER: "GAS_SMELL"`}</p>
            </div>
          )}

          <div className="grid lg:grid-cols-12 gap-12 flex-1">
            <div className="lg:col-span-4 flex flex-col justify-center items-center gap-8">
              <div className="relative">
                <div className={`absolute inset-0 bg-[#FF6B35]/20 rounded-full blur-[40px] transition-opacity duration-1000 ${isLive ? 'opacity-100' : 'opacity-0'}`}></div>
                <div className="relative w-48 h-48 bg-white dark:bg-black/20 rounded-full border border-gray-100 dark:border-white/10 flex items-center justify-center shadow-inner">
                  <div className="w-full px-6">
                    <Waveform />
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Simulated Carrier: Bell Canada</p>
                <div className="flex items-center gap-1.5 justify-center">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className={`w-1.5 h-3 rounded-full ${i < 4 ? 'bg-[#FF6B35]' : 'bg-gray-200'}`}></div>
                  ))}
                  <span className="text-xs font-black ml-2">5G+</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 flex flex-col">
              <div className="flex-1 bg-gray-50/50 dark:bg-white/5 rounded-3xl p-6 overflow-y-auto max-h-[350px] border border-gray-100 dark:border-white/10 space-y-4 no-scrollbar">
                {transcript.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 p-8 space-y-4">
                    <div className="w-16 h-16 bg-white dark:bg-white/5 rounded-2xl flex items-center justify-center text-3xl shadow-sm">🏢</div>
                    <div>
                      <p className="text-lg font-bold italic mb-1">"Hi Chloe, I want to know about the $7,500 rebate..."</p>
                      <p className="text-xs font-medium uppercase tracking-widest opacity-60">Speak now to test persona switching</p>
                    </div>
                  </div>
                ) : (
                  transcript.map((line, i) => (
                    <div key={i} className={`flex flex-col ${line.speaker === 'AI Agent' ? 'items-start' : 'items-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                      <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 px-2">{line.speaker}</span>
                      <div className={`max-w-[85%] p-4 rounded-2xl font-medium text-sm shadow-sm ${line.speaker === 'AI Agent' ? 'bg-[#003A87] text-white rounded-tl-none' : 'bg-white dark:bg-[#FF6B35] dark:text-white text-[#003A87] border border-gray-100 dark:border-transparent rounded-tr-none'}`}>
                        {line.text}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap gap-3 justify-center">
            {['Ask about 2026 Rebates', 'Say "I smell gas"', 'Furnace Banging Noise', 'Mississauga Service Call'].map(tag => (
              <span key={tag} className="px-5 py-2 bg-[#003A87]/5 dark:bg-white/5 border border-[#003A87]/10 dark:border-white/10 rounded-xl text-[9px] font-black text-[#003A87] dark:text-[#FF6B35] uppercase tracking-widest">
                Try: {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
