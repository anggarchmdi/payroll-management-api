CREATE DATABASE IF NOT EXISTS payroll_system
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE payroll_system;

-- ============================================
-- USERS
-- ============================================

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    password VARCHAR(255) NOT NULL,

    role ENUM('admin', 'employee')
        NOT NULL DEFAULT 'employee',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP
);


-- ============================================
-- EMPLOYEES
-- ============================================

CREATE TABLE employees (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id INT UNSIGNED NOT NULL UNIQUE,

    employee_code VARCHAR(20) NOT NULL UNIQUE,

    position VARCHAR(100) NOT NULL,

    basic_salary DECIMAL(15,2) NOT NULL DEFAULT 0,

    join_date DATE NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_employees_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);


-- ============================================
-- ATTENDANCES
-- ============================================

CREATE TABLE attendances (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    employee_id INT UNSIGNED NOT NULL,

    date DATE NOT NULL,

    check_in TIME NULL,

    check_out TIME NULL,

    status ENUM(
        'present',
        'absent',
        'late',
        'leave'
    ) NOT NULL DEFAULT 'present',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_attendances_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT unique_employee_date
        UNIQUE (employee_id, date)
);


-- ============================================
-- PAYROLLS
-- ============================================

CREATE TABLE payrolls (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    employee_id INT UNSIGNED NOT NULL,

    month TINYINT UNSIGNED NOT NULL,

    year YEAR NOT NULL,

    basic_salary DECIMAL(15,2) NOT NULL DEFAULT 0,

    attendance_days INT UNSIGNED NOT NULL DEFAULT 0,

    deduction DECIMAL(15,2) NOT NULL DEFAULT 0,

    bonus DECIMAL(15,2) NOT NULL DEFAULT 0,

    net_salary DECIMAL(15,2) NOT NULL DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_payrolls_employee
        FOREIGN KEY (employee_id)
        REFERENCES employees(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT unique_employee_period
        UNIQUE (employee_id, month, year)
);