
import React, { useState, useEffect, useRef } from 'react';

interface Message {
  id: string;
  role: 'ai' | 'user';
  content: string;
  type?: 'text' | 'options' | 'slots' | 'success';
  options?: string[];
}

export const BookingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: "Hi! I'm Peel's AI Assistant. I can help you book a service or repair in seconds. What are you looking for today?",
      type: 'options',
      options: ['Furnace Repair', 'AC Maintenance', 'Heat Pump Quote', 'Other']
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const addMessage = (msg: Message) => {
    setMessages(prev => [...prev, msg]);
  };

  const simulateResponse = (content: string, delay: number = 1500, type: Message['type'] = 'text', options?: string[]) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      addMessage({
        id: Date.now().toString(),
        role: 'ai',
        content,
        type,
        options
      });
    }, delay);
  };

  const handleOptionClick = (option: string) => {
    addMessage({
      id: Date.now().toString(),
      role: 'user',
      content: option
    });

    const lastAiMessage = [...messages].reverse().find(m => m.role === 'ai');
    
    // Initial Flow Branching
    if (lastAiMessage?.content.includes("looking for today")) {
      if (option.includes('Quote') || option === 'Other') {
        simulateResponse(
          "Great! I can help with a custom quote. To get started, what is the full service address?",
          1000
        );
      } else {
        simulateResponse(
          `Got it. A ${option.toLowerCase()}. Our technicians are currently in your area. Can you confirm your city?`,
          1200,
          'options',
          ['Mississauga', 'Brampton', 'Oakville', 'Toronto']
        );
      }
    } 
    // Repair/Maintenance City Confirmation
    else if (lastAiMessage?.content.includes("confirm your city")) {
      simulateResponse(
        `Perfect. Checking the schedule for ${option}...`,
        1000
      );
      setTimeout(() => {
        simulateResponse(
          "I found 3 available slots for tomorrow. Which one works best for you?",
          1000,
          'slots',
          ['9:00 AM - 11:00 AM', '1:00 PM - 3:00 PM', '4:00 PM - 6:00 PM']
        );
      }, 1500);
    } 
    // Quote Flow: Equipment Selection
    else if (lastAiMessage?.content.includes("desired equipment")) {
      simulateResponse(
        "Understood. Do you have a budget range in mind for this project?",
        1000,
        'options',
        ['$5,000 - $8,000', '$8,000 - $12,000', '$12,000+', 'Not sure yet']
      );
    }
    // Quote Flow: Budget Selection
    else if (lastAiMessage?.content.includes("budget range")) {
      simulateResponse(
        "Thanks for that. I have enough to start your quote! Would you like to schedule a quick 15-minute consultation with a specialist to finalize the numbers?",
        1200,
        'options',
        ['Yes, schedule now', 'No, just email me']
      );
    }
    // Quote Flow: Consultation Choice
    else if (lastAiMessage?.content.includes("finalize the numbers")) {
      if (option === 'Yes, schedule now') {
        simulateResponse(
          "Excellent. Checking specialist availability...",
          1000
        );
        setTimeout(() => {
          simulateResponse(
            "I found 3 available slots for tomorrow. Which one works best for you?",
            1000,
            'slots',
            ['9:00 AM - 11:00 AM', '1:00 PM - 3:00 PM', '4:00 PM - 6:00 PM']
          );
        }, 1500);
      } else {
        simulateResponse(
          "No problem! Please provide your name and email address, and a quote specialist will reach out by tomorrow morning.",
          1200
        );
      }
    }
    // Booking Slots
    else if (lastAiMessage?.type === 'slots') {
      simulateResponse(
        `Excellent. I've reserved the ${option} slot. To finalize, please tell me your name and phone number.`,
        1200
      );
    }
  };

  const handleSubmitText = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = e.currentTarget.elements.namedItem('chatInput') as HTMLInputElement;
    if (!input.value.trim()) return;

    const val = input.value;
    addMessage({ id: Date.now().toString(), role: 'user', content: val });
    input.value = '';

    const lastAiMessage = [...messages].reverse().find(m => m.role === 'ai');

    // Handle Quote Flow Address Input
    if (lastAiMessage?.content.includes("full service address")) {
      simulateResponse(
        "Thank you. What is your desired equipment or primary interest?",
        1000,
        'options',
        ['Heat Pump', 'Furnace', 'Central AC', 'Hybrid System']
      );
    } 
    // Handle Final Info (Success)
    else {
      simulateResponse(
        "Thank you! Your request is confirmed. You'll receive a confirmation text/email shortly. If you booked a repair, our technician will call 20 minutes before arrival.",
        2000,
        'success'
      );
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-24 right-6 md:bottom-8 md:right-8 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 transform hover:scale-110 ${isOpen ? 'bg-[#003A87] rotate-90' : 'bg-[#FF6B35] pulse-glow'}`}
      >
        {isOpen ? (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
        ) : (
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
        )}
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-44 right-6 md:bottom-28 md:right-8 z-50 w-[90vw] md:w-[400px] h-[600px] max-h-[70vh] glass-card rounded-[32px] overflow-hidden transition-all duration-500 origin-bottom-right shadow-2xl flex flex-col ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'}`}>
        
        {/* Header */}
        <div className="bg-[#003A87] p-6 text-white flex items-center gap-4">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl">🤖</div>
          <div>
            <h4 className="font-black text-sm uppercase tracking-widest">Peel AI Assistant</h4>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold opacity-70">Always Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 no-scrollbar">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex flex-col ${msg.role === 'ai' ? 'items-start' : 'items-end'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium ${
                msg.role === 'ai' 
                  ? 'bg-gray-100 dark:bg-white/10 dark:text-gray-200 rounded-tl-none' 
                  : 'bg-[#FF6B35] text-white rounded-tr-none'
              }`}>
                {msg.content}
              </div>

              {msg.role === 'ai' && (msg.type === 'options' || msg.type === 'slots') && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {msg.options?.map(opt => (
                    <button 
                      key={opt}
                      onClick={() => handleOptionClick(opt)}
                      className="px-4 py-2 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-full text-xs font-bold text-[#003A87] dark:text-[#FF6B35] hover:bg-[#FF6B35] hover:text-white transition-all shadow-sm"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              )}

              {msg.type === 'success' && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl flex items-center gap-3">
                   <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white">✓</div>
                   <span className="text-xs font-bold text-green-700 dark:text-green-400 uppercase tracking-tight">Booking confirmed</span>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex items-center gap-1 p-4 bg-gray-100 dark:bg-white/10 rounded-2xl w-fit">
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmitText} className="p-4 bg-gray-50 dark:bg-black/20 border-t border-gray-100 dark:border-white/5">
          <div className="relative">
            <input 
              name="chatInput"
              type="text" 
              placeholder="Type your message..."
              className="w-full pl-4 pr-12 py-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium focus:ring-2 focus:ring-[#FF6B35] focus:outline-none transition-all dark:text-white"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#FF6B35]">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
          </div>
          <p className="text-[10px] text-center text-gray-400 mt-2 font-bold uppercase tracking-widest">Powered by Peel AI Receptionist</p>
        </form>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .pulse-glow {
          box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.7);
          animation: pulse-glow 2s infinite;
        }
        @keyframes pulse-glow {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 107, 53, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 20px rgba(255, 107, 53, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(255, 107, 53, 0); }
        }
      `}} />
    </>
  );
};
