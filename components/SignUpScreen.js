import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import SignUpForm from '../components/SignUpForm'

const LOGO =
  ''

const SignUpScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={{ uri: INSTAGRAM_LOGO, width: 100, height: 100 }} />
      </View>
      <SignUpForm navigation={navigation} />
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    marginHorizontal: 12,
    height: '100%',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
})