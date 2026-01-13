import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/colors';
import {
  configureGoogleSignIn,
  signInWithGoogle,
} from '../services/googleSignInService';

export const SignUpScreen = ({ navigation }) => {
  const [showEmailPicker, setShowEmailPicker] = useState(false);
  const [availableEmails, setAvailableEmails] = useState([]);

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const userInfo = await signInWithGoogle();
      if (userInfo) {
        // For now, we'll navigate directly
        // In a real app, you might want to show email picker if multiple accounts
        navigation.replace('WorkoutManagement');
      } else {
        Alert.alert('Sign In Failed', 'Please try again');
      }
    } catch (error) {
      console.error('Error during sign in:', error);
      
      // Provide helpful error messages
      if (error.message && error.message.includes('DEVELOPER_ERROR')) {
        // For production, allow bypassing Google Sign-in for testing
        Alert.alert(
          'Configuration Error',
          'Google Sign-in is not properly configured.\n\n' +
          'For production APK, you need to:\n' +
          '1. Get SHA-1 fingerprint from release keystore\n' +
          '2. Add it to Google Cloud Console\n' +
          '3. Wait a few minutes for changes to propagate\n\n' +
          'Would you like to continue without Google Sign-in?',
          [
            {
              text: 'Cancel',
              style: 'cancel',
            },
            {
              text: 'Continue',
              onPress: () => {
                // Navigate without Google Sign-in for testing
                navigation.replace('WorkoutManagement');
              },
            },
          ]
        );
      } else if (error.code === 'SIGN_IN_CANCELLED') {
        // User cancelled - don't show error
        return;
      } else {
        Alert.alert('Error', `Failed to sign in with Google: ${error.message || 'Unknown error'}`);
      }
    }
  };

  const handleEmailSelect = (email) => {
    setShowEmailPicker(false);
    navigation.replace('WorkoutManagement');
  };

  return (
    <View style={styles.container}>
      {navigation.canGoBack() && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color={Colors.text} />
        </TouchableOpacity>
      )}

      <Text style={styles.title}>Sign Up</Text>

      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeText}>
          Welcome! Manage, Track{'\n'}and Grow your Gym with{'\n'}WellVantage.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.googleButton}
        onPress={handleGoogleSignIn}
      >
        <Image
          source={{
            uri: 'https://www.google.com/favicon.ico',
          }}
          style={styles.googleIcon}
        />
        <Text style={styles.googleButtonText}>Continue with Google</Text>
      </TouchableOpacity>

      <Modal
        visible={showEmailPicker}
        transparent
        animationType="slide"
        onRequestClose={() => setShowEmailPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Account</Text>
            <FlatList
              data={availableEmails}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.emailItem}
                  onPress={() => handleEmailSelect(item)}
                >
                  <Text style={styles.emailText}>{item.email}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowEmailPicker(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
    paddingHorizontal: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 40,
    textAlign: 'center',
  },
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
    textAlign: 'center',
    lineHeight: 28,
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 12,
  },
  googleIcon: {
    width: 24,
    height: 24,
  },
  googleButtonText: {
    fontSize: 16,
    color: Colors.text,
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 24,
    width: '80%',
    maxHeight: '60%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
  },
  emailItem: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  emailText: {
    fontSize: 16,
    color: Colors.text,
  },
  cancelButton: {
    marginTop: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
});


