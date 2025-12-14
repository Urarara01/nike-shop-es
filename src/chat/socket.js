import io from 'socket.io-client';

// Socket para la conexión con el backend
// Asegúrate de que el puerto coincida con el del backend
const socket = io('http://localhost:3001');

export default socket;
