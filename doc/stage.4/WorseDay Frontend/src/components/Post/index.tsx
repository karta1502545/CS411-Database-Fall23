import React, { useState, useEffect } from 'react';
import { Avatar } from '@material-ui/core';
import { IconButton } from '@mui/material';
import { DeleteOutlined } from '@mui/icons-material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import Cookies from 'js-cookie';
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';

import { ChatBubbleOutlineRoundedIcon, NearMeRoundedIcon, ThumbUpRoundedIcon } from '../../utils/icons';
import BasicModal from "../BasicModal";

import './Post.scss';

interface PostProps {
  profilePic?: string;
  username: string;
  text?: string;
  timestamp?: string;
  image?: string;
  likes: number;
  id: number;
  hashtag?: string;
  onPostChanged: Function;
}

function Post(props: PostProps): React.ReactElement {
  const { profilePic, username, text, timestamp, image, likes, id, hashtag, onPostChanged} = props;
  const content:string = text === undefined ? "" : text;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const userID = Cookies.get('userID');
  const username_of_user = Cookies.get('username');
  const handleDelete = async (event: any) => {
    event.preventDefault();
    // console.log("submit!")
    if(username != Cookies.get('username')){
      alert("You can only delete your own post!")
      return;
    }
    await axios.delete(`/post/${id}`, {})
      .then((response: any) => {
        console.log(response);
        onPostChanged();
      });
  };

  const [like,setLike] = useState(likes);
  const [isLiked,setIsLiked] = useState(0);
  // const [user,setUser] = useState({});

  useEffect(() => {
    setLike(likes);
  }, [likes]);

  useEffect(() => {
    const getIsLiked = async () => {
      try {
        const response = await axios.get('/post/like', {
          params: {
            userID: userID,
            feelingID: id,
          }
        });
        const isLiked = response.data[0].isLiked;
        // const isLiked = 2;
        setIsLiked(isLiked);
        // onPostChanged();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    getIsLiked();
  }, []);
  

  const likeHandler = async (e: any)=>{
    e.preventDefault()
    if(isLiked === 0){
      console.log("add like")
      await axios.post("/post/like", {
        userID: userID,
        feelingID: id,
        typeOfLike: 1,
      })
      .then((response: any) => {
        console.log(response);
        setIsLiked(1)
        // onPostChanged();
        setLike(like+1);
      });
    }else{
      console.log("withdraw like")
      await axios.delete(`/post/like`, {
        params: {
          userID: userID,
          feelingID: id,
        }
      })
      .then((response: any) => {
        console.log(response);
        
        setIsLiked(0);
        // onPostChanged();
        setLike(like-1);
      });
    }
  }
  {/* TODO: login page(username, userid), post location, tidy up code, documentation, connect to real database, efficient refresh mechanism, ui improvement*/}
  if (username != username_of_user) {
    return (
      <div className='post'>
        <div className='top'>
          <Avatar src={profilePic} />
          <div className='info'>
            <h4>{username}</h4>
            <span>{timestamp}</span>
          </div>
        </div>
        {text && (
          <div className='text'>
            <p>{text}</p>
          </div>
        )}
        {/* {image && (
          <div className='image'>
            <img src={image} alt='Post Image' />
          </div>
        )} */}
  
        <div className="postBottomLeft">
          <div style={{display:'flex'}}>
            
          <div className="likeIconCont">
          {/* <img className='likeIcon' onClick={likeHandler} src={"../assets/like.png"} alt="" />
           */}
            {(!isLiked) ? <ThumbUpOffAltIcon onClick={likeHandler}/> : <ThumbUpAltIcon onClick={likeHandler}/>}
          </div>
  
          <div className="likeIconCont">
          {/* <img className='likeIcon' onClick={likeHandler}src={"../assets/heart.png"} alt="" /> */}
            </div>
          
          </div>
          <span className="postLikeCounter">{like} people like it</span>
        </div>
  
        {/* <div className='bottomAction'>
          <div className='action'>
            <ThumbUpRoundedIcon className='postAction' />
            <h4>Like</h4>
          </div>
          <div className='action'>
            <ChatBubbleOutlineRoundedIcon className='postAction' />
            <h4>Comment</h4>
          </div>
          <div className='action'>
            <NearMeRoundedIcon className='postAction' />
            <h4>Share</h4>
          </div>
        </div> */}
        <div className='bottom'>
          {hashtag && 
          (<div className="postBottomRight">
            <p>#{hashtag}</p>
          </div>)}
        </div>
      </div>
    );
  }
  return (
    <div className='post'>
      <div className='top'>
        <Avatar src={profilePic} />
        <div className='info'>
          <h4>{username}</h4>
          <span>{timestamp}</span>
        </div>
        <div className="postTopRight">
           {/* <MoreVertIcon style={{ cursor:'pointer'}}/> */}
          <IconButton className='button' type='submit' >
          {/* onClick={handleEdit} */}
            <EditIcon onClick={handleOpen}/>
            <BasicModal onPostChanged={onPostChanged} open={open} onHide={handleClose} postID={id} postusername={username} content={content}/>
          </IconButton>
          <IconButton className='button' type='submit' onClick={handleDelete}>
            <DeleteOutlined />
          </IconButton>
        </div>
      </div>
      {text && (
        <div className='text'>
          <p>{text}</p>
        </div>
      )}
      {/* {image && (
        <div className='image'>
          <img src={image} alt='Post Image' />
        </div>
      )} */}

      <div className="postBottomLeft">
        <div style={{display:'flex'}}>
          
        <div className="likeIconCont">
        {/* <img className='likeIcon' onClick={likeHandler} src={"../assets/like.png"} alt="" />
         */}
          {(!isLiked) ? <ThumbUpOffAltIcon onClick={likeHandler}/> : <ThumbUpAltIcon onClick={likeHandler}/>}
        </div>

        <div className="likeIconCont">
        {/* <img className='likeIcon' onClick={likeHandler}src={"../assets/heart.png"} alt="" /> */}
          </div>
        
        </div>
        <span className="postLikeCounter">{like} people like it</span>
      </div>

      {/* <div className='bottomAction'>
        <div className='action'>
          <ThumbUpRoundedIcon className='postAction' />
          <h4>Like</h4>
        </div>
        <div className='action'>
          <ChatBubbleOutlineRoundedIcon className='postAction' />
          <h4>Comment</h4>
        </div>
        <div className='action'>
          <NearMeRoundedIcon className='postAction' />
          <h4>Share</h4>
        </div>
      </div> */}
      <div className='bottom'>
        {hashtag && 
        (<div className="postBottomRight">
          <p>#{hashtag}</p>
        </div>)}
      </div>
    </div>
  );
}

const iconList = [
  {
    Icon: <ThumbUpRoundedIcon />,
    title: 'Like',
    color: 'grey'
  },
  {
    Icon: <ChatBubbleOutlineRoundedIcon />,
    title: 'Comment',
    color: 'grey'
  },
  {
    Icon: <NearMeRoundedIcon />,
    title: 'Share',
    color: 'grey'
  }
];

export default Post;
