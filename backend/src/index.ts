// src/index.ts
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import jobRoutes from './routes/jobRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const app = express();
const PORT = 3000;

// ✅ Middlewares
app.use(cors());
app.use(bodyParser.json());

// ✅ Routes
app.use('/api/jobs', jobRoutes);     // Jobs (apply, create, list, etc.)
app.use('/api/auth', authRoutes);    // Login, register
app.use('/api/users', userRoutes);   // Profile, favorites, etc.

app.get('/', (req, res) => {
  res.send('Job Portal API is running!');
});

// ✅ Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
