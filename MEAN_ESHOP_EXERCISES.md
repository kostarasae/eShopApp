# ShopSphere — MEAN Stack E-shop Exercise Guide

**Stack:** MongoDB · Express.js · Angular · Node.js  
**Project:** Production-ready e-shop με auth, roles, cart, orders, admin panel, security, tests

---

## Πρόοδος

**26 / 62 ασκήσεις ολοκληρωμένες — 42%**

`✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅✅⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜⬜`

---

## Checklist Προόδου

**Phase 0 — Setup**
- ✅ 0.1 Εγκατάσταση εργαλείων
- ✅ 0.2 Δομή φακέλων
- ✅ 0.3 Αρχικοποίηση backend

**Phase 1 — Node.js + Express Backend**
- ✅ 1.1 Express server
- ✅ 1.2 Middleware
- ✅ 1.3 Σύνδεση MongoDB
- ✅ 1.4 Product model
- ✅ 1.5 Products API (CRUD)
- ✅ 1.6 Δοκιμή με Postman
- ⬜ 1.7 Pagination & Filtering ⭐ optional
- ⬜ 1.8 Global Error Handling Middleware ⭐ optional
- ⬜ 1.9 Validation με Joi ⭐ optional

**Phase 2 — Authentication**
- ✅ 2.1 User model
- ✅ 2.2 Register endpoint
- ✅ 2.3 Login + JWT
- ✅ 2.4 Auth middleware
- ⬜ 2.5 Role-based middleware (admin only) ⭐ optional

**Phase 3 — Cart & Orders**
- ✅ 3.1 Cart API
- ✅ 3.2 Stock check στο add-to-cart ⭐ optional
- ✅ 3.3 Order API (checkout + stock decrement)
- ✅ 3.4 Order history (user)
- ⬜ 3.5 Admin orders endpoint ⭐ optional

**Phase 4 — Security & Production-readiness ⭐ optional**
- ⬜ 4.1 Helmet + CORS config *(απαραίτητο για production)*
- ⬜ 4.2 Rate limiting *(απαραίτητο για production)*
- ⬜ 4.3 Input sanitization (NoSQL injection) *(απαραίτητο για production)*
- ⬜ 4.4 Logging με Winston *(απαραίτητο για production)*
- ⬜ 4.5 Config layer *(ήδη υλοποιήθηκε στο TS.3)*
- ⬜ 4.6 Repository pattern *(ήδη υλοποιήθηκε στο TS.5)*
- ⬜ 4.7 DTO layer *(ήδη υλοποιήθηκε στο TS.2)*
- ⬜ 4.8 Service layer + DI pattern *(ήδη υλοποιήθηκε στο TS.6)*
- ⬜ 4.9 Cart service ⭐ optional

**Phase TS — TypeScript Migration**
- ✅ TS.1 Setup (tsconfig + packages + scripts)
- ✅ TS.2 Types Layer (interfaces + DTOs)
- ✅ TS.3 Config Layer
- ✅ TS.4 Models
- ✅ TS.5 Repositories
- ✅ TS.6 Services
- ✅ TS.7 Controllers (νέο layer)
- ✅ TS.8 Middleware
- ✅ TS.9 Routes + App + Server
- ⬜ TS.10 Build & Test
- ⬜ TS.11 Shared types (backend + Angular)
- ⬜ TS.12 Validation με Zod
- ⬜ TS.13 API Documentation με Swagger
- ⬜ TS.14 Mapper Layer

**Phase 5 — Angular Frontend**
- ⬜ 5.0 Bootstrap setup
- ⬜ 5.1 Angular setup + standalone architecture
- ⬜ 5.2 ProductService
- ⬜ 5.3 Λίστα & detail προϊόντων
- ⬜ 5.4 Login & Register (Reactive Forms)
- ⬜ 5.5 Guards + Token Expiry
- ⬜ 5.6 HTTP Interceptor (JWT)
- ⬜ 5.7 Cart
- ⬜ 5.8 Checkout
- ⬜ 5.9 Lazy loading modules ⭐ optional

**Phase 6 — Admin Panel ⭐ optional**
- ⬜ 6.1 Admin dashboard ⭐ optional
- ⬜ 6.2 Product management (CRUD) ⭐ optional
- ⬜ 6.3 Order management ⭐ optional

**Phase 7 — Extra Features ⭐ optional**
- ⬜ 7.1 Search & text indexing (MongoDB)
- ⬜ 7.2 Product reviews & ratings
- ⬜ 7.3 Image upload (Cloudinary)
- ⬜ 7.4 Mock payment / Stripe-ready checkout

**Phase 8 — Tests & Deployment ⭐ optional**
- ⬜ 8.1 Unit tests με Jest (backend)
- ⬜ 8.2 E2E tests με Cypress (frontend)
- ⬜ 8.3 Docker setup
- ⬜ 8.4 Deploy (Render + MongoDB Atlas + Vercel)

---

> 📖 Θεωρία για τις ολοκληρωμένες ασκήσεις: [MEAN_ESHOP_THEORY.md](MEAN_ESHOP_THEORY.md)

---

# PHASE 1 — Node.js + Express Backend

*(Ασκήσεις 1.1–1.6 ολοκληρωμένες)*

---

### Άσκηση 1.7 — Pagination & Filtering

**Στόχος:** Να επιστρέφεις προϊόντα σελιδοποιημένα και φιλτραρισμένα — απαραίτητο σε κάθε real API.

**Βήματα υλοποίησης**

**Βήμα 1:** Ενημέρωσε το `GET /api/products` στο `routes/products.js`:
  1. Διάβασε από το `req.query` τις παραμέτρους: `page` (default 1), `limit` (default 10), `category`, `minPrice`, `maxPrice`, `sort` (default `'createdAt'`)
  2. Φτιάξε ένα `filter` object δυναμικά: αν υπάρχει `category`, πρόσθεσε το
  3. Αν υπάρχει `minPrice` ή `maxPrice`, πρόσθεσε `$gte`/`$lte` στο `filter.price`
  4. Κάνε `countDocuments(filter)` για το σύνολο και `find(filter).sort().skip().limit()` για τα αποτελέσματα
  5. Επίστρεψε `{ products, total, page, pages }`

**Βήμα 2:** Δοκίμασε στο Postman τα εξής URLs:
  1. `GET /api/products?page=1&limit=5`
  2. `GET /api/products?category=Electronics&minPrice=100&maxPrice=1000`
  3. `GET /api/products?sort=price` (αύξουσα) και `?sort=-price` (φθίνουσα)

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `routes/products.js` — ενημέρωση GET route:

```javascript
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      sort = 'createdAt'
    } = req.query;

    // Φτιάξε το filter object δυναμικά
    const filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      products,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});
```

**Βήμα 2:** Postman URLs για δοκιμή:
```
GET /api/products?page=1&limit=5
GET /api/products?category=Electronics&minPrice=100&maxPrice=1000
GET /api/products?sort=price  (αύξουσα)
GET /api/products?sort=-price (φθίνουσα)
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Response περιέχει `{ products, total, page, pages }`
- [ ] Φίλτρο κατηγορίας δουλεύει
- [ ] Φίλτρο τιμής δουλεύει
- [ ] Sorting δουλεύει

---

### Άσκηση 1.8 — Global Error Handling Middleware

**Στόχος:** Αντί να γράφεις try/catch παντού, κεντρικός χειρισμός errors.

**Βήματα υλοποίησης**

**Βήμα 1:** Δημιούργησε `backend/middleware/errorHandler.js` με μια function που έχει 4 παραμέτρους `(err, req, res, next)`. Χειρίσου τις εξής περιπτώσεις:
- Mongoose `ValidationError` → 400 με λίστα από μηνύματα
- Mongoose duplicate key (error code `11000`) → 409 με το όνομα του field
- Mongoose `CastError` (bad ObjectId) → 404
- JWT `JsonWebTokenError` → 401
- Γενικό error → χρησιμοποίησε `err.status || 500`

**Βήμα 2:** Στο `server.js`, κάνε require το `errorHandler` και πρόσθεσε το ως `app.use(errorHandler)` **μετά** από όλα τα routes.

**Βήμα 3:** Στα routes, αντικατάστησε τα `res.status(500)...` με `next(err)`:
  1. Το error πηγαίνει στον κεντρικό handler
  2. Π.χ. `router.get('/', async (req, res, next) => { try { ... } catch (err) { next(err); } })`

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `backend/middleware/errorHandler.js`:

```javascript
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: 'Validation error', errors: messages });
  }

  // Mongoose duplicate key (π.χ. unique email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    return res.status(409).json({ message: `${field} already exists` });
  }

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    return res.status(404).json({ message: 'Resource not found' });
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ message: 'Invalid token' });
  }

  res.status(err.status || 500).json({
    message: err.message || 'Internal server error'
  });
};

module.exports = errorHandler;
```

**Βήμα 2:** `server.js` — μετά από όλα τα routes:

```javascript
const errorHandler = require('./middleware/errorHandler');
app.use(errorHandler);
```

**Βήμα 3:** Παράδειγμα απλοποιημένου route:

```javascript
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    next(err); // πηγαίνει στο errorHandler
  }
});
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Invalid ObjectId → 404 (όχι 500)
- [ ] Duplicate email → 409 με descriptive message
- [ ] Validation error → 400 με λίστα errors

---

### Άσκηση 1.9 — Validation με Joi *(JS έκδοση — βλ. TS.12 για TypeScript)*

**Στόχος:** Να ελέγχεις τα δεδομένα που έρχονται από τον client πριν φτάσουν στη βάση.

**Βήματα υλοποίησης**

**Βήμα 1:** Εγκατάστησε: `npm install joi`

**Βήμα 2:** Δημιούργησε `backend/validators/productValidator.js` με δύο Joi schemas:
- `createProductSchema`:
  1. `name` (string, min 2, max 100, required)
  2. `description` (string, max 1000, optional)
  3. `price` (number, min 0, required)
  4. `category` (string, required)
  5. `stock` (number, min 0, default 0)
  6. `imageUrl` (string, uri, optional)
- `updateProductSchema`:
  1. Ίδια fields αλλά όλα optional
  2. Με `.min(1)` στο object (τουλάχιστον ένα πεδίο)

**Βήμα 3:** Δημιούργησε `backend/middleware/validate.js` — μια higher-order function `validate(schema)` που επιστρέφει middleware:
  1. Το middleware καλεί `schema.validate(req.body, { abortEarly: false })`
  2. Αν υπάρχει error, επιστρέφει 400 με λίστα messages
  3. Αλλιώς, αντικαθιστά το `req.body` με το sanitized `value` και καλεί `next()`

**Βήμα 4:** Στο `routes/products.js`:
  1. Κάνε require τα schemas και το validate middleware
  2. Πρόσθεσε `validate(createProductSchema)` ως middleware στο POST route
  3. Πρόσθεσε `validate(updateProductSchema)` στο PUT route, πριν το async handler

<details>
<summary>💡 Λύση</summary>

**Βήμα 2:** `backend/validators/productValidator.js`:

```javascript
const Joi = require('joi');

const createProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required(),
  description: Joi.string().max(1000),
  price: Joi.number().min(0).required(),
  category: Joi.string().required(),
  stock: Joi.number().min(0).default(0),
  imageUrl: Joi.string().uri()
});

const updateProductSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100),
  description: Joi.string().max(1000),
  price: Joi.number().min(0),
  category: Joi.string(),
  stock: Joi.number().min(0),
  imageUrl: Joi.string().uri()
}).min(1); // τουλάχιστον ένα πεδίο

module.exports = { createProductSchema, updateProductSchema };
```

**Βήμα 3:** `backend/middleware/validate.js`:

```javascript
const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((d) => d.message);
    return res.status(400).json({ message: 'Validation error', errors });
  }
  req.body = value; // χρησιμοποίησε το sanitized value
  next();
};

module.exports = validate;
```

**Βήμα 4:** `routes/products.js`:

