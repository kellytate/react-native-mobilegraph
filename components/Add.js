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
      <View style={[styles.cameraContainer, styles.fixedRatio]}>
        <Camera style={[styles.camera, styles.fixedRatio]} type={type} ratio={'1:1'} />
      </View>
      
      <TouchableOpacity style={styles.button} onPress={toggleCameraType} title="Flip Image">
      </TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({ 
  camera: {
    flex: 1,
  },
  fixedRatio: {
    flex: 1,
    aspectRatio: 1,
  },
  cameraContainer: {
    flex: 1,
    flexDirection: 'row',
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