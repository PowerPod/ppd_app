import React, { useState } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Stack } from 'expo-router'
import { Colors } from 'react-native-ui-lib'

export default function DeviceLayout() {

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: true, }} />
      <Stack.Screen name='detail' options={{ title: 'Device Detail' }} />
      <Stack.Screen name='plug_detail' options={{
        title: 'Device Detail',
        headerStyle: { backgroundColor: Colors.bgColor },
        headerShadowVisible: false
      }} />
    </Stack>
  )
}

const styles = StyleSheet.create({})