```javascript
const validate = require('../middleware/validate');
const { createProductSchema, updateProductSchema } = require('../validators/productValidator');

router.post('/', validate(createProductSchema), async (req, res, next) => { ... });
router.put('/:id', validate(updateProductSchema), async (req, res, next) => { ... });
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] POST χωρίς `name` → 400 με μήνυμα "name is required"
- [ ] POST με αρνητική τιμή → 400
- [ ] POST με invalid imageUrl → 400
- [ ] Valid POST → δημιουργεί κανονικά

---

# PHASE 2 — Authentication
*(Ασκήσεις 2.1–2.4 ολοκληρωμένες)*

---

### Άσκηση 2.5 — Role-based Middleware (Admin Only)

**Στόχος:** Να επιτρέπεις πρόσβαση σε συγκεκριμένα endpoints μόνο σε admins.

**Βήματα υλοποίησης**

**Βήμα 1:** Δημιούργησε `backend/middleware/adminMiddleware.js` — ένα middleware που:
  1. Ελέγχει αν το `req.user?.role` είναι `'admin'`
  2. Αν όχι, επέστρεψε 403
  3. Αν ναι, κάλεσε `next()`

**Βήμα 2:** Στο `routes/products.js`, πρόσθεσε τα middleware στα POST, PUT, DELETE routes:
  1. Η σειρά: `authMiddleware` → `adminMiddleware` → `validate(...)` → handler
  2. Τοποθέτησέ τα πριν το validation και τον async handler

**Βήμα 3:** Δοκίμασε στο Postman:
  1. Login ως regular user → πάρε token
  2. `DELETE /api/products/:id` με αυτό το token → περίμενε 403
  3. Στο MongoDB Compass, άλλαξε τον user σε `role: "admin"` → ξαναδοκίμασε → 200

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `backend/middleware/adminMiddleware.js`:

```javascript
const adminMiddleware = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Admins only.' });
  }
  next();
};

module.exports = adminMiddleware;
```

**Βήμα 2:** `routes/products.js`:

```javascript
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');

// Μόνο admins μπορούν να δημιουργούν/επεξεργάζονται/διαγράφουν προϊόντα
router.post('/', authMiddleware, adminMiddleware, validate(createProductSchema), async (req, res, next) => { ... });
router.put('/:id', authMiddleware, adminMiddleware, validate(updateProductSchema), async (req, res, next) => { ... });
router.delete('/:id', authMiddleware, adminMiddleware, async (req, res, next) => { ... });
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Regular user → 403 σε admin endpoints
- [ ] Admin user → επιτυχία
- [ ] Χωρίς token → 401 (από authMiddleware)

---

# PHASE 3 — Cart & Orders

*(Άσκηση 3.3 ολοκληρωμένη)*

---

*(Άσκηση 3.4 ολοκληρωμένη)*

---

### Άσκηση 3.5 — Admin Orders Endpoint

**Στόχος:** Admin να βλέπει και να διαχειρίζεται όλες τις παραγγελίες.

**Βήματα υλοποίησης**

**Βήμα 1:** Πρόσθεσε στο `routes/orders.js` δύο νέα routes προστατευμένα με `adminMiddleware`:
- `GET /`:
  1. Διάβασε `page`, `limit`, `status` από `req.query`
  2. Φτιάξε `filter` με status αν υπάρχει
  3. Κάνε find με populate για `user` (επέστρεψε μόνο `name email`), sort φθίνουσα, skip/limit για pagination
  4. Επίστρεψε `{ orders, total }`
- `PUT /:id/status`:
  1. Πάρε `status` από body
  2. Κάνε `findByIdAndUpdate` με `{ new: true, runValidators: true }`
  3. Αν δεν βρεθεί, 404

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `routes/orders.js` — admin routes:

```javascript
const adminMiddleware = require('../middleware/adminMiddleware');

// GET /api/orders — Όλες οι παραγγελίες (admin only)
router.get('/', adminMiddleware, async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status } = req.query;
    const filter = status ? { status } : {};

    const orders = await Order.find(filter)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Order.countDocuments(filter);
    res.json({ orders, total });
  } catch (err) { next(err); }
});

// PUT /api/orders/:id/status — Αλλαγή status (admin only)
router.put('/:id/status', adminMiddleware, async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) { next(err); }
});
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] GET /api/orders ως regular user → 403
- [ ] GET /api/orders ως admin → όλες οι παραγγελίες με user info
- [ ] PUT /api/orders/:id/status → αλλάζει status

---

# PHASE 4 — Security & Production-readiness

---

### Άσκηση 4.1 — Helmet + CORS Config

**Στόχος:** Να προστατέψεις τον server από κοινά HTTP vulnerabilities.

**Βήματα υλοποίησης**

**Βήμα 1:** `npm install helmet`

**Βήμα 2:** Στο `server.js`:
  1. Κάνε require το `helmet` και πρόσθεσε `app.use(helmet())` πριν τα routes
  2. Αντικατάστησε το `app.use(cors())` με cors config που επιτρέπει μόνο το `process.env.CLIENT_URL` ως origin, τα methods `GET/POST/PUT/DELETE` και τα headers `Content-Type/Authorization`

**Βήμα 3:** Πρόσθεσε `CLIENT_URL=http://localhost:4200` στο `.env`.

<details>
<summary>💡 Λύση</summary>

**Βήμα 2:** `server.js`:

```javascript
const helmet = require('helmet');

// Helmet — βάζει security headers αυτόματα
app.use(helmet());

// CORS — επίτρεψε μόνο συγκεκριμένα origins
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:4200',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**Βήμα 3:** `.env`:

```
CLIENT_URL=http://localhost:4200
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Response headers περιέχουν `X-Content-Type-Options`, `X-Frame-Options` κτλ. (δες στο Postman)
- [ ] Request από άλλο origin → CORS error

---

### Άσκηση 4.2 — Rate Limiting

**Στόχος:** Να προστατέψεις το API από brute force και DDoS.

**Βήματα υλοποίησης**

**Βήμα 1:** `npm install express-rate-limit`

**Βήμα 2:** Στο `server.js`, δημιούργησε δύο limiters με `rateLimit({})`:
- `generalLimiter`: window 15 λεπτά, max 100 requests, με κατάλληλο message
- `authLimiter`: window 15 λεπτά, max 10 requests, με κατάλληλο message

Στη συνέχεια:
  1. Εφάρμοσε `generalLimiter` σε όλα τα `/api` routes
  2. Εφάρμοσε `authLimiter` ειδικά στο `/api/auth`

<details>
<summary>💡 Λύση</summary>

**Βήμα 2:** `server.js`:

```javascript
const rateLimit = require('express-rate-limit');

// Γενικό limit — 100 requests ανά 15 λεπτά
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: 'Too many requests, please try again later' }
});

// Αυστηρό limit για auth — 10 attempts ανά 15 λεπτά
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { message: 'Too many login attempts, please try again later' }
});

app.use('/api', generalLimiter);
app.use('/api/auth', authLimiter);
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Μετά από 10 login attempts → 429 Too Many Requests
- [ ] Response header `X-RateLimit-Remaining` δείχνει πόσα requests απομένουν

---

### Άσκηση 4.3 — Input Sanitization (NoSQL Injection)

**Στόχος:** Να αποτρέψεις NoSQL injection attacks.

**Βήματα υλοποίησης**

**Βήμα 1:** `npm install express-mongo-sanitize`

**Βήμα 2:** Στο `server.js`:
  1. Κάνε require το `express-mongo-sanitize`
  2. Πρόσθεσε `app.use(mongoSanitize())` μετά το `express.json()` — αφαιρεί `$` και `.` από το input, αποτρέποντας NoSQL injection

**Βήμα 3:** Δοκίμασε στο Postman:
  1. Στείλε `POST /api/auth/login` με body `{ "email": { "$gt": "" }, "password": { "$gt": "" } }`
  2. Χωρίς sanitization αυτό θα έκανε login ως οποιοσδήποτε user
  3. Με sanitization → αποτυγχάνει

<details>
<summary>💡 Λύση</summary>

**Βήμα 2:** `server.js`:

```javascript
const mongoSanitize = require('express-mongo-sanitize');

// Αφαιρεί $ και . από input — αποτρέπει NoSQL injection
app.use(mongoSanitize());
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] NoSQL injection attempt → αποτυγχάνει
- [ ] Normal login → δουλεύει κανονικά

---

### Άσκηση 4.4 — Logging με Winston

**Στόχος:** Production-grade logging αντί για `console.log`.

**Βήματα υλοποίησης**

**Βήμα 1:** `npm install winston`

**Βήμα 2:** Δημιούργησε `backend/utils/logger.js`. Χρησιμοποίησε `winston.createLogger()` με:
- `level`: `'warn'` σε production, `'debug'` αλλιώς
- `format`: συνδυασμός `timestamp()` + `json()`
- Transports:
  1. Console (με colorize + simple format)
  2. File για errors (`logs/error.log`)
  3. File για όλα (`logs/combined.log`)

**Βήμα 3:** Αντικατάστησε `console.log` / `console.error` στο `server.js` και `errorHandler.js` με `logger.info()` / `logger.error()`.

**Βήμα 4:** Πρόσθεσε `logs/` στο `.gitignore`.

<details>
<summary>💡 Λύση</summary>

**Βήμα 2:** `backend/utils/logger.js`:

```javascript
const winston = require('winston');

const logger = winston.createLogger({
  level: process.env.NODE_ENV === 'production' ? 'warn' : 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    }),
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' })
  ]
});

module.exports = logger;
```

**Βήμα 3:** Χρήση στο `server.js` / `errorHandler.js`:

