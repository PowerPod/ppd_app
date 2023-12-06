import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'

export default function BindLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'Add device', headerShown: true }} />
      <Stack.Screen name='scan-device' options={{ title: 'Scan QR' }} />
      <Stack.Screen name='step3' options={{ title: 'bind device', headerShown: true }} />

    </Stack>
  )
}

const styles = StyleSheet.create({})
