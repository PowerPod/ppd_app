import React, { useLayoutEffect } from 'react'
import { Image, Pressable, StyleSheet } from 'react-native'
import { router, Tabs } from 'expo-router'
import { Colors, TouchableOpacity } from 'react-native-ui-lib'
import { BoltIcon, BookmarkIcon, CreditCardIcon, UserIcon } from 'react-native-heroicons/solid'


export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary,
      tabBarShowLabel: false,
      headerTitleAlign: 'center',
      tabBarInactiveTintColor: Colors.$300,

    }}>
      <Tabs.Screen name='(device)' options={{
        tabBarLabel: 'Device',
        headerShown: false,
        tabBarIcon: ({ color, size }) => <BoltIcon size={size} color={color} />
      }} />
      <Tabs.Screen name='earn' options={{
        headerShown: false,
        headerShadowVisible: false,
        tabBarIcon: ({ color, size }) => <CreditCardIcon size={size} color={color} />
      }} />
      <Tabs.Screen name='nft' options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <BookmarkIcon size={size} color={color} />
      }} />
      <Tabs.Screen name='me' options={{
        headerShown: false,
        tabBarIcon: ({ color, size }) => <UserIcon size={size} color={color} />
      }} />

    </Tabs>
  )
}

const styles = StyleSheet.create({})
