import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SignUpScreen } from '../screens/SignUpScreen';
import { WorkoutManagementScreen } from '../screens/WorkoutManagementScreen';
import { AddWorkoutPlanScreen } from '../screens/AddWorkoutPlanScreen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SignUp"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen
          name="WorkoutManagement"
          component={WorkoutManagementScreen}
        />
        <Stack.Screen
          name="AddWorkoutPlan"
          component={AddWorkoutPlanScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

