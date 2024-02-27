import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { SendRoundedIcon } from '../../utils/icons';
import { IconButton } from '@material-ui/core';
import axios from 'axios';
import Cookies from 'js-cookie';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface BasicModalProps {
    open: any;
    onHide: any;
    onPostChanged: any;
    postID: number;
    postusername: string;
    content: string;
  }

function BasicModal({open, onHide, onPostChanged, postID, postusername, content}: BasicModalProps): React.ReactElement {
  
  const [input, setInput] = useState<string>('');
  useEffect(() => {
    setInput(content);
  }, []);
  // setInput(content)
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log("submit test!");
    if(postusername != Cookies.get('username')){
      alert("You can only delete your own post!")
      return;
    }
    await axios.put(`/post/${postID}`, {
        content: input,
      })
      .then((response: any) => {
        console.log(response);
        onPostChanged();
      });
    // setInput('');
    // emulate pressing the close button
    onHide();
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={onHide}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className='createPost'>
        <div className='top'>
        <form className='form'>
          <input
            className='textInput'
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={`Change your post content...`}
          />
          <IconButton className='button' type='submit' onClick={handleSubmit}>
            <SendRoundedIcon color='primary' />
          </IconButton>
        </form>
        </div>
        </div>
      </Modal>
    </div>
  );
}

export default BasicModal;