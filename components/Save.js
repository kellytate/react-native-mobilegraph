import React, { useState } from 'react'
import { View, TextInput, Image, Button } from 'react-native'

import * as firebase from '../firebase'
import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
require("firebase/storage")

import { storage } from '../firebase'
import {ref, uploadBytes} from 'firebase/storage'

export default function Save(props) {
    const [caption, setCaption] = useState("")
    const auth = firebase.getAuth()
    const db = firebase.getFirestore()
    const storageRef = ref(storage)

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath)

        const response = await fetch(uri);
        const blob = await response.blob();

        const task = (storage) => {
          const childPathRef = ref(storage, childPath)
          uploadBytes(childPathRef, blob).then((snapshot) => {
            console.log('file uploaded')
          })
        }

        task(storage)

        // const taskProgress = snapshot => {
        //     console.log(`transferred: ${snapshot.bytesTransferred}`)
        // }

        // const taskCompleted = () => {
        //     task.snapshot.ref.getDownloadURL().then((snapshot) => {
        //         savePostData(snapshot);
        //         console.log(snapshot)
        //     })
        // }

        // const taskError = snapshot => {
        //     console.log(snapshot)
        // }

        // task.on("state_changed", taskProgress, taskError, taskCompleted);
    }

    // const savePostData = (downloadURL) => {

    //     firebase.firestore()
    //         .collection('posts')
    //         .doc(firebase.auth().currentUser.uid)
    //         .collection("userPosts")
    //         .add({
    //             downloadURL,
    //             caption,
    //             creation: firebase.firestore.FieldValue.serverTimestamp()
    //         }).then((function () {
    //             props.navigation.popToTop()
    //         }))
    // }
    return (
        <View style={{ flex: 1 }}>
            <Image source={{ uri: props.route.params.image }} />
            <TextInput
                placeholder="Write a Caption . . ."
                onChangeText={(caption) => setCaption(caption)}
            />

            <Button title="Save" onPress={() => uploadImage()} />
        </View>
    )
}