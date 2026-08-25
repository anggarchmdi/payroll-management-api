import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.3",

    info: {
      title: "Payroll System API",
      version: "1.0.0",
      description:
        "REST API untuk sistem penggajian sederhana dengan authentication, authorization, employee, attendance, dan payroll."
    },

    servers: [
      {
        url: "http://localhost:5000",
        description: "Local development server"
      }
    ],

    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      },

      schemas: {
        RegisterRequest: {
          type: "object",
          required: [
            "name",
            "email",
            "password"
          ],
          properties: {
            name: {
              type: "string",
              example: "Budi"
            },
            email: {
              type: "string",
              format: "email",
              example: "budi@mail.com"
            },
            password: {
              type: "string",
              format: "password",
              example: "Budi12345"
            }
          }
        },

        LoginRequest: {
          type: "object",
          required: [
            "email",
            "password"
          ],
          properties: {
            email: {
              type: "string",
              format: "email",
              example: "admin@payroll.com"
            },
            password: {
              type: "string",
              format: "password",
              example: "Admin12345"
            }
          }
        },

        Employee: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            user_id: {
              type: "integer",
              example: 2
            },
            employee_code: {
              type: "string",
              example: "EMP001"
            },
            position: {
              type: "string",
              example: "Frontend Developer"
            },
            basic_salary: {
              type: "number",
              example: 3000000
            },
            join_date: {
              type: "string",
              format: "date",
              example: "2026-08-01"
            },
            name: {
              type: "string",
              example: "Budi"
            },
            email: {
              type: "string",
              example: "budi@mail.com"
            },
            role: {
              type: "string",
              enum: [
                "admin",
                "employee"
              ],
              example: "employee"
            }
          }
        },

        Attendance: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            employee_id: {
              type: "integer",
              example: 1
            },
            employee_code: {
              type: "string",
              example: "EMP001"
            },
            employee_name: {
              type: "string",
              example: "Budi"
            },
            date: {
              type: "string",
              format: "date",
              example: "2026-08-25"
            },
            check_in: {
              type: "string",
              nullable: true,
              example: "08:00:00"
            },
            check_out: {
              type: "string",
              nullable: true,
              example: "17:00:00"
            },
            status: {
              type: "string",
              enum: [
                "present",
                "absent",
                "late",
                "leave"
              ],
              example: "present"
            }
          }
        },

        Payroll: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              example: 1
            },
            employee_id: {
              type: "integer",
              example: 1
            },
            employee_code: {
              type: "string",
              example: "EMP001"
            },
            employee_name: {
              type: "string",
              example: "Budi"
            },
            month: {
              type: "integer",
              example: 8
            },
            year: {
              type: "integer",
              example: 2026
            },
            basic_salary: {
              type: "number",
              example: 3000000
            },
            attendance_days: {
              type: "integer",
              example: 22
            },
            deduction: {
              type: "number",
              example: 100000
            },
            bonus: {
              type: "number",
              example: 250000
            },
            net_salary: {
              type: "number",
              example: 3150000
            }
          }
        }
      }
    },

    tags: [
      {
        name: "Authentication",
        description: "Authentication endpoints"
      },
      {
        name: "Employees",
        description: "Employee management"
      },
      {
        name: "Attendance",
        description: "Attendance management"
      },
      {
        name: "Payroll",
        description: "Payroll management"
      }
    ]
  },

  apis: [
    "./src/routes/*.ts"
  ]
};

export const swaggerSpec =
  swaggerJSDoc(swaggerOptions);