import axios from 'axios';

const url =
    process.env.NODE_ENV === 'development'
        ? process.env.REACT_APP_BACKEND_URL_LOCAL
        : process.env.REACT_APP_BACKEND_URL;

const API = axios.create({
    baseURL: url,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

export const signIn = (formData: { email: string; password: string }) =>
    API.post('/user/signin', formData);

export const signUp = (formData: {
    email: string;
    name: string;
    lastName: string;
    password: string;
}) => API.post('/user/signup', formData);

export const getUserData = () => API.get('/user/getUser');

export const updateUserData = (formData: {
    name: string;
    email: string;
    lastname: string;
}) => API.post('/user/updateUser', formData);

export const searchUsers = (formData: { searchPhraze: string }) =>
    API.post('/user/searchUser', formData);

export const generateFriendList = () => API.get('/user/generateFriendList');

export const logout = () => API.get('/user/logout');

export const sendFriendRequestAPI = (formData: { id: string }) =>
    API.post('/user/sendFriendRequest', formData);

export const manageFriendRequestAPI = (formData: {
    friendId: string;
    finalStatus: boolean;
}) => API.post('/user/manageFriendRequest', formData);

export const removeFriendAPI = (formData: { friendId: string }) =>
    API.post('/user/removeFriend', formData);

export const getMessageListAPI = (formData: { friendId: string }) =>
    API.post('/user/getMessageList', formData);
