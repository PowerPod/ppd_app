import React, { useEffect } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Env, LoginType, ParticleInfo, SupportAuthType, Wallet } from '@particle-network/rn-auth'
import * as particleAuth from '@particle-network/rn-auth'
import { Button, Text, View } from 'react-native-ui-lib'
import { useAuthStore } from '../../store/auth.store'
import { router } from 'expo-router'


export default function LoginPage() {

  const setUser = useAuthStore((state) => state.login)


  const login = async () => {
    const type = LoginType.Email
    const supportAuthType = [SupportAuthType.None]
    const result = await particleAuth.login(type, '', supportAuthType)

    if (result.status == 1) {
      const userInfo = result.data as particleAuth.UserInfo
      console.log(userInfo)

      setUser({
        address: userInfo.wallets.find((value: Wallet) => value.chain_name === 'evm_chain')?.public_address!,
        email: userInfo.email!,
        uuid: userInfo.uuid
      })

      router.replace('/')
    } else {
      const error = result.data
      console.log(error)
    }

  }

  const loginOut = async () => {
    const result = await particleAuth.logout()
    if (result.status) {
      console.log(result.data)
    } else {
      const error = result.data
      console.log(error)
    }
  }

  const fastLoginOut = async () => {
    const result = await particleAuth.fastLogout()
    if (result.status) {
      console.log(result.data)
    } else {
      const error = result.data
      console.log(error)
    }
  }

  const signMessage = async () => {
    const message = 'Hello world!'
    const result = await particleAuth.signMessage(message)
    if (result.status) {
      console.log(result.data)
    } else {
      const error = result.data
      console.log(error)
    }
  }


  return (
    <View style={styles.container}>
      <View row centerV>
        <Image source={require('assets/icon.png')} style={{ width: 48, height: 48 }} />
        <Text text40 marginL-16>POWERPOD</Text>
      </View>

      <Text marginT-80>Account will be automatically registered</Text>
      <Button label={'Login'} onPress={login} br20 marginT-20 style={{ width: '80%' }} />
      {/*<Button label={'LoginOut'} onPress={loginOut} />*/}
      {/*<Button label={'FastLoginOut'} onPress={fastLoginOut} />*/}
      {/*<Button label={'GetAddress'} onPress={async () => {*/}
      {/*  const address = await particleAuth.getAddress()*/}
      {/*  console.log(address)*/}
      {/*}*/}
      {/*} />*/}
      {/*<Button label={'GetUserInfo'} onPress={async () => {*/}
      {/*  const result = await particleAuth.getUserInfo()*/}
      {/*  const userInfo = JSON.parse(result)*/}
      {/*  console.log(userInfo)*/}
      {/*}} />*/}

      {/*<Button label='sign Message' onPress={signMessage} />*/}

      {/*<Button label='OpenAccountAndSecurity' onPress={() => {*/}
      {/*  particleAuth.openAccountAndSecurity()*/}
      {/*}} />*/}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
