# E-commerce REST API

A comprehensive e-commerce backend API built with NestJS, TypeScript, and PostgreSQL. Features complete CRUD operations for users, categories, products, and product images with file upload capabilities.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Endpoints](#api-endpoints)
- [Entity Relationships](#entity-relationships)
- [File Upload](#file-upload)
- [Testing with Postman](#testing-with-postman)
- [Project Structure](#project-structure)

## Features

- **User Management**: Complete CRUD operations for user accounts
- **Category System**: Categories with image upload support
- **Product Management**: Products with category relationships
- **Image Gallery**: Multiple image uploads per product with primary image designation
- **File Validation**: Image type and size validation
- **Entity Relationships**: Proper foreign key relationships between entities
- **Error Handling**: Comprehensive validation and error responses
- **Static File Serving**: Uploaded images accessible via URL

## Tech Stack

- **Framework**: NestJS
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **File Upload**: Multer
- **Validation**: class-validator, class-transformer

## Installation

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd e-commerce
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up the database**
   - Create a PostgreSQL database
   - Update database credentials in `main.ts` or use environment variables

4. **Start the application**
   ```bash
   # Development mode
   npm run start:dev
   
   # Production mode
   npm run start:prod
   ```

## Configuration

### Database Configuration

Update the TypeORM configuration in your `app.module.ts`:

```typescript
TypeOrmModule.forRoot({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'your_username',
  password: 'your_password',
  database: 'your_database',
  entities: [User, Category, Product, ProductImage],
  synchronize: true, // Set to false in production
})
```

### File Upload Configuration

Uploaded files are stored in:
- Categories: `./uploads/categories/`
- Products: `./uploads/productImages/`

Files are accessible at: `http://localhost:3000/uploads/{folder}/{filename}`

## API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Categories
- `GET /categories` - Get all categories
- `GET /categories/:id` - Get category by ID
- `POST /categories` - Create category with image upload
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

### Products
- `GET /products` - Get all products with categories and images
- `GET /products/:id` - Get product by ID with relationships
- `POST /products` - Create new product
- `PUT /products/:id` - Update product
- `DELETE /products/:id` - Delete product

### Product Images
- `GET /product-images` - Get all product images (with pagination)
- `GET /product-images/:id` - Get specific image by ID
- `GET /product-images/product/:productId` - Get all images for a product
- `POST /product-images` - Upload multiple images for a product
- `PUT /product-images/:id` - Update image details
- `DELETE /product-images/:id` - Delete specific image

## Entity Relationships

```
Category 1:N Product 1:N ProductImage
```

- **Category → Product**: One-to-Many (A category can have many products)
- **Product → Category**: Many-to-One (A product belongs to one category)
- **Product → ProductImage**: One-to-Many (A product can have many images)
- **ProductImage → Product**: Many-to-One (An image belongs to one product)

### Database Schema

**Categories Table**
- `id` (Primary Key)
- `name`
- `description`
- `image` (file path)

**Products Table**
- `id` (Primary Key)
- `name`
- `description`
- `price`
- `stock`
- `categoryId` (Foreign Key)

**Product Images Table**
- `id` (Primary Key)
- `productId` (Foreign Key)
- `imageUrl`
- `isPrimary` (Boolean)
- `altText`
- `createdAt`
- `updatedAt`

## File Upload

### Category Image Upload
```http
POST /categories
Content-Type: multipart/form-data

name: Electronics
description: Electronic products
image: [file]
```

### Product Images Upload
```http
POST /product-images
Content-Type: multipart/form-data

productId: 1
isPrimary: true
altText: Main product image
images: [file1]
images: [file2]
```

**File Validation:**
- Supported formats: JPEG, JPG, PNG, GIF
- Maximum file size: 5MB per image
- Multiple files supported for product images

## Testing with Postman

### 1. Create Category
```
POST http://localhost:3000/categories
Body (form-data):
- name: Electronics
- description: Electronic devices
- image: [upload file]
```

### 2. Create Product
```
POST http://localhost:3000/products
Body (JSON):
{
  "name": "iPhone 15",
  "description": "Latest iPhone model",
  "price": 999.99,
  "stock": 50,
  "categoryId": 1
}
```

### 3. Upload Product Images
```
POST http://localhost:3000/product-images
Body (form-data):
- productId: 1
- isPrimary: true
- altText: iPhone 15 main image
- images: [upload multiple files]
```

### 4. Get Product with Relations
```
GET http://localhost:3000/products/1
```

## Project Structure

```
src/
├── users/
│   ├── dto/
│   ├── entities/
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── categories/
│   ├── dto/
│   ├── entities/
│   ├── categories.controller.ts
│   ├── categories.service.ts
│   └── categories.module.ts
├── products/
│   ├── dto/
│   ├── entities/
│   ├── products.controller.ts
│   ├── products.service.ts
│   └── products.module.ts
├── product-images/
│   ├── dto/
│   ├── entities/
│   ├── product-images.controller.ts
│   ├── product-images.service.ts
│   └── product-images.module.ts
├── app.module.ts
└── main.ts
```

## Development Notes

- Entity relationships are automatically loaded when fetching products
- File uploads are validated for type and size
- Primary image logic ensures only one primary image per product
- Static file serving is configured for uploaded images
- Global validation pipe ensures data integrity

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is for educational purposes.
