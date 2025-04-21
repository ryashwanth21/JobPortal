
# Job Portal

A full-featured Job Portal web application built with Angular 16 (with Angular Material) for the frontend, Node.js (TypeScript) and Express for the backend, and MySQL as the database. Users can register, log in, view jobs, apply, save favorites, and manage their profile. Admins can post, edit, and delete jobs.

---

## ✨ Features

### 👤 Authentication & User Management

- Register & login (OTP-based login for regular users
- Admin login with email/password
- Route protection for unauthorized user
- Session persistence with auth token
- Dynamic navbar showing user info after login

### 📄 Job Management

  View all job listings with:
    Pagination
    Search by job title/company
    Filter by location and job type
  Apply to jobs
  Save jobs to favorites
- **Users:**
    Post a new job
    Edit existing jobs
    Delete job postings

### 🔖 Favorites & Applications
-  Save jobs to favorties-  Apply for jobs-  View saved & applied jobs in the user profile-  Favorites and applications are stored in the database

### 🧾 Profile Page
-  View user details (name, emil)
-  List of favorite obs
-  List of applied obs
-  Profile loaded from the database

### 🖼️ UI/UX

-  Angular Material UI compoent
-  Responsive design
-  Clean layout and mobile friendly
-  Footer: Developed by R Yashwanth

---

## 🔧 Tech Stack

| Layer     | Technology                      |
|-----------|---------------------------------|
| Frontend  | Angular 16, Angular Material    |
| Backend   | Node.js, Express, TypeScript    |
| Database  | MySQL                           |
| Tools     | MySQL Workbench, Postman, JWT, Nodemailer, bcrypt |

---

## 📂 Project Structure

```
JobPortal/
├── frontend/          # Angular 16 frontend
│   └── src/app/
├── backend/           # Node.js + Express backend
│   └── src/
│       ├── controllers/
│       ├── routes/
│       ├── models/
│       └── config/
├── README.md
```

---

## 🚀 Getting Started

### Prerequistes

-  Node.js 
-  AnglarCLI
  MySQL

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ryashwanth21/JobPortal.git
   cd JobPortal
   ```

2. **Set up the backend:**

   ```bash
   cd backend
   npm install
   ```

3. **Set up the frontend:**

   ```bash
   cd ../frontend
   npm install
   ```

4. **Configure the database:*

   -  Create a MySQL database
   -  Update the database configuration in `backend/src/config/db.config.js` with your MySQL credntials .

5. **Run the backend server:**

   ```bash
   cd ../backend
   npm start
   ```

6. **Run the frontend application:**

   ```bash
   cd ../frontend
   ng serve
   ```

   Navigate to `http://localhost:4200/` to view the application.

---

## 🧪 Testing

- **Unit Tess:**

   Run `ng test` to execute the unit tests va Karma .

- **End-to-End Tess:**

   Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capailities .

---


## 🙌 Acknowldgements

 Developed by R Yashwanth .
