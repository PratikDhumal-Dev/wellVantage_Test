import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const USER_STORAGE_KEY = '@wellvantage:user';

export const configureGoogleSignIn = async () => {
  try {
    // Configure with your credentials from Google Cloud Console
    GoogleSignin.configure({
      webClientId: '257557703886-sr5qni0bgpobveipeaqvv12rcflp5q2h.apps.googleusercontent.com', // Replace with your Web Client ID
      iosClientId: 'YOUR_IOS_CLIENT_ID', // Replace with your iOS Client ID (iOS only)
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  } catch (error) {
    console.error('Error configuring Google Sign-in:', error);
  }
};

export const signInWithGoogle = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    
    if (userInfo.user) {
      const user = {
        email: userInfo.user.email,
        name: userInfo.user.name || '',
        photo: userInfo.user.photo || null,
        id: userInfo.user.id,
      };
      
      // Store user info
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
      
      return user;
    }
    
    return null;
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled the login flow');
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Sign in is in progress');
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Play services not available');
    } else if (error.code === statusCodes.SIGN_IN_REQUIRED) {
      console.log('Sign in required');
    } else {
      // DEVELOPER_ERROR usually means configuration issue
      if (error.message && error.message.includes('DEVELOPER_ERROR')) {
        console.error('DEVELOPER_ERROR: Please check your Google Sign-in configuration:');
        console.error('1. Make sure webClientId is set correctly in googleSignInService.js');
        console.error('2. Verify SHA-1 fingerprint is added to Google Cloud Console');
        console.error('3. Check that package name matches: com.wellvantagetemp');
        console.error('See GOOGLE_SIGNIN_SETUP.md for detailed instructions');
      }
      console.error('Error signing in:', error);
      throw error; // Re-throw so the UI can handle it
    }
    return null;
  }
};

export const getCurrentUser = async () => {
  try {
    const userString = await AsyncStorage.getItem(USER_STORAGE_KEY);
    if (userString) {
      return JSON.parse(userString);
    }
    return null;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

export const isSignedIn = async () => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    return isSignedIn;
  } catch (error) {
    console.error('Error checking sign-in status:', error);
    return false;
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.signOut();
    await AsyncStorage.removeItem(USER_STORAGE_KEY);
  } catch (error) {
    console.error('Error signing out:', error);
  }
};


