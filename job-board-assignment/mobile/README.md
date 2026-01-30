# Job Board Mobile App 📱

A professional, full-featured React Native Expo job board application with separate experiences for job seekers and administrators.

## 🌟 Features

### For Job Seekers
- ✅ User registration and authentication
- ✅ Browse available job listings
- ✅ Search and filter jobs
- ✅ View detailed job information
- ✅ Submit job applications with resume and cover letter
- ✅ Track application status
- ✅ View application history

### For Administrators
- ✅ Secure admin login
- ✅ Create, edit, and delete job postings
- ✅ View all job listings
- ✅ Manage job seekers
- ✅ View applications for each job
- ✅ Update application statuses

## 🛠️ Tech Stack

- **Framework:** React Native with Expo
- **Navigation:** Expo Router (file-based routing)
- **Styling:** NativeWind (TailwindCSS for React Native)
- **State Management:** TanStack Query (React Query)
- **Form Handling:** React Hook Form
- **Validation:** Zod
- **HTTP Client:** Axios
- **Authentication:** JWT with jwt-decode
- **Storage:** AsyncStorage
- **UI Components:** Custom component library with native-cn utilities
- **Icons:** Lucide React Native

## 📁 Project Structure

```
job-board-mobile-app/
├── app/                          # Expo Router pages
│   ├── (auth)/                   # Auth screens (login, register)
│   ├── (tabs)/                   # Tab navigation screens
│   │   ├── admin/                # Admin-specific screens
│   │   ├── jobs.tsx              # Job seeker job list
│   │   ├── applications.tsx      # Job seeker applications
│   │   └── profile.tsx           # Job seeker profile
│   ├── job/[id].tsx              # Job detail & application
│   ├── admin/edit-job/[id].tsx   # Edit job (admin)
│   ├── _layout.tsx               # Root layout
│   └── index.tsx                 # Entry point
├── components/                    # Reusable components
│   ├── ui/                       # Base UI components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── Badge.tsx
│   │   ├── Loading.tsx
│   │   └── EmptyState.tsx
│   ├── JobCard.tsx               # Job listing card
│   └── ApplicationCard.tsx       # Application card
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts                # Authentication hooks
│   ├── useJobs.ts                # Job management hooks
│   ├── useApplications.ts        # Application hooks
│   └── useUsers.ts               # User management hooks
├── lib/                          # Utilities and configurations
│   ├── api.ts                    # Axios client setup
│   ├── auth-context.tsx          # Auth context provider
│   ├── schemas.ts                # Zod schemas & TypeScript types
│   └── utils.ts                  # Utility functions (cn)
├── assets/                       # Static assets
├── app.json                      # Expo configuration
├── package.json                  # Dependencies
├── tailwind.config.js            # TailwindCSS configuration
├── metro.config.js               # Metro bundler config
├── babel.config.js               # Babel configuration
├── tsconfig.json                 # TypeScript configuration
└── global.css                    # Global styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (Mac) or Android Emulator
- Expo Go app on your physical device (optional)

### Installation

1. **Extract the zip file:**
   ```bash
   unzip job-board-mobile-app.zip
   cd job-board-mobile-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API endpoint:**
   
   Update the `API_BASE_URL` in `lib/api.ts`:
   ```typescript
   export const API_BASE_URL = 'http://YOUR_BACKEND_URL/api';
   ```
   
   For local development:
   - iOS Simulator: `http://localhost:3000/api`
   - Android Emulator: `http://10.0.2.2:3000/api`
   - Physical Device: `http://YOUR_LOCAL_IP:3000/api`

4. **Start the development server:**
   ```bash
   npm start
   ```

5. **Run on your preferred platform:**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Scan QR code with Expo Go app on your device

## 📱 Running the App

### iOS (Mac only)
```bash
npm run ios
```

### Android
```bash
npm run android
```

### Web (for testing)
```bash
npm run web
```

## 🔐 Authentication Flow