```javascript
const logger = require('./utils/logger');

// Αντί για console.log('MongoDB connected')
logger.info('MongoDB connected');

// Αντί για console.error(err.stack)
logger.error(err.message, { stack: err.stack });
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Logs εμφανίζονται με timestamp στο terminal
- [ ] Errors αποθηκεύονται στο `logs/error.log`

---

### Άσκηση 4.5 — Config Layer

**Στόχος:** Κεντρικό αρχείο config αντί για `process.env` σκορπισμένο παντού — όπως το `application.properties` της Spring.

**Βήματα υλοποίησης**

**Βήμα 1:** Δημιούργησε `backend/config/index.js` που κάνει export ένα object με τα εξής keys:
  1. `port` (default 3000)
  2. `mongoUri`
  3. `jwtSecret`
  4. `jwtExpiresIn` (default `'7d'`)
  5. `clientUrl` (default `'http://localhost:4200'`)
  6. `nodeEnv` (default `'development'`)

  Κάθε τιμή προέρχεται από το αντίστοιχο `process.env` variable.

**Βήμα 2:** Σε όλα τα αρχεία που χρησιμοποιούν `process.env` (π.χ. `server.js`, `protect.js`, `auth.js`):
  1. Κάνε require το config αρχείο
  2. Αντικατάστησε τα `process.env.XXX` με `config.xxx`

**Βήμα 3:** Βεβαιώσου ότι δεν υπάρχει πια `process.env` εκτός του `config/index.js`.

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `backend/config/index.js`:

```javascript
module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:4200',
  nodeEnv: process.env.NODE_ENV || 'development'
};
```

**Βήμα 2:** Παράδειγμα αντικατάστασης:

```javascript
// Πριν
jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// Μετά
const config = require('../config');
jwt.sign({ id }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Κανένα `process.env` εκτός του `config/index.js`
- [ ] App δουλεύει κανονικά

---

### Άσκηση 4.6 — Repository Pattern

**Στόχος:** Να απομονώσεις τις MongoDB queries σε ξεχωριστό layer — όπως το JPA/Hibernate Repository στη Spring.

**Τι είναι;**
```
Route → Controller → Service → Repository → MongoDB
                                    ↑
                              μόνο εδώ υπάρχουν queries
```

**Βήματα υλοποίησης**

**Βήμα 1:** Δημιούργησε `backend/repositories/productRepository.js` που κάνει export τις functions:
  1. `findAll(filter, options)` — sort/skip/limit από options
  2. `count(filter)`
  3. `findById(id)`
  4. `create(data)`
  5. `updateById(id, data)` — με `{ new: true, runValidators: true }`
  6. `deleteById(id)`

**Βήμα 2:** Δημιούργησε `backend/repositories/userRepository.js` με:
  1. `findByEmail(email)`
  2. `findById(id)`
  3. `create(data)`

**Βήμα 3:** Δημιούργησε `backend/repositories/cartRepository.js` με:
  1. `findByUser(userId)` — με populate
  2. `findByUserRaw(userId)` — χωρίς populate
  3. `createForUser(userId)`
  4. `save(cart)`

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `backend/repositories/productRepository.js`:

```javascript
const Product = require('../models/Product');

const findAll = async (filter = {}, options = {}) => {
  const { sort = 'createdAt', skip = 0, limit = 10 } = options;
  return Product.find(filter).sort(sort).skip(skip).limit(limit);
};

const count = async (filter = {}) => Product.countDocuments(filter);

const findById = async (id) => Product.findById(id);

const create = async (data) => Product.create(data);

const updateById = async (id, data) => 
  Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });

const deleteById = async (id) => Product.findByIdAndDelete(id);

module.exports = { findAll, count, findById, create, updateById, deleteById };
```

**Βήμα 2:** `backend/repositories/userRepository.js`:

```javascript
const User = require('../models/User');

const findByEmail = async (email) => User.findOne({ email });
const findById = async (id) => User.findById(id);
const create = async (data) => User.create(data);

module.exports = { findByEmail, findById, create };
```

**Βήμα 3:** `backend/repositories/cartRepository.js`:

```javascript
const Cart = require('../models/Cart');

const findByUser = async (userId) =>
  Cart.findOne({ user: userId }).populate('items.product');

const findByUserRaw = async (userId) => Cart.findOne({ user: userId });

const createForUser = async (userId) => Cart.create({ user: userId, items: [] });

const save = async (cart) => cart.save();

module.exports = { findByUser, findByUserRaw, createForUser, save };
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Κανένα `Product.find()` / `User.findOne()` εκτός repositories
- [ ] Services καλούν μόνο repository functions

---

### Άσκηση 4.7 — DTO Layer

**Στόχος:** Να ελέγχεις ακριβώς τι δεδομένα μπαίνουν και βγαίνουν από το API — αποφεύγεις να εκθέτεις sensitive fields (π.χ. password).

**Τι είναι DTO;**
**Data Transfer Object** — ένα plain object που ορίζει τη "μορφή" των δεδομένων για μεταφορά.

```
Client → [Request DTO] → Service → [Response DTO] → Client
              ↑                            ↑
         τι δέχεσαι                  τι επιστρέφεις
```

**Βήματα υλοποίησης**

**Βήμα 1:** Δημιούργησε `backend/dtos/userDto.js` με δύο mapper functions:
- `toUserResponse(user)`:
  1. Επιστρέφει `{ id, name, email, role, createdAt }`
  2. Ποτέ `password`
- `toAuthResponse(user, token)`:
  1. Επιστρέφει `{ token, user: toUserResponse(user) }`

**Βήμα 2:** Δημιούργησε `backend/dtos/productDto.js` με:
- `toProductResponse(product)`:
  1. Επιστρέφει `{ id, name, description, price, category, stock, imageUrl, createdAt }`
  2. Χρησιμοποίησε `id` αντί για `_id`
- `toProductListResponse(products, meta)`:
  1. Επιστρέφει `{ products: products.map(toProductResponse), ...meta }`

**Βήμα 3:** Χρησιμοποίησε τα DTOs στα routes:
  1. Αντί για `res.json({ token, user })` χρησιμοποίησε `res.json(toAuthResponse(user, token))`
  2. Εφάρμοσε αντίστοιχα για τα product routes χρησιμοποιώντας `toProductResponse` / `toProductListResponse`

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `backend/dtos/userDto.js`:

```javascript
// Response DTO — τι επιστρέφουμε στον client (ποτέ password)
const toUserResponse = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  createdAt: user.createdAt
});

// Auth response DTO
const toAuthResponse = (user, token) => ({
  token,
  user: toUserResponse(user)
});

module.exports = { toUserResponse, toAuthResponse };
```

**Βήμα 2:** `backend/dtos/productDto.js`:

```javascript
const toProductResponse = (product) => ({
  id: product._id,
  name: product.name,
  description: product.description,
  price: product.price,
  category: product.category,
  stock: product.stock,
  imageUrl: product.imageUrl,
  createdAt: product.createdAt
});

const toProductListResponse = (products, meta) => ({
  products: products.map(toProductResponse),
  ...meta
});

module.exports = { toProductResponse, toProductListResponse };
```

**Βήμα 3:** Χρήση στα routes:

```javascript
const { toAuthResponse } = require('../dtos/userDto');

// Αντί για res.json({ token, user })
res.json(toAuthResponse(user, token));
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Login response δεν περιέχει `password`
- [ ] Product response έχει `id` αντί για `_id`
- [ ] Αν προσθέσεις πεδίο στο model, δεν εμφανίζεται αυτόματα στο response

---

### Άσκηση 4.8 — Service Layer + DI Pattern

**Στόχος:** Να διαχωρίσεις το business logic από τα routes και να εφαρμόσεις Dependency Injection για testability — όπως το `@Service` + `@Autowired` της Spring.

**Request flow:**
```
Route → Controller → Service → Repository → MongoDB
```

**Βήματα υλοποίησης**

**Βήμα 1:** Δημιούργησε `backend/services/productService.js` με DI pattern. Η function `createProductService(productRepo)` επιστρέφει object με methods:
  1. `getAll(query)` — χτίζει filter, κάνει `Promise.all` για products + count, επιστρέφει `{ products, total, page, pages }`
  2. `getById(id)` — throw 404 αν null
  3. `create(data)`
  4. `update(id, data)` — throw 404 αν null
  5. `remove(id)` — throw 404 αν null

  Για throw χρησιμοποίησε `Object.assign(new Error('...'), { status: 404 })`.

**Βήμα 2:** Δημιούργησε `backend/services/authService.js` ομοίως. Η `createAuthService(userRepo)` επιστρέφει `{ register, login }`:
  1. Το `register` ελέγχει για duplicate email (409)
  2. Το `login` ελέγχει credentials και κάνει JWT sign με `config.jwtSecret`

**Βήμα 3:** Δημιούργησε `backend/container.js`:
  1. Κάνε require τα repositories και factories
  2. Δημιούργησε τα services περνώντας τα repositories ως dependency
  3. Κάνε export όλα

**Βήμα 4:** Ενημέρωσε τα routes:
  1. Πάρε services από το container (`require('../container')`) αντί για direct Mongoose calls
  2. Χρησιμοποίησε τα DTOs για τα responses

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `backend/services/productService.js`:

```javascript
// Δέχεται το repository ως dependency — εύκολο να αντικατασταθεί σε tests
const createProductService = (productRepo) => {
  const getAll = async (query) => {
    const { page = 1, limit = 10, category, minPrice, maxPrice, sort = 'createdAt' } = query;

    const filter = {};
    if (category) filter.category = category;
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      productRepo.findAll(filter, { sort, skip, limit: Number(limit) }),
      productRepo.count(filter)
    ]);

    return { products, total, page: Number(page), pages: Math.ceil(total / limit) };
  };

  const getById = async (id) => {
    const product = await productRepo.findById(id);
    if (!product) throw Object.assign(new Error('Product not found'), { status: 404 });
    return product;
  };

  const create = async (data) => productRepo.create(data);

  const update = async (id, data) => {
    const product = await productRepo.updateById(id, data);
    if (!product) throw Object.assign(new Error('Product not found'), { status: 404 });
    return product;
  };

  const remove = async (id) => {
    const product = await productRepo.deleteById(id);
    if (!product) throw Object.assign(new Error('Product not found'), { status: 404 });
    return product;
  };

  return { getAll, getById, create, update, remove };
};

module.exports = createProductService;
```

**Βήμα 2:** `backend/services/authService.js`:

```javascript
const config = require('../config');
const jwt = require('jsonwebtoken');

const createAuthService = (userRepo) => {
  const register = async ({ name, email, password }) => {
    const existing = await userRepo.findByEmail(email);
    if (existing) throw Object.assign(new Error('Email already in use'), { status: 409 });
    return userRepo.create({ name, email, password });
  };

  const login = async ({ email, password }) => {
    const user = await userRepo.findByEmail(email);
    if (!user) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw Object.assign(new Error('Invalid credentials'), { status: 401 });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    return { user, token };
  };

  return { register, login };
};

module.exports = createAuthService;
```

**Βήμα 3:** `backend/container.js`:

```javascript
// Dependency Injection container
const productRepository = require('./repositories/productRepository');
const userRepository = require('./repositories/userRepository');
const cartRepository = require('./repositories/cartRepository');

const createProductService = require('./services/productService');
const createAuthService = require('./services/authService');

const productService = createProductService(productRepository);
const authService = createAuthService(userRepository);

module.exports = { productService, authService, productRepository, userRepository, cartRepository };
```

**Βήμα 4:** `routes/products.js` — παράδειγμα ενημερωμένου route:

