import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/colors';

export const TimeSlotItem = ({
  startTime,
  endTime,
  isOpen,
  onDelete,
  onOpenPress,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.timeSlot}>
        <Text style={styles.timeText}>
          {startTime} - {endTime}
        </Text>
      </View>
      
      {isOpen && (
        <TouchableOpacity
          style={styles.openButton}
          onPress={onOpenPress}
        >
          <Text style={styles.openButtonText}>Open</Text>
        </TouchableOpacity>
      )}
      
      <TouchableOpacity
        onPress={onDelete}
        style={styles.deleteButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Icon name="delete" size={20} color={Colors.error} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    gap: 12,
  },
  timeSlot: {
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
  timeText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: '500',
  },
  openButton: {
    backgroundColor: Colors.primaryLight,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  openButtonText: {
    color: Colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  deleteButton: {
    padding: 4,
  },
});


