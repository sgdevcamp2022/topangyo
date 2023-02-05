import React from 'react'
import MatchingChat from './MatchingDetail/MatchingChat'
import MatchingUser from './MatchingDetail/MatchingUser'
import MatchingPlace from './MatchingDetail/MatchingPlace'
import MatchingTime from './MatchingDetail/MatchingTime'

const MatchingDetail = ({isDetailModal, setIsDetailModal}) => {

    const handleCloseJoinModal = () => {
        setIsDetailModal(!isDetailModal)
    }
  return (
    <div
        style={{
            position : 'absolute',
            width : '100%',
            height : '100%',
            zIndex : '50',
            backgroundColor : 'white',
            padding:'20px',
            boxSizing : 'border-box',
            bottom :'0',
        }}
    >
        
        <button onClick={handleCloseJoinModal}>X</button>
        <h3>매칭 상세</h3>
        <div
            style={{
                overflow : 'hidden',
                display : 'flex',
                height : '100%',
                boxSizing : 'border-box'
            }}
        >
            <MatchingChat />
            <div
                style={{
                    width : '50%',
                    backgroundColor : 'yellow',
                    padding : '50px',
                    boxSizing : 'border-box'
                }}
            >
                <MatchingUser />
                <MatchingPlace />
                <MatchingTime />
            </div>
        </div>
        
    </div>
  )
}

export default MatchingDetail