# Job Board Mobile App - Complete Setup Guide

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Backend Setup](#backend-setup)
4. [Configuration](#configuration)
5. [Running the App](#running-the-app)
6. [Testing](#testing)
7. [Common Issues](#common-issues)

## Prerequisites

Before you begin, ensure you have the following installed:

### Required Software
- **Node.js** (v18 or higher)
  - Download from: https://nodejs.org/
  - Verify: `node --version`

- **npm** (comes with Node.js) or **yarn**
  - Verify: `npm --version`

- **Expo CLI** (optional but recommended)
  ```bash
  npm install -g expo-cli
  ```

### For iOS Development (Mac only)
- **Xcode** (latest version)
  - Download from Mac App Store
  - Install Command Line Tools: `xcode-select --install`
  - iOS Simulator (included with Xcode)

### For Android Development
- **Android Studio**
  - Download from: https://developer.android.com/studio
  - Install Android SDK
  - Create Android Virtual Device (AVD)

### For Physical Device Testing
- **Expo Go App**
  - iOS: https://apps.apple.com/app/expo-go/id982107779
  - Android: https://play.google.com/store/apps/details?id=host.exp.exponent

## Installation

### Step 1: Extract and Navigate
```bash
# Extract the zip file
unzip job-board-mobile-app.zip

# Navigate to the project directory
cd job-board-mobile-app
```

### Step 2: Install Dependencies
```bash
# Using npm
npm install

# Or using yarn
yarn install
```

This will install all required packages including:
- React Native & Expo
- NativeWind (TailwindCSS)
- TanStack Query
- React Hook Form
- Zod validation
- Axios
- And many more...

### Step 3: Verify Installation
```bash
# Check if all packages installed correctly
npm list --depth=0
```

## Backend Setup

### Backend Requirements

Your backend API must support the following endpoints:

#### Authentication Endpoints
```
POST /api/auth/register
Body: { name: string, email: string, password: string }
Response: { token: string, user: { id, name, email, role } }

POST /api/auth/login
Body: { email: string, password: string }
Response: { token: string, user: { id, name, email, role } }
```

#### Job Endpoints
```
GET /api/jobs
Response: Job[]

GET /api/jobs/:id
Response: Job

POST /api/jobs (Admin only)
Body: JobFormData
Response: Job

PUT /api/jobs/:id (Admin only)
Body: JobFormData
Response: Job

DELETE /api/jobs/:id (Admin only)
Response: { success: boolean }
```

#### Application Endpoints
```
GET /api/applications/my-applications
Response: Application[]

GET /api/applications/job/:jobId (Admin only)
Response: Application[]

POST /api/applications/:jobId
Body: { resume: string, coverLetter: string }
Response: Application

PATCH /api/applications/:id/status (Admin only)
Body: { status: 'pending' | 'reviewing' | 'accepted' | 'rejected' }
Response: Application
```

#### User Endpoints
```
GET /api/users/job-seekers (Admin only)
Response: User[]

GET /api/users/:id (Admin only)
Response: User
```

### Backend Authentication
All protected endpoints should:
1. Expect `Authorization: Bearer <token>` header
2. Validate JWT token
3. Return 401 for invalid/expired tokens

## Configuration

### Step 1: Configure API Endpoint

Edit `lib/api.ts` and update the `API_BASE_URL`:

```typescript
// For local development

// iOS Simulator (Mac)
export const API_BASE_URL = 'http://localhost:3000/api';

// Android Emulator
export const API_BASE_URL = 'http://10.0.2.2:3000/api';

// Physical Device (replace with your computer's IP)
export const API_BASE_URL = 'http://192.168.1.XXX:3000/api';

// Production
export const API_BASE_URL = 'https://your-api.com/api';
```

### Step 2: Find Your Local IP (for Physical Device)

#### On Mac/Linux:
```bash
ifconfig | grep "inet "
```

#### On Windows:
```bash
ipconfig
```

Look for your local network IP (usually starts with 192.168.x.x or 10.0.x.x)

### Step 3: Ensure Backend is Running

Start your backend server and verify it's accessible:
```bash
# Test with curl
curl http://localhost:3000/api/jobs

# Or visit in browser
open http://localhost:3000/api/jobs
```

## Running the App

### Method 1: Start Development Server
```bash
npm start
```

This will:
1. Start Metro bundler
2. Show QR code and options
3. Open Expo DevTools in browser

Then choose your platform:
- Press `i` for iOS Simulator
- Press `a` for Android Emulator
- Scan QR code with Expo Go for physical device

### Method 2: Direct Platform Launch

#### iOS (Mac only):
```bash
npm run ios
```

#### Android:
```bash
npm run android
```

#### Web (for testing):
```bash
npm run web
```

### Using Expo Go (Physical Device)

1. Install Expo Go on your device
2. Ensure device and computer are on same WiFi
3. Run `npm start`
4. Scan QR code with:
   - iOS: Camera app
   - Android: Expo Go app

## Testing

### Test User Accounts

Create test accounts for both roles:

#### Job Seeker Account
```bash
# Register via the app
Name: John Doe
Email: john@example.com
Password: password123
```

#### Admin Account
You'll need to:
1. Register a user via the app
2. Manually update the user's role to 'admin' in your database
3. Or create an admin user directly in your backend

### Testing Checklist

#### Job Seeker Flow
- [ ] Register new account
- [ ] Login successfully
- [ ] View jobs list
- [ ] Search jobs
- [ ] View job details
- [ ] Submit application
- [ ] View application history
- [ ] Check application status
- [ ] Logout

#### Admin Flow
- [ ] Login as admin
- [ ] View all jobs
- [ ] Create new job
- [ ] Edit existing job
- [ ] Delete job
- [ ] View job seekers list
- [ ] View applications
- [ ] Update application status
- [ ] Logout

### Features to Test
✅ Form validation (try submitting empty forms)
✅ Error handling (disconnect internet)
✅ Loading states
✅ Pull-to-refresh
✅ Search functionality
✅ Navigation flow
✅ Token expiration
✅ Logout functionality

## Common Issues

### Issue: Metro Bundler Won't Start
```bash
# Clear Metro cache
npm start -- --clear

# Or
expo start -c
```

### Issue: iOS Build Fails
```bash
# Clear CocoaPods cache
cd ios
rm -rf Pods Podfile.lock
pod install
cd ..
```

### Issue: Android Build Fails
```bash
# Clean Gradle
cd android
./gradlew clean
cd ..

# Or clear cache
cd android
./gradlew cleanBuildCache
cd ..
```

### Issue: Cannot Connect to Backend
1. Check backend is running: `curl http://localhost:3000/api/jobs`
2. Verify API_BASE_URL in `lib/api.ts`
3. For physical device, use computer's IP not localhost
4. Check firewall isn't blocking the port
5. Ensure device and computer on same WiFi

### Issue: "Network Error"
- Check API endpoint configuration
- Verify backend is accessible
- Check CORS settings on backend
- Try restarting Metro bundler

### Issue: Authentication Fails
- Verify JWT token format
- Check token expiration time
- Ensure backend returns correct response format
- Clear AsyncStorage: `npm start -- --clear`

### Issue: App Crashes on Startup
1. Check console for errors
2. Verify all dependencies installed
3. Clear cache: `expo start -c`
4. Reinstall dependencies:
   ```bash
   rm -rf node_modules
   npm install
   ```

### Issue: Styling Not Working
1. Ensure NativeWind is configured in `metro.config.js`
2. Check `tailwind.config.js` is present
3. Restart Metro bundler
4. Clear cache

### Issue: Can't See App on Physical Device
1. Ensure WiFi connection (same network)
2. Check firewall settings
3. Try connecting via tunnel:
   ```bash
   expo start --tunnel
   ```

## Development Tips

### Hot Reload
Changes to code will automatically reload the app. If not:
- Shake device and press "Reload"
- Press `R` in Metro bundler terminal
- For hard reset, press `Shift + R`

### Debugging
- **React Native Debugger**: Download from https://github.com/jhen0409/react-native-debugger
- **Console Logs**: View in Metro bundler terminal
- **Network Requests**: Use React Native Debugger or Flipper

### Performance
- Keep components small and focused
- Use React.memo for expensive components
- Implement virtualized lists for long data
- Optimize images

### Code Quality
```bash
# Add TypeScript checking
npm run tsc

# Add linting
npm install --save-dev eslint
npx eslint .
```

## Next Steps

### For Development
1. ✅ Setup development environment
2. ✅ Start backend server
3. ✅ Configure API endpoint
4. ✅ Test both user flows
5. Add custom branding/assets
6. Customize colors in tailwind.config.js
7. Add additional features

### For Production
1. Add proper error tracking (Sentry)
2. Setup analytics (Firebase, Mixpanel)
3. Add push notifications
4. Optimize bundle size
5. Setup CI/CD
6. Build and deploy:
   ```bash
   # Install EAS CLI
   npm install -g eas-cli
   
   # Configure
   eas build:configure
   
   # Build
   eas build --platform ios
   eas build --platform android
   ```

## Additional Resources

- **Expo Documentation**: https://docs.expo.dev/
- **React Native Docs**: https://reactnative.dev/
- **NativeWind Docs**: https://www.nativewind.dev/
- **TanStack Query**: https://tanstack.com/query/latest
- **React Hook Form**: https://react-hook-form.com/

## Support

If you encounter issues:
1. Check this guide's Common Issues section
2. Review console error messages
3. Verify backend API is working
4. Check network connectivity
5. Clear cache and restart

---

**Happy Coding! 🚀**
