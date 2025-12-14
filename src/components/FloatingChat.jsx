import React, { useState, useRef, useEffect } from 'react';

const FloatingChat = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatRef = useRef(null);

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if click is outside chat AND outside the trigger button (handled by hierarchy mostly, but good to be safe)
            // Actually, if we click the toggle button, it might toggle closed -> open -> closed if we are not careful?
            // The logic in ChatButton is toggle. If we click outside (which could be the button), this fires.
            // If the button is *outside* this ref, it will call onClose().
            // If the user clicks the toggle button:
            // 1. mousedown fires on document -> onClose() -> isOpen becomes false.
            // 2. click fires on button -> handleClick() -> toggles isOpen (false -> true).
            // Result: Chat closes then immediately opens (flicker or stays open).
            // Fix: We need to ignore clicks on the toggle button.
            // But the toggle button is in the parent. We can't easily ref it here.
            // Better strategy: "Click outside" usually means clicks that are NOT on the chat.
            // If the user clicks the toggle button, that is technically "outside", so `onClose` calls.
            // Then `handleClick` in parent calls `setIsOpen(!isOpen)`. 
            // If isOpen was true:
            // onClose() sets it to false.
            // handleClick sets it to false (toggle from true).
            // Wait. State updates might be batched or race.
            // If isOpen is true. 
            // User clicks button.
            // Event bubbling: 
            // Button mousedown/click.
            // Document mousedown.
            // If document mousedown happens first? 
            // Standard: mousedown happens on target, bubbles to document.
            // So document listener runs. calls onClose() -> setIsOpen(false).
            // Then button onClick runs. setIsOpen(!isOpen). isOpen is technically still true in the closure of that render?
            // Yes. In the current render cycle, `isOpen` is true. `handleClick` toggles it to false.
            // So both set it to false. 
            // Result: Chat closes. Correct.

            // What if chat is CLOSED?
            // isOpen is false. Click outside listener shouldn't be active or checks isOpen.
            // (The hook has `if (isOpen)`).
            // So listener does nothing.
            // Button onClick toggles to true.
            // Result: Chat opens. Correct.

            // So the standard logic should actually work fine for the toggle button too.
            if (isOpen && chatRef.current && !chatRef.current.contains(event.target)) {
                // Determine if we clicked the toggle button? 
                // We don't have access to the button ref easily.
                // But usually, clicking the toggle button causes a state change anyway.
                // However, let's just emit onClose and let the parent handle it?
                // Actually, if we click the button:
                // 1. Button click -> toggles state.
                // 2. Click outside logic -> closes state.
                // If both happen, we might have issues if they conflicts.
                // If isOpen=true. Click button. 
                // Button: setIsOpen(false). 
                // Outside: setIsOpen(false).
                // Result: False. OK.

                // If the click outside logic uses 'mousedown', it happens before 'click'.
                // 1. mousedown on button. Document listener fires. onClose() -> setIsOpen(false).
                // 2. User releases mouse. click event fires on button. handleClick() -> setIsOpen(!isOpen). 
                //    Here isOpen is still TRUE (from closure). So !true = false.
                // Result: setIsOpen(false) called twice. OK.

                // EXCEPT: if rendering is sync/fast enough? No, closures capture old state.

                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, onClose]);

    const handleSendMessage = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: 'user' }]);
            setInput('');
            // Simulate a response (optional)
            setTimeout(() => {
                setMessages(prevMessages => [...prevMessages, { text: '¡Hola! ¿En qué puedo ayudarte?', sender: 'bot' }]);
            }, 1000);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            ref={chatRef}
            className="absolute bottom-24 right-0 w-80 h-96 bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeInUp z-50 border border-gray-100 font-montserrat"
        >
            {/* Header */}
            <div className="bg-gradient-to-r from-coral-red via-neon-pink to-violet-glow p-4 text-white flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <h3 className="font-semibold text-lg">Soporte Nike</h3>
                </div>
                <button
                    onClick={onClose}
                    className="text-white/80 hover:text-white transition-colors"
                >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-3 scrollbar-thin scrollbar-thumb-gray-300">
                {messages.length === 0 && (
                    <div className="text-center mt-8 opacity-70">
                        <p className="text-4xl mb-2">👋</p>
                        <p className="text-sm text-slate-gray">¡Hola! Estamos aquí para ayudarte con tu pedido o consultas.</p>
                    </div>
                )}

                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`max-w-[85%] p-3 text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                ? 'self-end bg-gradient-to-r from-coral-red to-neon-pink text-white rounded-2xl rounded-tr-none'
                                : 'self-start bg-white text-slate-gray border border-gray-100 rounded-2xl rounded-tl-none'
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Escribe un mensaje..."
                    className="flex-1 text-sm bg-slate-100 border-none rounded-full px-4 py-2.5 focus:ring-2 focus:ring-neon-pink/50 focus:bg-white transition-all outline-none text-slate-gray placeholder-gray-400"
                />
                <button
                    onClick={handleSendMessage}
                    disabled={!input.trim()}
                    className={`p-2.5 rounded-full shadow-md transition-all transform active:scale-95 flex items-center justify-center
                        ${input.trim()
                            ? 'bg-gradient-to-r from-neon-pink to-violet-glow text-white hover:shadow-lg cursor-pointer'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        }`}
                >
                    <svg className="w-5 h-5 translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default FloatingChat;
