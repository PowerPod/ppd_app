import React, { useRef, useState } from 'react'
import { ImageBackground, StyleSheet } from 'react-native'
import { Colors, SegmentedControl, TabController, TabControllerImperativeMethods, View } from 'react-native-ui-lib'
import Tab1_Sale_Screen from './tab1_sale'
import Tab2_Market_Screen from './tab2_market'
import Tab3_My_Screen from './tab3_my'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { SafeAreaView } from 'react-native-safe-area-context'

function NFTPage() {

  const [pageSelectedIndex, setPageSelectedIndex] = useState(0)

  const tabController = useRef<TabControllerImperativeMethods>()

  const onChangePage = (index: number) => {
    // setPageSelectedIndex(index)
    console.log('TabController onChangePage', index)
  }

  const setTabIndex = (index: number) => {
    tabController.current?.setTab(index)
  }

  const onChangeIndex = (index: number) => {
    console.log('segmentedControl onChangeIndex', index)
    tabController.current?.setTab(index)

  }

  return (
    <ImageBackground source={require('assets/bg3x.png')}
                     style={{ width: '100%', height: '100%' }}
                     resizeMode={'stretch'}>
      <View flex marginT-48>
        <SegmentedControl
          segments={[{ label: 'Public sale' }, { label: 'Market' }, { label: 'My Collection' }]}
          backgroundColor={Colors.white}
          activeBackgroundColor={Colors.black}
          activeColor={Colors.white}
          inactiveColor={Colors.black}
          style={{ height: 40, marginTop: 0, marginHorizontal: 24 }}
          segmentsStyle={{ height: '100%' }}
          onChangeIndex={onChangeIndex} />

        <TabController
          ref={tabController}
          items={[{ label: 'First' }, { label: 'Second' }, { label: 'Third' }]}
        >
          <View flex-1 marginH-4 bg-bgColor
                style={{ borderTopEndRadius: 24, borderTopStartRadius: 24, marginTop: 12 }}>
            <TabController.TabPage index={0}>
              <Tab1_Sale_Screen />
            </TabController.TabPage>
            <TabController.TabPage index={1}>
              <Tab2_Market_Screen />
            </TabController.TabPage>
            <TabController.TabPage index={2} lazy>
              <Tab3_My_Screen />
            </TabController.TabPage>
          </View>
        </TabController>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({})

export default gestureHandlerRootHOC(NFTPage)
