import React, { useEffect, useState } from 'react'
import { ActivityIndicator, FlatList, Platform, StyleSheet, Image, ImageBackground } from 'react-native'
import { ActionSheet, Colors, Spacings, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import { Stack, useRouter } from 'expo-router'

import { CardDeviceT2 } from '@component/card_device_t2'
import { supabase } from '../../../utils/supabse/supabase'
import { StatusBar } from 'expo-status-bar'
import { useHeaderHeight } from '@react-navigation/elements'
import { PlusCircleIcon } from 'lucide-react-native'
import { CardDeviceT1 } from '@component/card_device_t1'

function EmptyStatus() {
  return <View flex center>
    <Image source={require('assets/gas-station.png')} style={{ width: 36, height: 36 }} />
    <Text marginT-12 $textNeutral text90M>No available piles</Text>
    <Text $textNeutral text90L>Tap + to add piles</Text>
  </View>
}

export default function Index() {

  const router = useRouter()
  const [showActionSheet, setShowActionSheet] = useState(false)

  const [isLoading, setIsLoading] = useState(true)
  const [deviceList, setDeviceList] = useState<Device[]>([])
  const [isEmpty, setIsEmpty] = useState(false)


  async function getUserDeviceList() {
    setIsLoading(true)
    try {
      const { data, error, status } = await supabase
        .from('devices')
        .select()

      if (error && status != 406) {
        throw error
      }
      if (data) {
        console.log(data)
        setDeviceList(data)
        setIsEmpty(data.length === 0)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error)
      }
    } finally {
      setIsLoading(false)
    }
  }


  useEffect(() => {
    getUserDeviceList().then()
  }, [])
  const headerHeight = useHeaderHeight()


  return (
    <ImageBackground source={require('assets/bg3x.png')} style={{ width: '100%', height: '100%' }}
                     resizeMode={'stretch'}>
      <Stack.Screen options={{
        headerTransparent: true,
        headerTitle: 'My Piles',
        headerTitleAlign: 'left',
        headerTitleStyle: {
          color: Colors.white
        },
        headerRight: () => (
          <TouchableOpacity padding-8 onPress={() => setShowActionSheet(true)}>
            <PlusCircleIcon size={24} color={Colors.white} />
          </TouchableOpacity>
        ),
      }} />

      <View flex-1 bg-bgColor marginH-4
            style={{ marginTop: headerHeight, borderTopStartRadius: 24, borderTopEndRadius: 24 }}>
        {isLoading ? (
            <View flex center>
              <Text>loading</Text>
              <ActivityIndicator size='large' />
            </View>
          ) :
          isEmpty ? (
            <EmptyStatus />
          ) : (
            <FlatList
              data={deviceList}
              renderItem={({ item, index }) => {
                if (index === 0) {
                  return (<CardDeviceT1
                      title='T1'
                      onPress={() => router.push({
                        pathname: '/plug_detail',
                        params: { id: item.id }
                      })} />
                  )
                }
                return (
                  <CardDeviceT2
                    id={item.id}
                    title='T2'
                    onPress={() => router.push({
                      pathname: '/plug_detail',
                      params: { id: item.id }
                    })} />
                )

              }
              }
              contentContainerStyle={styles.gridList}
            />
          )}
      </View>
      <StatusBar style='light' />

      <ActionSheet
        cancelButtonIndex={2}
        destructiveButtonIndex={0}
        options={[
          { label: 'Add device', onPress: () => router.push('/bind') },
          { label: 'Buy device', onPress: () => console.log('option 2') },
          { label: 'cancel', onPress: () => console.log('cancel') }
        ]}
        visible={showActionSheet}
        useNativeIOS={Platform.OS === 'ios'}
        onDismiss={() => setShowActionSheet(false)}
      />
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  gridList: {
    paddingTop: Spacings.s5,
    paddingHorizontal: Spacings.s5,
    gap: 20
  },
  imageBg: {
    position: 'absolute',
    flexShrink: 0,
    width: 220,
    height: 215,
    top: 5,
    right: -55,
  },
  address: {
    gap: 4,
  },
  addressText: {
    overflow: 'hidden',
    color: Colors.$textNeutral,
    lineHeight: 20
  },
  statusText: {
    lineHeight: 20,
    color: Colors.black
  }
})
