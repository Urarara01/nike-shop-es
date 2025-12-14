import React, { useState, useRef, useEffect } from 'react';
import socket from '../chat/socket';

const FloatingChat = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const chatRef = useRef(null);

    // ID persistente para mantener la conversación
    const [chatId] = useState(() => {
        const stored = localStorage.getItem('chat_id');
        if (stored) return stored;
        const newId = 'chat_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('chat_id', newId);
        return newId;
    });

    useEffect(() => {
        const joinRoom = () => {
            if (isOpen && chatId) {
                // Unirse al chat
                socket.emit('join_chat', { chat_id: chatId, user_name: 'Guest' });

                // Cargar historial? (Opcional, si el backend lo soporta)
                socket.emit('load_messages', { chat_id: chatId });
            }
        };

        if (isOpen) {
            joinRoom();
        }

        // Reconectar al chat
        socket.on('connect', joinRoom);

        return () => {
            socket.off('connect', joinRoom);
        };
    }, [isOpen, chatId]);

    useEffect(() => {
        // Escuchar mensajes entrantes
        const handleReceiveMessage = (message) => {
            if (message.chat_id === chatId) {
                setMessages((prev) => [...prev, message]);
            }
        };

        const handleLoadedMessages = ({ chat_id, messages: loadedMessages }) => {
            if (chat_id === chatId) {
                setMessages(loadedMessages);
            }
        }

        socket.on('receive_message', handleReceiveMessage);
        socket.on('loaded_messages', handleLoadedMessages);

        return () => {
            socket.off('receive_message', handleReceiveMessage);
            socket.off('loaded_messages', handleLoadedMessages);
        };
    }, [chatId]);

    // Cerrar al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            // Si el chat está abierto y el clic está fuera del chat
            if (isOpen && chatRef.current && !chatRef.current.contains(event.target)) {
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
            const tempMsg = { text: input, sender: 'user', chat_id: chatId };
            socket.emit('send_message', {
                chat_id: chatId,
                text: input,
                sender: 'user'
            });

            setInput('');
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
