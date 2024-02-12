import React from 'react';

const PostList = ({ posts }) => {
  return (

      <ul className='ul-post'>
        {posts.map((post,index )=> (
          <li key={index} className='li-post'>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <p>User ID: {post.userId}</p>
          </li>
        ))}
      </ul>
  );
};

export default PostList;