import { router, Stack, useRootNavigationState, useRouter, useSegments } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { configureDesignSystem } from '../utils/designSystem'
import { useAuthStore } from '../store/auth.store'
import { getUserInfo, initParticleAuth, isParticleLogin } from '../utils/particleAuthHelper'
import 'pollify'
import { Wallet } from '@particle-network/rn-auth'

require('react-native-ui-lib/config').setConfig({ appScheme: 'default' })
SplashScreen.preventAutoHideAsync().then(r => console.log('star'))

function useProtectedRoute() {

  const segments = useSegments()
  const rootNavigationState = useRootNavigationState()
  const navigationKey = useMemo(() => {
    return rootNavigationState?.key
  }, [rootNavigationState])

  const user = useAuthStore((state) => state.user)

  useLayoutEffect(() => {
    const inAuthGroup = segments[0] === 'auth'

    if (!navigationKey) {
      return
    }

    console.log(segments)
    if (!user && !inAuthGroup) {
      console.log('not in auth group')
      router.replace('/auth')
    } else if (user && inAuthGroup) {
      console.log('in auth group')
      router.replace('/')
    }


  }, [user, segments, navigationKey])
}

export default function RootLayout() {

  const [appIsReady, setAppIsReady] = useState(false)
  const setUser = useAuthStore((state) => state.login)

  useEffect(() => {
    async function prepare() {

      try {
        configureDesignSystem()
        initParticleAuth()
        const result = await isParticleLogin()
        if (result) {
          const userInfo = await getUserInfo()
          setUser({
            address: userInfo.wallets.find((value: Wallet) => value.chain_name === 'evm_chain')?.public_address,
            email: userInfo.email,
            uuid: userInfo.uuid
          })
        }

        //other load resources
        await new Promise(resolve => setTimeout(resolve, 1500))

      } catch (e) {
        console.log(e)
      } finally {
        setAppIsReady(true)
      }
    }

    prepare().then()
  }, [])


  useEffect(() => {
      if (appIsReady) {
        SplashScreen.hideAsync().then((result) => {
          console.log(result)
        })
      }
    },
    [appIsReady],
  )

  useProtectedRoute()

  if (!appIsReady) {
    return null
  }

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='page-detail' options={{ title: 'Detail Page' }} />
      <Stack.Screen name='bind' options={{ headerShown: false, presentation: 'modal' }} />
      <Stack.Screen name='auth' options={{ headerShown: false }} />
    </Stack>
  )
}
