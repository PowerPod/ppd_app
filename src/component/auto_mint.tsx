import React, { useEffect, useState } from 'react'
import { Text } from 'react-native-ui-lib'

type Props = {
  initialPT: number;

};

export const AutoMintPT: React.FC<Props> = ({ initialPT }) => {

  const [milliseconds, setMilliseconds] = useState(initialPT)

  useEffect(() => {
    const interval = setInterval(() => {
      setMilliseconds((prevMilliseconds) => prevMilliseconds + 100)
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <Text text90 white marginR-4 numberOfLines={1}
            ellipsizeMode='tail'>{(milliseconds / 100 * 0.00005).toFixed(5)}</Text>
    </>
  )
}
