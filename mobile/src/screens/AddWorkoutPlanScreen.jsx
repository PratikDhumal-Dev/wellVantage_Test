import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/colors';
import { CommonHeader } from '../components/CommonHeader';
import { TabNavigation } from '../components/TabNavigation';
import { createWorkoutPlan } from '../services/apiService';

export const AddWorkoutPlanScreen = ({ navigation, route }) => {
  const [activeTab, setActiveTab] = useState('Workout');
  const [workoutPlanName, setWorkoutPlanName] = useState('');
  const [days, setDays] = useState([
    {
      id: 1,
      dayNumber: 1,
      muscleGroup: '',
      exercises: [],
    },
  ]);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    // Reset form on refresh
    setWorkoutPlanName('');
    setDays([
      {
        id: 1,
        dayNumber: 1,
        muscleGroup: '',
        exercises: [],
      },
    ]);
    setActiveDayIndex(0);
    setNotes('');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleAddDay = () => {
    const newDayNumber = days.length + 1;
    setDays([
      ...days,
      {
        id: newDayNumber,
        dayNumber: newDayNumber,
        muscleGroup: '',
        exercises: [],
      },
    ]);
    setActiveDayIndex(days.length);
  };

  const handleDeleteDay = (dayId) => {
    if (days.length === 1) {
      Alert.alert('Error', 'At least one day is required');
      return;
    }
    const updatedDays = days
      .filter((day) => day.id !== dayId)
      .map((day, index) => ({
        ...day,
        dayNumber: index + 1,
      }));
    setDays(updatedDays);
    if (activeDayIndex >= updatedDays.length) {
      setActiveDayIndex(updatedDays.length - 1);
    }
  };

  const handleUpdateMuscleGroup = (dayId, muscleGroup) => {
    setDays(
      days.map((day) =>
        day.id === dayId ? { ...day, muscleGroup } : day
      )
    );
  };

  const handleAddExercise = (dayId) => {
    setDays(
      days.map((day) =>
        day.id === dayId
          ? {
              ...day,
              exercises: [
                ...day.exercises,
                { id: Date.now(), name: '', sets: '', reps: '' },
              ],
            }
          : day
      )
    );
  };

  const handleDeleteExercise = (dayId, exerciseId) => {
    setDays(
      days.map((day) =>
        day.id === dayId
          ? {
              ...day,
              exercises: day.exercises.filter((ex) => ex.id !== exerciseId),
            }
          : day
      )
    );
  };

  const handleUpdateExercise = (dayId, exerciseId, field, value) => {
    setDays(
      days.map((day) =>
        day.id === dayId
          ? {
              ...day,
              exercises: day.exercises.map((ex) =>
                ex.id === exerciseId ? { ...ex, [field]: value } : ex
              ),
            }
          : day
      )
    );
  };

  const getWordCount = (text) => {
    return text.trim().split(/\s+/).filter((word) => word.length > 0).length;
  };

  const handleSubmit = async () => {
    if (!workoutPlanName.trim()) {
      Alert.alert('Error', 'Workout Plan Name is required');
      return;
    }

    const hasValidDays = days.every(
      (day) => day.muscleGroup.trim() && day.exercises.length > 0
    );

    if (!hasValidDays) {
      Alert.alert('Error', 'Each day must have a muscle group and at least one exercise');
      return;
    }

    const hasValidExercises = days.every((day) =>
      day.exercises.every((ex) => ex.name.trim())
    );

    if (!hasValidExercises) {
      Alert.alert('Error', 'All exercises must have a name');
      return;
    }

    setLoading(true);
    try {
      const workoutPlanData = {
        name: workoutPlanName.trim(),
        duration: days.length,
        days: days.map((day) => ({
          dayNumber: day.dayNumber,
          muscleGroup: day.muscleGroup.trim(),
          exercises: day.exercises.map((ex) => ({
            name: ex.name.trim(),
            sets: ex.sets.trim(),
            reps: ex.reps.trim(),
          })),
        })),
        notes: notes.trim(),
      };

      await createWorkoutPlan(workoutPlanData);
      Alert.alert('Success', 'Workout plan created successfully', [
        {
          text: 'OK',
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error('Error creating workout plan:', error);
      Alert.alert('Error', 'Failed to create workout plan');
    } finally {
      setLoading(false);
    }
  };

  const activeDay = days[activeDayIndex] || days[0];

  return (
    <View style={styles.container}>
      <CommonHeader
        title="Add Workout Plan"
        onAddPress={null}
        onRefreshPress={handleRefresh}
        onBackPress={handleBack}
      />
      <TabNavigation 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        tabs={['Workout', 'Client', 'Availability']}
      />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <TextInput
              style={styles.input}
              placeholder="Beginner's Workout - 3 days"
              placeholderTextColor={Colors.textSecondary}
              value={workoutPlanName}
              onChangeText={setWorkoutPlanName}
            />
          </View>

          <View style={styles.daySection}>
            <View style={styles.daySelector}>
              {days.map((day, index) => (
                <TouchableOpacity
                  key={day.id}
                  style={[
                    styles.dayButton,
                    activeDayIndex === index && styles.dayButtonActive,
                  ]}
                  onPress={() => setActiveDayIndex(index)}
                >
                  <Text
                    style={[
                      styles.dayButtonText,
                      activeDayIndex === index && styles.dayButtonTextActive,
                    ]}
                  >
                    Day {day.dayNumber}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.muscleGroupRow}>
              <TextInput
                style={styles.muscleGroupInput}
                placeholder="Chest"
                placeholderTextColor={Colors.textSecondary}
                value={activeDay.muscleGroup}
                onChangeText={(text) =>
                  handleUpdateMuscleGroup(activeDay.id, text)
                }
              />
              <TouchableOpacity
                onPress={() => handleDeleteDay(activeDay.id)}
                style={styles.deleteButton}
              >
                <Icon name="delete" size={20} color={Colors.error} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.addDayButton}
              onPress={handleAddDay}
            >
              <Icon name="add" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.exercisesSection}>
            <View style={styles.exercisesHeader}>
              <Text style={styles.exercisesHeaderText}>Sets</Text>
              <Text style={styles.exercisesHeaderText}>Reps</Text>
            </View>

            {activeDay.exercises.map((exercise) => (
              <View key={exercise.id} style={styles.exerciseRow}>
                <TextInput
                  style={styles.exerciseNameInput}
                  placeholder="Exercise name"
                  placeholderTextColor={Colors.textSecondary}
                  value={exercise.name}
                  onChangeText={(text) =>
                    handleUpdateExercise(activeDay.id, exercise.id, 'name', text)
                  }
                />
                <TextInput
                  style={styles.setsRepsInput}
                  placeholder="Sets"
                  placeholderTextColor={Colors.textSecondary}
                  value={exercise.sets}
                  onChangeText={(text) =>
                    handleUpdateExercise(activeDay.id, exercise.id, 'sets', text)
                  }
                  keyboardType="numeric"
                />
                <TextInput
                  style={styles.setsRepsInput}
                  placeholder="Reps"
                  placeholderTextColor={Colors.textSecondary}
                  value={exercise.reps}
                  onChangeText={(text) =>
                    handleUpdateExercise(activeDay.id, exercise.id, 'reps', text)
                  }
                />
                <TouchableOpacity
                  onPress={() => handleDeleteExercise(activeDay.id, exercise.id)}
                  style={styles.deleteExerciseButton}
                >
                  <Icon name="delete" size={20} color={Colors.error} />
                </TouchableOpacity>
              </View>
            ))}

            <TouchableOpacity
              style={styles.addExerciseButton}
              onPress={() => handleAddExercise(activeDay.id)}
            >
              <Icon name="add" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.notesSection}>
            <TextInput
              style={styles.notesInput}
              placeholder="Bench Press: www.benchpress.com&#10;Eat Oats"
              placeholderTextColor={Colors.textSecondary}
              value={notes}
              onChangeText={setNotes}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
            <Text style={styles.wordCount}>
              {Math.max(0, 50 - getWordCount(notes))} words remaining
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={[styles.submitButton, loading && styles.submitButtonDisabled]}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.submitButtonText}>
          {loading ? 'Submitting...' : 'Submit'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100,
  },
  form: {
    flex: 1,
  },
  inputGroup: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.text,
  },
  daySection: {
    marginBottom: 24,
  },
  daySelector: {
    flexDirection: 'row',
    marginBottom: 12,
    flexWrap: 'wrap',
    gap: 8,
  },
  dayButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.white,
  },
  dayButtonActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  dayButtonText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  dayButtonTextActive: {
    color: Colors.white,
  },
  muscleGroupRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  muscleGroupInput: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.text,
  },
  deleteButton: {
    padding: 8,
  },
  addDayButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
  },
  exercisesSection: {
    marginBottom: 24,
  },
  exercisesHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingRight: 40,
    marginBottom: 8,
    gap: 60,
  },
  exercisesHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  exerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    paddingBottom: 12,
  },
  exerciseNameInput: {
    flex: 1,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    fontSize: 14,
    color: Colors.text,
  },
  setsRepsInput: {
    width: 60,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontSize: 14,
    color: Colors.text,
    textAlign: 'center',
  },
  deleteExerciseButton: {
    padding: 4,
  },
  addExerciseButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 8,
  },
  notesSection: {
    marginBottom: 24,
  },
  notesInput: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    padding: 16,
    fontSize: 14,
    color: Colors.text,
    minHeight: 100,
    marginBottom: 8,
  },
  wordCount: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'right',
  },
  submitButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
});

