import io from 'socket.io-client';

// Determinar la URL del servidor dinámicamente
const getServerUrl = () => {
    const { hostname, protocol, port, host } = window.location;
    
    // Si estamos en localhost, conectar al puerto del backend
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        return 'http://localhost:3001';
    }
    
    // Si es una IP local (192.168.x.x, 10.x.x.x, etc), añadir puerto 3001
    if (/^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[01])\.)/.test(hostname)) {
        return `${protocol}//${hostname}:3001`;
    }
    
    // Para túneles como ngrok, localtunnel, etc. 
    // El túnel ya redirige al puerto correcto, usar la misma URL base
    return `${protocol}//${host}`;
};

const SERVER_URL = getServerUrl();

console.log('🔌 Connecting to socket server:', SERVER_URL);

// Socket con configuración mejorada para conexiones inestables
const socket = io(SERVER_URL, {
    reconnection: true,
    reconnectionAttempts: 10,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    timeout: 20000,
    transports: ['websocket', 'polling'] // Fallback a polling si websocket falla
});

// Eventos de conexión para debugging
socket.on('connect', () => {
    console.log('✅ Connected to server:', socket.id);
});

socket.on('connect_error', (error) => {
    console.error('❌ Connection error:', error.message);
});

socket.on('disconnect', (reason) => {
    console.log('🔌 Disconnected:', reason);
});

socket.on('reconnect', (attemptNumber) => {
    console.log('🔄 Reconnected after', attemptNumber, 'attempts');
});

export default socket;
