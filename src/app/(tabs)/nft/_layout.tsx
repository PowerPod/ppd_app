import React from 'react'
import { StyleSheet } from 'react-native'
import { Stack } from 'expo-router'

export default function NFTLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{ title: 'NFT', headerShown: false }} />
      <Stack.Screen name='buyNFT' options={{ title: 'NFT Buy Page' }} />
    </Stack>
  )
}

const styles = StyleSheet.create({})
