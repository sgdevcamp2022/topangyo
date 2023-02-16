import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    map : null,
    movePosition : null,
    currentPosition : null,
}

const map = createSlice({
    name : "map",
    initialState,
    reducers : {
        setMap : (state, actions) => {
            state.map = actions.payload;
        },
        setMovePosition : (state, actions) => {
            state.movePosition = actions.payload;
        },
        setCurrentPosition : (state, actions) => {
            state.currentPosition = actions.payload;
        },
        
    },
});

export default map;
export const {setMap, setMovePosition, setCurrentPosition} = map.actions;