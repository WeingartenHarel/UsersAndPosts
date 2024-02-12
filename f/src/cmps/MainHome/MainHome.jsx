import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUsers } from '../../store/slices/userSlice';
import { getUserPosts } from '../../store/slices/postSlice';
import UserList from '../UserList/UserList';
import PostList from '../PostList/PostList';
import CreatePost from '../CreatePost/CreatePost';
import Button from '@mui/material/Button';

const MainHome = ({}) => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.user);
  const { selectedUser } = useSelector((state) => state.user);
  const { selectedPosts } = useSelector((state) => state.post);

  const [isCreatePostVisible, setCreatePostVisibility] = useState(false);

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  useEffect(() => {
    if (!selectedUser) return;
    dispatch(getUserPosts(selectedUser.id));
  }, [selectedUser]);

  const toggleCreatePostVisibility = () => {
    setCreatePostVisibility(!isCreatePostVisible);
  };

  return (
    <section>
      <div>Hello world Starter</div>
      <Button variant="contained" color="primary" onClick={toggleCreatePostVisibility}>
      {isCreatePostVisible ? 'Hide Create Post' : 'Show Create Post'}
      </Button>
      {isCreatePostVisible && <CreatePost />}
      <section className="main-container">
        <section className="users-list">
          <h2>User List</h2>
          {users && <UserList users={users} />}
        </section>
        <section className="posts-list">
          <h2>Post List</h2>
          {selectedPosts && <PostList posts={selectedPosts} />}
        </section>
      </section>
    </section>
  );
};

export default MainHome;