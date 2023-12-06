import React from 'react'
import { StyleSheet } from 'react-native'
import { router, Stack } from 'expo-router'
import { Colors, TouchableOpacity } from 'react-native-ui-lib'
import { UserIcon } from 'lucide-react-native'

export default function MeLayout() {
  return (
    <Stack>
      <Stack.Screen name='index' options={{
        headerShown: true,
        headerTitle: 'Wallet',
        headerTitleAlign: 'left',
        headerTransparent: true,
        headerTitleStyle: {
          color: Colors.white
        },
        headerRight: () => (
          <TouchableOpacity padding-8 onPress={() =>
            router.push('/me/setting')
          }>
            <UserIcon size={24} color={Colors.white} />
          </TouchableOpacity>
        ),
      }} />
      <Stack.Screen name='setting' options={{
        headerShown: true,
        headerTitle: 'Setting',
        headerStyle: { backgroundColor: Colors.bgColor },
        headerShadowVisible: false
      }} />
    </Stack>
  )
}

const styles = StyleSheet.create({})