```javascript
// routes/products.js
const { productService } = require('../container');
const { toProductListResponse, toProductResponse } = require('../dtos/productDto');

router.get('/', async (req, res, next) => {
  try {
    const result = await productService.getAll(req.query);
    res.json(toProductListResponse(result.products, {
      total: result.total, page: result.page, pages: result.pages
    }));
  } catch (err) { next(err); }
});
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Routes δεν έχουν business logic — μόνο service calls
- [ ] Services δεν έχουν MongoDB queries — μόνο repository calls
- [ ] Αν αντικαταστήσεις το `productRepository` με mock, οι services δουλεύουν ίδια
- [ ] API συμπεριφέρεται ίδια με πριν

---

### Άσκηση 4.9 — Service Layer για Cart ⭐ optional

**Στόχος:** Να εφαρμόσεις το ίδιο pattern στο Cart.

**Βήματα υλοποίησης**

**Βήμα 1:** Δημιούργησε `backend/services/cartService.js`. Η `createCartService(cartRepo, productRepo)` επιστρέφει object με:
- `getCart(userId)`:
  1. Επιστρέφει cart ή `{ items: [] }` αν δεν υπάρχει
- `addItem(userId, productId, quantity)`:
  1. Ελέγχει stock
  2. Βρίσκει ή δημιουργεί cart
  3. Ενημερώνει ποσότητα αν το product υπάρχει ήδη, αλλιώς προσθέτει νέο item
- `removeItem(userId, productId)`:
  1. Φιλτράρει τα items αφαιρώντας το product
- `clear(userId)`:
  1. Αδειάζει το cart

**Βήμα 2:** Στο `container.js`:
  1. Κάνε require το `createCartService`
  2. Δημιούργησε `cartService = createCartService(cartRepository, productRepository)`
  3. Πρόσθεσε το `cartService` στο export

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `backend/services/cartService.js`:

```javascript
const createCartService = (cartRepo, productRepo) => {
  const getCart = async (userId) => {
    const cart = await cartRepo.findByUser(userId);
    return cart || { items: [] };
  };

  const addItem = async (userId, productId, quantity = 1) => {
    const product = await productRepo.findById(productId);
    if (!product) throw Object.assign(new Error('Product not found'), { status: 404 });
    if (product.stock < quantity) {
      throw Object.assign(
        new Error(`Insufficient stock. Available: ${product.stock}`),
        { status: 400 }
      );
    }

    let cart = await cartRepo.findByUserRaw(userId);
    if (!cart) cart = await cartRepo.createForUser(userId);

    const existing = cart.items.find((i) => i.product.toString() === productId);
    if (existing) {
      if (existing.quantity + quantity > product.stock) {
        throw Object.assign(new Error(`Cannot add more. Available: ${product.stock}`), { status: 400 });
      }
      existing.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    return cartRepo.save(cart);
  };

  const removeItem = async (userId, productId) => {
    const cart = await cartRepo.findByUserRaw(userId);
    if (!cart) throw Object.assign(new Error('Cart not found'), { status: 404 });
    cart.items = cart.items.filter((i) => i.product.toString() !== productId);
    return cartRepo.save(cart);
  };

  const clear = async (userId) => {
    const cart = await cartRepo.findByUserRaw(userId);
    if (cart) { cart.items = []; await cartRepo.save(cart); }
  };

  return { getCart, addItem, removeItem, clear };
};

module.exports = createCartService;
```

**Βήμα 2:** `container.js`:

```javascript
const createCartService = require('./services/cartService');
const cartService = createCartService(cartRepository, productRepository);
module.exports = { productService, authService, cartService, ... };
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Cart route χρησιμοποιεί `cartService` αντί για direct Mongoose calls

---

---

# PHASE TS — TypeScript Migration

> **Πότε να το κάνεις:** Αφού τελειώσεις το Phase 3 (ή/και 4), πριν αρχίσεις το Angular.  
> **Τι αλλάζει:** Όλος ο κώδικας μετακομίζει στο `backend/src/` ως `.ts` αρχεία. Τα παλιά `.js` αρχεία παραμένουν για αναφορά μέχρι να επαληθεύσεις ότι το TS version δουλεύει.

---

> 📖 Αναλυτική θεωρία: [MEAN_ESHOP_THEORY.md](MEAN_ESHOP_THEORY.md)

**Σειρά layers (από κάτω προς τα πάνω):**
```
types → models → repositories → services → controllers → middleware → routes → app → server
```

**Κανόνες που ισχύουν παντού:**
- Κάθε αρχείο: `import` → `interface/type` → `const/function` → `export`
- `export` = κάνεις κάτι ορατό σε άλλα αρχεία
- `import { X } from './path'` (named) / `import X from './path'` (default)
- Controller signature: `(req: Request, res: Response, next: NextFunction): Promise<void>`
- Service throws, Controller catches με `next(error)`
- Middleware: 3 params (regular) / 4 params `(err, req, res, next)` (error handler)

*(Ασκήσεις TS.1–TS.9 ολοκληρωμένες)*

---

### Άσκηση TS.10 — Bug Fixes & Build & Full Test

**Στόχος:** Να διορθώσεις γνωστά bugs πριν το build και να επαληθεύσεις ότι το API δουλεύει σωστά end-to-end.

---

**Μέρος Α — Διορθώσεις (πριν το build)**

Βρέθηκαν 3 bugs κατά τον έλεγχο του project:

**Βήμα 1 — Bcrypt import mismatch**

Το `User.ts` κάνει `import bcrypt from 'bcrypt'` αλλά εγκατεστημένο είναι `bcryptjs`. Διόρθωσε το import:

```typescript
// User.ts — αλλαγή:
import bcrypt from 'bcryptjs';  // ← όχι 'bcrypt'
```

Επίσης στο `package.json`, αφαίρεσε το `@types/bcrypt` από τα devDependencies (κράτα μόνο `@types/bcryptjs`).

**Βήμα 2 — Double password hashing**

Ο κωδικός κάνει hash **δύο φορές**:
1. Στο `auth.service.ts`: `await bcrypt.hash(data.password, 10)`
2. Στο `User.ts` pre-save hook: κάνει hash ξανά αν το password είναι modified

Αποτέλεσμα: ο αποθηκευμένος κωδικός δεν μπορεί να γίνει verify ποτέ.

Διόρθωση — αφαίρεσε το hash από το `auth.service.ts` και άφησε **μόνο** το pre-save hook να κάνει το hashing:

```typescript
// auth.service.ts — αφαίρεσε αυτή τη γραμμή:
const hashed = await bcrypt.hash(data.password, 10);

// και πέρνα τα original data:
await userRepository.create({ ...data });  // χωρίς hashed password
```

**Βήμα 3 — `config.jwtExpiresIn` αγνοείται**

Στο `auth.service.ts` το expiry είναι hardcoded ενώ υπάρχει ήδη στο config:

```typescript
// auth.service.ts — αλλαγή:
const token = jwt.sign(
  { id: user._id, role: user.role },
  config.jwtSecret,
  { expiresIn: config.jwtExpiresIn }  // ← αντί για '7d'
);
```

---

**Μέρος Β — Build & Test**

**Βήμα 4:** `npm run build` → δημιουργεί το `dist/` folder

**Βήμα 5:** `npm start` → server ξεκινά κανονικά

**Βήμα 6:** Ξανατρέξε τα Postman tests:
- Register → Login (με τον ίδιο κωδικό) → πρέπει να επιστρέψει token
- CRUD products με και χωρίς auth
- Cart endpoints (αν έχεις Phase 3)

**Κριτήρια επαλήθευσης**
- [ ] `npm run build` χωρίς errors
- [ ] `dist/` folder δημιουργείται
- [ ] `npm start` εκκινεί χωρίς crash
- [ ] Register + Login με ίδιο password → επιτυχία (επαληθεύει ότι το double-hash διορθώθηκε)
- [ ] Όλα τα Postman tests περνούν

---

### Άσκηση TS.11 — Shared Types (Backend + Angular)

**Στόχος:** Να ορίσεις τα core interfaces ΜΙΑ φορά και να τα χρησιμοποιούν και ο backend και το Angular — αν αλλάξει ένα field, ο compiler σου λέει ακριβώς που έσπασε.

**Τι πρόβλημα λύνει;**
Χωρίς shared types, το backend μπορεί να επιστρέφει `{ price: number }` και το Angular να περιμένει `{ price: string }` — bug που εμφανίζεται μόνο στο runtime.

**Τι να φτιάξεις:**

Δημιούργησε φάκελο `shared/types/` στη ρίζα του project (δίπλα στα `backend/` και `frontend/`):

**`shared/types/product.types.ts`**
- Ίδιο `IProduct` interface όπως στο backend
- Ίδια `CreateProductDto`, `UpdateProductDto`

**`shared/types/user.types.ts`**
- Ίδιο `UserRole`, `IUser`, `AuthResponseDto`, `JwtPayload`

**`shared/types/index.ts`**
- Re-export όλα τα types από ένα σημείο: `export * from './product.types'` κτλ.

**Σύνδεση με backend:**
- Στο `backend/src/types/`, αντί να ορίζεις interfaces, κάνε import από `shared/types`
- Hint: στο `tsconfig.json` του backend πρόσθεσε `paths`: `"@shared/*": ["../shared/*"]`

**Σύνδεση με Angular (Phase 5):**
- Το ίδιο path alias στο `tsconfig.json` του Angular project
- Τότε: `import { IProduct } from '@shared/types'`

**Κριτήρια επαλήθευσης**
- [ ] `shared/types/index.ts` κάνει export όλα τα types
- [ ] Backend imports τα types από `@shared/types` (όχι local αρχεία)
- [ ] `npm run lint` στο backend χωρίς errors
- [ ] Αν αλλάξεις ένα field στο `IProduct` → το backend δείχνει compile error αμέσως

<details>
<summary>💡 Λύση</summary>

**`shared/types/product.types.ts`**
```typescript
export interface IProduct {
  _id: string;
  name: string;
  price: number;
  category: string;
  description?: string;
  stock: number;
}

export interface CreateProductDto {
  name: string;
  price: number;
  category: string;
  description?: string;
  stock?: number;
}

export interface UpdateProductDto {
  name?: string;
  price?: number;
  category?: string;
  description?: string;
  stock?: number;
}
```

**`shared/types/user.types.ts`**
```typescript
export type UserRole = 'user' | 'admin';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface RegisterDto {
  name: string;
  email: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface AuthResponseDto {
  token: string;
}

export interface JwtPayload {
  id: string;
  role: UserRole;
}
```

**`shared/types/index.ts`**
```typescript
export * from './product.types';
export * from './user.types';
```

**`backend/tsconfig.json`** — πρόσθεσε paths:
```json
{
  "compilerOptions": {
    "paths": {
      "@shared/*": ["../shared/*"]
    }
  }
}
```

**`backend/src/types/product.types.ts`** — αντικατέστησε τα local interfaces με imports:
```typescript
export { IProduct, CreateProductDto, UpdateProductDto } from '@shared/types';
// Το ProductDocument παραμένει local (είναι Mongoose-specific)
```

</details>

---

### Άσκηση TS.12 — Validation με Zod

**Στόχος:** Να ελέγχεις τα δεδομένα του request στο runtime — το TypeScript ελέγχει types μόνο στο compile, το Zod τα ελέγχει όταν τρέχει ο server.

**Γιατί Zod και όχι Joi:** Το Zod είναι TypeScript-first — παράγει αυτόματα types από τα schemas, οπότε δεν χρειάζεται να ορίσεις ξεχωριστά interface και schema.

**Βήματα υλοποίησης**

**Βήμα 1:** Εγκατάστησε: `npm install zod`

**Βήμα 2:** Δημιούργησε `backend/src/validators/product.validator.ts`:
  1. Ορίσε `createProductSchema` με `z.object({})` — fields: `name` (string, min 2), `price` (number, min 0), `category` (string), `description` (string optional), `stock` (number, min 0, default 0)
  2. Ορίσε `updateProductSchema` με τα ίδια fields αλλά όλα `.optional()`, και `.refine()` ώστε τουλάχιστον ένα να υπάρχει
  3. Εξήγαγε και τα inferred types: `export type CreateProductInput = z.infer<typeof createProductSchema>`

**Βήμα 3:** Δημιούργησε `backend/src/middleware/validate.middleware.ts`:
  1. Η function `validate(schema: ZodSchema)` επιστρέφει Express middleware
  2. Μέσα: `schema.safeParse(req.body)` — αν `!result.success`, επίστρεψε 400 με `result.error.issues`
  3. Αν επιτυχία: `req.body = result.data` και `next()`

**Βήμα 4:** Στο `product.routes.ts`, πρόσθεσε το validate middleware στα POST και PUT routes πριν τον controller.

<details>
<summary>💡 Λύση</summary>

**Βήμα 2:** `backend/src/validators/product.validator.ts`:
```typescript
import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(2),
  price: z.number().min(0),
  category: z.string(),
  description: z.string().optional(),
  stock: z.number().min(0).default(0)
});

export const updateProductSchema = z.object({
  name: z.string().min(2).optional(),
  price: z.number().min(0).optional(),
  category: z.string().optional(),
  description: z.string().optional(),
  stock: z.number().min(0).optional()
}).refine(data => Object.keys(data).length > 0, {
  message: 'At least one field required'
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
```

**Βήμα 3:** `backend/src/middleware/validate.middleware.ts`:
```typescript
import { Request, Response, NextFunction } from 'express';
import { ZodSchema } from 'zod';

export function validate(schema: ZodSchema) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      res.status(400).json({ errors: result.error.issues });
      return;
    }
    req.body = result.data;
    next();
  };
}
```

**Βήμα 4:** `backend/src/routes/product.routes.ts`:
```typescript
import { validate } from '../middleware/validate.middleware';
import { createProductSchema, updateProductSchema } from '../validators/product.validator';

router.post('/', authMiddleware, validate(createProductSchema), productController.create);
router.put('/:id', authMiddleware, validate(updateProductSchema), productController.update);
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] `POST /api/products` χωρίς `name` → 400 με issues array
- [ ] `POST /api/products` με `price: -5` → 400
- [ ] Valid POST → δημιουργεί κανονικά
- [ ] `PUT /api/products/:id` με άδειο body → 400

---

### Άσκηση TS.13 — API Documentation με Swagger

**Στόχος:** Να δημιουργήσεις αυτόματο interactive documentation για το API — ένα URL όπου βλέπεις και δοκιμάζεις όλα τα endpoints χωρίς Postman.

**Βήματα υλοποίησης**

**Βήμα 1:** Εγκατάστησε:
```bash
npm install swagger-ui-express swagger-jsdoc
npm install --save-dev @types/swagger-ui-express @types/swagger-jsdoc
```

**Βήμα 2:** Δημιούργησε `backend/src/config/swagger.ts`:
  1. Ορίσε `swaggerOptions` με `definition` (openapi: `'3.0.0'`, info με title/version, servers με το localhost URL) και `apis` που δείχνει στα routes αρχεία (`['./src/routes/*.ts']`)
  2. Κάνε export το `swaggerSpec = swaggerJsdoc(swaggerOptions)`

**Βήμα 3:** Στο `app.ts`:
  1. Κάνε import `swagger-ui-express` και το `swaggerSpec`
  2. Πρόσθεσε `app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))` πριν τα routes

**Βήμα 4:** Στο `product.routes.ts`, πρόσθεσε JSDoc comments πάνω από κάθε route με το format:
```typescript
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 */
```

<details>
<summary>💡 Λύση</summary>

**Βήμα 2:** `backend/src/config/swagger.ts`:
```typescript
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'ShopSphere API',
      version: '1.0.0',
      description: 'REST API για το e-shop project'
    },
    servers: [{ url: 'http://localhost:3000' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./src/routes/*.ts']
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);
```

**Βήμα 3:** `backend/src/app.ts`:
```typescript
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';

// πριν τα routes
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
```

**Βήμα 4:** `backend/src/routes/product.routes.ts` — παράδειγμα:
```typescript
/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of products
 *   post:
 *     summary: Create a product
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [name, price, category]
 *             properties:
 *               name:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Product created
 *       401:
 *         description: Unauthorized
 */
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] `http://localhost:3000/api-docs` ανοίγει στον browser
- [ ] Εμφανίζονται τα `/api/products` endpoints
- [ ] Μπορείς να κάνεις `GET /api/products` κατευθείαν από το Swagger UI
- [ ] Τα protected endpoints έχουν 🔒 εικονίδιο

---

### Άσκηση TS.14 — Mapper Layer

**Στόχος:** Να μετατρέπεις το `ProductDocument` (Mongoose object) σε καθαρό response object πριν το στείλεις στον client — αποφεύγεις να εκθέτεις `__v`, `_id` ως ObjectId, ή internal fields.

**Γιατί mapper;**
```
Repository → Service → [Mapper] → Controller → Client
                           ↑
                  μετατρέπει Document σε plain object
```

Χωρίς mapper ο client παίρνει ό,τι επιστρέφει η MongoDB (με `__v`, `_id` ως ObjectId κτλ.). Με mapper ελέγχεις ακριβώς τι βλέπει ο client.

**Βήματα υλοποίησης**

**Βήμα 1:** Δημιούργησε `backend/src/mappers/product.mapper.ts` με function `toProductResponse(doc: ProductDocument)` που επιστρέφει plain object με:
- `id` (string, από `doc._id.toString()`)
- `name`, `price`, `category`, `description`, `stock`, `imageUrl`, `createdAt`
- **Χωρίς:** `__v`, `_id` ως ObjectId

**Βήμα 2:** Δημιούργησε `backend/src/mappers/user.mapper.ts` με `toUserResponse(doc: UserDocument)`:
- `id`, `name`, `email`, `role`, `createdAt`
- **Χωρίς:** `password`, `__v`

**Βήμα 3:** Χρησιμοποίησε τους mappers στους controllers:
  1. `productController.getAll` → `products.map(toProductResponse)`
  2. `productController.getById` → `toProductResponse(product)`
  3. `authController.login` → χρησιμοποίησε ήδη `{ token }` — πρόσθεσε και `toUserResponse` αν θέλεις να επιστρέφεις user info

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `backend/src/mappers/product.mapper.ts`:
```typescript
import { ProductDocument } from '../models/Product';

export const toProductResponse = (doc: ProductDocument) => ({
  id: doc._id.toString(),
  name: doc.name,
  price: doc.price,
  category: doc.category,
  description: doc.description,
  stock: doc.stock,
  imageUrl: doc.imageUrl,
  createdAt: doc.createdAt
});
```

**Βήμα 2:** `backend/src/mappers/user.mapper.ts`:
```typescript
import { UserDocument } from '../models/User';

export const toUserResponse = (doc: UserDocument) => ({
  id: doc._id.toString(),
  name: doc.name,
  email: doc.email,
  role: doc.role,
  createdAt: doc.createdAt
});
```

**Βήμα 3:** `product.controller.ts`:
```typescript
import { toProductResponse } from '../mappers/product.mapper';

async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const products = await productService.getAll();
    res.json(products.map(toProductResponse));
  } catch (error) { next(error); }
}
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Response έχει `id` (string) αντί για `_id` (ObjectId)
- [ ] Response δεν έχει `__v`
- [ ] Login response δεν έχει `password`

---

# PHASE 5 — Angular Frontend

---

### Άσκηση 5.0 — Bootstrap Setup

**Στόχος:** Να ενσωματώσεις το Bootstrap στο Angular project για γρήγορο styling.

**Βήματα υλοποίησης**

**Βήμα 1:** Εγκατάστησε Bootstrap: `npm install bootstrap`

**Βήμα 2:** Στο `angular.json`, πρόσθεσε το Bootstrap CSS στο `styles` array:
```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
]
```

**Βήμα 3:** Στο `angular.json`, πρόσθεσε το Bootstrap JS στο `scripts` array:
```json
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

