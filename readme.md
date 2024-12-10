## Project Structure

```
todo-app/
├── mobile/                 # React Native Expo app
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── types/
│   ├── App.tsx
│   └── package.json
└── server/                 # NestJS backend
    ├── src/
    │   ├── todos/
    │   ├── auth/
    │   ├── config/
    │   └── main.ts
    └── package.json
```

## Setup Instructions

### Prerequisites

1. Node.js (v18 or later)
2. PostgreSQL
3. Expo CLI
4. Clerk Account
5. Neon Database Account

### Frontend Setup

```bash
# Install Expo CLI
npm install -g expo-cli

# Create new Expo project
npx create-expo-app mobile --template expo-template-blank-typescript

# Install dependencies
cd mobile
yarn add @clerk/clerk-expo axios @react-navigation/native @react-navigation/stack
```

### Backend Setup

```bash
# Install NestJS CLI
npm install -g @nestjs/cli

# Create new NestJS project
nest new server

# Install dependencies
cd server
yarn add @nestjs/typeorm typeorm pg @clerk/clerk-sdk-node
```

### Environment Setup

1. Create `.env` file in the mobile directory:

```
EXPO_PUBLIC_API_URL=your-vercel-api-url
```

2. Create `.env` file in the server directory:

```
DATABASE_URL=your-neon-database-url
JWT_SECRET=your-jwt-secret-key
```
