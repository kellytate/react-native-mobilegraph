import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import BottomTabs from '../components/BottomTabs'
import Header from '../components/Header'
import Post from '../components/Post'
import Stories from '../components/Stories'
import { TABS } from '../data/tabs'
import { POSTS } from '../data/posts'
import {
  collectionGroup,
  getFirestore,
  getDocs,
  query,
  orderBy,
} from '../firebase'

const HomeScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([])
  const db = getFirestore()

  const getPosts = async () => {
    const posts = query(
      collectionGroup(db, 'posts'),
      orderBy('timestamp', 'desc')
    )
    const snapshot = await getDocs(posts)

    setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })))
  }

  useEffect(() => {
    getPosts();
  }, []);

  const handlePostUpdate = () => {
    getPosts();
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => (
          <Post post={post} key={index} handlePostUpdate={handlePostUpdate}/>
        ))}
      </ScrollView>
      <BottomTabs icons={TABS} />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    flex: 1,
  },
})