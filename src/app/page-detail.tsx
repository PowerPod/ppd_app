import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function PageDetail() {
  console.log("detail")

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail page</Text>
      <View style={styles.block}></View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  block: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
  }
})
