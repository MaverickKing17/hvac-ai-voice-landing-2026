
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

const SYSTEM_INSTRUCTION = `You are Alex, the friendly and highly professional AI Voice Receptionist for 'Peel Heating & Cooling'. 
You serve the Toronto and GTA area. 
Your goal is to answer calls, empathize with customers (especially in emergencies like no heat), 
gather their name and location (Mississauga, Brampton, etc.), and help them book service. 
Keep responses concise, helpful, and speak with a natural Canadian tone. 
If it's an emergency, reassure them that a tech will be dispatched immediately.`;

export const LiveDemo: React.FC = () => {
  const [isLive, setIsLive] = useState(false);
  const [status, setStatus] = useState<string>('Ready to test');
  const [transcript, setTranscript] = useState<{ speaker: string; text: string }[]>([]);
  
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
                if (last?.speaker === 'Alex') return [...prev.slice(0, -1), { ...last, text: last.text + text }];
                return [...prev, { speaker: 'Alex', text }];
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
          systemInstruction: SYSTEM_INSTRUCTION,
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
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-[#003A87] dark:text-[#FF6B35] mb-6">Real-Time Voice Experience</h2>
          <p className="text-xl text-gray-500">Don't just take our word for it. Talk to Alex right now.</p>
        </div>

        <div className="glass-card rounded-[40px] p-8 md:p-12 shadow-2xl overflow-hidden min-h-[500px] flex flex-col relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-12">
            <div className="flex flex-col items-center md:items-start gap-4">
              <button 
                onClick={isLive ? stopCall : startCall}
                className={`w-24 h-24 rounded-full flex items-center justify-center text-white transition-all shadow-2xl transform hover:scale-110 ${isLive ? 'bg-red-500 animate-pulse' : 'bg-[#003A87]'}`}
              >
                {isLive ? (
                   <svg className="w-10 h-10 fill-current" viewBox="0 0 24 24"><path d="M6 6h12v12H6z"/></svg>
                ) : (
                   <svg className="w-10 h-10 fill-current ml-2" viewBox="0 0 24 24"><path d="M3.737 3.737a1 1 0 0 1 1.414 0l15.11 15.11a1 1 0 0 1-1.414 1.414l-15.11-15.11a1 1 0 0 1 0-1.414zm4.263 1.111a1 1 0 0 1 1 1v6.142c0 1.657 1.343 3 3 3 1.258 0 2.333-.775 2.768-1.874l1.458 1.458C15.353 16.035 13.784 17 12 17c-2.761 0-5-2.239-5-5V5.848a1 1 0 0 1 1-1zm3-3a1 1 0 0 1 1 1v4.142a1 1 0 1 1-2 0V2.848a1 1 0 0 1 1-1zm8.51 10.372c-.104.593-.33 1.144-.648 1.634l1.442 1.442C20.67 13.435 21 12.254 21 11a1 1 0 1 0-2 0c0 .416-.03.824-.09 1.22zM3.51 10.372c.104.593.33 1.144.648 1.634l-1.442 1.442C2.13 12.435 2 11.254 2 11a1 1 0 1 1 2 0c0 .416.03.824.09 1.22zM12 21c-3.125 0-5.875-1.5-7.586-3.833l1.414-1.414C7.076 17.58 9.38 19 12 19c2.62 0 4.924-1.42 6.172-3.247l1.414 1.414C17.875 19.5 15.125 21 12 21z"/></svg>
                )}
              </button>
              <div className="text-center md:text-left">
                <span className={`text-sm font-black uppercase tracking-widest ${isLive ? 'text-[#FF6B35]' : 'text-[#003A87]'}`}>
                  {status}
                </span>
                <p className="text-xs text-gray-400 font-bold mt-1">Requires microphone access</p>
              </div>
            </div>
            
            <div className="flex-1 max-w-sm">
              <Waveform />
              {isLive && (
                <p className="text-center text-[10px] font-black text-[#FF6B35] mt-4 uppercase animate-pulse">
                  AI is listening for your voice...
                </p>
              )}
            </div>
          </div>

          <div className="flex-1 bg-gray-50/50 dark:bg-white/5 rounded-3xl p-6 overflow-y-auto max-h-[400px] border border-gray-100 dark:border-white/10 space-y-4">
            {transcript.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 p-8">
                <p className="text-lg font-bold italic mb-2">"Hi Alex, my furnace is making a loud noise..."</p>
                <p className="text-sm font-medium">Click the button above to start your live HVAC support call.</p>
              </div>
            ) : (
              transcript.map((line, i) => (
                <div key={i} className={`flex flex-col ${line.speaker === 'Alex' ? 'items-start' : 'items-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{line.speaker}</span>
                  <div className={`max-w-[85%] p-4 rounded-2xl font-medium text-sm ${line.speaker === 'Alex' ? 'bg-[#003A87] text-white rounded-tl-none' : 'bg-[#FF6B35] text-white rounded-tr-none'}`}>
                    {line.text}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            {['No Heat Emergency', 'AC Replacement Quote', 'Routine Maintenance'].map(tag => (
              <span key={tag} className="px-4 py-1.5 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-full text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                Try: {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
