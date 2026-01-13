# Google Sign-in Release APK Setup

## Issue
The production release APK shows a "Configuration Error" because the release keystore has a different SHA-1 fingerprint than the debug keystore.

## Solution: Add Release SHA-1 to Google Cloud Console

### Step 1: Get SHA-1 Fingerprint from Release Keystore

**Your Release Keystore SHA-1 Fingerprint:**
```
50:79:8A:67:63:30:5D:D9:DD:84:D3:EC:4C:C9:43:80:84:CF:E9:F1
```

To get it again, run:
```bash
cd mobile/android/app
keytool -list -v -keystore release.keystore -alias wellvantage-key -storepass wellvantage123 -keypass wellvantage123 | grep SHA1
```

### Step 2: Add SHA-1 to Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create one)
3. Navigate to **APIs & Services** → **Credentials**
4. Find your **OAuth 2.0 Client ID** (Android client)
5. Click **Edit**
6. Under **SHA-1 certificate fingerprints**, click **+ ADD**
7. Paste your release keystore's SHA-1 fingerprint
8. Click **Save**

### Step 3: Wait for Propagation

- Changes can take 5-10 minutes to propagate
- After adding, rebuild and reinstall the APK

### Step 4: Verify Package Name

Make sure the package name in Google Cloud Console matches:
- **Package name**: `com.wellvantagetemp`

## Quick Test (Temporary Bypass)

The app has been updated to allow bypassing Google Sign-in for testing. When you see the error:
1. Click **Continue** to proceed without Google Sign-in
2. This is only for testing - you should still fix the SHA-1 issue for production

## Getting SHA-1 Fingerprint

If you need to get it again:
```bash
cd mobile/android/app
keytool -list -v -keystore release.keystore -alias wellvantage-key -storepass wellvantage123 | grep SHA1
```

## Important Notes

- **Debug keystore** and **Release keystore** have different SHA-1 fingerprints
- Both need to be added to Google Cloud Console if you want to test both
- The release keystore SHA-1 is what's needed for the production APK
- Keep your release keystore secure - you'll need it for app updates

