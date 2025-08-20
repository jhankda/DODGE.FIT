import React from 'react';
import { Tabs } from 'expo-router';
import { useFonts } from 'expo-font';
import HomeIcon from "../../../assets/icons/HomeIcon.svg"
import PersonIcon from "../../../assets/icons/PersonIcon.svg"
import CalenderIcon from "../../../assets/icons/CalenderIcon.svg"
import DunbellIcon from "../../../assets/icons/DunbellIcon.svg"
import PlotIcon from "../../../assets/icons/PlotIcon.svg"
import KeyboardWrapper from "../../../components/FormScreen";

export default function UserLayout() {



  return (
    <KeyboardWrapper>
      <Tabs
        screenOptions={{
          headerShown:false,
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#FAFAFA',
          tabBarStyle: {
            height:60,
            borderTopWidth: 0.2,
            backgroundColor: '#FAFAFA',
            borderTopColor: '#333333',
          }
        }}
      >
        <Tabs.Screen
          name="userDashboard"
          options={{
            title: 'Home',
          
            tabBarIcon: ({ color, size }) => (
              <HomeIcon size={size} color={color} />
            ),
          }}
        />
      <Tabs.Screen
        name="Profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <PersonIcon size={size} color={color} />
          ),
        }}
      />
        <Tabs.Screen
        name="myClass/index"
        options={{
          title: 'Classes',
          tabBarIcon: ({ color, size }) => (
            <CalenderIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="workoutLogger"
        options={{
          title: 'Workout',
          tabBarIcon: ({ color, size }) => (
            <PlotIcon size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progress',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 25
          },
          headerTintColor: '#ca02e5',
          tabBarIcon: ({ color, size }) => (
            <DunbellIcon size={size} color={color} />
          ),
        }}
      />
      </Tabs>
    </KeyboardWrapper>
  );
}