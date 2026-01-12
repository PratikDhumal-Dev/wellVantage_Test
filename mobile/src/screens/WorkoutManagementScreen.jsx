import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Colors } from '../constants/colors';
import { CommonHeader } from '../components/CommonHeader';
import { MenuModal } from '../components/MenuModal';
import { TabNavigation } from '../components/TabNavigation';
import { WorkoutTabScreen } from './WorkoutTabScreen';
import { AvailabilityTabScreen } from './AvailabilityTabScreen';
import { BookSlotsTabScreen } from './BookSlotsTabScreen';

export const WorkoutManagementScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('Workout');
  const [refreshKey, setRefreshKey] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleCloseMenu = () => {
    setMenuVisible(false);
  };

  const handleAddWorkoutPlan = () => {
    navigation.navigate('AddWorkoutPlan');
    setMenuVisible(false);
  };

  const handleRefresh = () => {
    // Trigger refresh in child tab screens
    setRefreshKey(prev => prev + 1);
  };

  const handleSettings = () => {
    // Navigate to settings screen (to be implemented)
    Alert.alert('Settings', 'Settings screen coming soon');
    setMenuVisible(false);
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            // Handle logout logic
            console.log('Logout pressed');
            setMenuVisible(false);
          },
        },
      ]
    );
  };

  const menuItems = [
    {
      label: 'Add Workout Plan',
      icon: 'fitness-center',
      iconColor: Colors.primary,
      onPress: handleAddWorkoutPlan,
    },
    {
      label: 'Settings',
      icon: 'settings',
      iconColor: Colors.text,
      onPress: handleSettings,
    },
    {
      label: 'Logout',
      icon: 'logout',
      iconColor: Colors.error,
      onPress: handleLogout,
    },
  ];

  const handleRightIconPress = () => {
    // Handle right icon press (notifications or profile)
    console.log('Right icon pressed');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Workout':
        return <WorkoutTabScreen key={refreshKey} navigation={navigation} />;
      case 'Availability':
        return <AvailabilityTabScreen key={refreshKey} />;
      case 'Book Slots':
        return <BookSlotsTabScreen key={refreshKey} />;
      default:
        return <WorkoutTabScreen key={refreshKey} navigation={navigation} />;
    }
  };

  return (
    <View style={styles.container}>
      <CommonHeader
        title="Workout Management"
        onMenuPress={handleMenuPress}
        onRefreshPress={handleRefresh}
        onRightIconPress={handleRightIconPress}
      />
      <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />
      <View style={styles.content}>{renderTabContent()}</View>
      <MenuModal
        visible={menuVisible}
        onClose={handleCloseMenu}
        menuItems={menuItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
  },
});

