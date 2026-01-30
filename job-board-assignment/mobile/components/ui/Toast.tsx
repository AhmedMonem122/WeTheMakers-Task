import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'

export default function Toast({ message, visible }: { message: string; visible: boolean }) {
  const [show, setShow] = useState(visible)
  const opacity = new Animated.Value(0)

  useEffect(() => {
    setShow(visible)
    if (visible) {
      Animated.timing(opacity, { toValue: 1, duration: 200, useNativeDriver: true }).start()
      const t = setTimeout(() => {
        Animated.timing(opacity, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => setShow(false))
      }, 1500)
      return () => clearTimeout(t)
    }
  }, [visible])

  if (!show) return null
  return (
    <Animated.View style={[styles.toast, { opacity }]}> 
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: '#111827',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  text: { color: '#fff' },
})
