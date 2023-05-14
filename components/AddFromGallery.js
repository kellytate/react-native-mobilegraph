import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function AddFromGallery() {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}


// import { Camera, CameraType } from 'expo-camera';
// import { useState } from 'react';
// import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function App() {
//   const [type, setType] = useState(CameraType.back);
//   const [permission, requestPermission] = Camera.useCameraPermissions();

//   // if (!permission) ... 

//   // if (!permission.granted) ... 

//   function toggleCameraType() {
//     setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
//   }

//   return (
//     <View style={styles.container}>
//       <Camera style={styles.camera} type={type}>
//         <View style={styles.buttonContainer}>
//           <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
//             <Text style={styles.text}>Flip Camera</Text>
//           </TouchableOpacity>
//         </View>
//       </Camera>
//     </View>
//   );
// }

// const styles = StyleSheet.create({ ... }); 



// import { Camera, CameraType } from 'expo-camera';
// import { useState } from 'react';
// import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// export default function Add() {
//   const [type, setType] = useState(CameraType.back);
//   const [permission, requestPermission] = Camera.useCameraPermissions();

//   console.log(Camera.useCameraPermissions())
//   // if (!permission) {
//   //   return <Text>No access to camera</Text>;
//   // }

//   // if (!permission.granted) {
//   //   return <Text>No access to camera</Text>
//   // }

//   function toggleCameraType() {
//     setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
//   }

//   return (
//     <View style={styles.container}>
//       <View style={[styles.cameraContainer, styles.fixedRatio]}>
//         <Camera style={[styles.camera, styles.fixedRatio]} type={type} ratio={'1:1'} />
//       </View>
      
//       <TouchableOpacity style={styles.button} onPress={toggleCameraType} title="Flip Image">
//       </TouchableOpacity>
    
//     </View>
//   );
// }

// const styles = StyleSheet.create({ 
//   camera: {
//     flex: 1,
//   },
//   // fixedRatio: {
//   //   flex: 1,
//   //   aspectRatio: 1,
//   // },
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     // flexDirection: 'row',
//   },
//   button: {
//     flex: 0.1,
//     alignSelf: 'flex-end',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//     marginBottom: 10,
//     color: 'white',
//   },
//  }); 