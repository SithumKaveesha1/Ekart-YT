import React, { useState, useRef, useEffect } from 'react';
import { Send, Sparkles, MessageSquare, Trash2 } from 'lucide-react';
import ChatMessage from '../components/ChatMessage';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

const Chatbot = () => {
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your Ekart Shopping Assistant. How can I help you today?", isBot: true }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { text: input, isBot: false };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            const botResponse = getMockResponse(input);
            setMessages(prev => [...prev, { text: botResponse, isBot: true }]);
            setIsTyping(false);
        }, 1500);
    };

    const getMockResponse = (userInput) => {
        const input = userInput.toLowerCase();
        if (input.includes('hi') || input.includes('hello')) return "Hi there! Looking for anything specific in our catalog?";
        if (input.includes('product') || input.includes('item')) return "We have a wide range of electronics, fashion, and home decor. You can check the 'Products' page for more!";
        if (input.includes('price')) return "Our prices are very competitive! Many items have discounts right now.";
        if (input.includes('shipping') || input.includes('delivery')) return "We offer free delivery on most orders above LKR 5000!";
        if (input.includes('return') || input.includes('refund')) return "We have a 30-day easy return policy for all unused items.";
        return "That's interesting! I'm still learning, but I can help you find products or answer questions about your orders.";
    };

    const clearChat = () => {
        setMessages([{ text: "Chat cleared. How else can I help you?", isBot: true }]);
    };

    return (
        <div className="pt-28 pb-12 min-h-screen bg-pink-50/30 flex flex-col items-center px-4">
            <div className="w-full max-w-4xl flex flex-col h-[75vh] bg-white rounded-3xl shadow-xl shadow-pink-100 overflow-hidden border border-pink-100/50">
                
                {/* Chat Header */}
                <header className="p-6 bg-white border-b border-pink-50 flex justify-between items-center bg-gradient-to-r from-white to-pink-50/50">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-pink-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-pink-200">
                            <Sparkles size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 leading-none">Ekart Assistant</h2>
                            <div className="flex items-center gap-1.5 mt-1">
                                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                <span className="text-[xs] font-medium text-gray-500 uppercase tracking-tight">Always Online</span>
                            </div>
                        </div>
                    </div>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={clearChat}
                        className="text-gray-400 hover:text-pink-600 hover:bg-pink-50 rounded-xl"
                    >
                        <Trash2 size={20} />
                    </Button>
                </header>

                {/* Messages Area */}
                <div 
                    ref={scrollRef}
                    className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth"
                >
                    {messages.map((msg, index) => (
                        <ChatMessage key={index} message={msg.text} isBot={msg.isBot} />
                    ))}
                    {isTyping && (
                        <div className="flex items-center gap-2 text-pink-600 font-medium ml-14 mb-6">
                            <div className="flex gap-1">
                                <span className="w-1.5 h-1.5 bg-pink-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-pink-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-pink-600 rounded-full animate-bounce"></span>
                            </div>
                            <span className="text-xs uppercase tracking-widest opacity-70">Typing...</span>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <footer className="p-6 bg-white border-t border-pink-50">
                    <div className="flex gap-4 items-center bg-gray-50 p-2 pl-6 rounded-2xl border border-gray-100 focus-within:border-pink-200 focus-within:ring-4 focus-within:ring-pink-50 transition-all">
                        <Input 
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message here..."
                            className="border-none bg-transparent shadow-none focus-visible:ring-0 p-0 h-12 text-gray-700 placeholder:text-gray-400"
                        />
                        <Button 
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className="w-12 h-12 bg-pink-600 hover:bg-pink-700 text-white rounded-xl shadow-lg shadow-pink-100 transition-transform active:scale-95 disabled:opacity-50 disabled:scale-100"
                        >
                            <Send size={20} />
                        </Button>
                    </div>
                </footer>
            </div>
            
            <p className="mt-6 text-gray-400 text-sm font-medium">
                Try asking about <span className="text-pink-600/60 font-bold">Shipping</span>, <span className="text-pink-600/60 font-bold">Returns</span>, or <span className="text-pink-600/60 font-bold">Products</span>
            </p>
        </div>
    );
};

export default Chatbot;
