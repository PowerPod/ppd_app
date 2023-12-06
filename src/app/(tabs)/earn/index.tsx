import React from 'react'
import { FlatList, ImageBackground, ScrollView, StyleSheet } from 'react-native'
import { Button, Colors, ProgressBar, SegmentedControl, Text, TextField, View } from 'react-native-ui-lib'
import { BorderRadiusesLiterals } from 'react-native-ui-lib/src/style/borderRadiuses'
import CountdownTimer from '@component/countdown_timer'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useHeaderHeight } from '@react-navigation/elements'

export default function EarnScreen() {
  const headerHeight = useHeaderHeight()

  return (
    <ImageBackground source={require('assets/bg3x.png')}
                     style={{ width: '100%', height: '100%' }}
                     resizeMode={'stretch'}>

      <View paddingH-4 flex-1 style={{ marginTop: headerHeight }}>
        <ScrollView showsVerticalScrollIndicator={false} contentInsetAdjustmentBehavior='always'>
          <View row marginT-12>
            <View flex-1 centerH paddingV-12>
              <Text marginB-4 text90M $textNeutral>Total Epoch</Text>
              <Text text60M white>38</Text>
            </View>
            <View bg-$outlinePrimary style={styles.divider} />
            <View flex-1 centerH paddingV-12>
              <Text marginB-4 text90M $textNeutral>PPD Price</Text>
              <Text text60M white>$12.00</Text>
            </View>
          </View>
          <View row spread>
            <View flex-1 bg-$outlinePrimary style={styles.dividerH} />
            <View flex-1 bg-$outlinePrimary style={styles.dividerH} />
          </View>
          <View row>
            <View flex-1 centerH paddingV-12>
              <Text marginB-4 text90M $textNeutral>Invest</Text>
              <Text text60M white>38 PT</Text>
            </View>
            <View bg-$outlinePrimary style={styles.divider} />
            <View flex-1 centerH paddingV-12>
              <Text marginB-4 text90M $textNeutral>Circulation</Text>
              <Text text60M white>9,800 PPD</Text>
            </View>
          </View>

          <View bg-white br60 padding-16 marginT-20>

            <View center>
              <SegmentedControl segments={[{ label: 'This Epoch' }, { label: 'Next Epoch' }]}
                                backgroundColor={Colors.white} activeBackgroundColor={Colors.black}
                                activeColor={Colors.white} inactiveColor={Colors.black}
                                style={{ height: 48 }} segmentsStyle={{ height: '100%', width: 115 }}
              />
            </View>
            <Text marginT-24 style={styles.label}>No 38</Text>

            <CountdownTimer style={styles.value} />
            <View row spread marginT-12 centerV>
              <Text style={styles.label}>To be minted</Text>
              <Text style={styles.value}>1878 PPD</Text>
            </View>

            <View row spread marginT-12 centerV>
              <Text style={styles.label}>The total investment</Text>
              <Text style={styles.value}>1878000 PT</Text>
            </View>

            <View style={styles.inputBoard}>
              <Text text90L>You invest</Text>
              <TextField
                placeholder='0'
                placeholderTextColor={Colors.black}
                text50BO black
                onChangeText={(text) => console.log(text)}
                validate={['required', 'number']}
                validationMessage={['This field is required', 'This field must be a number']}
                keyboardType='numeric'
                fieldStyle={styles.input}
                maxLength={10}
                trailingAccessory={
                  <Text text50 $textNeutralLight>
                    PT
                  </Text>
                }
              />

            </View>
            <View>
              <Text $textNeutralLight text90M style={{ textAlign: 'right' }}>
                Balance: 3,000.87
              </Text>
            </View>

            <View centerH paddingV-12>
              <Text text80M $textNeutral>You max receive</Text>
              <View row bottom>
                <Text text50 $textPrimary>2,323.09</Text>
                <Text text80M> PDD</Text>
              </View>
            </View>

            <Button label={'Invest'} size={Button.sizes.medium}
                    borderRadius={BorderRadiusesLiterals.br20} />
          </View>

          <View br20 bg-white padding-12 marginT-20 marginB-12>
            <Text text80M marginB-25>Invest History</Text>
            <FlatList
              data={[
                { id: '1', name: 'N0.1', pt: 24, ppd: 100 },
                { id: '2', name: 'N0.2', pt: 24, ppd: 100 }, {
                  id: '3',
                  name: 'N0.3',
                  pt: 24,
                  ppd: 100
                }, {
                  id: '4',
                  name: 'N0.4',
                  pt: 24,
                  ppd: 100
                }, {
                  id: '5',
                  name: 'N0.5',
                  pt: 24,
                  ppd: 100
                }, {
                  id: '6',
                  name: 'N0.6',
                  pt: 24,
                  ppd: 100
                }]} renderItem={({ item, index }) => {
              return (
                <View row spread centerV paddingV-7>
                  <Text style={index === 0 ? styles.itemHighlight : styles.item}>{item.name}</Text>
                  <Text style={index === 0 ? styles.itemHighlight : styles.item}>{item.pt}</Text>
                  <Text style={index === 0 ? styles.itemHighlight : styles.item}>{item.ppd}</Text>
                </View>
              )
            }}
              keyExtractor={(item) => item.id}
              ListHeaderComponent={() => {
                return (<View row spread centerV>
                  <Text text90R $textNeutralLight>Epoch</Text>
                  <Text text90R $textNeutralLight>PT</Text>
                  <Text text90R $textNeutralLight>PPD</Text>
                </View>)
              }}
              scrollEnabled={false}
              ItemSeparatorComponent={() => (
                <View style={styles.itemSeparator} />
              )}
            />
          </View>

        </ScrollView>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  inputBoard: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'white',
    marginTop: 24,
    borderRadius: 6,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderStyle: 'solid',
    gap: 4,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: 'white',
  }
  ,
  divider: {
    width: 1,
    height: 'auto',
    // backgroundColor: Colors.$outlinePrimary,
    marginVertical: 12
  },
  dividerH: {
    width: 'auto',
    height: 1,
    // backgroundColor: Colors.$outlinePrimary,
    marginHorizontal: 12
  },
  label: {
    color: '#737373',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 22,
  },
  value: {
    color: Colors.$900,
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
  },
  itemSeparator: {
    width: 'auto',
    height: 1,
    backgroundColor: Colors.$100,
  },
  item: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    color: Colors.$500,
  },
  itemHighlight: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 22,
    color: Colors.$900,
  }


})
