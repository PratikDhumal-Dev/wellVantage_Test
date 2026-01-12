import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Colors } from '../constants/colors';

export const CommonHeader = ({
  title,
  onAddPress,
  onMenuPress,
  onRefreshPress,
  onBackPress,
  onRightIconPress,
}) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={onMenuPress || onAddPress || (() => {})}
        style={styles.iconButton}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        {onMenuPress ? (
          <Icon name="menu" size={24} color={Colors.white} />
        ) : onAddPress ? (
          <View style={styles.dumbbellContainer}>
            <Icon name="fitness-center" size={24} color={Colors.white} />
            <Icon name="add" size={14} color={Colors.white} style={styles.plusIcon} />
          </View>
        ) : (
          <Icon name="menu" size={24} color={Colors.white} />
        )}
      </TouchableOpacity>
      
      <Text style={styles.title}>{title}</Text>
      
      <View style={styles.rightIcons}>
        {onRefreshPress && (
          <TouchableOpacity
            onPress={onRefreshPress}
            style={styles.iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="sync" size={22} color={Colors.white} />
          </TouchableOpacity>
        )}
        {onBackPress && (
          <TouchableOpacity
            onPress={onBackPress}
            style={styles.iconButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="arrow-back" size={22} color={Colors.white} />
          </TouchableOpacity>
        )}
        {onRightIconPress && !onRefreshPress && !onBackPress && (
          <>
            <TouchableOpacity
              onPress={onRightIconPress}
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="notifications" size={22} color={Colors.white} />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onRightIconPress}
              style={styles.iconButton}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Icon name="person" size={22} color={Colors.white} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 56,
  },
  iconButton: {
    padding: 4,
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dumbbellContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  plusIcon: {
    position: 'absolute',
    top: 0,
    right: -4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.white,
    flex: 1,
    textAlign: 'center',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});


