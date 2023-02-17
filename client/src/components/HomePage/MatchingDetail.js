import React from 'react'
import MatchingChat from './MatchingDetail/MatchingChat'
import MatchingUser from './MatchingDetail/MatchingUser'
import MatchingPlace from './MatchingDetail/MatchingPlace'
import MatchingTime from './MatchingDetail/MatchingTime'
import './../../styles/MatchingChat.scss'

const MatchingDetail = ({isDetailModal, setIsDetailModal}) => {

    const handleCloseJoinModal = () => {
        setIsDetailModal(!isDetailModal)
    }
  return (
    <div className='chatpage'>
        <div className='chatpage-container'>
            <div className="chat-main">
                <div className='chat-first-text'>
                    <div className='chat-title'>모집글제목 </div>
                    <div> 모집상태</div>
                    <button className = "x" onClick={handleCloseJoinModal}><img className = "x-img" src = {process.env.PUBLIC_URL + '/images/close.png'} ></img></button>
                </div>
                <div className='chat-second-text'>
                    <div>모집인원</div>
                    <div>모집연령대</div>
                    <div>모집성별</div>
                </div>
            </div>
            <div className='chating'>
                <MatchingChat />
                <div id="chat-column-line"></div>
                <div className='chat-inform'>
                    <div className='inform'>
                        <div className="inform-person"><MatchingUser /></div>
                        <div className="inform-place"><MatchingPlace /></div>
                        <div className="inform-time"><MatchingTime /></div>
                    </div>
                    <div className="inform-button"><button className='application'>신청</button><button className='out'>나가기</button></div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default MatchingDetail