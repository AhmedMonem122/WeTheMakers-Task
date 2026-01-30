# Assets Directory

This directory should contain the following image assets for the app:

## Required Assets

1. **icon.png** (1024x1024 px)
   - App icon that appears on the home screen
   - Should be a square PNG image
   - Recommended: Simple, recognizable design

2. **adaptive-icon.png** (1024x1024 px)
   - Android adaptive icon foreground
   - Should work with various background shapes
   - Keep important content in the center

3. **splash.png** (1284x2778 px for iPhone 14)
   - Splash screen shown while app loads
   - Should match your brand colors
   - Background color set in app.json: #3b82f6 (blue)

4. **favicon.png** (48x48 px or larger)
   - Web favicon (for web builds)
   - Simple icon that works at small sizes

## Quick Setup

If you don't have custom assets yet, you can:

1. **Use Expo's default assets** (already configured)
   - The app will work with Expo's default placeholder images
   
2. **Generate assets with Figma/Canva:**
   - Create your icon design
   - Export at required sizes
   - Place in this directory

3. **Use an icon generator:**
   - Tools like https://easyappicon.com/
   - Or https://appicon.co/
   - Generate all sizes at once

## Asset Guidelines

- **Icon:** Should be simple and recognizable at small sizes
- **Colors:** Use brand colors (primary: #3b82f6 blue)
- **Style:** Modern, professional, clean design
- **Format:** PNG with transparency where appropriate
- **Theme:** Job/career related imagery works well
  - Briefcase icon
  - Building/office imagery
  - Career ladder
  - Professional networking symbols

## Current Configuration

The app.json is configured to use these assets. Once you add them to this directory, the app will automatically use them.

Background color for splash and adaptive icon: `#3b82f6` (primary blue)

## Note

The app will run without custom assets using Expo's defaults, but for production, you should add custom branded assets.
