# Organic Goods — Handcrafted E-Commerce Platform & REST API

> A full-stack, secure E-Commerce web application built with **Node.js**, **Express**, **MongoDB (Mongoose)**, **React 19 (Vite)**, and **express-validator**. Adheres to the **Organic Design System** with Indian Rupee (₹) pricing, dual JWT token lifecycle (access + refresh tokens), comprehensive field-level validation, and an interactive shopping bag.

---

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Key Architectural Features](#key-architectural-features)
4. [Repository Directory Structure](#repository-directory-structure)
5. [Installation & Setup](#installation--setup)
6. [Database Seeder (120 Handcrafted Items)](#database-seeder)
7. [Comprehensive REST API Reference](#comprehensive-rest-api-reference)
   - [Authentication Endpoints](#1-authentication-apis)
   - [Product CRUD Endpoints](#2-product-crud-apis)
8. [Validation Architecture (express-validator)](#validation-architecture)
9. [JWT Token Flow & Security Model](#jwt-token-flow--security-model)
10. [Frontend Design & User Experience](#frontend-design--user-experience)
11. [Code Understanding & Viva Defense Guide](#code-understanding--viva-defense-guide)

---

## Project Overview

**Organic Goods** is an e-commerce platform dedicated to sustainable, handcrafted artisan living. It features a complete JWT authentication flow with automatic token rotation, protected write operations for product inventory management, field-level 400 validation error responses, and an editorial storefront with Indian Rupee (₹) currency formatting.

---

## Technology Stack

- **Backend**: Node.js, Express.js (ES Modules)
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JSON Web Tokens (`jsonwebtoken`), `bcryptjs` (10 salt rounds), `cookie-parser`
- **Validation**: `express-validator` (strict schema validation on body, params, and queries)
- **Security**: Rate limiting (`express-rate-limit`), CORS with credential forwarding, `httpOnly` secure cookies
- **Frontend**: React 19, Vite, Axios (with request & response interceptors), Lucide Icons
- **Design System**: "Organic" — light-first paper surface (`#F5F5F5`), signature deep-teal 80px curved hero (`#024F46`), borderless white panels (`#FFFFFF`), brand amber highlights (`#ECBA82`), and editorial serif typography.

---

## Key Architectural Features

1. **Dual JWT Access & Refresh Token Lifecycle**:
   - Short-lived Access Token (15 minutes), kept in memory to minimize XSS exposure.
   - Long-lived Refresh Token (7 days), stored in an `httpOnly`, `SameSite: Lax` secure cookie and persisted in MongoDB for server-side revocation on logout.
2. **Field-Level 400 Validation**:
   - `express-validator` rules validate request bodies and parameters *before* hitting controllers.
   - Rejects invalid names (e.g. numeric characters in user names), short descriptions, negative prices, and malformed ObjectIds.
   - Returns a structured array of errors mapped directly to form input elements in the frontend UI.
3. **Protected Write Routes & Resource Existence Checks**:
   - `POST /api/products`, `PUT /api/products/:id`, and `DELETE /api/products/:id` require valid Bearer token authentication.
   - `PUT` and `DELETE` routes confirm that the product `:id` actually exists in the database before mutating or deleting, returning clean 404 responses when missing.
4. **Slide-Out Shopping Bag (Cart Drawer)**:
   - Live item counter badge in the navbar.
   - Dynamic Free Shipping progress meter (e.g., Free Express Shipping above ₹1,999).
   - Quantity modification, item removal, and persistent state via `localStorage`.
5. **Pre-Seeded Catalog of 120 Products**:
   - 20 high-quality products in each of the 6 artisan categories: Ceramics, Textiles, Apothecary, Kitchenware, Lighting, and Stationery.

---

## Repository Directory Structure

```text
├── client/                     # React 19 + Vite Frontend
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   │   ├── ArtisanSpotlight.jsx   # Maker story & ethics
│   │   │   ├── AuthModal.jsx          # Login & Register modal with field errors
│   │   │   ├── CartDrawer.jsx         # Slide-out shopping bag drawer
│   │   │   ├── CategoryPills.jsx      # Filter buttons (All, Ceramics, etc.)
│   │   │   ├── CollectorReviews.jsx   # 5-star customer reviews
│   │   │   ├── CuratedSpaces.jsx      # Living spaces / Shop by room
│   │   │   ├── DeleteConfirmModal.jsx # Safe deletion dialog
│   │   │   ├── FeatureIsland.jsx      # Dark-band artisan manifesto
│   │   │   ├── Footer.jsx             # Luxury e-commerce footer & newsletter
│   │   │   ├── Hero.jsx               # Deep-teal hero with 80px rounded bottom
│   │   │   ├── Navbar.jsx             # Header with Bag badge & Auth pill
│   │   │   ├── ProductCard.jsx        # Borderless panel with ₹ price & Add to Bag
│   │   │   ├── ProductDetailModal.jsx # High-res photo & full specifications
│   │   │   └── ProductFormModal.jsx   # Add/Edit product with live validation
│   │   ├── context/
│   │   │   ├── AuthContext.jsx        # Authentication state & silent refresh
│   │   │   ├── CartContext.jsx        # Bag state, subtotal, and quantities
│   │   │   └── ToastContext.jsx       # Alert notification provider
│   │   ├── services/
│   │   │   └── api.js                 # Axios client with auto-refresh interceptor
│   │   ├── App.jsx                    # Root view orchestrator
│   │   ├── index.css                  # Organic design system tokens & base CSS
│   │   └── main.jsx                   # React root entry
│   ├── index.html                     # HTML shell with Google Fonts
│   ├── package.json
│   └── vite.config.js                 # Proxy configuration for /api -> port 5000
│
├── server/                     # Node.js & Express REST Backend
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js                  # MongoDB Mongoose connection
│   │   ├── controllers/
│   │   │   ├── authController.js      # Register, login, refresh, logout, me
│   │   │   └── productController.js   # Product CRUD logic with existence checks
│   │   ├── middleware/
│   │   │   ├── auth.js                # JWT Bearer token authentication
│   │   │   └── validate.js            # express-validator result formatter (400)
│   │   ├── models/
│   │   │   ├── Product.js             # Product Mongoose schema
│   │   │   └── User.js                # User Mongoose schema with bcrypt hook
│   │   ├── routes/
│   │   │   ├── authRoutes.js          # /api/auth routes
│   │   │   └── productRoutes.js       # /api/products routes
│   │   ├── scripts/
│   │   │   └── seed.js                # Database seeder (120 artisan items)
│   │   ├── utils/
│   │   │   └── tokenUtils.js          # JWT sign & verify with jti UUID claims
│   │   ├── app.js                     # Express app setup, CORS, and middlewares
│   │   └── server.js                  # Server entry point
│   ├── .env                           # Backend environment variables
│   ├── .env.example                   # Environment template
│   ├── package.json
│   └── test-api.js                    # Automated test suite (39 assertion checks)
│
├── package.json                       # Monorepo runner scripts
└── README.md                          # Documentation
```

---

## Installation & Setup

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **MongoDB**: Local MongoDB instance running on `mongodb://127.0.0.1:27017` or MongoDB Atlas URI.

### 2. Clone & Install Dependencies
From the repository root:
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install

# Return to root
cd ..
```

### 3. Configure Environment Variables
Inside `server/.env`:
```ini
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/ecommerce_organic_db
ACCESS_TOKEN_SECRET=dommie_access_token_secret_key_cohort3_2026_super_secure_key
REFRESH_TOKEN_SECRET=dommie_refresh_token_secret_key_cohort3_2026_super_secure_refresh
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## Database Seeder

To populate the database with the demo curator account and **120 handcrafted products** (20 in each category: Ceramics, Textiles, Apothecary, Kitchenware, Lighting, Stationery):

```bash
# From repository root:
npm run seed

# Or directly from server folder:
cd server && npm run seed
```

### Demo Curator Credentials:
- **Email**: `elena@organicstore.com`
- **Password**: `Password123`
*(A "Fill Demo Curator Credentials" 1-click button is also built into the frontend Sign In modal for convenience).*

---

## Running the Application

### Option A: Run Both Concurrently (Recommended)
From the repository root:
```bash
npm run server    # Terminal 1: Launches Express API on http://localhost:5000
npm run client    # Terminal 2: Launches Vite Frontend on http://localhost:5173
```

Open your browser at **`http://localhost:5173`**.

### Option B: Run Automated API Test Suite
Verify all 39 requirement checks:
```bash
cd server
node test-api.js
```

---

## Comprehensive REST API Reference

Base URL: `http://localhost:5000/api`

### 1. Authentication APIs

#### 1.1 Register User
- **Method**: `POST`
- **Endpoint**: `/api/auth/register`
- **Access**: Public
- **Description**: Creates a new user account. Hashes password with `bcryptjs` (10 salt rounds). Rejects duplicate emails with `409 Conflict`. **Never returns password or tokens on register.**
- **Request Body**:
  ```json
  {
    "name": "Julian Vance",
    "email": "julian@example.com",
    "password": "Password123",
    "confirmPassword": "Password123"
  }
  ```
- **Validation Rules**:
  - `name`: Required, 2-60 chars, letters/spaces only (numbers & symbols rejected).
  - `email`: Required, valid email format, normalized.
  - `password`: Required, min 6 characters, must contain at least one digit.
  - `confirmPassword`: Must match `password`.
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Account created successfully. You can now log in.",
    "user": {
      "id": "6aba7176d979cc311840b44d",
      "name": "Julian Vance",
      "email": "julian@example.com",
      "role": "user",
      "createdAt": "2026-09-28T13:53:58.628Z"
    }
  }
  ```

#### 1.2 Login User
- **Method**: `POST`
- **Endpoint**: `/api/auth/login`
- **Access**: Public
- **Description**: Verifies credentials with `bcrypt.compare`. On mismatch, returns generic 401 error. On success, returns short-lived Access Token in JSON body and sets long-lived Refresh Token in `httpOnly` cookie.
- **Request Body**:
  ```json
  {
    "email": "elena@organicstore.com",
    "password": "Password123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Logged in successfully.",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "6aba7176d979cc311840b44d",
      "name": "Elena Rostova",
      "email": "elena@organicstore.com",
      "role": "admin"
    }
  }
  ```
  *Sets Cookie*: `refreshToken=<jwt>; HttpOnly; Path=/; Max-Age=604800; SameSite=Lax`

#### 1.3 Refresh Access Token
- **Method**: `POST`
- **Endpoint**: `/api/auth/refresh-token`
- **Access**: Public* (Requires valid refresh token)
- **Description**: Reads refresh token from `httpOnly` cookie (or body fallback). Validates cryptographic signature and checks against stored token in MongoDB. Rotates the refresh token and issues a new access token.
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Access token renewed successfully.",
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### 1.4 Logout User
- **Method**: `POST`
- **Endpoint**: `/api/auth/logout`
- **Access**: Authenticated (`Authorization: Bearer <accessToken>`)
- **Description**: Invalidates the stored refresh token in MongoDB (`user.refreshToken = null`) and clears the `refreshToken` cookie.
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Logged out successfully. Session invalidated."
  }
  ```

#### 1.5 Get User Profile (Me)
- **Method**: `GET`
- **Endpoint**: `/api/auth/me`
- **Access**: Authenticated (`Authorization: Bearer <accessToken>`)
- **Description**: Returns the authenticated user's profile excluding password and refresh token.
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "user": {
      "id": "6aba7176d979cc311840b44d",
      "name": "Elena Rostova",
      "email": "elena@organicstore.com",
      "role": "admin",
      "createdAt": "2026-09-28T13:53:58.628Z"
    }
  }
  ```

---

### 2. Product CRUD APIs

#### 2.1 List All Products
- **Method**: `GET`
- **Endpoint**: `/api/products`
- **Access**: Public
- **Query Parameters**:
  - `page`: Page number (default: 1)
  - `limit`: Items per page (default: 12)
  - `category`: Filter by category (e.g. `Ceramics`, `Textiles`)
  - `search`: Keyword search in name or description
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "count": 12,
    "total": 120,
    "page": 1,
    "totalPages": 10,
    "products": [ ... ]
  }
  ```

#### 2.2 Get Single Product by ID
- **Method**: `GET`
- **Endpoint**: `/api/products/:id`
- **Access**: Public
- **Validation**: `:id` must be a valid 24-character hexadecimal MongoDB ObjectId.
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "product": {
      "_id": "6aba7176d979cc311840b450",
      "name": "Handmade Terracotta Chai Kulhar Set",
      "description": "Set of 6 unglazed natural red clay cups...",
      "price": 649,
      "category": "Ceramics",
      "stock": 45,
      "imageUrl": "https://images.unsplash.com/...",
      "createdBy": {
        "_id": "6aba7176d979cc311840b44d",
        "name": "Elena Rostova"
      }
    }
  }
  ```

#### 2.3 Create Product
- **Method**: `POST`
- **Endpoint**: `/api/products`
- **Access**: Authenticated (`Authorization: Bearer <accessToken>`)
- **Request Body**:
  ```json
  {
    "name": "Handcrafted Brass Spice Box",
    "description": "Solid spun brass with seven inner spice cups and etched lid.",
    "price": 2950,
    "category": "Kitchenware",
    "stock": 18,
    "imageUrl": "https://images.unsplash.com/..."
  }
  ```
- **Validation Rules**:
  - `name`: Required, 2-120 chars, must contain letters.
  - `description`: Required, 10-2000 chars, must contain words.
  - `price`: Required, minimum ₹1.
  - `category`: Required.
  - `stock`: Required, integer >= 0.
  - `imageUrl`: Optional, must be valid URL if provided.
- **Response (201 Created)**:
  ```json
  {
    "success": true,
    "message": "Product created successfully.",
    "product": { ... }
  }
  ```

#### 2.4 Update Product
- **Method**: `PUT`
- **Endpoint**: `/api/products/:id`
- **Access**: Authenticated (`Authorization: Bearer <accessToken>`)
- **Logic**: Confirms `:id` exists in the database first. If not found, returns `404 Not Found`.
- **Request Body**: (Optional partial updates)
  ```json
  {
    "price": 3100,
    "stock": 15
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Product updated successfully.",
    "product": { ... }
  }
  ```

#### 2.5 Delete Product
- **Method**: `DELETE`
- **Endpoint**: `/api/products/:id`
- **Access**: Authenticated (`Authorization: Bearer <accessToken>`)
- **Logic**: Confirms `:id` exists first before deleting. Returns `404 Not Found` if nonexistent.
- **Response (200 OK)**:
  ```json
  {
    "success": true,
    "message": "Product deleted successfully.",
    "deletedId": "6aba7176d979cc311840b450"
  }
  ```

---

## Validation Architecture

The application uses a two-tier validation pipeline:
1. **Route Validator Array**: Uses `body()`, `param()`, and `query()` functions from `express-validator` to define strict constraints.
2. **Result Handler Middleware (`validate.js`)**: Evaluates `validationResult(req)`. If errors exist, execution is halted immediately with a `400 Bad Request` before invoking any controller logic:

```json
{
  "success": false,
  "message": "Validation failed. Please correct the highlighted errors.",
  "errors": [
    {
      "field": "name",
      "message": "Name must contain only alphabetic letters, spaces, and hyphens (numbers and special symbols are not allowed)",
      "value": "12345",
      "location": "body"
    }
  ]
}
```

The frontend catches this structure and displays error messages directly underneath each form input.

---

## JWT Token Flow & Security Model

```text
[ Client (Browser) ]                        [ Express API ]                [ MongoDB ]
        |                                           |                           |
        |--- 1. POST /api/auth/login -------------->|                           |
        |    (email, password)                      |--- Verify bcrypt hash --->|
        |                                           |<-- Valid user ------------|
        |                                           |                           |
        |                                           |--- Generate Access (15m)  |
        |                                           |--- Generate Refresh (7d)  |
        |                                           |--- Store refresh token -->|
        |<-- 2. Response: AccessToken in Body ------|                           |
        |<--    Set-Cookie: RefreshToken (httpOnly)-|                           |
        |                                           |                           |
        |--- 3. GET /api/products (Protected) ----->|                           |
        |    Header: "Authorization: Bearer <tok>"  |--- Verify AccessToken ----|
        |<-- 4. 401 TOKEN_EXPIRED ------------------|                           |
        |                                           |                           |
        |--- 5. POST /api/auth/refresh-token ------>|                           |
        |    (Cookie: refreshToken sent by browser) |--- Check token in DB ---->|
        |                                           |<-- Matched active token --|
        |                                           |--- Rotate tokens & save ->|
        |<-- 6. Response: New AccessToken ----------|                           |
        |                                           |                           |
        |--- 7. Retry Original Failed Request ----->| (Transparent to User)     |
```

### Why this is Secure:
- **XSS Mitigation**: The long-lived refresh token cannot be accessed by client-side JavaScript because it is tagged `HttpOnly`. Even if an attacker injects malicious script, they cannot steal the persistent session token.
- **CSRF Mitigation**: `SameSite: Lax` on modern browsers ensures cookies are not sent on cross-site state-changing POST requests.
- **Immediate Revocation**: Storing the refresh token in the database enables instant session revocation upon logout or password reset.
- **Replay Protection**: Every issued JWT includes a cryptographically unique `jti` (UUID) claim.

---

## Code Understanding & Viva Defense Guide

During evaluation or viva examinations, you can confidently explain every layer of this codebase:

### 1. Why are tokens NOT returned upon Registration?
As defined in assignment specification section 2.1:
*"Return the created user (without password) — do not return tokens on register."*
This enforces intentional authentication: users verify their credentials through the login gateway before an active session is granted.

### 2. Why use a pre-save hook in Mongoose for bcrypt?
In `server/src/models/User.js`, `userSchema.pre('save')` automatically inspects `this.isModified('password')`. This guarantees that passwords are never saved in plain text, even if updated in different controllers.

### 3. How does the Axios Interceptor refresh tokens seamlessly?
In `client/src/services/api.js`:
When any API call receives a `401 Unauthorized` with `TOKEN_EXPIRED`, the response interceptor pauses pending requests in a subscriber queue, fires a silent `POST /auth/refresh-token`, updates the in-memory token, and replays all failed requests with the new token. The end user never gets unexpectedly booted to the login page while actively using the site.

### 4. How does express-validator protect against invalid :id queries?
Before Mongoose attempts `Product.findById(id)`, `param('id').isMongoId()` verifies that the string matches a valid 24-character hexadecimal ObjectId format. If someone sends `/api/products/abc123`, it fails at the HTTP middleware layer with a clean 400 error rather than throwing an unhandled `CastError` crash inside the database driver.

---

## Submission Checklist
- [x] Complete JWT Auth Flow (`register`, `login`, `refresh-token`, `logout`, `me`)
- [x] Complete Product CRUD APIs with Protected Write Routes
- [x] Resource Existence checks returning 404 before update/delete
- [x] express-validator on all body, param, and query inputs
- [x] Field-level 400 error responses rendered in frontend
- [x] No tokens returned on registration
- [x] Passwords hashed with bcrypt (10 rounds)
- [x] Organic Design System with Indian Rupee (₹) pricing
- [x] Interactive Cart Drawer with live item counter and shipping progress meter
- [x] Database seeder with 120 artisan items (20 per category)
- [x] Single repository containing both backend and frontend
- [x] Automated test suite passing 39/39 assertions
