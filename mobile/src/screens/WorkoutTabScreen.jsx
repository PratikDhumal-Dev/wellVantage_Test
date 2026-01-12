import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/colors';
import { WorkoutPlanItem } from '../components/WorkoutPlanItem';
import { getAllWorkoutPlans, deleteWorkoutPlan } from '../services/apiService';

export const WorkoutTabScreen = ({ navigation }) => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadWorkoutPlans = useCallback(async () => {
    try {
      const data = await getAllWorkoutPlans();
      // Transform data to match the expected format
      const formattedPlans = data.map((plan) => ({
        id: plan._id || plan.id,
        name: plan.name,
        duration: `${plan.duration} ${plan.duration === 1 ? 'Day' : 'Days'}`,
        ...plan, // Keep all other properties
      }));
      setWorkoutPlans(formattedPlans);
    } catch (error) {
      console.error('Error loading workout plans:', error);
      // Don't show alert if backend is not running (expected during development)
      if (error.message && !error.message.includes('Network Error')) {
        // Only show error for other types of errors
        console.log('Failed to load workout plans');
      }
      setWorkoutPlans([]); // Set empty array on error
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadWorkoutPlans();
  }, [loadWorkoutPlans]);

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadWorkoutPlans();
  }, [loadWorkoutPlans]);

  const handleDelete = async (id) => {
    try {
      await deleteWorkoutPlan(id);
      await loadWorkoutPlans(); // Reload the list
    } catch (error) {
      console.error('Error deleting workout plan:', error);
      // Show error message to user
      Alert.alert('Error', 'Failed to delete workout plan. Please try again.');
    }
  };

  const handleAddWorkout = () => {
    navigation.navigate('AddWorkoutPlan');
  };

  // Refresh when screen comes into focus (after adding a new plan)
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadWorkoutPlans();
    });
    return unsubscribe;
  }, [navigation, loadWorkoutPlans]);

  if (loading && workoutPlans.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={workoutPlans}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <WorkoutPlanItem
            name={item.name}
            duration={item.duration}
            onDelete={() => handleDelete(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>Custom Workout Plans</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No workout plans yet</Text>
            <Text style={styles.emptySubtext}>
              Tap the + button to create your first workout plan
            </Text>
          </View>
        }
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[Colors.primary]}
          />
        }
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={handleAddWorkout}
      >
        <Icon name="add" size={32} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  sectionHeader: {
    backgroundColor: Colors.lightGray,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    marginHorizontal: 16,
    borderRadius: 8,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
  },
  listContent: {
    paddingBottom: 100, // Space for FAB
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    paddingVertical: 60,
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});


