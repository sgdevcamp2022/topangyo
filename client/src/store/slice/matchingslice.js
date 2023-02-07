import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    matchingPost : []
}

const matching = createSlice({
    name : "matching",
    initialState,
    reducers : {
        haveMatching : (state, actions) => {
            state.matchingPost.push(actions.payload);
        },
        notMatching : (state) => {
            state.matchingPost -= 1;
        }
    },
});

export default matching;
export const {haveMatching, notMatching} = matching.actions;