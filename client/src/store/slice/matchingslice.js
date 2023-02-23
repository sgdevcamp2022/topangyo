import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    matchingCount : 0,
    matchedMembersCount : [] // 매칭확정유저
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
        setMatchedMembersCount : (state, actions) => {
            state.matchedMembersCount = actions.payload;
        }
    },
});

export default matching;
export const {joinMatching, leaveMatching, setMatchedMembersCount} = matching.actions;