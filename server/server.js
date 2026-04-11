import express from 'express';
import connectDB from './config/db.js';
import userRoutes from './Routes/userRoutes.js';
import cors from "cors";

const app = express();
app.use(cors());
const PORT = 5000;

connectDB();

//middleware
app.use(express.json());
app.use('/api/users', userRoutes);


//Api end points
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});