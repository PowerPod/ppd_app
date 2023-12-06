import React, { useEffect, useRef, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text, View } from 'react-native-ui-lib'
import { BarCodeScanner } from 'expo-barcode-scanner'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withRepeat, withTiming } from 'react-native-reanimated'
import { useRouter } from 'expo-router'

export default function ScanDeviceScreen() {

  const router = useRouter()
  const linePosition = useSharedValue(200)
  const lineStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: linePosition.value }],
    }
  })

  const [hasPermission, setHasPermission] = useState(false)
  const [scanned, setScanned] = useState(false)
  const [pairingResult, setPairingResult] = useState<string>('')

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync()
      setHasPermission(status === 'granted')
    }

    getBarCodeScannerPermissions().then()

    linePosition.value = withRepeat(
      withTiming(-linePosition.value, { duration: 2000, easing: Easing.linear }), -1, true)

  }, [])


  const handleBarCodeScanned = ({ type, data }: { type: string, data: string }) => {
    setScanned(true)
    linePosition.value = withTiming(0)
    setPairingResult(data)

    router.push('/bind/step3')
    // registerDevice(data).then()
  }

  const registerDevice = async (data: string) => {
    try {
      const response = await fetch('https://example.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qrCodeData: data }),
      })

      const result = await response.json()

      //the result
      setPairingResult(result)
    } catch (error) {
      console.error('register error:', error)
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>
  }
  if (!hasPermission) {
    return <Text>No access to camera</Text>
  }

  return (
    <View flex>
      {scanned ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Result: {pairingResult}</Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <BarCodeScanner
            barCodeTypes={[BarCodeScanner.Constants.BarCodeType.qr]}
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ flex: 1 }}
          />

          <Animated.View style={[styles.line, lineStyle]} />


        </View>
      )}

      {scanned && <Button label={'Tap to Scan Again'} onPress={() => setScanned(false)} />}

    </View>
  )
}

const styles = StyleSheet.create({

  line: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    height: 2,
    backgroundColor: 'red',
  }
})
