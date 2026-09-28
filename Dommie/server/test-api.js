// Automated API test script verifying all requirements from the assignment guide
const BASE_URL = 'http://localhost:5000/api';

const runTests = async () => {
  console.log('🧪 ========================================================');
  console.log('🧪 Starting E-Commerce API Comprehensive Requirement Tests');
  console.log('🧪 ========================================================\n');

  let passed = 0;
  let failed = 0;

  const assert = (condition, title, details = '') => {
    if (condition) {
      console.log(`  ✅ PASS: ${title}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${title} ${details ? '--> ' + details : ''}`);
      failed++;
    }
  };

  try {
    // -------------------------------------------------------------
    // TASK 1 & 3: Register API & Validation
    // -------------------------------------------------------------
    console.log('--- 1. Testing POST /api/auth/register Validation ---');

    // 1.1 Field-level 400 errors for empty request
    const emptyRegRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    });
    const emptyRegData = await emptyRegRes.json();
    assert(emptyRegRes.status === 400, 'Empty register body returns 400 Bad Request');
    assert(Array.isArray(emptyRegData.errors) && emptyRegData.errors.length >= 3, 'Returns field-level 400 errors array');

    // 1.2 Password mismatch validation
    const mismatchRegRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'Password123',
        confirmPassword: 'MismatchPassword999',
      }),
    });
    const mismatchRegData = await mismatchRegRes.json();
    assert(mismatchRegRes.status === 400, 'Password mismatch returns 400 Bad Request');
    assert(mismatchRegData.errors.some(e => e.field === 'confirmPassword'), 'ConfirmPassword field error returned');

    // 1.3 Successful registration (unique email)
    const testEmail = `user_${Date.now()}@example.com`;
    const validRegRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Julian Vance',
        email: testEmail,
        password: 'SecretPassword123',
        confirmPassword: 'SecretPassword123',
      }),
    });
    const validRegData = await validRegRes.json();
    assert(validRegRes.status === 201, 'Valid registration returns 201 Created');
    assert(validRegData.user && validRegData.user.email === testEmail, 'Returns created user profile');
    assert(!validRegData.user.password, 'User password is NOT returned in response');
    assert(!validRegData.accessToken && !validRegData.token, 'Tokens are NOT returned on register as per spec');

    // 1.4 Duplicate email registration returns 409 Conflict
    const dupRegRes = await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Julian Duplicate',
        email: testEmail,
        password: 'SecretPassword123',
        confirmPassword: 'SecretPassword123',
      }),
    });
    assert(dupRegRes.status === 409, 'Duplicate email returns 409 Conflict error');

    // -------------------------------------------------------------
    // TASK 1: Login API
    // -------------------------------------------------------------
    console.log('\n--- 2. Testing POST /api/auth/login ---');

    // 2.1 Password mismatch returns 401 with generic message
    const badLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: 'WrongPassword999' }),
    });
    const badLoginData = await badLoginRes.json();
    assert(badLoginRes.status === 401, 'Password mismatch returns 401 Unauthorized');
    assert(badLoginData.message === 'Invalid email or password.', 'Generic error message protects field exposure');

    // 2.2 Valid login returns Access Token, Refresh Token, and sets Cookie
    const validLoginRes = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: testEmail, password: 'SecretPassword123' }),
    });
    const validLoginData = await validLoginRes.json();
    const setCookieHeader = validLoginRes.headers.get('set-cookie');

    assert(validLoginRes.status === 200, 'Valid login returns 200 OK');
    assert(typeof validLoginData.accessToken === 'string' && validLoginData.accessToken.length > 20, 'Issues short-lived JWT Access Token in JSON body');
    assert(setCookieHeader && setCookieHeader.includes('refreshToken='), 'Issues Refresh Token as httpOnly cookie in response headers');
    assert(validLoginData.user && validLoginData.user.email === testEmail, 'Returns authenticated user info');

    const accessToken = validLoginData.accessToken;
    const refreshToken = validLoginData.refreshToken;

    // -------------------------------------------------------------
    // TASK 1: Authenticated GET /api/auth/me
    // -------------------------------------------------------------
    console.log('\n--- 3. Testing GET /api/auth/me (Protected Route) ---');

    // 3.1 Unauthenticated attempt
    const noTokenMe = await fetch(`${BASE_URL}/auth/me`);
    assert(noTokenMe.status === 401, 'Request without Bearer token returns 401 Unauthorized');

    // 3.2 Authenticated attempt with Bearer token
    const authMe = await fetch(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const authMeData = await authMe.json();
    assert(authMe.status === 200, 'Authenticated request with Bearer token returns 200 OK');
    assert(authMeData.user && authMeData.user.name === 'Julian Vance', 'Returns authenticated user profile correctly');

    // -------------------------------------------------------------
    // TASK 1: Refresh Token Flow POST /api/auth/refresh-token
    // -------------------------------------------------------------
    console.log('\n--- 4. Testing POST /api/auth/refresh-token ---');

    const refreshRes = await fetch(`${BASE_URL}/auth/refresh-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Cookie: `refreshToken=${refreshToken}`,
      },
      body: JSON.stringify({ refreshToken }),
    });
    const refreshData = await refreshRes.json();
    assert(refreshRes.status === 200, 'Valid refresh token returns 200 OK');
    assert(typeof refreshData.accessToken === 'string' && refreshData.accessToken !== accessToken, 'Rotates/issues new Access Token');

    // -------------------------------------------------------------
    // TASK 2 & 3: Product CRUD APIs & Validation
    // -------------------------------------------------------------
    console.log('\n--- 5. Testing Product CRUD APIs ---');

    // 5.1 Public GET /api/products
    const getProductsRes = await fetch(`${BASE_URL}/products`);
    const getProductsData = await getProductsRes.json();
    assert(getProductsRes.status === 200, 'GET /api/products returns 200 OK (Public)');
    assert(Array.isArray(getProductsData.products), 'Returns products list array');

    // 5.2 POST /api/products without token fails with 401
    const unauthCreate = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test' }),
    });
    assert(unauthCreate.status === 401, 'Protected write route POST /api/products rejects unauthenticated requests with 401');

    // 5.3 POST /api/products with invalid data returns field-level 400
    const invalidCreate = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: 'A', // too short (< 2)
        price: -50, // negative price
        stock: -5, // negative stock
      }),
    });
    const invalidCreateData = await invalidCreate.json();
    assert(invalidCreate.status === 400, 'Invalid product data returns 400 Bad Request');
    assert(invalidCreateData.errors.some(e => e.field === 'price'), 'Field-level error for price returned');
    assert(invalidCreateData.errors.some(e => e.field === 'stock'), 'Field-level error for stock returned');

    // 5.4 POST /api/products with valid data creates product (201)
    const validCreate = await fetch(`${BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: 'Handcrafted Oak Stool',
        description: 'Solid European oak stool finished with organic hardwax oil and mortise tenon joints.',
        price: 185.0,
        category: 'Furniture',
        stock: 14,
        imageUrl: 'https://images.unsplash.com/photo-1503602642458-232111445657?auto=format&fit=crop&w=800&q=80',
      }),
    });
    const validCreateData = await validCreate.json();
    assert(validCreate.status === 201, 'POST /api/products creates product and returns 201 Created');
    assert(validCreateData.product && validCreateData.product.name === 'Handcrafted Oak Stool', 'Created product has correct properties');
    const createdProductId = validCreateData.product._id;

    // 5.5 Validate :id param format on GET /api/products/:id
    const badIdRes = await fetch(`${BASE_URL}/products/not-a-valid-mongo-id`);
    assert(badIdRes.status === 400, 'Invalid :id parameter format returns 400 Bad Request via express-validator');

    // 5.6 Non-existent valid ObjectId on GET /api/products/:id returns 404
    const notFoundIdRes = await fetch(`${BASE_URL}/products/507f1f77bcf86cd799439011`);
    assert(notFoundIdRes.status === 404, 'Non-existent product ID returns 404 Not Found');

    // 5.7 Get single product by ID
    const getSingleRes = await fetch(`${BASE_URL}/products/${createdProductId}`);
    const getSingleData = await getSingleRes.json();
    assert(getSingleRes.status === 200, 'GET /api/products/:id returns 200 OK');
    assert(getSingleData.product._id === createdProductId, 'Fetched product matches requested ID');

    // 5.8 PUT /api/products/:id (Update product)
    const updateRes = await fetch(`${BASE_URL}/products/${createdProductId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        price: 210.0,
        stock: 10,
      }),
    });
    const updateData = await updateRes.json();
    assert(updateRes.status === 200, 'PUT /api/products/:id returns 200 OK');
    assert(updateData.product.price === 210 && updateData.product.stock === 10, 'Product updated with new price and stock');

    // 5.9 DELETE /api/products/:id (Delete product)
    const deleteRes = await fetch(`${BASE_URL}/products/${createdProductId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    assert(deleteRes.status === 200, 'DELETE /api/products/:id returns 200 OK');

    // Confirm product is actually gone
    const verifyDeleted = await fetch(`${BASE_URL}/products/${createdProductId}`);
    assert(verifyDeleted.status === 404, 'Deleted product no longer found (returns 404)');

    // -------------------------------------------------------------
    // TASK 1: Logout API
    // -------------------------------------------------------------
    console.log('\n--- 6. Testing POST /api/auth/logout ---');

    const logoutRes = await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const logoutData = await logoutRes.json();
    const logoutCookie = logoutRes.headers.get('set-cookie');
    assert(logoutRes.status === 200, 'POST /api/auth/logout returns 200 OK');
    assert(logoutData.success === true, 'Logout responds with success flag');
    assert(logoutCookie && logoutCookie.includes('refreshToken=;'), 'Logout clears httpOnly refresh cookie');

    // -------------------------------------------------------------
    // SUMMARY
    // -------------------------------------------------------------
    console.log('\n========================================================');
    console.log(`Test Execution Finished: ${passed} Passed, ${failed} Failed`);
    console.log('========================================================\n');

    if (failed > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  } catch (err) {
    console.error('Fatal error during test run:', err);
    process.exit(1);
  }
};

runTests();
