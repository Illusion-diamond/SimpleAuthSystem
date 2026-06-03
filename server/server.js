import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import http from 'http';
import { Server } from 'socket.io';
import "dotenv/config";

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    credentials: true,
  },
});

app.use(express.json());

await connectDB();


app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});
if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
}
export default app;