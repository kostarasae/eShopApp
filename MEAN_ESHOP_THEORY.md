# MEAN Stack — Θεωρία

Συλλογή θεωρητικού υλικού από τις ασκήσεις του e-shop project.

---

## Περιεχόμενα

1. [JavaScript](#javascript--objects-functions-modules)
2. [Node.js + Express](#nodejs--express)
3. [TypeScript](#typescript--μεθοδολογία--αρχιτεκτονική)
4. [MongoDB + TypeScript](#mongodb--typescript--δομή-project)
5. [DTO / DAO](#dto--dao--μεταφορά-δεδομένων-μεταξύ-layers)

---

# JavaScript — Objects, Functions, Modules

> Πηγή: *JavaScript Objects & Functions* (Ανδρούτσος, AUEB)

---

### Objects

```javascript
// Object literal
const product = {
  name: 'Laptop',
  price: 999,
  getLabel() { return `${this.name}: ${this.price}€`; }
};

// Property access
product.name          // dot notation
product['name']       // bracket notation — χρήσιμο για dynamic keys

// Destructuring
const { name, price } = product;

// Spread — αντίγραφο με αλλαγές
const updated = { ...product, price: 899 };
```

---

### Functions

```javascript
// Function declaration
function greet(name) { return `Hello ${name}`; }

// Function expression
const greet = function(name) { return `Hello ${name}`; };

// Arrow function — σύντομη σύνταξη, δεν έχει δικό της `this`
const greet = (name) => `Hello ${name}`;
const double = n => n * 2;           // παράμετρος χωρίς ()
const getObj = () => ({ id: 1 });    // επιστρέφει object: χρειάζεται ()
```

**Πότε ΔΕΝ χρησιμοποιείς arrow function:**
- σε Mongoose middleware (`pre`, `post`) — χρειάζεσαι `this`
- σε object methods που χρησιμοποιούν `this`

---

### Closures

Μια function που "θυμάται" τις μεταβλητές του scope που δημιουργήθηκε:

```javascript
function makeCounter() {
  let count = 0;
  return function() { return ++count; }; // η εσωτερική "θυμάται" το count
}
const counter = makeCounter();
counter(); // 1
counter(); // 2
```

---

### Higher-Order Functions (HOF)

Functions που παίρνουν ή επιστρέφουν άλλες functions:

```javascript
const prices = [10, 25, 5, 40, 15];

prices.map(p => p * 1.24);           // → [12.4, 31, 6.2, 49.6, 18.6]
prices.filter(p => p > 10);          // → [25, 40, 15]
prices.reduce((sum, p) => sum + p, 0); // → 95

// Συνδυασμός
prices
  .filter(p => p > 10)
  .map(p => p * 1.24);
```

---

### Rest & Spread

```javascript
// Rest — μαζεύει τα υπόλοιπα arguments σε array
function sum(...numbers) {
  return numbers.reduce((a, b) => a + b, 0);
}
sum(1, 2, 3, 4); // 10

// Spread — "ξεδιπλώνει" array/object
const a = [1, 2];
const b = [3, 4];
const all = [...a, ...b]; // [1, 2, 3, 4]

const obj1 = { x: 1 };
const obj2 = { y: 2 };
const merged = { ...obj1, ...obj2 }; // { x: 1, y: 2 }
```

---

### Sets

Collection από **μοναδικές** τιμές:

```javascript
const categories = new Set(['Electronics', 'Books', 'Electronics']);
// → Set { 'Electronics', 'Books' } — duplicate αφαιρέθηκε

categories.add('Clothing');
categories.has('Books');    // true
categories.delete('Books');
[...categories]             // μετατροπή σε array
```

---

### Modules (ES6)

```javascript
// math.js
export const PI = 3.14;
export function add(a, b) { return a + b; }
export default class Calculator { ... }

// main.js
import Calculator from './math';          // default import
import { PI, add } from './math';         // named imports
import * as Math from './math';           // όλα μαζί
```

**Στο Node.js** χρησιμοποιείς:
```javascript
// CommonJS (παλιό — .js αρχεία)
module.exports = { add };
const { add } = require('./math');

// ES Modules (νέο — .ts αρχεία με TypeScript)
export const add = ...;
import { add } from './math';
```

---

# Node.js + Express

> Πηγή: *Node.js & Express* (Καραμπάτσης, AUEB)

---

### Τι είναι το Node.js

- **JavaScript runtime** πάνω στο V8 engine του Chrome
- Τρέχει JavaScript **εκτός browser** — στον server
- **Event-driven, non-blocking I/O** — δεν περιμένει blocking operations
- **Single thread** — χρησιμοποιεί event loop για concurrency

```
Browser:  JavaScript → Chrome V8 → DOM, Web APIs
Node.js:  JavaScript → Chrome V8 → File System, HTTP, OS...
```

---

### npm — Node Package Manager

```bash
npm init -y                    # δημιουργεί package.json
npm install express            # εγκαθιστά + προσθέτει στο dependencies
npm install --save-dev jest    # εγκαθιστά + προσθέτει στο devDependencies
npm run start                  # τρέχει το "start" script
```

**package.json — τα βασικά πεδία:**
```json
{
  "name": "mean-eshop",
  "version": "1.0.0",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js",
    "test": "jest"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mongoose": "^7.0.0"
  },
  "devDependencies": {
    "nodemon": "^3.0.0"
  }
}
```

- `dependencies` → πακέτα που χρειάζονται σε **production**
- `devDependencies` → πακέτα μόνο για **development** (tests, linting, transpilation)

---

### HTTP Methods

| Method | Χρήση | Παράδειγμα |
|--------|-------|------------|
| `GET` | Ανάγνωση δεδομένων | `GET /api/products` |
| `POST` | Δημιουργία | `POST /api/products` |
| `PUT` | Πλήρης ενημέρωση | `PUT /api/products/:id` |
| `PATCH` | Μερική ενημέρωση | `PATCH /api/products/:id` |
| `DELETE` | Διαγραφή | `DELETE /api/products/:id` |

**HTTP Status Codes:**
- `200 OK` — επιτυχία
- `201 Created` — δημιουργήθηκε
- `400 Bad Request` — λάθος δεδομένα από client
- `401 Unauthorized` — δεν έχεις κάνει login
- `403 Forbidden` — έχεις κάνει login αλλά δεν έχεις δικαίωμα
- `404 Not Found` — δεν βρέθηκε
- `409 Conflict` — π.χ. duplicate email
- `500 Internal Server Error` — πρόβλημα στον server

---

### Express Framework

```javascript
import express from 'express';
const app = express();

app.use(express.json());       // middleware: parse JSON body

app.get('/api/products', (req, res) => {
  //   ↑ method      ↑ path    ↑ request   ↑ response
  res.json({ products: [] });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

**req (Request) — τα σημαντικά:**
```javascript
req.body       // POST/PUT body (parsed JSON)
req.params.id  // URL params: /products/:id
req.query.page // Query string: ?page=2
req.headers    // HTTP headers
req.user       // custom — βάζεται από auth middleware
```

---

### MVC Architecture

Το Express project οργανώνεται σε layers:

```
routes/        ← ορίζει τα URL paths + συνδέει με controllers
controllers/   ← χειρίζεται request/response, καλεί services
services/      ← επιχειρηματική λογική, καλεί repositories/models
models/        ← Mongoose schemas + DB queries
middleware/    ← functions που τρέχουν πριν τον controller
```

Ροή ενός request:
```
HTTP Request
    ↓
Router (ποιο URL;)
    ↓
Middleware (auth check, validation...)
    ↓
Controller (req/res handling)
    ↓
Service (business logic)
    ↓
Model (database)
    ↓
HTTP Response
```

---

### Middleware

```javascript
// Middleware = function με (req, res, next)
const logRequest = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // ← ΑΠΑΡΑΙΤΗΤΟ — πέρνα στο επόμενο middleware/route
};

app.use(logRequest);         // εφαρμόζεται σε ΟΛΑ τα routes
app.use('/api', logRequest); // μόνο για routes που αρχίζουν με /api
```

Τα built-in middleware του Express:
```javascript
app.use(express.json());          // parse JSON body
app.use(express.urlencoded(...)); // parse form data
```

---

### Environment Variables

```bash
# .env αρχείο (ΔΕΝ ανεβαίνει στο git)
PORT=3000
MONGO_URI=mongodb://localhost:27017/eshop
JWT_SECRET=mysecretkey
NODE_ENV=development
```

```javascript
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 3000;
```

Γιατί `.env`: οι ευαίσθητες πληροφορίες (passwords, secrets) δεν μπαίνουν στον κώδικα.

---

# TypeScript — Μεθοδολογία & Αρχιτεκτονική

---

### 1. Κάθε αρχείο είναι ένα "κουτί"

Φαντάσου κάθε `.ts` αρχείο σαν κουτί με εργαλεία.
- Ό,τι υπάρχει μέσα **είναι ιδιωτικό** — κανείς άλλος δεν το βλέπει.
- Για να το δει κάποιος άλλος, πρέπει να το **βγάλεις έξω** από το κουτί.

```
export  →  βγάζεις κάτι έξω από το κουτί
import  →  παίρνεις κάτι από άλλο κουτί
```

---

### 2. `export` — κάνεις κάτι διαθέσιμο

```typescript
export interface IProduct { ... }   // ← άλλα αρχεία μπορούν να το χρησιμοποιήσουν
export const config = { ... }       // ← export σε μεταβλητή
```

Αν δεν βάλεις `export`:
```typescript
interface IProduct { ... }          // ← υπάρχει μόνο σε αυτό το αρχείο
```

---

### 3. `import` — παίρνεις κάτι από άλλο αρχείο

**α) Από εξωτερική βιβλιοθήκη** (από `node_modules`):
```typescript
import { Document } from "mongoose"
//        ↑                  ↑
//   τι θέλεις          από ποια βιβλιοθήκη
```

**β) Από δικό σου αρχείο** (με `./` ή `../`):
```typescript
import { IProduct } from "../types/product.types"
//        ↑                       ↑
//   τι θέλεις          path προς το αρχείο (χωρίς .ts)
```

Το `../` σημαίνει "πήγαινε έναν φάκελο πάνω". Άρα από `models/Product.ts`, το `../types/product.types` σημαίνει: πήγαινε στον `src/` και μετά μπες στο `types/`.

---

### 4. TypeScript — τι προσθέτει πάνω στη JavaScript

Η JavaScript ΔΕΝ έχει types. Η TypeScript τα προσθέτει. Αυτά **σβήνουν** κατά το compile — η τελική JavaScript δεν τα έχει.

| TypeScript | Τι κάνει | Παράδειγμα |
|---|---|---|
| `interface` | Ορίζει "σχήμα" αντικειμένου | `interface IProduct { name: string }` |
| `enum` | Σταθερές με όνομα | `enum UserRole { ADMIN = 'admin' }` |
| `: string` | Δηλώνει τύπο μεταβλητής | `const x: string = 'hello'` |
| `?: ` | Προαιρετικό πεδίο | `description?: string` |

---

### 5. Δομή αρχείου — η σωστή σειρά

Κάθε `.ts` αρχείο ακολουθεί **πάντα αυτή τη σειρά**:

```
┌─────────────────────────────────────┐
│  1. imports (τι χρειάζομαι)         │
│  2. interfaces / types (ορισμοί)    │
│  3. κύρια λογική (const, function)  │
│  4. export (τι δίνω σε άλλους)      │
└─────────────────────────────────────┘
```

---

### 6. Πώς εφαρμόζεται στο project — layer by layer

```
types/product.types.ts       → μόνο ορισμοί, καμία λογική
        ↓ import
models/Product.ts            → IProduct + Schema + model
        ↓ import
repositories/product.repository.ts   → Product.find(), Product.findById()...
        ↓ import
services/product.service.ts          → επιχειρηματική λογική
        ↓ import
controllers/product.controller.ts    → χειρίζεται HTTP request/response
```

---

### 7. Checklist — πριν γράψεις οποιοδήποτε αρχείο

1. **Τι χρειάζομαι από αλλού;** → γράψε τα `import` πρώτα
2. **Τι νέους τύπους ορίζω εδώ;** → `interface` / `enum`
3. **Ποια είναι η κύρια λογική;** → `const`, `function`
4. **Τι θέλω να δώσω σε άλλους;** → βάλε `export` σε αυτά

---

### Interface vs Document — πότε χρησιμοποιείς τι;

- `IProduct` = τα **καθαρά δεδομένα** (`name`, `price`, κτλ.) — καθαρό TypeScript, χωρίς Mongoose
- `ProductDocument` = `IProduct` + **Mongoose methods** (`.save()`, `._id` ως ObjectId, κτλ.)

Το repository επιστρέφει `ProductDocument` γιατί μιλά με τη βάση. Το service μπορεί να επιστρέψει `IProduct` (αν κάνεις mapper) ή `ProductDocument` (πιο απλό).

**Τι είναι το `Document`;**

Είναι Mongoose class που κάθε αντικείμενο από τη βάση "κληρονομεί". Προσθέτει:
- `_id` ως `ObjectId`
- `.save()`, `.remove()`, `.toJSON()`
- `__v`, `createdAt`, `updatedAt`

---

### Γιατί τόσα `:` στη σύνταξη;

```typescript
async getAll(): Promise<ProductDocument[]> {
//           ^^ return type της function

async getById(id: string): Promise<ProductDocument> {
//                ^^ τύπος parameter    ^^ return type
```

Κάθε `:` λέει στο TypeScript τον τύπο αυτού που ακολουθεί.

---

### Return type στο TypeScript vs JavaScript

Στη JavaScript δεν υπάρχει return type:
```javascript
function getAll() {
  return something;
}
```

Στο TypeScript προστίθεται μετά το κλείσιμο της παρένθεσης:
```typescript
function getAll(): Promise<ProductDocument[]> {
//               ^^ πάντα μετά τις παρενθέσεις
  return something;
}
```

Η σειρά είναι πάντα: `όνομα(param: τύπος): ReturnType`

---

### Γιατί `Object.assign` στο `throw`;

```typescript
throw new Error('Not found');
// Έχει μόνο .message — το Express στέλνει 500 πάντα
```

```typescript
throw Object.assign(new Error('Not found'), { status: 404 });
// Έχει .message ΚΑΙ .status — το error middleware διαβάζει το .status και στέλνει 404
```

Το `Object.assign(target, source)` αντιγράφει properties από το `source` στο `target`. Εδώ προσθέτει `{ status: 404 }` στο Error object.

---

### Object style vs Class style — τι διαφορά έχουν;

Θα μπορούσαμε:
```typescript
export async function getAll() { ... }
export async function getById(id: string) { ... }
```

Αλλά το object style ομαδοποιεί τα σχετικά functions και ξέρεις από πού έρχονται:
```typescript
productService.getAll()   // ξεκάθαρο
getAll()                  // από πού;
```

Και είναι ισοδύναμο με class:
```typescript
// Class style
class ProductService {
    async getAll(): Promise<ProductDocument[]> { ... }
}
export const productService = new ProductService();

// Object style (αυτό που κάνουμε — πιο απλό)
export const productService = {
    async getAll(): Promise<ProductDocument[]> { ... }
};
```

Η class έχει επιπλέον features (`constructor`, `extends`, `this`) που δεν χρειαζόμαστε εδώ.

---

### Routes — συχνές ερωτήσεις

**Τι κάνει το `:id` στο path;**
```typescript
router.get('/:id', productController.getById);
//          ^^^ dynamic segment — οποιαδήποτε τιμή εδώ
// Προσβάσιμη μέσω: req.params.id
```

**Γιατί `productController.getById` χωρίς `()`;**

Δεν καλούμε τη function — την παραδίδουμε ως reference. Η Express θα την καλέσει όταν έρθει request.

**Γιατί μπορούν να μπουν πολλά functions στο route;**
```typescript
router.post('/', authMiddleware, adminMiddleware, productController.create);
// Express τα τρέχει σειριακά: auth → admin → controller
// Αν κάποιο middleware δεν καλέσει next(), η αλυσίδα σταματά
```

**Γιατί το GET δεν έχει middleware;**

Τα public endpoints (ανάγνωση) δεν χρειάζονται auth. Μόνο τα write operations (POST/PUT/DELETE) προστατεύονται.

**Τι κάνει το `export default router`;**

Κάθε routes αρχείο έχει έναν router. Με `export default` τον εξάγεις ώστε το `app.ts` να τον κάνει import και να τον χρησιμοποιεί σαν middleware για ένα συγκεκριμένο path prefix.

---

### Σειρά middleware στο app.ts — γιατί μετράει;

```typescript
app.use(cors());          // 1. CORS headers — πρέπει να είναι πρώτο
app.use(express.json());  // 2. Parse JSON body — πριν τα routes
app.use(morgan('dev'));    // 3. Logging
app.use('/api/auth', authRoutes);      // 4. Routes
app.use('/api/products', productRoutes);
app.use(errorMiddleware); // 5. Error handler — ΠΑΝΤΑ τελευταίο
```

Το Express εκτελεί middleware με τη σειρά που ορίζονται. Το error middleware αναγνωρίζεται αυτόματα από το Express γιατί έχει **4 παραμέτρους** `(err, req, res, next)`.

---

# MongoDB + TypeScript — Δομή Project

> Πηγή: *Node.js + Express + MongoDB + TypeScript CRUD* (Καραμπάτσης, AUEB)

---

### Πακέτα του Project

```bash
# Production dependencies
npm install express mongoose bcrypt dotenv jsonwebtoken zod

# Dev dependencies
npm install --save-dev typescript ts-node nodemon @types/express @types/node \
  @types/bcrypt @types/jsonwebtoken jest ts-jest supertest @types/supertest
```

| Πακέτο | Χρήση |
|--------|-------|
| `express` | Web framework |
| `mongoose` | MongoDB ORM |
| `bcrypt` | Password hashing |
| `dotenv` | Environment variables |
| `jsonwebtoken` | JWT sign/verify |
| `zod` | Runtime validation |
| `ts-jest` | TypeScript support για Jest |
| `supertest` | HTTP testing |

---

### tsconfig.json — Τα Βασικά

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "types": ["node", "jest"]
  }
}
```

| Option | Τι κάνει |
|--------|----------|
| `target` | Σε ποια έκδοση JS θα μεταγλωττίζεται |
| `module` | Τύπος modules (commonjs = Node.js standard) |
| `outDir` | Που θα πάνε τα compiled `.js` αρχεία |
| `rootDir` | Που είναι τα `.ts` source files |
| `strict` | Ενεργοποιεί αυστηρούς type checks |
| `skipLibCheck` | Αγνοεί type errors σε `node_modules` |
| `esModuleInterop` | Επιτρέπει `import X from 'x'` (αντί `import * as X`) |

---

### Δομή Φακέλων (MVC + Layers)

```
backend/src/
  config/
    database.ts         ← connectDatabase()
    config.ts           ← port, jwtSecret, mongoUri
  types/
    product.types.ts    ← IProduct, CreateProductDto, UpdateProductDto
    user.types.ts       ← IUser, UserRole, RegisterDto, LoginDto
    cart.types.ts       ← ICart, ICartItem, AddToCartDto
    express.d.ts        ← επέκταση του Request (req.user)
  models/
    Product.ts          ← Mongoose Schema + ProductDocument
    User.ts             ← Mongoose Schema + UserDocument
    Cart.ts             ← Mongoose Schema + CartDocument
  repositories/
    product.repository.ts  ← find, findById, create, update, delete
    user.repository.ts     ← findByEmail, create
    cart.repository.ts     ← findByUser, save
  services/
    product.service.ts  ← business logic για products
    auth.service.ts     ← register, login, JWT
  controllers/
    product.controller.ts  ← HTTP request/response για products
    auth.controller.ts     ← HTTP request/response για auth
  middleware/
    auth.middleware.ts   ← JWT verification
    admin.middleware.ts  ← role check
    error.middleware.ts  ← centralized error handling
  routes/
    product.routes.ts   ← GET/POST/PUT/DELETE /api/products
    auth.routes.ts      ← POST /api/auth/register, /api/auth/login
  app.ts                ← Express app setup
  server.ts             ← entry point, DB connect, app.listen
```

---

### Ροή Δεδομένων (Request Lifecycle)

```
POST /api/products  →  product.routes.ts
                           ↓  auth.middleware (verify JWT)
                           ↓  admin.middleware (check role)
                           ↓  product.controller.create(req, res, next)
                                  ↓  product.service.create(dto)
                                         ↓  product.repository.create(data)
                                                ↓  Product.create(data)  ← MongoDB
                                         ↑  ProductDocument
                                  ↑  IProduct
                           ↑  res.status(201).json(product)
```

Κάθε layer έχει **μόνο μια αρμοδιότητα**:
- **Route**: ορίζει path + middleware chain
- **Controller**: διαβάζει req, καλεί service, γράφει res
- **Service**: επιχειρηματική λογική (validation, error throwing)
- **Repository**: μόνο DB queries
- **Model**: Mongoose schema definition

---

# DTO / DAO — Μεταφορά Δεδομένων μεταξύ Layers

> Πηγή: *DTO, DAO, Interfaces* (Καραμπάτσης, AUEB)

---

### DTO — Data Transfer Object

**Ορισμός:** Object που χρησιμοποιείται αποκλειστικά για τη **μεταφορά δεδομένων** μεταξύ layers. Δεν έχει επιχειρηματική λογική.

```typescript
// Ο client στέλνει αυτό:
interface CreateProductDto {
  name: string;
  price: number;
  category: string;
  description?: string;
  stock?: number;
}

// Ο server επιστρέφει αυτό:
interface AuthResponseDto {
  token: string;
  user: { id: string; name: string; role: string };
}
```

**Γιατί DTO και όχι απ' ευθείας το Model;**
- Το model έχει `password` — δεν το στέλνεις στον client
- Το model έχει `__v`, `createdAt` — μπορεί να μην τα θέλεις
- Το DTO ορίζει **ακριβώς** τι περνά από κάθε σύνορο

---

### DAO — Data Access Object

**Ορισμός:** Object (ή class/module) που **ενθυλακώνει όλες τις DB queries**. Κανένα άλλο layer δεν αγγίζει τη βάση απευθείας.

```typescript
// product.repository.ts (= DAO για products)
export const productRepository = {
  findAll: () => Product.find(),
  findById: (id: string) => Product.findById(id),
  create: (data: CreateProductDto) => Product.create(data),
  update: (id: string, data: UpdateProductDto) =>
    Product.findByIdAndUpdate(id, data, { new: true }),
  deleteById: (id: string) => Product.findByIdAndDelete(id),
};
```

---

### DTO vs DAO — Σύγκριση

| | DTO | DAO |
|---|---|---|
| **Τι είναι** | Αντικείμενο δεδομένων | Module με DB functions |
| **Σκοπός** | Μεταφορά δεδομένων | Πρόσβαση στη βάση |
| **Λογική** | Καμία | Μόνο queries |
| **Παράδειγμα** | `CreateProductDto` | `productRepository` |

---

### DTO vs Interface — Σύγκριση

| | Interface | DTO |
|---|---|---|
| **TypeScript** | Μόνο TS (σβήνει στο compile) | Μπορεί να είναι TS ή JS |
| **Runtime** | Δεν υπάρχει | Μπορεί να έχει validation |
| **Χρήση** | Type checking μόνο | Μεταφορά + validation |
| **Παράδειγμα** | `interface IProduct {}` | `class CreateProductDto {}` με decorators |

Στο project μας χρησιμοποιούμε **interfaces ως DTOs** (TypeScript-only approach — αρκεί για backend χωρίς class-transformer).

---

### Πλήρης Κύκλος Δεδομένων (CRUD)

**CREATE**
```
Client  →[CreateProductDto]→  Controller
                                   ↓
                              Service  (validation, business rules)
                                   ↓[CreateProductDto]
                              Repository
                                   ↓
                              MongoDB  →  αποθηκεύει
                                   ↑[ProductDocument]
                              Repository
                                   ↑[IProduct]
                              Service
                                   ↑
                              Controller  →[res.status(201).json(product)]→  Client
```

**READ**
```
Client  →[GET /api/products/:id]→  Controller
                                        ↓[id: string]
                                   Service
                                        ↓[id: string]
                                   Repository  →  Product.findById(id)
                                        ↑[ProductDocument | null]
                                   Service  (throw 404 αν null)
                                        ↑[IProduct]
                                   Controller  →[res.json(product)]→  Client
```

**UPDATE**
```
Client  →[UpdateProductDto]→  Controller
                                   ↓[id, UpdateProductDto]
                              Service
                                   ↓
                              Repository  →  Product.findByIdAndUpdate(id, data, {new: true})
                                   ↑[ProductDocument | null]
                              Service  (throw 404 αν null)
                                   ↑[IProduct]
                              Controller  →[res.json(updated)]→  Client
```

**DELETE**
```
Client  →[DELETE /api/products/:id]→  Controller
                                           ↓[id]
                                      Service
                                           ↓
                                      Repository  →  Product.findByIdAndDelete(id)
                                           ↑[ProductDocument | null]
                                      Service  (throw 404 αν null, return true)
                                           ↑[boolean]
                                      Controller  →[res.status(204).send()]→  Client
```
