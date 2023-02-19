import React from 'react'
import DetailPost from './HomePage/DetailPost'
import { useSelector, useDispatch } from 'react-redux';
import WritePost from './HomePage/WritePost';
import MatchingDetail from './HomePage/MatchingDetail';
import { closeModal } from '../store/slice/modalslice';

const MODAL_TYPES = {
    DetailPostModal : 'DetailPostModal',
    WritePostModal : 'WritePostModal',
    MatchingDetailModal : 'MatchingDetailModal',
}

const MODAL_COMPONENTS = [
    {
        type : MODAL_TYPES.DetailPostModal,
        component : <DetailPost />,
    },
    {
        type : MODAL_TYPES.WritePostModal,
        component : <WritePost />
    },
    {
        type : MODAL_TYPES.MatchingDetailModal,
        component : <MatchingDetail />
    }
]

const GlobalModal = () => {
    const { modalType, isOpen } = useSelector((state) => state.modal)
    const dispatch = useDispatch();

    if(!isOpen) return;

    const findModal = MODAL_COMPONENTS.find((modal) => {
        return modal.type === modalType;
    });

    const renderModal = () => {
        return findModal.component;
    }

  return (
    <div className='modal-background'>
       {renderModal()}
    </div>
  )
}

export default GlobalModal