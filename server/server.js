import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import http from 'http';
import { Server } from 'socket.io';
import 'dotenv/config';

const app = express();
const server = http.createServer(app);

// Middleware
app.use(express.json());

app.use(
cors({
origin: 'http://localhost:5173',
credentials: true,
methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
})
);

// Socket.IO
export const io = new Server(server, {
cors: {
origin: 'http://localhost:5173',
credentials: true,
},
});

// Database Connection
await connectDB();

// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
res.send('API is running...');
});

// Error Handler
app.use((err, req, res, next) => {
res.status(err.status || 500).json({
success: false,
message: err.message || 'Server Error',
});
});

// Start Server
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});

export default app;
