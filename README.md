# Stanbic Bank Zimbabwe App Clone

A full-stack banking application simulator featuring both web and mobile versions of the Stanbic Bank Zimbabwe app with simulated biometric authentication, multi-account management, transfers, bill payments, and transaction history.

## 🎯 Features

### Core Banking Features
- ✅ Dashboard with account overview and balances
- ✅ Multi-account management (linked accounts)
- ✅ Fund transfers (between accounts, to other users)
- ✅ Bill payments (DStv, ZETDC, airtime top-ups)
- ✅ Transaction history and filtering
- ✅ Digital payment receipts and proof of payment
- ✅ Account linking and management

### Security & Authentication
- ✅ Simulated biometric login (fingerprint & facial recognition)
- ✅ PIN/password fallback authentication
- ✅ JWT-based session management
- ✅ Secure token storage

### UI/UX
- ✅ Stanbic brand color scheme (corporate blue & white)
- ✅ Modern, clean interface design
- ✅ High-contrast text for readability
- ✅ Quick action shortcuts
- ✅ Bottom/side navigation with financial icons

## 📁 Project Structure

```
stanbic-bank-zimbabwe-app/
├── backend/                    # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── controllers/        # API endpoint handlers
│   │   ├── models/             # MongoDB schemas
│   │   ├── routes/             # API routes
│   │   ├── middleware/         # Authentication, logging
│   │   ├── services/           # Business logic
│   │   └── config/             # Database and env config
│   ├── seeds/                  # Mock data seeding
│   └── package.json
│
├── web/                        # React + TypeScript Web App
│   ├── src/
│   │   ├── components/         # Reusable React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API client services
│   │   ├── hooks/              # Custom React hooks
│   │   ├── context/            # React Context for state
│   │   ├── styles/             # CSS/styled-components
│   │   ├── utils/              # Helper functions
│   │   └── App.tsx
│   ├── public/                 # Static assets
│   └── package.json
│
├── mobile/                     # React Native Mobile App
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   ├── screens/            # Screen components
│   │   ├── navigation/         # React Navigation
│   │   ├── services/           # API client
│   │   ├── hooks/              # Custom hooks
│   │   ├── context/            # Context API
│   │   ├── utils/              # Helper functions
│   │   └── App.tsx
│   ├── app.json
│   └── package.json
│
└── docs/                       # Documentation
    ├── API.md
    ├── SETUP.md
    └── FEATURES.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js v16+
- npm or yarn
- MongoDB (local or Atlas)
- Android Studio (for mobile development)
- Xcode (for iOS development)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Configure MongoDB connection in .env
npm run seed          # Seed mock data
npm run dev           # Start development server
```

### Web App Setup

```bash
cd web
npm install
npm start             # Starts on http://localhost:3000
```

### Mobile App Setup

```bash
cd mobile
npm install
npm run android       # For Android
# or
npm run ios           # For iOS
```

## 🔐 Simulated Biometric Authentication

### How It Works

1. **Web Version**:
   - Animated biometric scanner UI
   - Mock fingerprint/face verification (2-3 second simulation)
   - Generates mock biometric template
   - Returns JWT token on success

2. **Mobile Version**:
   - Integrates with device native biometric APIs
   - Fingerprint sensor simulation
   - Face ID/recognition simulation
   - Secure token storage in device keychain/keystore

### Default Test Credentials

```
Username: demo@stanbic.com
Password: Demo123456!
Fingerprint: Any touch simulation
Face ID: Any face scan simulation
```

## 📊 Mock Banking Data

The application includes pre-seeded mock data:

- **Test Accounts**: 3 linked accounts (ZWL, USD, GBP)
- **Test Transactions**: 20+ recent transactions
- **Test Beneficiaries**: Common bill payment recipients
- **Test Bills**: ZETDC, DStv, airtime top-ups

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/login` - Login with credentials
- `POST /api/auth/biometric` - Biometric authentication
- `POST /api/auth/logout` - Logout
- `POST /api/auth/verify` - Verify JWT token

### Accounts
- `GET /api/accounts` - Get all linked accounts
- `GET /api/accounts/:id` - Get account details
- `GET /api/accounts/:id/balance` - Get account balance

### Transactions
- `GET /api/transactions` - Get transaction history
- `GET /api/transactions/:id` - Get transaction details
- `POST /api/transactions/transfer` - Create transfer
- `POST /api/transactions/bill-payment` - Pay bills

### Bills
- `GET /api/bills/providers` - Get bill providers
- `POST /api/bills/pay` - Pay bill
- `GET /api/bills/history` - Get payment history

## 🎨 Design System

### Color Palette
- Primary Blue: `#0066CC`
- Secondary Blue: `#004499`
- White: `#FFFFFF`
- Light Gray: `#F5F5F5`
- Dark Text: `#333333`

### Typography
- Headings: Bold, high contrast
- Body: Regular weight, accessible sizing
- Icons: Standard financial symbols

## 📱 Responsive Design

- **Desktop**: Full-featured web interface
- **Tablet**: Responsive layout
- **Mobile**: Native app experience

## 🧪 Testing

```bash
# Backend tests
cd backend && npm test

# Web app tests
cd web && npm test

# Mobile app tests
cd mobile && npm test
```

## 📝 API Documentation

See [docs/API.md](docs/API.md) for detailed API documentation.

## 🛠️ Development

### Environment Variables

Create `.env` files in each directory:

**Backend (.env)**
```
MONGODB_URI=mongodb://localhost:27017/stanbic
JWT_SECRET=your-secret-key
NODE_ENV=development
PORT=5000
```

**Web (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
```

**Mobile (.env)**
```
REACT_APP_API_URL=http://localhost:5000/api
```

## 📚 Architecture

### Technology Stack

**Backend**
- Node.js & Express.js
- MongoDB
- JWT authentication
- Bcrypt for password hashing

**Web Frontend**
- React 18+
- TypeScript
- Redux Toolkit (state management)
- Styled Components
- Axios (HTTP client)

**Mobile Frontend**
- React Native
- TypeScript
- React Navigation
- Context API
- Axios (HTTP client)

## 🚦 Development Workflow

1. Create feature branch from `develop`
2. Make changes and commit
3. Create Pull Request
4. Code review and testing
5. Merge to `develop`
6. Deploy to `main` (production-ready)

## 📦 Deployment

- **Backend**: Heroku, AWS EC2, or DigitalOcean
- **Web**: Vercel, Netlify, or AWS S3 + CloudFront
- **Mobile**: Google Play Store & Apple App Store

## 🤝 Contributing

Contributions are welcome! Please follow the contribution guidelines in CONTRIBUTING.md

## 📄 License

MIT License - see LICENSE file

## 👨‍💻 Author

Created as a simulation of Stanbic Bank Zimbabwe's banking application for educational and demonstration purposes.

## ⚠️ Disclaimer

This is a **simulated/mock application** for educational purposes only. It does not connect to real banking systems and is not intended for actual financial transactions.

---

**Status**: 🚀 Ready for Development

For more information, see the [docs](docs/) directory.
