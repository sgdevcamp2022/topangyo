import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    matchingCount : 0,
}

const matching = createSlice({
    name : "matching",
    initialState,
    reducers : {
        joinMatching : (state) => {
            state.matchingCount+=1;
        },
        leaveMatching : (state) => {
            state.matchingCount-=1;
        },
    },
});

export default matching;
export const {joinMatching, leaveMatching} = matching.actions;