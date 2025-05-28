# PHP MySQL Application Suite

![TypeScript](https://img.shields.io/badge/TypeScript-57.7%25-blue?logo=typescript)
![HTML](https://img.shields.io/badge/HTML-23.6%25-orange?logo=html5)
![PHP](https://img.shields.io/badge/PHP-12.2%25-777bb4?logo=php)
![CSS](https://img.shields.io/badge/CSS-6.1%25-563d7c?logo=css3)
![JavaScript](https://img.shields.io/badge/JavaScript-0.4%25-f7df1e?logo=javascript)


A collection of PHP applications demonstrating MySQL database interactions, user authentication, and API development. This repository includes six tasks, with **Task 2** fully implemented for inserting data into a MySQL database.

## 📋 Table of Contents
- [Overview](#overview)
- [Tasks](#tasks)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Security Notes](#security-notes)
- [Contributing](#contributing)
- [License](#license)

## 📖 Overview
This project showcases PHP and MySQL integration through six tasks:
1. Generate an HTML table using PHP variables.
2. Insert data into a MySQL database.
3. View data from a MySQL database.
4. User registration with CRUD functionality.
5. Login, register, dashboard, and logout system using sessions.
6. RESTful JSON API with HTTP methods.

**Task 2** is fully implemented, featuring a secure, user-friendly form to insert student details into a MySQL database. Other tasks are placeholders for future implementation.

## 📌 Tasks

### Task 1: Generate HTML Table
- **Description**: Dynamically create an HTML table using PHP variables.
- **Status**: Not implemented.
- **Directory**: `/task1` (placeholder)

### Task 2: Insert Data into MySQL
- **Description**: A PHP application to insert student details (ID, first name, last name, department) into a MySQL database.
- **Features**:
  - Secure database connection with prepared statements.
  - Input validation (numeric ID, alphabetic names, predefined departments).
  - CSRF protection.
  - Form data persistence on errors.
  - Logging to `logs/app.log`.
  - Styled with Tailwind CSS.
- **Directory**: `/task2`
- **Files**:
  - `config.php`: Database credentials.
  - `db_connection.php`: MySQL connection.
  - `setup.php`: Creates `student_details` table.
  - `index.php`: Form and feedback.
  - `insert.php`: Processes form submissions.

### Task 3: View Data
- **Description**: Display MySQL data in a user-friendly format (e.g., HTML table).
- **Status**: Not implemented.
- **Directory**: `/task3` (placeholder)

### Task 4: User Registration with CRUD
- **Description**: Register users (name, email, password) with view, edit, and delete functionality.
- **Status**: Not implemented.
- **Directory**: `/task4` (placeholder)

### Task 5: Authentication System
- **Description**: Login, register, dashboard, and logout pages using PHP sessions.
- **Status**: Not implemented.
- **Directory**: `/task5` (placeholder)

### Task 6: RESTful JSON API
- **Description**: Multiplatform API handling JSON with HTTP methods (GET, POST, PUT, DELETE).
- **Status**: Not implemented.
- **Directory**: `/task6` (placeholder)

## 🛠️ Prerequisites
- **Web Server**: Apache/Nginx (e.g., XAMPP, WAMP, MAMP)
- **PHP**: 7.4+
- **MySQL**: 5.7+
- **Browser**: Chrome, Firefox, or similar
- **Optional**: Composer (for Task 6, if using a framework)

## 📦 Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/php-mysql-suite.git
   cd php-mysql-suite
   ```

2. **Set Up Web Server**:
   - Place the project in your web server's document root (e.g., `htdocs` for XAMPP).
   - Example: `/path/to/htdocs/php-mysql-suite`

3. **Create Database**:
   - Open MySQL (e.g., phpMyAdmin or CLI).
   - Create the `student_list` database:
     ```sql
     CREATE DATABASE student_list;
     ```

4. **Configure Credentials**:
   - Edit `task2/config.php`:
     ```php
     define('DB_HOST', 'localhost');
     define('DB_USER', 'your_username');
     define('DB_PASS', 'your_password');
     define('DB_NAME', 'student_list');
     ```
   - For security, store `config.php` outside the web root and update `require_once` paths.

5. **Set Up Logging (Task 2)**:
   - Create `task2/logs/` directory.
   - Ensure write permissions:
     ```bash
     chmod 775 task2/logs
     ```

6. **Create Table (Task 2)**:
   - Access `task2/setup.php` in your browser (e.g., `http://localhost/php-mysql-suite/task2/setup.php`).
   - This creates the `student_details` table.
   - Disable or delete `setup.php` after use.

7. **Directory Structure**:
   ```
   php-mysql-suite/
   ├── task1/ (placeholder)
   ├── task2/
   │   ├── config.php
   │   ├── db_connection.php
   │   ├── setup.php
   │   ├── index.php
   │   ├── insert.php
   │   └── logs/
   │       └── app.log
   ├── task3/ (placeholder)
   ├── task4/ (placeholder)
   ├── task5/ (placeholder)
   ├── task6/ (placeholder)
   └── README.md
   ```

## 🚀 Usage

### Task 2: Insert Data
1. **Access the Form**:
   - Open `http://localhost/php-mysql-suite/task2/index.php`.
   - View a form to enter student details.

2. **Submit Data**:
   - **ID**: Unique positive integer.
   - **First Name**: Letters/spaces, max 50 characters.
   - **Last Name**: Letters/spaces, max 50 characters.
   - **Department**: Select from dropdown (e.g., Computer Science).
   - Click **Submit**.

3. **Feedback**:
   - Success: Green message (“Data Inserted Successfully”).
   - Error: Red message (e.g., “ID already exists”), with form data retained.
   - Logs saved to `task2/logs/app.log`.

4. **Sample Log**:
   ```
   [2025-04-26 10:15:32] Table created successfully
   [2025-04-26 10:16:20] Data Inserted Successfully (ID: 1)
   [2025-04-26 10:16:35] Error: ID already exists.
   ```

### Other Tasks
- **Tasks 1, 3, 4, 5, 6**: Not implemented. To add:
  - **Task 1**: Script to render data in an HTML table.
  - **Task 3**: Query and display database records.
  - **Task 4**: User registration with CRUD.
  - **Task 5**: Authentication with sessions.
  - **Task 6**: RESTful API with JSON.
  - Check respective directories for updates.

## 🔒 Security Notes
- **Task 2**:
  - Uses prepared statements to prevent SQL injection.
  - Includes CSRF protection.
  - Sanitizes inputs with `filter_input`.
  - Logs errors securely.
  - Store `config.php` outside web root in production.
- **General**:
  - Use secure MySQL credentials.
  - Restrict access to `setup.php` and logs.
  - Enable HTTPS in production.

## 🤝 Contributing
We welcome contributions! To contribute:
1. Fork the repo.
2. Create a branch: `git checkout -b feature/taskX`.
3. Commit changes: `git commit -m "Add Task X"`.
4. Push: `git push origin feature/taskX`.
5. Open a pull request.

Please include tests and update this `README.md` for new tasks.

## 📜 License
[MIT License](LICENSE)

---
*Last updated: April 26, 2025*
