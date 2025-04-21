import { Request, Response } from 'express';
import { db } from '../db'; // Assuming this is your database connection

// GET /api/users/:id/favorites
export const getFavoriteJobs = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;

  try {
    const [users]: any = await db.query('SELECT favorite_jobs FROM users WHERE id = ?', [userId]);
    if (!users.length) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const favoriteIds = JSON.parse(users[0].favorite_jobs || '[]');
    if (favoriteIds.length === 0) {
      res.json([]);
      return;
    }

    const placeholders = favoriteIds.map(() => '?').join(',');
    const [jobs]: any = await db.query(`SELECT * FROM jobs WHERE id IN (${placeholders})`, favoriteIds);

    res.json(jobs);
  } catch (err) {
    console.error('❌ Error fetching favorites:', err);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
};

// GET /api/users/:id
export const getUserById = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id;

  try {
    const [results]: any = await db.query(
      'SELECT id, username, email, full_name, phone, role FROM users WHERE id = ?',
      [userId]
    );
    if (!results.length) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    res.status(200).json(results[0]);
  } catch (err) {
    console.error('❌ Error fetching user:', err);
    res.status(500).json({ error: 'Failed to fetch user profile' });
  }
};

// PUT /api/users/favorites
export const updateFavoriteJobs = async (req: Request, res: Response): Promise<void> => {
  const { userId, favoriteJobs } = req.body;

  try {
    const jsonFavorites = JSON.stringify(favoriteJobs);
    await db.query('UPDATE users SET favorite_jobs = ? WHERE id = ?', [jsonFavorites, userId]);
    res.json({ message: 'Favorites updated successfully' });
  } catch (err) {
    console.error('❌ Error updating favorites:', err);
    res.status(500).json({ error: 'Failed to update favorites' });
  }
};