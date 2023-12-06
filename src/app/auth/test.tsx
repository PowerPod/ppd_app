import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text, View } from 'react-native-ui-lib'
import { useAuthStore } from '../../store/auth.store'

export default function TestPage() {

  const login = useAuthStore((state) => state.login)

  function handleSubmit() {
    const { error } = login({ email: 'test', address: '0xAA' }) ?? {}
    console.log('login in')

    if (!error) {
      return
    }
  }


  return (
    <View flex center marginH-16>
      <Text>this is test page</Text>

      <Button label='Login' onPress={handleSubmit} />
    </View>
  )
}

const styles = StyleSheet.create({})
