import React, { useState } from 'react';
import { Form, Button } from "react-bootstrap"
import { Avatar, IconButton } from '@material-ui/core';
import axios from 'axios';
import Cookies from 'js-cookie';
import './EditPost.scss';

interface CreatePostProps {
  photoUrl?: string;
  username: string | null;
  onPostCreated: Function;
}

function EditPost({ photoUrl, username, onPostCreated }: CreatePostProps): React.ReactElement {
  console.log("Try EditPost!");
  const [input, setInput] = useState<string>('');
  const [imgUrl, setImgUrl] = useState<string>('');
  const userID = Cookies.get('userID');
  const curUsername = Cookies.get('username');
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    // console.log("submit!")
    if(username != curUsername){
      alert("You can only edit your own post!")
      return;
    }
    console.log("submit!");
    await axios.post("/post", {
        userID: userID,
        content: input,
      })
      .then((response: any) => {
        console.log(response);
        onPostCreated();
      });

    setInput('');
    setImgUrl('');
  };

  return (
    <div className='EditPost'>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Content *"
            name="name"
            value={input}
            onChange={(e)=> setInput(e.target.value)}
            required
            />
        </Form.Group>
      </Form>
    </div>
  );
}

export default EditPost;