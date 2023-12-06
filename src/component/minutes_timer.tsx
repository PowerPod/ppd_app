import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-ui-lib'

type Props = {
  initialMinutes: number;
};

const MinutesTimer: React.FC<Props> = ({ initialMinutes = 0 }) => {
  const [minutes, setMinutes] = useState(initialMinutes)

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutes((prevMinutes) => prevMinutes + 1)
    }, 60 * 1000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <Text text90 white numberOfLines={1} ellipsizeMode='tail'>
    {minutes} min
  </Text>
}

export default MinutesTimer
