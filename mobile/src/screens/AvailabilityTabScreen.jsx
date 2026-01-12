import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Switch,
  Alert,
  Platform,
  ScrollView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Colors } from '../constants/colors';
import { CalendarComponent } from '../components/CalendarComponent';
import { formatDate, formatTime, formatDateForAPI } from '../utils/dateUtils';
import { createAvailability } from '../services/apiService';

export const AvailabilityTabScreen = () => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isRecurring, setIsRecurring] = useState(false);
  const [sessionName, setSessionName] = useState('PT');
  const [selectedDates, setSelectedDates] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!sessionName.trim()) {
      Alert.alert('Error', 'Session Name is required');
      return;
    }

    // Validate that end time is later than start time
    const startTimeMinutes = startTime.getHours() * 60 + startTime.getMinutes();
    const endTimeMinutes = endTime.getHours() * 60 + endTime.getMinutes();
    
    if (endTimeMinutes <= startTimeMinutes) {
      Alert.alert('Error', 'End time must be later than start time');
      return;
    }

    if (isRecurring && selectedDates.length === 0) {
      Alert.alert('Error', 'Please select at least one date for recurring sessions');
      return;
    }

    setLoading(true);
    try {
      const datesToCreate = isRecurring
        ? selectedDates
        : [formatDateForAPI(date)];

      await createAvailability({
        date: formatDateForAPI(date),
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
        sessionName: sessionName.trim(),
        isRecurring,
        recurringDates: isRecurring ? datesToCreate : undefined,
      });

      Alert.alert('Success', 'Availability created successfully');
      
      // Reset form
      setDate(new Date());
      setStartTime(new Date());
      setEndTime(new Date());
      setIsRecurring(false);
      setSessionName('PT');
      setSelectedDates([]);
    } catch (error) {
      console.error('Error creating availability:', error);
      Alert.alert('Error', 'Failed to create availability');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <Text style={styles.title}>Set Availability</Text>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Date*</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.inputText}>{formatDate(date)}</Text>
            <Text style={styles.calendarIcon}>📅</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Start Time*</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowStartTimePicker(true)}
          >
            <Text style={styles.inputText}>{formatTime(startTime)}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>End Time*</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowEndTimePicker(true)}
          >
            <Text style={styles.inputText}>{formatTime(endTime)}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Repeat Sessions</Text>
          <Switch
            value={isRecurring}
            onValueChange={setIsRecurring}
            trackColor={{ false: Colors.border, true: Colors.primaryLight }}
            thumbColor={isRecurring ? Colors.primary : Colors.gray}
          />
        </View>

        {isRecurring && (
          <CalendarComponent
            selectedDates={selectedDates}
            onDateSelect={setSelectedDates}
            multiSelect={true}
          />
        )}

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Session Name*</Text>
          <TextInput
            style={styles.textInput}
            value={sessionName}
            onChangeText={setSessionName}
            placeholder="PT"
            placeholderTextColor={Colors.textSecondary}
          />
        </View>
      </View>

      <TouchableOpacity
        style={[styles.createButton, loading && styles.createButtonDisabled]}
        onPress={handleCreate}
        disabled={loading}
      >
        <Text style={styles.createButtonText}>
          {loading ? 'Creating...' : 'Create'}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedDate) => {
            setShowDatePicker(Platform.OS === 'ios');
            if (selectedDate) {
              setDate(selectedDate);
            }
          }}
        />
      )}

      {showStartTimePicker && (
        <DateTimePicker
          value={startTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedTime) => {
            setShowStartTimePicker(Platform.OS === 'ios');
            if (selectedTime) {
              setStartTime(selectedTime);
            }
          }}
        />
      )}

      {showEndTimePicker && (
        <DateTimePicker
          value={endTime}
          mode="time"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, selectedTime) => {
            setShowEndTimePicker(Platform.OS === 'ios');
            if (selectedTime) {
              setEndTime(selectedTime);
            }
          }}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 24,
  },
  form: {
    flexGrow: 1,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  input: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  inputText: {
    fontSize: 16,
    color: Colors.text,
  },
  calendarIcon: {
    fontSize: 20,
  },
  textInput: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: Colors.text,
  },
  createButton: {
    backgroundColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  createButtonDisabled: {
    opacity: 0.6,
  },
  createButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.white,
  },
});


