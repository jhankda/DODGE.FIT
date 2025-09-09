import React from 'react';
import { Pressable } from 'react-native';
import { Tabs } from 'expo-router';
import KeyboardWrapper from "../../../components/FormScreen";
import {HomeIcon, PersonIcon, CalenderActiveIcon, HomeInactiveIcon, DunbellActiveIcon, PersonActiveIcon, CalenderIcon, DunbellIcon, PlotIcon, PlotActiveIcon} from "@assets/icons/icons"

export default function UserLayout() {



  return (
    <KeyboardWrapper>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarActiveTintColor: '#000',
          tabBarInactiveTintColor: '#000',
          tabBarStyle: {
            paddingTop: 8,
            paddingBottom: 12,
            paddingHorizontal: 16,
            height: 75,
            borderTopWidth: 1,
            backgroundColor: '#FAFAFA',
            borderTopColor: '#FAFAFA',
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontFamily: 'SpaceGrotesk',
            fontWeight: '500',
            lineHeight: 18,
            color: '#121217'
          },
          tabBarIconStyle: {
            height: 24,
            width: 24,
          },
          tabBarButton: (props) => (
            <Pressable
              onPress={props.onPress}
              style={props.style}
              android_ripple={null}
            >
              {props.children}
            </Pressable>
          ),
        }}

      >
        <Tabs.Screen
          name="userDashboard"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused, color, size }) => (
              focused ? (<HomeIcon size={size} color={color} />) :
                (<HomeInactiveIcon size={size} color={color} />)
            ),

          }}
        />
        <Tabs.Screen
          name="myClass"
          options={{
            title: 'Classes',
            tabBarIcon: ({ focused, color, size }) => (
              focused ? (<CalenderActiveIcon size={size} color={color} />) :
                (<CalenderIcon size={size} color={color} />)
            ),
          }}
        />
        <Tabs.Screen
          name="workoutLogger"
          options={{
            title: 'Workout',
            headerTintColor: '#ca02e5',
            tabBarIcon: ({ focused, color, size }) => (
              focused ? (<DunbellActiveIcon size={size} color={color} />) :
                (<DunbellIcon size={size} color={color} />)
            ),
          }}
        />
        <Tabs.Screen
          name="progress"
          options={{
            title: 'Progress',
            tabBarIcon: ({ focused, color, size }) => (
              focused ? (<PlotActiveIcon size={size} color={color} />) :
                (<PlotIcon size={size} color={color} />)
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"

          options={{
            title: 'Profile',
            tabBarIcon: ({ focused, color, size }) => (
              focused ? (<PersonActiveIcon size={size} color={color} />) :
                (<PersonIcon size={size} color={color} />)
            ),
          }}
        />
      </Tabs>
    </KeyboardWrapper >
  );
}