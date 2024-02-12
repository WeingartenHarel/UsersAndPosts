import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/slices/postSlice';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const CreatePost = () => {
  const dispatch = useDispatch();
  const selectedUser = useSelector(state => state.user.selectedUser);

  const [newPost, setNewPost] = useState({
    userId: selectedUser?.id || 999,
    title: 'post title',
    body: 'post text',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handleSubmit = () => {
    dispatch(createPost(newPost));

    setNewPost({
      userId: selectedUser?.id || 1,
      title: '',
      body: '',
    });
  };

  return (
    <div className='create-post-container'>
      <h2>Create New Post</h2>
      <TextField
        label="Title"
        variant="outlined"
        fullWidth
        margin="normal"
        name="title"
        value={newPost.title}
        onChange={handleInputChange}
      />
      <TextField
        label="Body"
        variant="outlined"
        fullWidth
        margin="normal"
        name="body"
        value={newPost.body}
        onChange={handleInputChange}
        multiline
        rows={4}
      />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Create Post
      </Button>
    </div>
  );
};

export default CreatePost;