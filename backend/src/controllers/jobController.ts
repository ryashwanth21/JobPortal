import { Request, Response } from 'express';
import { db } from '../db';
import { Job } from '../models/job';

// ✅ Get all jobs
export const getJobs = async (req: Request, res: Response) => {
  try {
    const [results] = await db.query('SELECT * FROM jobs');
    res.status(200).json(results);
  } catch (err) {
    console.error("❌ Failed to fetch jobs:", err);
    res.status(500).json({ message: 'Database error', error: err });
  }
};

// ✅ Get a single job by ID
export const getJobById = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const [results] = await db.query('SELECT * FROM jobs WHERE id = ?', [id]);
    if ((results as any[]).length === 0) {
      res.status(404).json({ message: 'Job not found' });
    } else {
      res.status(200).json((results as any[])[0]);
    }
  } catch (err) {
    console.error(`❌ Failed to fetch job ID ${id}:`, err);
    res.status(500).json({ message: 'Database error', error: err });
  }
};

// ✅ Create a new job
export const createJob = async (req: Request, res: Response) => {
  const { job_title, company_name, location, job_type, salary_range, job_description, application_deadline } = req.body;
  const query = `
    INSERT INTO jobs (job_title, company_name, location, job_type, salary_range, job_description, application_deadline)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  try {
    const [results]: any = await db.query(query, [job_title, company_name, location, job_type, salary_range, job_description, application_deadline]);
    res.status(201).json({ message: 'Job created successfully', jobId: results.insertId });
  } catch (err) {
    console.error("❌ Failed to create job:", err);
    res.status(500).json({ message: 'Error creating job', error: err });
  }
};

// ✅ Update a job
export const updateJob = async (req: Request, res: Response) => {
  const jobId = req.params.id;
  const updatedJob = req.body;

  const query = `
    UPDATE jobs SET
      job_title = ?,
      company_name = ?,
      location = ?,
      job_type = ?,
      salary_range = ?,
      job_description = ?,
      application_deadline = ?
    WHERE id = ?
  `;

  const values = [
    updatedJob.job_title,
    updatedJob.company_name,
    updatedJob.location,
    updatedJob.job_type,
    updatedJob.salary_range,
    updatedJob.job_description,
    updatedJob.application_deadline,
    jobId
  ];

  try {
    await db.query(query, values);
    res.status(200).json({ message: "✅ Job updated successfully" });
  } catch (err) {
    console.error("❌ SQL Update Error:", err);
    res.status(500).json({ error: "Database error during update" });
  }
};

// ✅ Delete a job
export const deleteJob = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM jobs WHERE id = ?', [id]);
    res.status(200).json({ message: 'Job deleted successfully' });
  } catch (err) {
    console.error("❌ Error deleting job:", err);
    res.status(500).json({ message: 'Error deleting job', error: err });
  }
};

// ✅ Apply for a job and update user's applied_jobs
export const applyForJob = async (req: Request, res: Response): Promise<void> => {
  const jobId = parseInt(req.params.id);
  const { applicant_name, email } = req.body;

  if (!jobId || !email) {
    res.status(400).json({ error: 'Job ID and applicant email are required.' });
    return;
  }

  try {
    // Insert into applications table
    await db.query(
      'INSERT INTO applications (job_id, applicant_name, email) VALUES (?, ?, ?)',
      [jobId, applicant_name, email]
    );

    const [users]: any = await db.query('SELECT applied_jobs FROM users WHERE email = ?', [email]);

    if (!users.length) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    let appliedJobs = users[0].applied_jobs ? JSON.parse(users[0].applied_jobs) : [];

    if (!appliedJobs.includes(jobId)) {
      appliedJobs.push(jobId);
      await db.query('UPDATE users SET applied_jobs = ? WHERE email = ?', [
        JSON.stringify(appliedJobs),
        email
      ]);
    }

    res.status(201).json({ message: '✅ Application submitted and saved!' });
  } catch (err) {
    console.error('❌ Error in applyForJob:', err);
    res.status(500).json({ error: 'Server error while applying' });
  }
};
