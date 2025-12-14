const express = require('express');
const http = require('http');
const { Server } = require("socket.io");
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:4000"], // Allow React frontend on both ports
        methods: ["GET", "POST"]
    }
});

// Database Setup
const db = new sqlite3.Database('./chats.db', (err) => {
    if (err) {
        console.error("Error opening database:", err.message);
    } else {
        console.log("Connected to the SQLite database.");
        db.run(`CREATE TABLE IF NOT EXISTS chats (
            id TEXT PRIMARY KEY,
            user_name TEXT DEFAULT 'Anonymous',
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            status TEXT DEFAULT 'active'
        )`);

        db.run(`CREATE TABLE IF NOT EXISTS messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            chat_id TEXT,
            sender TEXT,
            text TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(chat_id) REFERENCES chats(id)
        )`);
    }
});

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // User joins a chat (or creates one implicitly by joining via ID)
    socket.on('join_chat', ({ chat_id, user_name }) => {
        socket.join(chat_id);
        console.log(`User ${socket.id} joined chat: ${chat_id}`);

        // Ensure chat exists in DB
        db.get("SELECT id FROM chats WHERE id = ?", [chat_id], (err, row) => {
            if (!row) {
                db.run("INSERT INTO chats (id, user_name) VALUES (?, ?)", [chat_id, user_name || 'Anonymous']);
                // Notify admin of new chat
                io.to('admin_room').emit('new_chat_notification', { id: chat_id, user_name: user_name || 'Anonymous' });
            }
        });
    });

    // Admin joins the admin room to receive global updates
    socket.on('admin_join', () => {
        socket.join('admin_room');
        console.log(`Admin ${socket.id} joined admin_room`);
    });

    // Send a message
    socket.on('send_message', ({ chat_id, text, sender }) => {
        const timestamp = new Date().toISOString();

        // Save to DB
        db.run("INSERT INTO messages (chat_id, sender, text, timestamp) VALUES (?, ?, ?, ?)",
            [chat_id, sender, text, timestamp],
            function (err) {
                if (err) {
                    console.error("Error saving message:", err);
                    return;
                }

                // Broadcast to everyone in the chat room (User + Admin)
                io.to(chat_id).emit('receive_message', {
                    id: this.lastID, // Use the auto-increment ID
                    chat_id,
                    sender,
                    text,
                    timestamp
                });

                // If user sent it, also notify admin room so they see snippet updates in sidebar
                if (sender === 'user') {
                    io.to('admin_room').emit('chat_updated', { chat_id, last_message: text, timestamp });
                }
            }
        );
    });

    // Load all chats for Admin
    socket.on('load_chats', () => {
        db.all("SELECT * FROM chats ORDER BY created_at DESC", [], (err, rows) => {
            if (err) return console.error(err);
            socket.emit('loaded_chats', rows);
        });
    });

    // Load messages for a specific chat
    socket.on('load_messages', ({ chat_id }) => {
        db.all("SELECT * FROM messages WHERE chat_id = ? ORDER BY timestamp ASC", [chat_id], (err, rows) => {
            if (err) return console.error(err);
            socket.emit('loaded_messages', { chat_id, messages: rows });
        });
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

const PORT = 3001;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