**Βήμα 4:** Δοκίμασε στο `app.component.html` ότι δουλεύει:
```html
<button class="btn btn-primary">Test Bootstrap</button>
```

<details>
<summary>💡 Λύση</summary>

**Βήμα 2-3:** `angular.json` — βρες το section `"build" > "options"`:
```json
"styles": [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
  "src/styles.css"
],
"scripts": [
  "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
]
```

> Προσοχή: το `angular.json` έχει δύο sections (build + test) — ενημέρωσε και τα δύο.

</details>

**Κριτήρια επαλήθευσης**
- [ ] `ng serve` χωρίς errors
- [ ] Το κουμπί εμφανίζεται με Bootstrap styling (μπλε, rounded)

---

### Άσκηση 5.1 — Angular Setup + Standalone Architecture

**Στόχος:** Να στήσεις το Angular project με standalone αρχιτεκτονική (Angular 17+) — χωρίς NgModules.

> **Standalone vs Modules:** Στο Angular 17+ δεν χρειάζονται `NgModule`. Κάθε component είναι αυτόνομο και δηλώνει μόνο του τι χρειάζεται στο `imports: []`.

**Δομή που θα φτιάξεις:**
```
src/app/
  core/
    services/        ← auth, cart, product services
    guards/          ← authGuard
    interceptors/    ← authInterceptor
  shared/
    components/
      navbar/        ← κοινό navbar
    models/          ← interfaces (Product, User κτλ.)
  features/
    auth/components/       ← login, register
    products/components/   ← product-list, product-card, product-detail
    cart/components/       ← cart
    orders/components/     ← checkout
```

**Βήματα υλοποίησης**

**Βήμα 1:** Δημιούργησε το Angular project (αν δεν υπάρχει ήδη):
```bash
ng new eshop-frontend --routing --style=css
```

**Βήμα 2:** Στο `src/app/app.config.ts`, πρόσθεσε `provideHttpClient`:
  1. Import `provideHttpClient, withInterceptorsFromDi` από `@angular/common/http`
  2. Πρόσθεσε `provideHttpClient(withInterceptorsFromDi())` στο `providers` array

**Βήμα 3:** Δημιούργησε αρχείο `src/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api'
};
```

**Βήμα 4:** Δημιούργησε το navbar component:
```bash
ng generate component shared/components/navbar
```

**Βήμα 5:** Στο `app.html`, πρόσθεσε `<app-navbar>` πάνω από `<router-outlet>`. Στο `app.ts`, πρόσθεσε `NavbarComponent` στο `imports: []`.

<details>
<summary>💡 Λύση</summary>

**Βήμα 2:** `src/app/app.config.ts`:
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi())
  ]
};
```

**Βήμα 5:** `src/app/app.ts`:
```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  template: `
    <app-navbar />
    <router-outlet />
  `
})
export class App {}
```

</details>

**Bootstrap styling**
- Navbar: `<nav class="navbar navbar-expand-lg navbar-dark bg-dark px-3">`
- Links: `<a class="nav-link" routerLink="/products" routerLinkActive="active">`
- Στο `navbar.ts` imports: `[RouterLink, RouterLinkActive]`

**Κριτήρια επαλήθευσης**
- [ ] `ng serve` χωρίς errors
- [ ] `provideHttpClient` υπάρχει στο `app.config.ts`
- [ ] Navbar εμφανίζεται σε όλες τις σελίδες

---

### Άσκηση 5.2 — ProductService

**Στόχος:** Service που επικοινωνεί με το backend API για προϊόντα.

**Βήματα υλοποίησης**

**Βήμα 1:** Δημιούργησε `src/app/shared/models/product.model.ts` με δύο interfaces:
- `Product`: fields `_id?`, `name`, `description?`, `price`, `category`, `stock?`, `imageUrl?`
- `ProductsResponse`: fields `products: Product[]`, `total`, `page`, `pages`

**Βήμα 2:** Τρέξε `ng generate service core/services/product`. Υλοποίησε στο service:
- `getProducts(filters?)` — χτίζει `HttpParams` από τα filters και κάνει GET στο `/products`
- `getProduct(id)` — GET στο `/products/:id`
- `createProduct(product)` — POST στο `/products`
- `updateProduct(id, product)` — PUT στο `/products/:id`
- `deleteProduct(id)` — DELETE στο `/products/:id`

Χρησιμοποίησε `environment.apiUrl` για το base URL.

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `src/app/shared/models/product.model.ts`:

```typescript
export interface Product {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  stock?: number;
  imageUrl?: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  page: number;
  pages: number;
}
```

**Βήμα 2:** `src/app/core/services/product.service.ts`:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product, ProductsResponse } from '../../shared/models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getProducts(filters?: {
    page?: number; limit?: number; category?: string;
    minPrice?: number; maxPrice?: number; sort?: string;
  }): Observable<ProductsResponse> {
    let params = new HttpParams();
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined) params = params.set(key, String(value));
      });
    }
    return this.http.get<ProductsResponse>(this.apiUrl, { params });
  }

  getProduct(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }

  updateProduct(id: string, product: Partial<Product>): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, product);
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] `ng build` χωρίς errors
- [ ] `getProducts()` υποστηρίζει filters/pagination

---

### Άσκηση 5.3 — Λίστα & Detail Προϊόντων

**Στόχος:** Να εμφανίσεις τα προϊόντα με pagination και filters.

**Βήματα υλοποίησης**

**Βήμα 1:** Δημιούργησε τα components:
```bash
ng generate component features/products/components/product-list
ng generate component features/products/components/product-card
ng generate component features/products/components/product-detail
```

**Βήμα 2:** Στο `product-list.ts`, υλοποίησε:
- Properties: `products`, `total`, `page`, `pages`, `selectedCategory`, `categories`
- `ngOnInit()`: καλεί `loadProducts()`
- `loadProducts()`: καλεί `productService.getProducts({ page, category })` και ενημερώνει τα properties
- `onCategoryChange(category)`: reset page σε 1, ξαναφορτώνει
- `onPageChange(page)`: ενημερώνει page, ξαναφορτώνει
- Στο `imports: []` του component πρόσθεσε `ProductCardComponent`

**Βήμα 3:** Στο `product-list.html`, δημιούργησε:
  1. Select για category filter (με `@for` για τις categories)
  2. Grid με `app-product-card` για κάθε product (με `@for`)
  3. Μήνυμα αν η λίστα είναι άδεια (με `@if`)
  4. Pagination buttons

> **Angular 17+ control flow:** Αντί για `*ngFor` / `*ngIf` χρησιμοποιείς `@for` / `@if` — πιο καθαρή σύνταξη, δεν χρειάζεται import του `CommonModule`.

<details>
<summary>💡 Λύση</summary>

**Βήμα 2:** `product-list.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../shared/models/product.model';
import { ProductCardComponent } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.html'
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  total = 0;
  page = 1;
  pages = 1;
  selectedCategory = '';
  categories = ['Electronics', 'Clothing', 'Books', 'Home'];

  constructor(private productService: ProductService) {}

  ngOnInit(): void { this.loadProducts(); }

  loadProducts(): void {
    this.productService.getProducts({
      page: this.page,
      category: this.selectedCategory || undefined
    }).subscribe((res) => {
      this.products = res.products;
      this.total = res.total;
      this.pages = res.pages;
    });
  }

  onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.page = 1;
    this.loadProducts();
  }

  onPageChange(p: number): void {
    this.page = p;
    this.loadProducts();
  }
}
```

**Βήμα 3:** `product-list.html`:

```html
<select class="form-select w-auto mb-3" (change)="onCategoryChange($any($event.target).value)">
  <option value="">Όλες οι κατηγορίες</option>
  @for (cat of categories; track cat) {
    <option [value]="cat">{{ cat }}</option>
  }
</select>

<div class="row row-cols-1 row-cols-md-3 g-4">
  @for (product of products; track product._id) {
    <div class="col">
      <app-product-card [product]="product" />
    </div>
  }
</div>

@if (products.length === 0) {
  <p class="text-muted text-center mt-4">Δεν βρέθηκαν προϊόντα</p>
}

<nav class="mt-4">
  <ul class="pagination">
    @for (p of pages | range; track p) {
      <li class="page-item" [class.active]="page === p">
        <a class="page-link" (click)="onPageChange(p)">{{ p }}</a>
      </li>
    }
  </ul>
