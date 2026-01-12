import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/colors';
import { format } from 'date-fns';

export const CalendarComponent = ({
  selectedDates,
  onDateSelect,
  multiSelect,
  currentMonth = new Date(),
  onMonthChange,
}) => {
  const [month, setMonth] = useState(currentMonth);

  const handleDayPress = (day) => {
    const dateString = day.dateString;
    
    if (multiSelect) {
      const newSelectedDates = selectedDates.includes(dateString)
        ? selectedDates.filter((d) => d !== dateString)
        : [...selectedDates, dateString];
      onDateSelect(newSelectedDates);
    } else {
      onDateSelect([dateString]);
    }
  };

  const handleMonthChange = (monthData) => {
    const newMonth = new Date(monthData.year, monthData.month - 1, 1);
    setMonth(newMonth);
    if (onMonthChange) {
      onMonthChange(newMonth);
    }
  };

  const markedDates = {};
  selectedDates.forEach((date) => {
    markedDates[date] = {
      selected: true,
      selectedColor: Colors.primary,
      selectedTextColor: Colors.white,
    };
  });

  return (
    <View style={styles.container}>
      
      <Calendar
        current={month.toISOString().split('T')[0]}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        markingType="simple"
        theme={{
          calendarBackground: Colors.white,
          textSectionTitleColor: Colors.text,
          selectedDayBackgroundColor: Colors.primary,
          selectedDayTextColor: Colors.white,
          todayTextColor: Colors.primary,
          dayTextColor: Colors.text,
          textDisabledColor: Colors.border,
          dotColor: Colors.primary,
          selectedDotColor: Colors.white,
          arrowColor: Colors.primary,
          monthTextColor: Colors.text,
          textDayFontWeight: '500',
          textMonthFontWeight: 'bold',
          textDayHeaderFontWeight: '600',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 13,
        }}
        onMonthChange={handleMonthChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    padding: 16,
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  navButton: {
    padding: 4,
  },
  monthText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.text,
  },
});

