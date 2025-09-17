# E-commerce NestJS API

A robust e-commerce REST API built with NestJS, TypeScript, and PostgreSQL. Features complete CRUD operations, JWT authentication, and role-based authorization.

## 🚀 Features

- **Complete Authentication System** - JWT-based login/register
- **Role-Based Authorization** - Admin and user roles with guards
- **Full CRUD Operations** - Users, Products, Categories, Product Images
- **Database Integration** - PostgreSQL with TypeORM
- **Data Validation** - DTOs with class-validator
- **Security** - Password hashing, JWT tokens, protected endpoints
- **API Documentation** - Swagger/OpenAPI integration
- **Error Handling** - Comprehensive error responses

## 🛠 Tech Stack

- **Framework:** NestJS (Node.js)
- **Language:** TypeScript
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT (JSON Web Tokens)
- **Validation:** class-validator & class-transformer
- **Documentation:** Swagger/OpenAPI
- **Testing:** Postman

## 📁 Project Structure

```
src/
├── auth/                    # Authentication module
│   ├── decorators/         # Custom decorators (Public, CurrentUser, Roles)
│   ├── dto/               # Auth DTOs (Login, Register, Change Password)
│   ├── guards/            # Authentication guards (JWT, Roles)
│   ├── strategies/        # JWT strategy
│   ├── auth.controller.ts # Auth endpoints
│   ├── auth.service.ts    # Auth business logic
│   └── auth.module.ts     # Auth module configuration
├── users/                 # Users management
│   ├── dto/              # User DTOs
│   ├── entities/         # User entity
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── products/             # Products management
├── categories/           # Categories management
├── product-images/       # Product images management
└── app.module.ts         # Main application module
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

### 1. Clone the Repository
```bash
git clone https://github.com/nrgvu/e-commerce-nestjs-task.git
cd e-commerce-nestjs-task
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=ecommerce_db

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=24h

# Application
PORT=3000
```

### 4. Database Setup
```bash
# Create database
createdb ecommerce_db

# Run migrations (if any)
npm run migration:run
```

### 5. Start the Application
```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

The API will be running at `http://localhost:3000`

## 📚 API Endpoints

### Authentication
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | User registration | No |
| POST | `/auth/login` | User login | No |
| POST | `/auth/change-password` | Change password | Yes |

### Users
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/users` | Get all users | Yes |
| GET | `/users/:id` | Get user by ID | Yes |
| POST | `/users` | Create new user | Yes |
| PUT | `/users/:id` | Update user | Yes |
| DELETE | `/users/:id` | Delete user | Yes |

### Products
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/products` | Get all products | No |
| GET | `/products/:id` | Get product by ID | No |
| POST | `/products` | Create new product | Yes |
| PUT | `/products/:id` | Update product | Yes |
| DELETE | `/products/:id` | Delete product | Yes |

### Categories
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/categories` | Get all categories | No |
| GET | `/categories/:id` | Get category by ID | No |
| POST | `/categories` | Create new category | Yes |
| PUT | `/categories/:id` | Update category | Yes |
| DELETE | `/categories/:id` | Delete category | Yes |

### Product Images
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/product-images` | Get all product images | No |
| GET | `/product-images/:id` | Get product image by ID | No |
| POST | `/product-images` | Upload product image | Yes |
| PUT | `/product-images/:id` | Update product image | Yes |
| DELETE | `/product-images/:id` | Delete product image | Yes |

## 🔐 Authentication Usage

### 1. Register a New User
```bash
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

### 2. Login
```bash
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

### 3. Access Protected Endpoints
```bash
GET /users
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📝 Example Requests

### Create a Category
```bash
POST /categories
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "name": "Electronics",
  "description": "Electronic devices and gadgets"
}
```

### Create a Product
```bash
POST /products
Authorization: Bearer your_jwt_token
Content-Type: application/json

{
  "name": "iPhone 15",
  "description": "Latest Apple smartphone",
  "price": 999.99,
  "categoryId": 1
}
```

## 🧪 Testing

The API has been thoroughly tested using **Postman**. All endpoints are working correctly with proper:
- ✅ Authentication validation
- ✅ Data validation
- ✅ Error handling
- ✅ Success responses

### Import Postman Collection
You can test all endpoints by importing the Postman collection (if available) or manually testing each endpoint using the examples above.

## 🔒 Security Features

- **Password Hashing** - Bcrypt for secure password storage
- **JWT Authentication** - Stateless authentication tokens
- **Route Guards** - Protected endpoints require valid tokens
- **Role-Based Access** - Different permissions for admin/user roles
- **Input Validation** - All inputs validated using DTOs
- **Error Handling** - Secure error messages without sensitive data

## 🚀 Deployment

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

### Docker (Optional)
```bash
# Build image
docker build -t ecommerce-api .

# Run container
docker run -p 3000:3000 ecommerce-api
```

## 📖 API Documentation

Once the application is running, visit:
- **Swagger UI:** `http://localhost:3000/api/docs`
- **OpenAPI JSON:** `http://localhost:3000/api/docs-json`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is for educational purposes.

## 👨‍💻 Author

**Abdulrahman**
- GitHub: [@nrgvu](https://github.com/nrgvu)
- Email: abdulrahman.hashim2001@gmail.com

## 🙏 Acknowledgments

- NestJS team for the amazing framework
- TypeORM for excellent database integration
- The Node.js community for continuous support

---

**⭐ If you found this project helpful, give it a star!**