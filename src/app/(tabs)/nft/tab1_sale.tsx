import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Colors, Image, Text, View } from 'react-native-ui-lib'
import { ButtonSize } from 'react-native-ui-lib/src/components/button/ButtonTypes'
import { BorderRadiusesLiterals } from 'react-native-ui-lib/src/style/borderRadiuses'

export default function Tab1_Sale_Screen() {
  return (
    <View flex padding-20 centerH marginT-20>
      <Image source={require('assets/nft.png')} width={160} height={160} />

      <Text text50 marginV-32>PowerPod OG NFT</Text>

      <Text text80R $textNeutral>
        It is used to reward early supporters of PowerPod, can be used for redemption after the product is
        launched, and has some special rights for product use.
      </Text>

      <View flex centerH marginT-32>
        <Text text80R $textNeutral>Current Price</Text>
        <Text text50 $textPrimary marginT-8>90 $PPD</Text>
        <Button label='Buy Now'
                size={ButtonSize.medium}
                borderRadius={BorderRadiusesLiterals.br20}
                style={{ width: 340, marginTop: 32 }}
                onPress={() => console.log('Buy Now')} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})
