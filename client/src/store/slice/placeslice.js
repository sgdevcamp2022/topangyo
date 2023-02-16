import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    placeSearch : true,
    placeObject : null,
    placeList : null,
    currentPlace : {},
}

const place = createSlice({
    name : "place",
    initialState,
    reducers : {
        setPlaceSearch : (state, actions) => {
            state.placeSearch = actions.payload;
        },
        setPlaceObject : (state, actions) => {
            state.placeObject = actions.payload;
        },
        setPlaceList : (state, actions) => {
            state.placeList = actions.payload;
        },
    },
});

export default place;
export const {setPlaceSearch, setPlaceObject, setPlaceList} = place.actions;