</nav>
```

</details>

**Bootstrap styling**
- Φίλτρο: `<select class="form-select w-auto">`
- Grid προϊόντων: `<div class="row row-cols-1 row-cols-md-3 g-4">`
- Κάθε card: `<div class="col"><div class="card h-100">...</div></div>`
- Άδεια λίστα: `<p class="text-muted text-center">Δεν βρέθηκαν προϊόντα</p>`
- Pagination: `<nav><ul class="pagination">` με `<li class="page-item" [class.active]="..."><a class="page-link">...</a></li>`

**Κριτήρια επαλήθευσης**
- [ ] `/products` εμφανίζει προϊόντα σε Bootstrap card grid
- [ ] Φίλτρο κατηγορίας λειτουργεί
- [ ] Pagination λειτουργεί

---

### Άσκηση 5.4 — Login & Register (Reactive Forms)

**Στόχος:** Authentication forms με validation.

**Βήματα υλοποίησης**

**Βήμα 1:** `ng generate service core/services/auth`. Υλοποίησε `AuthService` με:
- `register(data)` — POST στο `/auth/register`
- `login(credentials)`:
  1. POST στο `/auth/login`
  2. Με `tap` για να αποθηκεύει `token` και `user` στο `localStorage`
- `logout()` — αφαιρεί token και user από localStorage
- Helper methods: `getToken()`, `isLoggedIn()`, `getCurrentUser()`, `isAdmin()`

**Βήμα 2:** Δημιούργησε components:
```bash
ng generate component features/auth/components/login
ng generate component features/auth/components/register
```

**Βήμα 3:** Στο `login.component.ts`:
  1. Δημιούργησε `FormGroup` με `email` (required, email) και `password` (required, minLength 6)
  2. Στο `onLogin()`, αν το form είναι invalid επέστρεψε
  3. Αλλιώς κάλεσε `authService.login()` και κάνε redirect στο `/products` ή εμφάνισε error

**Βήμα 4:** Στο `login.component.html`:
  1. Χρησιμοποίησε `[formGroup]` και `(ngSubmit)`
  2. Για κάθε field, εμφάνισε validation message όταν `invalid && touched`
  3. Το submit button να είναι `[disabled]="form.invalid"`

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `src/app/core/services/auth.service.ts`:

```typescript
@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null { return localStorage.getItem('token'); }
  isLoggedIn(): boolean { return !!this.getToken(); }
  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
  isAdmin(): boolean { return this.getCurrentUser()?.role === 'admin'; }
}
```

**Βήμα 3:** `login.ts`:

```typescript
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html'
})
export class LoginComponent {
  form: FormGroup;
  error = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin(): void {
    if (this.form.invalid) return;
    this.authService.login(this.form.value).subscribe({
      next: () => this.router.navigate(['/products']),
      error: (err) => this.error = err.error.message
    });
  }
}
```

**Βήμα 4:** `login.html`:

```html
<form [formGroup]="form" (ngSubmit)="onLogin()">
  <div class="mb-3">
    <input class="form-control" formControlName="email" type="email" placeholder="Email"
      [class.is-invalid]="form.get('email')?.invalid && form.get('email')?.touched" />
    <div class="invalid-feedback">Μη έγκυρο email</div>
  </div>
  <div class="mb-3">
    <input class="form-control" formControlName="password" type="password" placeholder="Password"
      [class.is-invalid]="form.get('password')?.invalid && form.get('password')?.touched" />
    <div class="invalid-feedback">Τουλάχιστον 6 χαρακτήρες</div>
  </div>
  @if (error) {
    <div class="alert alert-danger">{{ error }}</div>
  }
  <button class="btn btn-primary w-100" type="submit" [disabled]="form.invalid">Login</button>
</form>
```

> **Standalone forms:** Το `ReactiveFormsModule` δηλώνεται στο `imports: []` του ίδιου του component — όχι σε κάποιο module.

</details>

**Bootstrap styling**
- Κεντράρισμα φόρμας: `<div class="container"><div class="row justify-content-center"><div class="col-md-4">`
- Card: `<div class="card p-4 shadow-sm">`
- Input fields: `<input class="form-control" [class.is-invalid]="form.get('email')?.invalid && form.get('email')?.touched">`
- Validation message: `<div class="invalid-feedback">Μη έγκυρο email</div>`
- Button: `<button class="btn btn-primary w-100" [disabled]="form.invalid">`
- Error: `<div class="alert alert-danger">{{ error }}</div>`

**Κριτήρια επαλήθευσης**
- [ ] Submit με invalid form → disabled κουμπί
- [ ] Επιτυχής login → redirect + token στο localStorage
- [ ] Λάθος credentials → error message

---

### Άσκηση 5.5 — Guards + Token Expiry

**Στόχος:** Route protection με έλεγχο αν το JWT έχει λήξει — όχι μόνο αν υπάρχει token.

**Γιατί token expiry;** Ένας χρήστης μπορεί να έχει token στο localStorage από χθες που έχει λήξει. Χωρίς expiry check, ο guard τον αφήνει να περάσει και μετά παίρνει 401 από το backend.

**Βήμα 1:** Εγκατάστησε: `npm install jwt-decode`

**Βήμα 2:** Στο `auth.service.ts`, πρόσθεσε `isTokenExpired()`:
  1. Πάρε το token με `getToken()`
  2. Χρησιμοποίησε `jwtDecode<{ exp: number }>(token)` για να πάρεις το expiry
  3. Σύγκρινε `decoded.exp * 1000` με `Date.now()` — αν είναι μικρότερο, το token έχει λήξει
  4. Ενημέρωσε το `isLoggedIn()` να ελέγχει και το expiry: `!!token && !this.isTokenExpired()`

**Βήμα 3:** Δημιούργησε `src/app/core/guards/auth.guard.ts` με `CanActivateFn`:
  1. Αν `isLoggedIn()` → return `true`
  2. Αλλιώς → `logout()` και redirect στο `/auth/login`

**Βήμα 4:** Δημιούργησε `src/app/core/guards/role.guard.ts` — γενικός guard για roles:
  1. Παίρνει το required role από τα route data: `inject(ActivatedRouteSnapshot)` ή `route.data['role']`
  2. Αν ο user έχει αυτό το role → `true`
  3. Αλλιώς → redirect στο `/products`

**Βήμα 5:** Στο `app.routes.ts`, προστάτεψε τα routes:
```typescript
{ path: 'cart', canActivate: [authGuard], loadComponent: ... }
```

<details>
<summary>💡 Λύση</summary>

**Βήμα 2:** `auth.service.ts` — προσθήκη:
```typescript
import { jwtDecode } from 'jwt-decode';

isTokenExpired(): boolean {
  const token = this.getToken();
  if (!token) return true;
  try {
    const decoded = jwtDecode<{ exp: number }>(token);
    return decoded.exp * 1000 < Date.now();
  } catch {
    return true;
  }
}

isLoggedIn(): boolean {
  return !!this.getToken() && !this.isTokenExpired();
}
```

**Βήμα 3:** `src/app/core/guards/auth.guard.ts`:
```typescript
import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);
  if (authService.isLoggedIn()) return true;
  authService.logout();
  return router.createUrlTree(['/auth/login']);
};
```

**Βήμα 4:** `src/app/core/guards/role.guard.ts`:
```typescript
import { CanActivateFn, ActivatedRouteSnapshot } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route: ActivatedRouteSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const requiredRole = route.data['role'] as string;
  const user = authService.getCurrentUser();
  if (user?.role === requiredRole) return true;
  return router.createUrlTree(['/products']);
};
```

**Βήμα 5:** `app.routes.ts` — χρήση role guard:
```typescript
{
  path: 'admin',
  canActivate: [authGuard, roleGuard],
  data: { role: 'admin' },
  loadComponent: () => import('./features/admin/components/dashboard/dashboard')
    .then(m => m.DashboardComponent)
}
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] `/cart` χωρίς login → redirect `/auth/login`
- [ ] Token λήγμένο → αυτόματο logout + redirect
- [ ] `/admin` ως regular user → redirect `/products`
- [ ] `/admin` ως admin → φορτώνει

---

### Άσκηση 5.6 — HTTP Interceptor (JWT)

**Στόχος:** Αυτόματο JWT token σε κάθε request + χειρισμός 401.

**Βήματα υλοποίησης**

**Βήμα 1:** Δημιούργησε `src/app/core/interceptors/auth.interceptor.ts`. Υλοποίησε **functional interceptor** (`HttpInterceptorFn`):
  1. Χρησιμοποίησε `inject(AuthService)` και `inject(Router)` για να πάρεις τα services
  2. Πάρε το token με `authService.getToken()`
  3. Αν υπάρχει token, κλωνοποίησε το request με `setHeaders: { Authorization: 'Bearer <token>' }`
  4. Χρησιμοποίησε `catchError`: αν `err.status === 401`, κάλεσε `logout()` και navigate στο login

**Βήμα 2:** Στο `app.config.ts`, άλλαξε το `provideHttpClient` σε `provideHttpClient(withInterceptors([authInterceptor]))`.

> **Functional interceptor (Angular 17+):** Αντί για class με `implements HttpInterceptor`, είναι απλά μια function. Εγγράφεται στο `app.config.ts` με `withInterceptors([...])`, όχι στο `app.module.ts`.

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `src/app/core/interceptors/auth.interceptor.ts`:

```typescript
import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  const cloned = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(cloned).pipe(
    catchError((err) => {
      if (err.status === 401) {
        authService.logout();
        router.navigate(['/auth/login']);
      }
      return throwError(() => err);
    })
  );
};
```

**Βήμα 2:** `app.config.ts`:

```typescript
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Cart/Orders requests έχουν `Authorization` header αυτόματα
- [ ] Expired token → αυτόματο logout + redirect

---

### Άσκηση 5.7 — Cart

**Στόχος:** Καλάθι αγορών με real-time ενημέρωση.

**Βήματα υλοποίησης**

**Βήμα 1:** `ng generate service core/services/cart`. Υλοποίησε `CartService` με:
- `BehaviorSubject<number>(0)` για το cart count και `cartCount$` observable
- `getCart()`:
  1. GET στο `/cart`
  2. Με `tap` για να ενημερώνει το `cartCount`
- `addToCart(productId, quantity)`:
  1. POST στο `/cart/add`
  2. Με `tap` για ενημέρωση count
- `removeFromCart(productId)`:
  1. DELETE στο `/cart/remove/:productId`
  2. Με `tap` για ενημέρωση count

**Βήμα 2:** `ng generate component features/cart/components/cart`

**Βήμα 3:** Στο navbar component, εμφάνισε cart count χρησιμοποιώντας `cartCount$ | async` pipe.

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `src/app/core/services/cart.service.ts`:

```typescript
@Injectable({ providedIn: 'root' })
export class CartService {
  private apiUrl = `${environment.apiUrl}/cart`;
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor(private http: HttpClient) {}

