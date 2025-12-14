import React, { useState, useEffect, useRef } from 'react';
import socket from '../chat/socket';

const AdminChats = () => {
    const [chats, setChats] = useState([]);
    const [activeChatId, setActiveChatId] = useState(null);
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Iniciar sesión como administrador
        socket.emit('admin_join');
        socket.emit('load_chats');

        // Listeners para la lista de chats
        socket.on('loaded_chats', (data) => {
            setChats(data);
        });

        socket.on('new_chat_notification', (newChat) => {
            setChats(prev => {
                // Evitar duplicados
                if (prev.find(c => c.id === newChat.id)) return prev;
                return [newChat, ...prev];
            });
        });

        socket.on('chat_updated', ({ chat_id, last_message, timestamp }) => {
            setChats(prev => {
                const chatIndex = prev.findIndex(c => c.id === chat_id);
                if (chatIndex > -1) {
                    const updatedChat = { ...prev[chatIndex], last_message, last_updated: timestamp };
                    const newChats = [...prev];
                    newChats.splice(chatIndex, 1);
                    return [updatedChat, ...newChats];
                }
                return prev;
            });
        });

        return () => {
            socket.off('loaded_chats');
            socket.off('new_chat_notification');
            socket.off('chat_updated');
        };
    }, []);

    useEffect(() => {
        // Listeners para los mensajes del chat activo
        const handleReceiveMessage = (message) => {
            if (message.chat_id === activeChatId) {
                setMessages(prev => [...prev, message]);
                scrollToBottom();
            }
        };

        const handleLoadedMessages = ({ chat_id, messages }) => {
            if (chat_id === activeChatId) {
                setMessages(messages);
                scrollToBottom();
            }
        };

        socket.on('receive_message', handleReceiveMessage);
        socket.on('loaded_messages', handleLoadedMessages);

        if (activeChatId) {
            socket.emit('join_chat', { chat_id: activeChatId, user_name: 'Admin' });
            socket.emit('load_messages', { chat_id: activeChatId });
        }

        return () => {
            socket.off('receive_message', handleReceiveMessage);
            socket.off('loaded_messages', handleLoadedMessages);
        };
    }, [activeChatId]);

    const scrollToBottom = () => {
        setTimeout(() => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }, 100);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (input.trim() && activeChatId) {
            socket.emit('send_message', {
                chat_id: activeChatId,
                text: input,
                sender: 'admin'
            });
            setInput('');
        }
    };

    return (
        <div className="flex h-screen bg-pale-blue font-montserrat">
            {/* Sidebar */}
            <div className="w-1/4 bg-white border-r border-slate-200 flex flex-col">
                <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-coral-red via-neon-pink to-violet-glow text-white">
                    <h2 className="text-2xl font-bold">Chats de Soporte</h2>
                    <p className="text-sm opacity-90">{chats.length} conversaciones activas</p>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {chats.length === 0 ? (
                        <div className="p-10 text-center text-slate-gray">Waiting for chats...</div>
                    ) : (
                        chats.map(chat => (
                            <div
                                key={chat.id}
                                onClick={() => setActiveChatId(chat.id)}
                                className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors ${activeChatId === chat.id ? 'bg-slate-100 border-l-4 border-coral-red' : ''}`}
                            >
                                <div className="flex justify-between items-center mb-1">
                                    <span className="font-semibold text-slate-gray truncate">{chat.user_name || 'Anonymous'}</span>
                                    <span className="text-xs text-slate-400">
                                        {new Date(chat.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </span>
                                </div>
                                <p className="text-sm text-slate-400 truncate w-full">
                                    {chat.last_message || "Nueva conversación..."}
                                </p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 flex flex-col bg-white">
                {activeChatId ? (
                    <>
                        <div className="p-4 border-b border-slate-200 shadow-sm flex justify-between items-center">
                            <div>
                                <h3 className="text-lg font-bold text-slate-gray">
                                    Chat con <span className="text-coral-red">{chats.find(c => c.id === activeChatId)?.user_name || 'Usuario'}</span>
                                </h3>
                                <p className="text-xs text-slate-400">ID: {activeChatId}</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">Activo</span>
                            </div>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-slate-50 flex flex-col gap-4">
                            {messages.map((msg, index) => (
                                <div
                                    key={index}
                                    className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[70%] p-4 rounded-2xl text-sm shadow-sm ${msg.sender === 'admin'
                                        ? 'bg-violet-glow text-white rounded-tr-none'
                                        : 'bg-white text-slate-gray border border-slate-200 rounded-tl-none'
                                        }`}>
                                        <p>{msg.text}</p>
                                        <p className={`text-[10px] mt-1 text-right ${msg.sender === 'admin' ? 'text-white/70' : 'text-slate-400'}`}>
                                            {new Date(msg.timestamp).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-4 bg-white border-t border-slate-200">
                            <form onSubmit={handleSendMessage} className="flex gap-4">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder="Escribe una respuesta para el cliente..."
                                    className="flex-1 input rounded-full border border-slate-300 focus:ring-2 focus:ring-violet-glow focus:border-transparent"
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-violet-glow text-white rounded-full font-semibold hover:bg-opacity-90 transition-all shadow-md active:scale-95"
                                >
                                    Enviar
                                </button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-gray opacity-50">
                        <svg className="w-24 h-24 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        <p className="text-xl">Selecciona un chat para comenzar</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminChats;