USE payroll_system;

INSERT INTO users (
    name,
    email,
    password,
    role
)
VALUES
(
    'Administrator',
    'admin@payroll.com',
    'HASH_ADMIN_HASIL_GENERATE',
    'admin'
),
(
    'Budi Santoso',
    'budi@payroll.com',
    'HASH_BUDI_HASIL_GENERATE',
    'employee'
),
(
    'Andi Pratama',
    'andi@payroll.com',
    'HASH_ANDI_HASIL_GENERATE',
    'employee'
);