1. Users register with name, email, and password
2. JWT token is returned and stored in AsyncStorage
3. Token is automatically attached to all API requests
4. Token expiration is checked on app launch
5. Users are redirected based on their role (admin/job_seeker)

## 🎨 UI/UX Features

- ✨ Modern, clean interface with smooth animations
- 📱 Fully responsive design for all screen sizes
- 🎨 Professional color scheme with primary brand colors
- 🔄 Pull-to-refresh on all list screens
- ⌨️ Keyboard-aware forms with proper scrolling
- 🎯 Touch-friendly elements (minimum 44pt touch targets)
- 💬 Toast notifications for user feedback
- 🔍 Real-time search and filtering
- 📝 Form validation with helpful error messages
- ⚡ Optimistic UI updates
- 🌙 Support for light mode (dark mode ready)

## 🔧 Key Components

### Authentication
- `useAuth` hook for managing auth state
- `AuthProvider` context for global auth access
- Automatic token management with interceptors

### Data Fetching
- TanStack Query for server state management
- Automatic caching and background updates
- Optimistic updates for better UX
- Error handling and retry logic

### Forms
- React Hook Form for performant form handling
- Zod for runtime validation
- Custom Input components with error states
- Keyboard-aware form containers

### Navigation
- Expo Router for type-safe routing
- Bottom tabs for main navigation
- Stack navigation for detail screens
- Role-based route access

## 🎯 API Endpoints Expected

The app expects these endpoints from your backend:

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Jobs
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/:id` - Get single job
- `POST /api/jobs` - Create job (admin)
- `PUT /api/jobs/:id` - Update job (admin)
- `DELETE /api/jobs/:id` - Delete job (admin)

### Applications
- `GET /api/applications/my-applications` - Get user's applications
- `GET /api/applications/job/:jobId` - Get applications for a job (admin)
- `POST /api/applications/:jobId` - Submit application
- `PATCH /api/applications/:id/status` - Update status (admin)

### Users
- `GET /api/users/job-seekers` - Get all job seekers (admin)
- `GET /api/users/:id` - Get user by ID (admin)

## 🧪 Testing

The app is production-ready with:
- ✅ No runtime errors
- ✅ No compiler errors
- ✅ Proper error handling
- ✅ Loading states
- ✅ Empty states
- ✅ Form validation
- ✅ Network error handling

## 🔨 Building for Production

### iOS
```bash
expo build:ios
```

### Android
```bash
expo build:android
```

### EAS Build (Recommended)
```bash
npm install -g eas-cli
eas build --platform ios
eas build --platform android
```

## 📦 Key Dependencies

- `expo` - Expo framework
- `expo-router` - File-based routing
- `react-native` - React Native framework
- `nativewind` - TailwindCSS for RN
- `@tanstack/react-query` - Data fetching
- `react-hook-form` - Form management
- `zod` - Schema validation
- `axios` - HTTP client
- `jwt-decode` - JWT parsing
- `lucide-react-native` - Icon library

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to customize the color scheme:
```javascript
colors: {
  primary: {
    500: '#3b82f6', // Change primary color
  },
}
```

### API Configuration
Update `lib/api.ts` for API settings:
```typescript
export const API_BASE_URL = 'your-api-url';
```

## 📝 Notes

- The app uses expo-router for navigation (file-based routing)
- All API calls are type-safe with TypeScript
- Forms use Zod for runtime validation
- AsyncStorage persists auth tokens
- TanStack Query handles caching and background updates
- Pull-to-refresh is available on all list screens

## 🐛 Troubleshooting

### Metro Bundler Issues
```bash
npm start -- --clear
```

### iOS Build Issues
```bash
cd ios && pod install && cd ..
```

### Android Build Issues
```bash
cd android && ./gradlew clean && cd ..
```

### Cache Issues
```bash
expo start -c
```

## 📄 License

This project is provided as-is for educational and commercial purposes.

## 🤝 Support

For issues or questions:
1. Check the console logs
2. Verify API endpoint configuration
3. Ensure backend is running
4. Check network connectivity

---

**Built with ❤️ using React Native & Expo**
