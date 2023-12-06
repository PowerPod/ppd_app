import React, { useEffect, useState } from 'react'
import { FlatList, ImageBackground, Pressable, ScrollView, StyleSheet } from 'react-native'
import { Button, Colors, Icon, Image, Text, View } from 'react-native-ui-lib'
import { useHeaderHeight } from '@react-navigation/elements'
import { ArrowDownCircleIcon, ArrowUpCircleIcon, CircleDollarSignIcon } from 'lucide-react-native'
import * as particleAuth from '@particle-network/rn-auth'
import { EvmService, WalletDisplay } from '@particle-network/rn-auth'
import { shortenAddress } from '../../../utils/utils'
import * as particleWallet from '@particle-network/rn-wallet'
import * as particleConnect from '@particle-network/rn-connect'
import { AccountInfo, CommonError, WalletType } from '@particle-network/rn-connect'
import { Ethereum, Optimism, OptimismGoerli } from '@particle-network/chains'
import PTIcon from '@component/svg/pt'
import { router } from 'expo-router'

export default function MeScreen() {

  const headerHeight = useHeaderHeight()

  const [address, setAddress] = useState('')
  const [nativeToken, setNativeToken] = useState(0)
  const [ppdToken, setPPDToken] = useState(0)


  useEffect(() => {
    particleAuth.getAddress().then((result) => {
      setAddress(result)

      EvmService.getTokens(result).then(
        (tokenList: TokenRpcList) => {
          console.log(tokenList, 'tokens')
          const formattedNativeToken = (tokenList.native / 10 ** 18).toFixed(3)
          setNativeToken(parseFloat(formattedNativeToken))

          //PPD test
          const specificAddress = '0xdc2CC710e42857672E7907CF474a69B63B93089f'
          const ppdResult = tokenList.tokens.find(token => token.address === specificAddress)

          if (ppdResult) {
            const formattedPPDToken = (ppdResult.amount / 10 ** ppdResult.decimals).toFixed(3)
            setPPDToken(parseFloat(formattedPPDToken))
          }
        }
      )

    })

    particleConnect.connect(WalletType.Particle).then((result) => {
      if (result.status) {
        const accountInfo = result.data as AccountInfo
        console.log('accountInfo', accountInfo.publicAddress)

        initWalletSetting(accountInfo.publicAddress)
          .then(r => console.log('success init wallet'))
      } else {
        const error = result.data as CommonError
        console.log(error)
      }
    })


  }, [])


  async function initWalletSetting(address: string) {
    particleWallet.createSelectedWallet(
      address,
      WalletType.Particle
    )

    particleWallet.setShowLanguageSetting(false)
    particleWallet.setShowTestNetwork(true)
    particleWallet.setSupportChain([OptimismGoerli, Optimism, Ethereum])

    particleWallet.setPayDisabled(true)
    particleWallet.setSwapDisabled(true)
  }

  return (
    <ImageBackground source={require('assets/bg3x.png')} style={{ width: '100%', height: '100%' }}
                     resizeMode={'stretch'}>
      <View flex marginH-4 bg-bgColor
            style={{ marginTop: headerHeight, borderTopEndRadius: 24, borderTopStartRadius: 24 }}>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View centerH padding-16>
            <Text $textNeutralLight>Total balance</Text>
            <Text text40 marginT-12 style={{ fontStyle: 'italic' }}>239984.23 PDD</Text>

            <Button label={shortenAddress(address)}
                    size={Button.sizes.medium}
                    backgroundColor={Colors.white}
                    outlineColor={Colors.$outlinePrimary}
                    color={Colors.$textPrimary}
                    marginT-12
                    outlineWidth={1}
                    onPress={() => {

                    }}
            />

            <View row spread marginV-24 style={{ width: '60%' }}>
              <Pressable onPress={() => {
                particleWallet.navigatorTokenSend('0xdc2CC710e42857672E7907CF474a69B63B93089f', '', '0')
              }}>
                <View centerH>
                  <ArrowUpCircleIcon size={54} color={Colors.$iconPrimary} style={{ padding: 15 }} strokeWidth={1} />
                  <Text text80M>Send</Text>
                </View>
              </Pressable>

              <Pressable onPress={() => {
                particleWallet.navigatorTokenReceive('0xdc2CC710e42857672E7907CF474a69B63B93089f')
              }}>
                <View centerH>
                  <ArrowDownCircleIcon size={54} color={Colors.$iconPrimary} style={{ padding: 15 }} strokeWidth={1} />
                  <Text text80M>Receive</Text>
                </View>
              </Pressable>


            </View>
          </View>


          <FlatList
            data={[
              { coin: 'ETH', balance: nativeToken },
              { coin: 'LINK', balance: ppdToken },
              { coin: 'PPD', balance: 0 }]}

            ListHeaderComponent={() => (
              <Text text60 margin-16>Wallet Account</Text>
            )}
            style={{
              borderRadius: 12,
              backgroundColor: Colors.white,
              marginHorizontal: 12,
              marginBottom: 12
            }}
            keyExtractor={item => item.coin}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <Pressable onPress={() => {
                console.log('pressed123')
                // particleWallet.navigatorWallet(WalletDisplay.Token)
                particleWallet.navigatorTokenTransactionRecords('0xdc2CC710e42857672E7907CF474a69B63B93089f')
              }}>
                <View row marginV-24 marginH-16 centerV>
                  {item.coin === 'PPD' ? <Icon source={require('assets/icon_ppd.png')} size={32} /> :
                    <CircleDollarSignIcon size={32} />}

                  <Text flex-1 marginL-6 text65>{item.coin}</Text>
                  <Text text65>{item.balance}</Text>
                </View>
              </Pressable>
            )}
            ItemSeparatorComponent={() => (
              <View style={styles.itemSeparator} />
            )}
          />

          <View br30 bg-white margin-12>
            <Text text60 margin-16>Mint</Text>
            <Pressable onPress={() => {
              router.push('/earn/my_pt')
            }}>
              <View row marginV-24 marginH-16 centerV>
                <Text flex-1>Charge Mint</Text>
                <PTIcon width={32} height={32} />
                <Text text65 marginH-6>454342.00</Text>
                <Text text65R>PT</Text>
              </View>
            </Pressable>

          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  itemSeparator: {
    width: 'auto',
    height: 1,
    backgroundColor: Colors.$outlineDefault,
  },
})
