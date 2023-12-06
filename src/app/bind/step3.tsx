import React from 'react'
import { Platform, StyleSheet } from 'react-native'
import { Badge, Button, ButtonSize, Colors, Image, View, Text, Chip } from 'react-native-ui-lib'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

export default function Step3Screen() {
  return (
    <View flex padding-16>
      <View center marginT-40>
        <Image source={require('@assets/circle_wave.png')} width={270} height={270}
               style={{ zIndex: -1, position: 'absolute' }} />
        <Image source={require('@assets/device_add.png')} width={155} height={195}
               style={{ backgroundColor: Colors.red }} />
      </View>

      <View centerH marginT-48>
        <Chip iconSource={require('assets/ic_check.png')}
              iconStyle={{ width: 40, height: 40 }}
              containerStyle={{ backgroundColor: Colors.accent, borderColor: Colors.accent }}
        />
        <Text text65 marginV-12>Successfully bound</Text>

        <Text>The device has been successfully activated.</Text>
      </View>

      <View marginT-48 centerH>
        <Button label='Finish' size={ButtonSize.large} style={{ width: 72 }} borderRadius={6}
                onPress={() => router.replace('/')} />
      </View>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({})
