import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    postList : [],
    currentPost : {},
}

const posts = createSlice({
    name : "posts",
    initialState,
    reducers : {
        setPosts : (state, actions) => {
            state.postList = actions.payload;
        },
        setCurrentPost : (state, actions) => {
            state.currentPost = actions.payload;
        },
    },
});

export default posts;
export const {setCurrentPost, setPosts} = posts.actions;