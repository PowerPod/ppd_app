import React from 'react'
import { View, Text, Colors } from 'react-native-ui-lib'
import Animated, {
  Easing, FadeInDown, FadeOutUp, PinwheelIn, PinwheelOut, useAnimatedStyle,
  useSharedValue,
  withTiming
} from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import { FocusIcon, ZapIcon } from 'lucide-react-native'

const COUNT_ANIMATION_DURATION = 200
const COUNT_ANIMATION_DELAY = 60
const COUNT_ANIMATION_DISTANCE = 120

export enum PlugStatus {
  Idle = 'idle',
  Charging = 'charging',
}

type StatusComponentProps = {
  status: PlugStatus,
};


export const CardStatusComponent: React.FC<StatusComponentProps> = (
  {
    status,
  }) => {

  const textWidth = useSharedValue(0)
  const [inner, setInner] = React.useState(true)


  const animatedStyle = useAnimatedStyle(() => {
    // console.log(`${textWidth.value}`)
    return { width: textWidth.value, opacity: textWidth.value / 80 }
  }, [textWidth])

  const oldCount = useSharedValue<PlugStatus>(PlugStatus.Idle)
  const newCount = useSharedValue<PlugStatus>(status)

  React.useEffect(() => {
    newCount.value = status
    textWidth.value = withTiming(80, { easing: Easing.bounce, duration: 1500 })

    setInner(!inner)

    return () => {
      textWidth.value = 0
    }
  }, [status])

  const renderIcon = () => {
    if (status === PlugStatus.Idle) {
      return <FocusIcon size={16} color={Colors.black}/>
    } else if (status === PlugStatus.Charging) {
      return <ZapIcon size={16} color={Colors.black}/>
    }
  }

  const renderText = () => {
    if (status === PlugStatus.Idle) {
      return 'Idle'
    } else if (status === PlugStatus.Charging) {
      return 'Charging'
    }
  }

  return (
    <View flex>
      <Text text80R $textNeutral marginB-8>Status</Text>
      <View flex row centerV>
        <View
          style={styles.box}>
          {inner && (
            <Animated.View style={styles.icon} entering={PinwheelIn} exiting={PinwheelOut}>
              {renderIcon()}
            </Animated.View>
          )}

          {!inner && (
            <Animated.View style={styles.icon} entering={PinwheelIn} exiting={PinwheelOut}>
              {renderIcon()}
            </Animated.View>
          )}
        </View>
        <Animated.Text numberOfLines={1} style={[{
          fontSize: 16,
          color: Colors.$textPrimary,
          fontWeight: '500',
          lineHeight: 20,
          marginLeft: 2
        }, animatedStyle]}> {renderText()}</Animated.Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  box: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 14,
    height: 14,
    justifyContent: 'center',
  }


})
