# Lab Task 12 — Web Development (SE-33)

**Task:** Student Management System (CRUD: Update & Delete)

This lab builds upon Lab Task 11. In addition to *Create* and *Read*, this version supports **Update** and **Delete** operations. The system provides:

- Management Dashboard  
- Edit Student Page  
- Delete Student functionality  

---

## 📋 Overview

The goal of this task is to extend your Student Management System so that users can **edit** existing student records and **delete** them. This enhances the application’s full CRUD capabilities. A management dashboard page gives an overview and navigation to edit/delete actions.

---

## 🗂 Suggested Directory Structure

```bash
Lab Task 12/
│
├── index.php ← Management Dashboard / overview
├── add_student.php ← Page to create a new student (if still used)
├── view_students.php ← List of students with options to edit/delete
├── edit_student.php ← Form to update an existing student record
├── delete_student.php ← Logic or page to confirm & perform deletion
├── includes/ ← Shared modules & config
│ ├── header.php
│ ├── footer.php
│ ├── db_connect.php ← Database connection settings
│ └── functions.php
├── css/ ← Stylesheets (layout, styles, responsiveness)
│ └── styles.css, etc.
│ └── …
└── README.md ← This documentation file

```


> **Note**: Adjust the folder names & file names to match your actual structure if needed.

---

## 🧰 How to Run / View Locally

1. Clone or download this repository to your machine:
   ```bash
   git clone https://github.com/saqlainsaqlain625/2022-SE-33_Web_Development_LAB_TASK.git
   ```

2. Change into the Lab Task 05 directory:
   ```bash
   cd 2022-SE-33_Web_Development_LAB_TASK/Lab\ Task\ 12
   ```

3. Open the HTML file in your browser (e.g.http://localhost/Task12/index.php).
   You can simply double-click it or launch via a local web server:


### ✍️ Author

**Saqlain Mushtaq**

- 🎓 Software Engineering Student (SE-33)  
- 📍 Skardu, Pakistan  
- 📧 [saqlain.mushtaqbalti@gmail.com](mailto:saqlain.mushtaqbalti@gmail.com)  
- 📱 0340-5699216  

