import { Request, Response } from 'express';
import { db } from '../db';
import bcrypt from 'bcrypt';

// Register User
export const registerUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password, full_name, phone } = req.body;

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const query = 'INSERT INTO users (username, email, password, full_name, phone) VALUES (?, ?, ?, ?, ?)';
    await db.query(query, [username, email, hashedPassword, full_name, phone]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err: any) {
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ error: 'Email already exists' });
    } else {
      res.status(500).json({ error: 'Registration failed' });
    }
  }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const [results]: any = await db.query('SELECT * FROM users WHERE email = ?', [email]);

    if (!results.length) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid email or password' });
      return;
    }

    res.json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        phone: user.phone,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Login failed' });
  }
};