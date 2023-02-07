import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    matchingPost : [],
    matchingCount : 0,
}

const matching = createSlice({
    name : "matching",
    initialState,
    reducers : {
        joinMatching : (state, actions) => {
            state.matchingPost.push(actions.payload);
            state.matchingCount+=1;
        },
        leaveMatching : (state) => {
            return state.matchingPost;
        }
    },
});

export default matching;
export const {joinMatching, leaveMatching} = matching.actions;