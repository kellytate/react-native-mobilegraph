import React, { useState, useEffect } from 'react'
import { View, TextInput, Image, Button } from 'react-native'

import * as firebase from '../firebase'
import { NavigationContainer } from '@react-navigation/native'
require("firebase/firestore")
require("firebase/storage")

// import { storage } from '../firebase'
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import {auth, db, collection, serverTimestamp} from '../firebase'

export default function Save(props) {
    const [profile, setProfile] = useState(null)

    const [caption, setCaption] = useState("")
    // const auth = firebase.getAuth()
    // const db = firebase.getFirestore()
    const storage = getStorage()

    useEffect(() => {
      const getProfile = async () => {
        const userDocRef = firebase.doc(db, `users/${auth.currentUser.email}`)
        const docSnap = await firebase.getDoc(userDocRef)
        const data = docSnap.data()
    
        setProfile({
          username: data.username,
          pic: data.pic,
          uid: data.uid,
          email: data.email
        })
      }
      getProfile();
    }, [])

    const uploadImage = async () => {
        const uri = props.route.params.image;
        const childPath = `post/${auth.currentUser.uid}/${Math.random().toString(36)}`;
        console.log(childPath)

        const response = await fetch(uri);
        const blob = await response.blob();
        const storageRef = ref(storage, childPath)
        const uploadTask = uploadBytesResumable(storageRef, blob)

        uploadTask.on('state_changed', 
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
          }, 
          (error) => {
            switch (error.code) {
              case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;
              case 'storage/canceled':
                // User canceled the upload
                break;
        
              // ...
        
              case 'storage/unknown':
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          }, 
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              savePostData(downloadURL)
              console.log('File available at', downloadURL);
            });
            
          }
        );


        // const task = (storage) => {
        //   // const childPathRef = ref(storage, childPath)
        //   uploadBytes(storageRef, blob).then((snapshot) => {
        //     console.log('file uploaded')
        //   })
        // }

        // task(storage)

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

    const savePostData = (imageUrl) => {
      // const dbase = firebase.getFirestore()
      firebase.addDoc(collection(db, `users/${auth.currentUser.email}`, 'posts'), {
        timestamp: serverTimestamp(),
        username: profile.username,
        pic: profile.pic,
        uid: profile.uid,
        email: profile.email,
        caption,
        imageUrl,
        liked: [],
        comments: [],
      }).then(() => props.navigation.push('HomeScreen'))



        // firebase.firestore()
        //     .collection('posts')
        //     .doc(firebase.auth().currentUser.uid)
        //     .collection("userPosts")
        //     .add({
        //         downloadURL,
        //         caption,
        //         creation: firebase.firestore.FieldValue.serverTimestamp()
        //     }).then((function () {
        //         props.navigation.popToTop()
        //     }))
    }
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