  getCart(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
      tap((cart: any) => this.cartCount.next(cart.items?.length || 0))
    );
  }

  addToCart(productId: string, quantity = 1): Observable<any> {
    return this.http.post(`${this.apiUrl}/add`, { productId, quantity }).pipe(
      tap((cart: any) => this.cartCount.next(cart.items?.length || 0))
    );
  }

  removeFromCart(productId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${productId}`).pipe(
      tap((cart: any) => this.cartCount.next(cart.items?.length || 0))
    );
  }
}
```

**Βήμα 3:** Navbar HTML:

```html
<a routerLink="/cart">
  Καλάθι <span class="badge">{{ cartCount$ | async }}</span>
</a>
```

</details>

**Bootstrap styling**
- Navbar με cart badge: `<span class="badge bg-danger rounded-pill">{{ cartCount$ | async }}</span>`
- Cart items σε table: `<table class="table table-hover">`
- Remove button: `<button class="btn btn-sm btn-outline-danger">`
- Σύνολο: `<div class="d-flex justify-content-between fw-bold fs-5">`
- Empty cart: `<div class="text-center py-5"><p class="text-muted">Το καλάθι σας είναι άδειο</p></div>`

**Κριτήρια επαλήθευσης**
- [ ] Add to cart → εμφανίζεται στο `/cart`
- [ ] Cart count στο navbar ενημερώνεται αυτόματα
- [ ] Remove → αφαιρείται, count μειώνεται
- [ ] Εμφανίζεται σύνολο κόστους

---

### Άσκηση 5.8 — Checkout

**Στόχος:** Ολοκλήρωση παραγγελίας.

**Βήματα υλοποίησης**

**Βήμα 1:** `ng generate component features/orders/components/checkout`

**Βήμα 2:** Στο `checkout.component.ts`:
  1. Δημιούργησε `FormGroup` με required fields: `street`, `city`, `postalCode`, `country`
  2. Στο `onCheckout()`, αν το form είναι invalid επέστρεψε
  3. Αλλιώς κάνε POST στο `/api/orders` με `{ shippingAddress: this.form.value }`
  4. Κάνε navigate στο `/orders/history` αν επιτύχει

<details>
<summary>💡 Λύση</summary>

**Βήμα 2:** `checkout.component.ts`:

```typescript
export class CheckoutComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.form = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onCheckout(): void {
    if (this.form.invalid) return;
    this.http.post(`${environment.apiUrl}/orders`, {
      shippingAddress: this.form.value
    }).subscribe({
      next: () => this.router.navigate(['/orders/history']),
      error: (err) => alert(err.error.message)
    });
  }
}
```

</details>

**Bootstrap styling**
- Φόρμα σε card: `<div class="card p-4"><h4 class="card-title">Στοιχεία αποστολής</h4>`
- Fields: `<div class="mb-3"><label class="form-label">Οδός</label><input class="form-control">`
- Submit: `<button class="btn btn-success w-100 mt-3">Ολοκλήρωση παραγγελίας</button>`

**Κριτήρια επαλήθευσης**
- [ ] Checkout δημιουργεί παραγγελία
- [ ] Redirect στο order history μετά επιτυχία
- [ ] Validation στα address fields

---

### Άσκηση 5.9 — Lazy Loading Modules

**Στόχος:** Να φορτώνεται κάθε module μόνο όταν χρειάζεται — καλύτερο performance.

**Βήματα υλοποίησης**

**Βήμα 1:** Στο `app.routes.ts`, χρησιμοποίησε `loadComponent` για lazy loading standalone components:
  1. Για κάθε route, χρησιμοποίησε `loadComponent: () => import('./features/...').then(m => m.ComponentName)`
  2. Πρόσθεσε `canActivate: [authGuard]` για cart/orders
  3. Πρόσθεσε `canActivate: [authGuard, adminGuard]` για admin

> **Standalone lazy loading:** Αντί για `loadChildren` (που φορτώνει module), χρησιμοποιείς `loadComponent` που φορτώνει απευθείας το component. Αν έχεις πολλά routes ανά feature, μπορείς να χρησιμοποιήσεις `loadChildren` με ξεχωριστό routes αρχείο.

**Βήμα 2:** Τρέξε `ng build` και παρατήρησε ότι δημιουργούνται χωριστά chunk files για κάθε module.

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `app-routing.module.ts`:

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () => import('./features/products/components/product-list/product-list')
      .then(m => m.ProductListComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./features/products/components/product-detail/product-detail')
      .then(m => m.ProductDetailComponent)
  },
  {
    path: 'auth/login',
    loadComponent: () => import('./features/auth/components/login/login')
      .then(m => m.LoginComponent)
  },
  {
    path: 'auth/register',
    loadComponent: () => import('./features/auth/components/register/register')
      .then(m => m.RegisterComponent)
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () => import('./features/cart/components/cart/cart')
      .then(m => m.CartComponent)
  },
  {
    path: 'checkout',
    canActivate: [authGuard],
    loadComponent: () => import('./features/orders/components/checkout/checkout')
      .then(m => m.CheckoutComponent)
  }
];
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] `ng build` δημιουργεί χωριστά chunk files (π.χ. `products-module.js`)
- [ ] Στο Network tab του browser, το admin module φορτώνεται μόνο όταν πας στο `/admin`

---

# PHASE 6 — Admin Panel

---

### Άσκηση 6.1 — Admin Dashboard

**Στόχος:** Overview σελίδα για τον admin με βασικά στατιστικά.

**Βήματα υλοποίησης**

**Βήμα 1:** Στο backend, δημιούργησε `routes/admin.js`:
  1. Δημιούργησε router που χρησιμοποιεί `authMiddleware` και `adminMiddleware` για όλα τα routes
  2. Φτιάξε `GET /stats` endpoint: με `Promise.all` πάρε `countDocuments()` για Products/Orders/Users και τα 5 τελευταία orders (με populate user)
  3. Χρησιμοποίησε `aggregate` για το total revenue
  4. Mount στο `server.js` στο `/api/admin`

**Βήμα 2:** `ng generate component features/admin/components/dashboard`

**Βήμα 3:** Στο dashboard component:
  1. Κάνε GET στο `/api/admin/stats`
  2. Εμφάνισε cards με: Total Products, Total Orders, Total Users, Total Revenue, Recent Orders

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `backend/routes/admin.js`:

```javascript
const router = express.Router();
router.use(authMiddleware, adminMiddleware);

router.get('/stats', async (req, res, next) => {
  try {
    const [totalProducts, totalOrders, totalUsers, recentOrders] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments(),
      Order.find().sort({ createdAt: -1 }).limit(5).populate('user', 'name email')
    ]);

    const revenue = await Order.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue: revenue[0]?.total || 0,
      recentOrders
    });
  } catch (err) { next(err); }
});

module.exports = router;
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Dashboard δείχνει σωστά στατιστικά
- [ ] Regular user δεν έχει πρόσβαση στο `/api/admin/stats`

---

### Άσκηση 6.2 — Product Management (Admin)

**Στόχος:** Admin να μπορεί να κάνει CRUD προϊόντα από το UI.

**Βήματα υλοποίησης**

**Βήμα 1:** `ng generate component features/admin/components/product-management`

**Βήμα 2:** Εμφάνισε λίστα products σε πίνακα με columns για name, price, stock και action buttons (Edit, Delete).

**Βήμα 3:** Υλοποίησε φόρμα δημιουργίας/επεξεργασίας:
  1. Χρησιμοποίησε Reactive Forms με validation για τα fields του product
  2. Η ίδια φόρμα χρησιμοποιείται και για create και για edit
  3. Αλλάζει μόνο το service method που καλείται (create vs update)

<details>
<summary>💡 Λύση</summary>

**Βήμα 2:** `product-management.component.html` — πίνακας:

```html
<table>
  <tr *ngFor="let product of products">
    <td>{{ product.name }}</td>
    <td>{{ product.price }}€</td>
    <td>{{ product.stock }}</td>
    <td>
      <button (click)="openEditModal(product)">Edit</button>
      <button (click)="deleteProduct(product._id!)">Delete</button>
    </td>
  </tr>
</table>
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Create → εμφανίζεται στη λίστα
- [ ] Edit → αλλάζουν τα στοιχεία
- [ ] Delete → αφαιρείται με confirmation

---

### Άσκηση 6.3 — Order Management (Admin)

**Στόχος:** Admin να βλέπει και να αλλάζει status παραγγελιών.

**Βήματα υλοποίησης**

**Βήμα 1:** `ng generate component features/admin/components/order-management`

**Βήμα 2:** Στο component:
  1. Εμφάνισε select για filter ανά status (Όλες/pending/processing/shipped/delivered)
  2. Εμφάνισε πίνακα orders με columns: id, user name, totalAmount
  3. Πρόσθεσε inline select για αλλαγή status — κάθε αλλαγή καλεί PUT στο `/api/orders/:id/status`

<details>
<summary>💡 Λύση</summary>

**Βήμα 2:** `order-management.component.html`:

```html
<select (change)="filterByStatus($any($event.target).value)">
  <option value="">Όλες</option>
  <option value="pending">Pending</option>
  <option value="processing">Processing</option>
  <option value="shipped">Shipped</option>
  <option value="delivered">Delivered</option>
</select>

<table>
  <tr *ngFor="let order of orders">
    <td>{{ order._id }}</td>
    <td>{{ order.user?.name }}</td>
    <td>{{ order.totalAmount }}€</td>
    <td>
      <select (change)="updateStatus(order._id, $any($event.target).value)">
        <option [value]="order.status">{{ order.status }}</option>
        <option value="processing">Processing</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
      </select>
    </td>
  </tr>
</table>
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Admin βλέπει όλες τις παραγγελίες
- [ ] Αλλαγή status → ενημερώνεται στη βάση

---

# PHASE 7 — Extra Features

---

### Άσκηση 7.1 — Search με MongoDB Text Index

**Στόχος:** Full-text αναζήτηση προϊόντων.

**Βήματα υλοποίησης**

**Βήμα 1:** Στο `Product.js` schema, πρόσθεσε text index στα fields `name`, `description`, `category` χρησιμοποιώντας `productSchema.index({ name: 'text', ... })`.

**Βήμα 2:** Στο `GET /api/products`, αν υπάρχει `req.query.search`, πρόσθεσε `filter.$text = { $search: req.query.search }` στο filter object.

**Βήμα 3:** Στο Angular product-list component:
  1. Πρόσθεσε `FormControl` για το search input
  2. Στο `ngOnInit`, subscribe στο `valueChanges` με `debounceTime(400)` και `distinctUntilChanged()`
  3. Κάλεσε `loadProducts({ search })` με κάθε αλλαγή

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `Product.js` schema:

```javascript
productSchema.index({ name: 'text', description: 'text', category: 'text' });
```

**Βήμα 2:** `routes/products.js` GET handler:

```javascript
if (req.query.search) {
  filter.$text = { $search: req.query.search };
}
```

**Βήμα 3:** Angular component:

```typescript
searchControl = new FormControl('');

ngOnInit(): void {
  this.searchControl.valueChanges.pipe(
    debounceTime(400),
    distinctUntilChanged()
  ).subscribe((search) => {
    this.loadProducts({ search });
  });
}
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Αναζήτηση "laptop" → επιστρέφει σχετικά προϊόντα
- [ ] Debounce — δεν γίνεται request σε κάθε keystroke

---

### Άσκηση 7.2 — Product Reviews & Ratings

**Στόχος:** Χρήστες να μπορούν να αφήνουν reviews.

**Βήματα υλοποίησης**

**Βήμα 1:** Στο `Product.js` schema, πρόσθεσε:
- `reviews` — array από objects με `user` (ObjectId ref User), `rating` (Number, min 1, max 5, required), `comment` (String, maxlength 500), `createdAt` (Date, default now)
- `averageRating` — Number, default 0

**Βήμα 2:** Πρόσθεσε endpoint `POST /api/products/:id/reviews` (με `authMiddleware`):
  1. Βρες το product — 404 αν δεν υπάρχει
  2. Αν ο user έχει ήδη αφήσει review → 400
  3. Αλλιώς push το νέο review στο array
  4. Υπολόγισε `averageRating` με `reduce`
  5. Αποθήκευσε και επέστρεψε 201

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `Product.js` schema additions:

```javascript
reviews: [
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5, required: true },
    comment: { type: String, maxlength: 500 },
    createdAt: { type: Date, default: Date.now }
  }
],
averageRating: { type: Number, default: 0 }
```

**Βήμα 2:** `routes/products.js`:

```javascript
router.post('/:id/reviews', authMiddleware, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user.id
    );
    if (alreadyReviewed) {
      return res.status(400).json({ message: 'Already reviewed' });
    }

    product.reviews.push({ user: req.user.id, ...req.body });
    product.averageRating =
      product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length;

    await product.save();
    res.status(201).json(product);
  } catch (err) { next(err); }
});
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Logged-in user μπορεί να αφήσει review
- [ ] Δεύτερο review από ίδιο user → 400
- [ ] `averageRating` υπολογίζεται σωστά

---

### Άσκηση 7.3 — Image Upload (Cloudinary)

**Στόχος:** Να ανεβάζεις εικόνες προϊόντων στο cloud.

**Βήματα υλοποίησης**

**Βήμα 1:** `npm install cloudinary multer multer-storage-cloudinary`

**Βήμα 2:** Πρόσθεσε στο `.env`: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` με τα credentials από το Cloudinary dashboard.

**Βήμα 3:** Δημιούργησε `backend/utils/cloudinary.js`:
  1. Κάνε `cloudinary.config()` με τα env variables
  2. Δημιούργησε `CloudinaryStorage` με folder `'shopsphere'` και allowed formats `jpg/png/webp`
  3. Κάνε export το `multer({ storage })`

**Βήμα 4:** Στο products router:
  1. Πρόσθεσε `POST /upload` endpoint με `authMiddleware`, `adminMiddleware` και `upload.single('image')`
  2. Επίστρεψε `{ imageUrl: req.file.path }`

<details>
<summary>💡 Λύση</summary>

**Βήμα 3:** `backend/utils/cloudinary.js`:

