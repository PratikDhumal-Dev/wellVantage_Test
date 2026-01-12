import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  Alert,
} from 'react-native';
import { Colors } from '../constants/colors';
import { CalendarComponent } from '../components/CalendarComponent';
import { TimeSlotItem } from '../components/TimeSlotItem';
import { getSlotsByDate, deleteSlot } from '../services/apiService';
import { formatDateForAPI } from '../utils/dateUtils';

export const BookSlotsTabScreen = () => {
  const [selectedDate, setSelectedDate] = useState(
    formatDateForAPI(new Date())
  );
  const [slots, setSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadSlots();
  }, [selectedDate]);

  const loadSlots = async () => {
    try {
      setLoading(true);
      const data = await getSlotsByDate(selectedDate);
      setSlots(data || []);
    } catch (error) {
      console.error('Error loading slots:', error);
      // Don't show alert if backend is not running (expected during development)
      if (error.message && error.message.includes('Network Error')) {
        console.log('Backend server is not running. This is expected if you haven\'t started the NestJS server.');
        setSlots([]); // Set empty array instead of showing error
      } else {
        Alert.alert('Error', 'Failed to load slots');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadSlots();
    setRefreshing(false);
  };

  const handleDeleteSlot = async (slotId) => {
    Alert.alert(
      'Delete Slot',
      'Are you sure you want to delete this slot?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteSlot(slotId);
              await loadSlots();
            } catch (error) {
              console.error('Error deleting slot:', error);
              Alert.alert('Error', 'Failed to delete slot');
            }
          },
        },
      ]
    );
  };

  const handleDateSelect = (dates) => {
    if (dates.length > 0) {
      setSelectedDate(dates[0]);
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={slots}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TimeSlotItem
            startTime={item.startTime}
            endTime={item.endTime}
            isOpen={item.status === 'open'}
            onDelete={() => handleDeleteSlot(item.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[Colors.primary]}
          />
        }
        ListHeaderComponent={
          <View>
            <Text style={styles.title}>Book Client Slots</Text>
            <CalendarComponent
              selectedDates={[selectedDate]}
              onDateSelect={handleDateSelect}
              multiSelect={false}
            />
            <Text style={styles.sectionTitle}>Available Slots:</Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No available slots for this date
            </Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.text,
    marginBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginTop: 8,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  listContent: {
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});


