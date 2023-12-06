import React from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Colors, Text, View } from 'react-native-ui-lib'
import { CardBackground } from '@component/card_bg'
import { CardStatusComponent, PlugStatus } from '@component/card_status'
import PT2Icon from '@component/svg/pt2'
import Animated from 'react-native-reanimated'
import { MoreHorizontalIcon } from 'lucide-react-native'


type Props = {
  id: number,
  title?: string;
  onPress?: () => void
};

export const CardDeviceT2: React.FC<Props> = ({ id, title, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <View flex br40 bg-white padding-16 style={styles.boardContainer}>
        <CardBackground color={Colors.rgba(188, 188, 188, 0.23)} />

        <View row>
          <View br20 bg-bgColor width={80} height={80} center>
            <Animated.Image source={require('assets/plug_small.png')}
                            style={{ width: 75, height: 42 }}
                            resizeMode={'cover'}
                            sharedTransitionTag={`tag${id}`} />
          </View>
          <View flex paddingL-16>
            <Text text65 $textPrimary>My Plug</Text>
            <Text text80 $textNeutralLight>ID: 2910</Text>
          </View>

          <View>
            <MoreHorizontalIcon color={Colors.black} width={24} height={24} />
          </View>
        </View>

        <View row spread style={styles.txtPosition}>
          <CardStatusComponent status={PlugStatus.Idle} />

          {/*<View>*/}
          {/*  <Text text90 $textNeutral>Finish in</Text>*/}
          {/*  <Text text90 $textPrimary numberOfLines={1} ellipsizeMode='tail'>*/}
          {/*    45 min*/}
          {/*  </Text>*/}
          {/*</View>*/}

          <View flex>
            <Text text80R $textNeutral marginB-8>Income</Text>
            <View row centerV>
              <Text text70M $textPrimary marginR-4 numberOfLines={1} ellipsizeMode='tail'>
                256.32
              </Text>
              <PT2Icon width={16} height={16} />
            </View>
          </View>
        </View>

      </View>
    </Pressable>

  )
}

const styles = StyleSheet.create({
  boardContainer: {
    minHeight: 200,
    overflow: 'hidden'
  },
  txtPosition: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    width: '100%'
  }


})
