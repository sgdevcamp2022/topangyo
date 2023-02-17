import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    modalType : "",
    isOpen : false,
    postPK : 0,
    place : {
        place_name: "",
        address_name: "",
        place_url: "",
    }
}

const modal = createSlice({
    name : "modal",
    initialState,
    reducers : {
        openModal : (state, actions) => {
            const modalType = actions.payload;
            state.modalType = modalType.modalType;
            state.isOpen = true;
            state.postPK = modalType.postPK;
            state.place = modalType.place;
        },
        closeModal : (state) => {
            state.isOpen = false;
        }
    },
});

export default modal;
export const {openModal, closeModal} = modal.actions;