import { Camera, CameraType } from 'expo-camera';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Add() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return <Text>No access to camera</Text>;
  }

  if (!permission.granted) {
    return <Text>No access to camera</Text>
  }

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }

  return (
    <View style={styles.container}>
      <View style={styles.container}>
        <Camera style={styles.camera} type={type}>
          
        </Camera>
      </View>
      
      <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
        <Text style={styles.text}>Flip Camera</Text>
      </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({ 
  camera: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  button: {
    flex: 0.1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
    color: 'white',
  },
 }); 