import { createSlice } from '@reduxjs/toolkit';
import { postService } from '../../services/postService';

export const getUserPosts = (userId) => async (dispatch) => {
    try {
        const result = await postService.getById(userId)
        dispatch(selectedpost(result));
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

export const createPost = (post) => async (dispatch) => {
    try {
        const result = await postService.addPost(post)
        dispatch(setCreatePost(result));
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

const postSlice = createSlice({
    name: 'post',
    initialState: {
        posts: [],
        selectedPosts:null,
    },
    reducers: {
        setPost: (state, action) => {
            state.posts = action.payload
        },
        setosts: (state, action) => {
            state.posts = action.payload
        },
        selectedpost: (state, action) => {
            state.selectedPosts = action.payload;
        },
        setCreatePost: (state, action) => {
            const newPost = action.payload
            const selectedPostsCopy = JSON.parse(JSON.stringify(state.selectedPosts))
            selectedPostsCopy.push(newPost)
            state.selectedPosts = selectedPostsCopy;
        },
    }

})


export const { setPost, setPosts , selectedpost , setCreatePost} = postSlice.actions
export default postSlice.reducer