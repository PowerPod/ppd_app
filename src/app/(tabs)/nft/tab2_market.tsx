import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Button, View, Text } from 'react-native-ui-lib'
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated'
import axios from 'axios'

const baseUrl = 'https://sandbox-api.coinmarketcap.com'

export default function Tab2_Market_Screen() {

  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setErrorFlag] = useState(false)
  const [price, setPrice] = useState('1.2')

  const width = useSharedValue(100)

  const handlePress = () => {
    width.value = withSpring(width.value + 50)
  }

  useEffect(() => {
    const abortController = new AbortController()
    const url = 'https://jsonplaceholder.typicode.com/posts/1'
    const options = {
      params: {
        format: 'json',
        from: 'AUD',
        to: 'CAD',
        amount: '1'
      },
      headers: {
        'X-RapidAPI-Key': '489eece352msha679c3256173825p1e0486jsnce9527f1a2bc',
        'X-RapidAPI-Host': 'currency-converter5.p.rapidapi.com'
      }
    }


    const fetchData = () => {
      setIsLoading(true)
      // axios more https://blog.logrocket.com/using-axios-with-react-native-manage-api-requests/
      axios
        .get(url, { signal: abortController.signal })
        .then((res) => {
            if (res.status === 200) {
              console.log(res.data)
              setPrice(res.data.title)
              setErrorFlag(false)
            } else {
              console.log('error')
              setErrorFlag(true)

            }
          }
        )
        .catch((error) => {
            setErrorFlag(true)
          }
        )
        .finally(() => {
            setIsLoading(false)
          }
        )

      return () => abortController.abort()
    }

    fetchData()

  }, [])


  return (
    <View flex center padding-20>
      <Animated.View
        style={{
          width,
          height: 100,
          backgroundColor: 'violet',
        }}
      />
      <Button onPress={handlePress} label='Press' />

      <View>
        {isLoading && <Text>Loading...</Text>}
        {hasError && <Text>Error</Text>}
      </View>

      <View>
        <Text text65>{price}</Text>
      </View>


    </View>
  )
}

const styles = StyleSheet.create({})