```javascript
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: { folder: 'shopsphere', allowed_formats: ['jpg', 'png', 'webp'] }
});

module.exports = multer({ storage });
```

**Βήμα 4:** `routes/products.js` upload endpoint:

```javascript
const upload = require('../utils/cloudinary');

router.post('/upload', authMiddleware, adminMiddleware, upload.single('image'), (req, res) => {
  res.json({ imageUrl: req.file.path });
});
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Upload εικόνας → επιστρέφει Cloudinary URL
- [ ] URL αποθηκεύεται στο product `imageUrl`

---

### Άσκηση 7.4 — Mock Payment / Stripe-ready Checkout

**Στόχος:** Να φτιάξεις checkout flow έτοιμο για Stripe.

**Βήματα υλοποίησης**

**Βήμα 1 (Mock):** Πρόσθεσε `paymentStatus` στο Order model — String enum `['pending', 'paid', 'failed']`, default `'pending'`.

**Βήμα 2:** Φτιάξε `POST /api/orders/:id/pay` endpoint (με `authMiddleware`):
  1. Βρες το order — 404 αν δεν υπάρχει
  2. Set `paymentStatus = 'paid'` και `status = 'processing'`
  3. Αποθήκευσε και επέστρεψε success message

**Βήμα 3 (Stripe-ready):** Για real Stripe integration:
  1. `npm install stripe`
  2. Αντικατάστησε το mock με `stripe.paymentIntents.create({ amount: totalAmount * 100, currency: 'eur', ... })`
  3. Επίστρεψε `clientSecret` στο frontend

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** Order model addition:

```javascript
paymentStatus: {
  type: String,
  enum: ['pending', 'paid', 'failed'],
  default: 'pending'
}
```

**Βήμα 2:** Mock payment endpoint:

```javascript
router.post('/:id/pay', authMiddleware, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Mock: πάντα επιτυχία
    order.paymentStatus = 'paid';
    order.status = 'processing';
    await order.save();

    res.json({ message: 'Payment successful', order });
  } catch (err) { next(err); }
});
```

**Βήμα 3:** Stripe-ready version:

```javascript
// npm install stripe
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const paymentIntent = await stripe.paymentIntents.create({
  amount: Math.round(order.totalAmount * 100), // cents
  currency: 'eur',
  metadata: { orderId: order._id.toString() }
});

res.json({ clientSecret: paymentIntent.client_secret });
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Mock: POST /api/orders/:id/pay → status αλλάζει σε "paid"
- [ ] (Stripe): Frontend λαμβάνει `clientSecret` και ολοκληρώνει πληρωμή

---

# PHASE 8 — Tests & Deployment

---

## Θεωρία Unit Testing με Jest

> Πηγή: *Node.js Testing* (Καραμπάτσης, AUEB)

---

**Τι είναι το Unit Testing**

- Δοκιμάζεις **μεμονωμένα τμήματα** κώδικα (functions, methods) σε απομόνωση
- Τα tests τρέχουν γρήγορα και δεν χρειάζονται real database
- Βρίσκεις bugs **νωρίς**, πριν φτάσουν σε production
- Χρησιμεύουν ως **documentation** — δείχνουν τι κάνει κάθε function

**Unit test vs Integration test:**
| | Unit Test | Integration Test |
|---|---|---|
| **Δοκιμάζει** | Μια function μόνη της | Πολλά layers μαζί |
| **Database** | Mock / in-memory | Real ή in-memory |
| **Ταχύτητα** | Πολύ γρήγορο | Αργό |
| **Παράδειγμα** | `productService.create()` | `POST /api/products` |

---

**Jest — JavaScript Testing Framework**

**Εγκατάσταση (TypeScript):**
```bash
npm install --save-dev jest ts-jest @types/jest supertest @types/supertest mongodb-memory-server
```

| Πακέτο | Χρήση |
|--------|-------|
| `jest` | Testing framework |
| `ts-jest` | TypeScript transformer για Jest |
| `@types/jest` | TypeScript types για `describe`, `expect` κτλ. |
| `supertest` | HTTP request testing χωρίς real server |
| `mongodb-memory-server` | In-memory MongoDB για tests |

**jest.config.ts:**
```typescript
export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'],
};
```

---

**Δομή Test** — describe / test / expect

```typescript
describe('productService', () => {
  //       ↑ όνομα ομάδας tests

  test('getById throws 404 if product not found', async () => {
    //   ↑ τι δοκιμάζεις

    // Arrange — ετοιμάζεις τα δεδομένα
    const fakeId = 'nonexistent-id';

    // Act + Assert — εκτελείς και ελέγχεις
    await expect(productService.getById(fakeId))
      .rejects.toMatchObject({ status: 404 });
  });

  it('create saves product to DB', async () => {
    // it() = alias του test()
    const dto = { name: 'Laptop', price: 999, category: 'Electronics' };
    const product = await productService.create(dto);

    expect(product.name).toBe('Laptop');
    expect(product.price).toBe(999);
    expect(product._id).toBeDefined();
  });
});
```

---

**Matchers — τι ελέγχεις**

```typescript
expect(value).toBe(42);                    // ===
expect(value).toEqual({ name: 'X' });      // deep equality
expect(value).toBeDefined();               // !== undefined
expect(value).toBeNull();                  // === null
expect(value).toBeTruthy();                // truthy
expect(value).toHaveLength(3);             // array/string length
expect(fn).toThrow();                      // ρίχνει error
expect(promise).rejects.toMatchObject({}); // promise reject
expect(mockFn).toHaveBeenCalledWith(id);   // mock calls
```

---

**Jest Commands**

```bash
npx jest                    # τρέξε όλα τα tests
npx jest --watch            # watch mode (ξανατρέχει κάθε φορά που αλλάζεις αρχείο)
npx jest --coverage         # code coverage report
npx jest product.test.ts    # τρέξε συγκεκριμένο αρχείο
npx jest -t "create"        # τρέξε tests που περιέχουν "create" στον τίτλο
```

---

**In-Memory MongoDB για Tests**

Αντί να χρησιμοποιείς real MongoDB, χρησιμοποιείς `mongodb-memory-server` — ξεκινά μια προσωρινή MongoDB στη μνήμη:

```typescript
// test setup (jest.setup.ts)
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  // καθαρισμός μετά από κάθε test
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});
```

---

**Integration Testing με supertest**

```typescript
import request from 'supertest';
import app from '../app'; // το Express app (χωρίς app.listen)

describe('POST /api/auth/login', () => {
  it('returns 400 if email missing', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ password: '123456' });

    expect(res.status).toBe(400);
  });

  it('returns token on valid credentials', async () => {
    // πρώτα register, μετά login
    await request(app).post('/api/auth/register')
      .send({ name: 'Test', email: 'test@test.com', password: '123456' });

    const res = await request(app).post('/api/auth/login')
      .send({ email: 'test@test.com', password: '123456' });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });
});
```

---

**AAA Pattern — Arrange, Act, Assert**

Κάθε test ακολουθεί αυτή τη δομή:

```typescript
it('updates product price', async () => {
  // ARRANGE — ετοιμάζεις την αρχική κατάσταση
  const created = await productRepository.create({
    name: 'Laptop', price: 999, category: 'Electronics'
  });

  // ACT — εκτελείς την ενέργεια που δοκιμάζεις
  const updated = await productService.update(created._id.toString(), { price: 799 });

  // ASSERT — ελέγχεις το αποτέλεσμα
  expect(updated.price).toBe(799);
  expect(updated.name).toBe('Laptop'); // δεν άλλαξε
});
```

---

### Άσκηση 8.1 — Unit Tests με Jest (Backend)

**Στόχος:** Να γράψεις tests για τα services.

**Βήματα υλοποίησης**

**Βήμα 1:** `npm install --save-dev jest supertest`

**Βήμα 2:** Στο `package.json`, πρόσθεσε script `"test": "jest --watchAll"`.

**Βήμα 3:** Δημιούργησε `backend/tests/products.test.js`:
  1. Χρησιμοποίησε `supertest` και `require('../server')`
  2. Γράψε test: `GET /api/products` → 200 με `products` property
  3. Γράψε test: `POST /api/products` χωρίς auth → 401

<details>
<summary>💡 Λύση</summary>

**Βήμα 2:** `package.json`:

```json
"scripts": {
  "test": "jest --watchAll"
}
```

**Βήμα 3:** `backend/tests/products.test.js`:

```javascript
const request = require('supertest');
const app = require('../server');

describe('Products API', () => {
  it('GET /api/products should return 200', async () => {
    const res = await request(app).get('/api/products');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('products');
  });

  it('POST /api/products without auth should return 401', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: 'Test', price: 10, category: 'Test' });
    expect(res.statusCode).toBe(401);
  });
});
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] `npm test` τρέχει χωρίς errors
- [ ] Tests pass για τα βασικά endpoints

---

### Άσκηση 8.2 — E2E Tests με Cypress (Frontend)

**Στόχος:** Αυτοματοποιημένα tests για το UI.

**Βήματα υλοποίησης**

**Βήμα 1:** `npm install --save-dev cypress`

**Βήμα 2:** Δημιούργησε `cypress/e2e/auth.cy.js` με δύο tests:
- Login success:
  1. Visit `/auth/login`
  2. Type email + password
  3. Click submit
  4. Assert URL contains `/products`
- Login error:
  1. Type wrong credentials
  2. Click submit
  3. Assert `.error` element is visible

<details>
<summary>💡 Λύση</summary>

**Βήμα 2:** `cypress/e2e/auth.cy.js`:

```javascript
describe('Authentication', () => {
  it('should login successfully', () => {
    cy.visit('/auth/login');
    cy.get('input[formControlName="email"]').type('test@test.com');
    cy.get('input[formControlName="password"]').type('123456');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/products');
  });

  it('should show error on invalid credentials', () => {
    cy.visit('/auth/login');
    cy.get('input[formControlName="email"]').type('wrong@test.com');
    cy.get('input[formControlName="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();
    cy.get('.error').should('be.visible');
  });
});
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] Login test pass
- [ ] Error message test pass

---

### Άσκηση 8.3 — Docker Setup

**Στόχος:** Να τρέχει όλο το stack με ένα command.

**Βήματα υλοποίησης**

**Βήμα 1:** Δημιούργησε `backend/Dockerfile`:
  1. Base image `node:20-alpine`
  2. WORKDIR `/app`
  3. Copy `package*.json` και run `npm ci --only=production`
  4. Copy source
  5. EXPOSE 3000, CMD `["node", "server.js"]`

**Βήμα 2:** Δημιούργησε `docker-compose.yml` στη ρίζα με δύο services:
  1. `backend` — build από `./backend`, port 3000:3000, env variables, depends_on mongo
  2. `mongo` — image `mongo:7`, port 27017:27017, volume για persistence

**Βήμα 3:** `docker-compose up --build`

<details>
<summary>💡 Λύση</summary>

**Βήμα 1:** `backend/Dockerfile`:

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "server.js"]
```

**Βήμα 2:** `docker-compose.yml` (root):

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"
    environment:
      - MONGO_URI=mongodb://mongo:27017/mean-eshop
      - JWT_SECRET=mysecretkey
    depends_on:
      - mongo

  mongo:
    image: mongo:7
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
```

</details>

**Κριτήρια επαλήθευσης**
- [ ] `docker-compose up` ξεκινά backend + MongoDB
- [ ] API accessible στο `localhost:3000`

---

### Άσκηση 8.4 — Deploy

**Στόχος:** Live production deployment.

**Backend → Render.com**
1. Push backend σε GitHub repo
2. Render → New Web Service → connect repo
3. Build command: `npm install`
4. Start command: `node server.js`
5. Env variables: `MONGO_URI`, `JWT_SECRET`, `CLIENT_URL`

**Database → MongoDB Atlas**
1. atlas.mongodb.com → Free cluster
2. Whitelist IP: `0.0.0.0/0`
3. Copy connection string → `MONGO_URI` στο Render

**Frontend → Vercel**
1. Push Angular app σε GitHub
2. Vercel → Import project
3. Build command: `ng build --configuration production`
4. Output directory: `dist/eshop-frontend`
5. Env var: `apiUrl` → το Render URL

**Κριτήρια επαλήθευσης**
- [ ] Backend live σε `https://your-app.onrender.com`
- [ ] Frontend live σε `https://your-app.vercel.app`
- [ ] Login/Register δουλεύει σε production

