import React from 'react';
import { useDispatch } from 'react-redux';
import { selectUser } from '../../store/slices/userSlice'; // Import your user slice actions

const UserList = ({ users }) => {
    const dispatch = useDispatch();

    const handleUserSelect = (selectedUser) => {
        dispatch(selectUser(selectedUser));
    };
    return (
        
            <ul className='ul-user'>
                {users.map(user => (
                    <li key={user.id} className='li-user'>
                        <input
                            type="checkbox"
                            onChange={() => handleUserSelect(user)}
                        />
                        <h3>{user.name}</h3>
                        <p>Username: {user.username}</p>
                        <p>Email: {user.email}</p>
                        <p>Company: {user.company.name}</p>
                    </li>
                ))}
            </ul>
        
    );
};

export default UserList;