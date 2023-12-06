import React from 'react'
import { StyleSheet } from 'react-native'
import { GridList, Image, Spacings, Text, View } from 'react-native-ui-lib'


export default function Tab3_My_Screen() {
  const data = [{ label: 'PowerPod OG1' }, { label: 'PowerPod OG2' }, { label: 'PowerPod OG3' }]

  return (
    <GridList
      ListHeaderComponent={() => <Text>Header</Text>}
      data={data}
      listPadding={Spacings.s5}
      itemSpacing={Spacings.s3}
      renderItem={({ item }) => (
        <View padding-12 center br20>
          <Image source={require('assets/nft.png')} width={160} height={160} />
          <Text marginT-5 $textPrimary>{item.label}</Text>
        </View>
      )}
      numColumns={2}
      contentContainerStyle={styles.list}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    paddingTop: Spacings.s5
  }
})
