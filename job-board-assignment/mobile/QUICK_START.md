# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Extract & Install
```bash
# Extract the archive
tar -xzf job-board-mobile-app.tar.gz
cd job-board-mobile-app

# Install dependencies
npm install
```

### 2. Configure API
Edit `lib/api.ts` and set your backend URL:
```typescript
export const API_BASE_URL = 'http://localhost:3000/api';
```

### 3. Start the App
```bash
npm start
```

Then press:
- `i` for iOS Simulator (Mac only)
- `a` for Android Emulator
- Scan QR code for physical device

### 4. Test Users

**Job Seeker:**
- Register a new account through the app
- Email: test@example.com
- Password: password123

**Admin:**
- Register a user, then manually set role to 'admin' in your database
- Or create admin user directly in backend

## 📱 Key Features

### Job Seekers Can:
✅ Browse and search jobs
✅ View job details
✅ Submit applications with resume & cover letter
✅ Track application status

### Admins Can:
✅ Create, edit, and delete jobs
✅ View all applications
✅ Manage job seekers
✅ Update application statuses

## 🛠️ Tech Stack
- React Native + Expo
- NativeWind (TailwindCSS)
- TanStack Query
- React Hook Form + Zod
- Axios + JWT

## 📚 Full Documentation
- **README.md** - Complete overview
- **SETUP_GUIDE.md** - Detailed setup instructions
- **API_DOCUMENTATION.md** - Backend API specs
- **FEATURES.md** - Complete feature list

## 🆘 Common Issues

**Can't connect to backend?**
- Verify backend is running on http://localhost:3000
- Check API_BASE_URL in lib/api.ts
- For Android emulator use: http://10.0.2.2:3000/api
- For physical device use: http://YOUR_LOCAL_IP:3000/api

**Metro bundler issues?**
```bash
npm start -- --clear
```

**Build errors?**
```bash
rm -rf node_modules
npm install
```

## 🎯 Next Steps
1. ✅ Start backend server
2. ✅ Configure API endpoint
3. ✅ Create test accounts
4. ✅ Test all features
5. Add custom branding
6. Deploy to app stores

---

**Need help?** Check SETUP_GUIDE.md for detailed instructions.
