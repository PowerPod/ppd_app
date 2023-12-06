import React from 'react'
import { FlatList, ScrollView, StyleSheet } from 'react-native'
import { Colors, Image, Text, View } from 'react-native-ui-lib'
import Animated from 'react-native-reanimated'
import { StatusBar } from 'expo-status-bar'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ChevronRightIcon, ToggleRightIcon } from 'lucide-react-native'


export default function PlugDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View flex>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View flex bg-bgColor>
          <View centerH paddingV-40>
            <Animated.Image source={require('assets/plug_large.png')}
                            style={{
                              width: 310,
                              height: 174,
                            }}
                            resizeMode={'cover'}
                            sharedTransitionTag={`tag${id}`} />
          </View>
          <View bg-white br20 marginH-12 marginT-8>
            <Text margin-16 text60>Control</Text>
            <View style={styles.itemSeparator} />

            <View row marginH-16 marginV-12 centerV>
              <ToggleRightIcon size={20} style={{ margin: 4 }} color={Colors.black} />
              <View flex-1 marginL-16>
                <Text text65>Power Switch</Text>
                <Text $textNeutral>State:On</Text>
              </View>
              <ChevronRightIcon size={20} />
            </View>

          </View>

          <View bg-white br20 marginH-12 marginT-8>

            <View padding-16>
              <Text text60>Mint</Text>

              <View row marginT-16 centerV>
                <Text text50>300</Text>
                <Text marginL-8 $textNeutral text80>PT</Text>
              </View>
              <Text $textNeutralLight>Current device cumulative mining</Text>
            </View>
            <View style={styles.itemSeparator}></View>

            <FlatList data={[{ id: '1', name: '1 kw' }, { id: '2', name: '2kw' }, { id: '3', name: '3kw' }, {
              id: '4',
              name: '4kw'
            }, { id: '5', name: '5kw' }]}
                      horizontal={false}
                      scrollEnabled={false}
                      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8 }}
                      renderItem={(item) => (
                        <View row centerV paddingV-7>
                          <Text flex-2 text80M $textNeutral>{item.item.name}</Text>
                          <Text flex-2 text80M $textNeutral>$11.01</Text>
                          <Text flex-2 text80M $textNeutral>12 PT</Text>
                          <Text flex-3 text80M $textNeutral center>09/11 10:00:32</Text>
                        </View>
                      )}
                      keyExtractor={item => item.id}
                      ListHeaderComponent={
                        () => (
                          <View row paddingV-7>
                            <Text flex-2 text90R $textNeutralLight>Power</Text>
                            <Text flex-2 text90R $textNeutralLight>Payment</Text>
                            <Text flex-2 text90R $textNeutralLight>Token</Text>
                            <Text flex-3 text90R $textNeutralLight>Date</Text>
                          </View>
                        )
                      }

            />

          </View>
        </View>
      </ScrollView>
      <StatusBar style={'dark'} />
    </View>
  )
}

const styles = StyleSheet.create({
  itemSeparator: {
    width: 'auto',
    height: 1,
    backgroundColor: Colors.$outlineDisabled,
  }
})
