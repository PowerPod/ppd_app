import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }} />
      <Stack.Screen name='test' options={{ headerShown: false }} />
    </Stack>
  )
}

const styles = StyleSheet.create({})
