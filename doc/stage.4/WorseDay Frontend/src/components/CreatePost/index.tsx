import React, { useState } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import axios from 'axios';
import Cookies from 'js-cookie';
// import firebase from 'firebase';

// import { firestore } from '../../utils/firebase';
import PostAction from '../PostAction';
import {
  InsertEmoticonOutlinedIcon,
  PhotoLibraryRoundedIcon,
  VideocamRoundedIcon,
  SendRoundedIcon
} from '../../utils/icons';

import './CreatePost.scss';
// import cuid from 'cuid';

interface CreatePostProps {
  photoUrl?: string;
  username: string | null;
  onPostCreated: Function;
}

function CreatePost({ photoUrl, username, onPostCreated }: CreatePostProps): React.ReactElement {
  const [input, setInput] = useState<string>('');
  const [hashtag, setHashtag] = useState<string>('');
  const userID = Cookies.get('userID');

  const [emoMap, setEmoMap] = useState(new Map<string, number>());
  // init the map
  emoMap.set('', -1);
  emoMap.set('down', 1);
  emoMap.set('blue', 2);
  emoMap.set('bummed out', 3);
  emoMap.set('upset', 4);
  emoMap.set('low', 5);
  emoMap.set('gloomy', 6);
  emoMap.set('in a funk', 7);
  emoMap.set('disheartened', 8);
  emoMap.set('unhappy', 9);
  emoMap.set('fed up', 10);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // console.log("submit!")
    var emoID = emoMap.get('');

    if(emoMap.has(hashtag)){
      console.log("Found: ", emoMap.get(hashtag));
      //console.log("SKFJ:SLKDFJ:LSKJF:LKSDJFKJSDHFLKJSHDFLKJHLDSKJFHLSKJDFHLKSJDHF");
      var emoID = emoMap.get(hashtag);
    }else{
      // notice the user that the hashtag is not found
      alert("Hashtag not found!");
    }
  
    await axios.post("/post", {
        // [] userID to ID of current user
        userID: userID,
        content: input,
        hashtag: emoID,
      })
      .then((response: any) => {
        console.log(response);
        onPostCreated();
      });

    setInput('');
    setHashtag('');
    // refreshPosts();
    window.location.reload();
  };
  

  return (
    <div className='createPost'>
      <div className='top'>
        <Avatar src={photoUrl} />
        <form className='form'>
          <input
            className='textInput'
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`What's on your mind, ${username}?`}
          />
          <input
            className='imgUrlInput'
            value={hashtag}
            onChange={e => setHashtag(e.target.value)}
            placeholder='Hashtag (optional)'
          />
          <IconButton className='button' type='submit' onClick={handleSubmit}>
            <SendRoundedIcon color='primary' />
          </IconButton>
        </form>
      </div>
      {/* <div className='bottom'>
        {bottomIcon.map(({ Icon, title, color }, index) => (
          <PostAction key={index} Icon={Icon} title={title} color={color} />
        ))}
      </div> */}
    </div>
  );
}

export default CreatePost;

const bottomIcon = [
  {
    Icon: VideocamRoundedIcon,
    title: 'Live Video',
    color: 'red'
  },
  {
    Icon: PhotoLibraryRoundedIcon,
    title: 'Photo/Video',
    color: 'green'
  },
  {
    Icon: InsertEmoticonOutlinedIcon,
    title: 'Feeling/Activity',
    color: 'orange'
  }
];
