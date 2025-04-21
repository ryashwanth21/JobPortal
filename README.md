
# Job Portal

A full-featured Job Portal web application built with Angular 16 (with Angular Material) for the frontend, Node.js (TypeScript) and Express for the backend, and MySQL as the database. Users can register, log in, view jobs, apply, save favorites, and manage their profile. Admins can post, edit, and delete jobs.

---

## ✨ Features

### 👤 Authentication & User Management

- Register & login (OTP-based login for regular users
- Admin login with email/passwor
- Route protection for unauthorized user
- Session persistence with auth toke
- Dynamic navbar showing user info after logi

### 📄 Job Management

  View all job listings wit:
    Paginatin
    Search by job title/compay
    Filter by location and job tye
  Apply to jos
  Save jobs to favorits
- **Admin:**
    Post a new jb
    Edit existing jos
    Delete job postins

### 🔖 Favorites & Applications
-  Save jobs to favories-  Apply for jbs-  View saved & applied jobs in the user profle-  Favorites and applications are stored in the databse

### 🧾 Profile Page
-  View user details (name, emil)
-  List of favorite obs
-  List of applied obs
-  Profile loaded from the dataase

### 🖼️ UI/U

-  Angular Material UI compoent
-  Responsive dsig
-  Clean layout and mobile frindl
-  Footer: Developed by R Yashanth

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

-  Node.js (v14 orhiger)
-  AnglarCLI
  MySQL

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

   -  Create a MySQL dtabase
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
