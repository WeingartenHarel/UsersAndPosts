import { createSlice } from '@reduxjs/toolkit';
import { userService } from '../../services/userService';


export const getUsers = () => async (dispatch) => {
    try {
        const result = await userService.query()
        dispatch(setUsers(result));
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

export const getUserById = (userId) => async (dispatch) => {
    try {
        const result = await userService.query(userId)
        dispatch(setUser(result));
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

export const removeUser = (userId) => async (dispatch) => {
    try {
        const result = await userService.remove(userId)
        dispatch(setUser(result));
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

export const saveUser = (user) => async (dispatch) => {
    try {
        const result = await userService.save(user)
        dispatch(setUser(result));
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

export const updateUser = (user) => async (dispatch) => {
    try {
        const result = await userService.update(user)
        dispatch(setUser(result));
    } catch (error) {
        console.error('Error fetching user:', error);
    }
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        selectedUser:null,
    },
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload
        },
        setUsers: (state, action) => {
            state.users = action.payload
        },
        selectUser: (state, action) => {
            state.selectedUser = action.payload;
          },
    }

})


export const { setUser, setUsers , selectUser} = userSlice.actions
export default userSlice.reducer