import React from 'react'
import { FlatList, Pressable, ScrollView, StyleSheet } from 'react-native'
import { Avatar, Colors, Image, Text, View } from 'react-native-ui-lib'
import { Carousel } from 'react-native-ui-lib/src/components/carousel'
import { AirplayIcon, ClockIcon, CurrencyIcon, PhoneIcon, ZapIcon } from 'lucide-react-native'


const images = [
  'https://images.pexels.com/photos/3297502/pexels-photo-3297502.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3496994/pexels-photo-3496994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/3323694/pexels-photo-3323694.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/3350141/pexels-photo-3350141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
]

export default function DeviceDetailScreen() {

  return (
    <View flex>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Carousel
          containerStyle={{ height: 200 }}
          loop={true}
          pageControlProps={{
            size: 6,
            containerStyle: styles.loopCarousel,
            color: 'white',
            inactiveColor: Colors.grey40,
          }}
          pageControlPosition={Carousel.pageControlPositions.OVER}
          onChangePage={
            () => console.log('page changed')
          }>
          {images.map((image, index) => (
            <View flex centerV key={index}>
              <Image
                overlayType={Image.overlayTypes.BOTTOM}
                style={{ flex: 1, height: 200 }}
                resizeMode='cover'
                source={{ uri: image }} />
            </View>
          ))}
        </Carousel>

        <View margin-16>
          <View row br20 bg-white padding-16>
            <Avatar
              source={{ uri: 'https://oss.zhidx.com/uploads/2021/11/61827183f0efa_61827183edcf5_61827183edcd2_%E7%89%B9%E6%96%AF%E6%8B%89%E6%96%B0%E5%85%85%E7%94%B5%E6%A1%A9.png' }}
              badgeProps={{ size: 10, backgroundColor: Colors.$backgroundWarningHeavy }}
              badgePosition='BOTTOM_RIGHT'
            />

            <View marginL-12>
              <Text text90M $textNeutral>ID:2910</Text>
              <Text text80M $textPrimary>$0.4634 / kWh</Text>
              <Text text90M $textNeutral>$0.53 / kWh separate parking charges</Text>
            </View>
          </View>


          <View br20 bg-white padding-16 marginT-10>
            <View row spread>
              <View>
                <Text text80M $textSuccess>Available</Text>
                <View row centerV>
                  <ClockIcon size={16} color={Colors.$textNeutral} />
                  <Text text80M marginL-4 $textNeutral>00:00 - 24:00</Text>
                </View>
              </View>

              <View>
                <Text text80M $textPrimary>Voltage</Text>
                <View row centerV>
                  <ZapIcon size={16} color={Colors.$textNeutral} />
                  <Text text80M marginL-4 $textNeutral>max. 60kW</Text>
                </View>
              </View>
            </View>
            <View row spread marginT-24>
              <View>
                <Text text80M $textPrimary>400m,5 min driving</Text>
                <Text text80M $textNeutral>shanghai,Nanjing Road</Text>
              </View>

              <View row centerV>
                <Pressable style={{ padding: 16 }} onPress={() => {
                  console.log('phone')
                }}>
                  <PhoneIcon size={16} color={Colors.$textNeutral} />
                </Pressable>
                <Pressable style={{ padding: 16 }} onPress={() => {
                  console.log('address')
                }}>
                  <AirplayIcon size={16} color={Colors.$textNeutral} />
                </Pressable>
              </View>
            </View>

          </View>


          <View br20 bg-white padding-16 marginT-10>
            <View row spread>
              <View row>
                <CurrencyIcon size={24} />
                <Text marginL-4 text50>300.00</Text>
              </View>
              <View row>
                <CurrencyIcon size={24} />
                <Text marginL-4 text50>$24.12</Text>
              </View>
            </View>

            <View style={styles.dividerH}>

            </View>
            <Text text65>Token and income</Text>

            <FlatList data={[{ id: '1', name: '1 kw' }, { id: '2', name: '2kw' }, { id: '3', name: '3kw' }, {
              id: '4',
              name: '4kw'
            }, { id: '5', name: '5kw' }]}
                      horizontal={false}
                      scrollEnabled={false}
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
                      ItemSeparatorComponent={() => (
                        <View style={styles.itemSeparator} />
                      )}
            />

          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  loopCarousel: {
    position: 'absolute',
    left: '50%',
    bottom: 15,
    right: '50%'
  },
  dividerH: {
    width: 'auto',
    height: 1,
    marginVertical: 12,
    backgroundColor: Colors.$outlineDefault,
  },
  itemSeparator: {
    width: 'auto',
    height: 1,
    backgroundColor: Colors.$outlineDisabled,
  }

})
