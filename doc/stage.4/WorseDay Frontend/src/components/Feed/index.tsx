import React, { useState, useEffect } from 'react';
// import firebase from 'firebase';
// import StoryReel from '../StoryReel';
import CreatePost from '../CreatePost';
import Post from '../Post';
// import { firestore, DocumentData } from '../../utils/firebase';
// import { Posts } from '../../dummyData';
import axios from 'axios';

import './Feed.scss';

interface FeedProps {
  refreshPosts: ()=>void;
  posts: any[];
  photoUrl?: string;
  username: string | null;
}

function Feed({ refreshPosts, posts, photoUrl, username }: FeedProps): React.ReactElement {
  // const [posts, setPosts] = useState<any[]>([]);
  // const [refreshKey, setRefreshKey] = useState(0);

  // useEffect(() => {
  //   firestore
  //     .collection('posts')
  //     .orderBy('timestamp', 'desc')
  //     .onSnapshot(snapshot => {
  //       setPosts(snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
  //     });
  // }, []);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     await axios.get("/post/user/1", {})
  //     .then((response: any) => {
  //       setPosts(response.data);
  //     });
  //   }

  //   fetchData();
  // }, [refreshKey]);

  // const refreshPosts = () => {
  //   setRefreshKey(oldKey => oldKey + 1);
  // };
  console.log("Feed", posts)

  return (
    <div className='feed'>
      {/* <StoryReel photoUrl={photoUrl} /> */}
      <CreatePost photoUrl={photoUrl} username={username} onPostCreated={refreshPosts} />
      {posts.map((post) => (
        <Post
          key={post.feelingID} // Add a unique key prop here
          id={post.feelingID} // Add a unique key prop here
          username={post.username}
          profilePic={post.profilePic}
          text={post.content}
          image={post.image}
          likes={post.numOfLike}
          hashtag={post.hashtag}
          // timestamp={post.timestamp.toDate().toDateString()}
          timestamp={post.feelingDate}
          onPostChanged={refreshPosts}
        />
      ))}
    </div>
  );
}

export default Feed;
