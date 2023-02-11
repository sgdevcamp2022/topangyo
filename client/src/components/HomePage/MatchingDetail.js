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
        
        <div className="chatPage">
            <div className="chatTitle">
                <div>모집글제목 </div>
                <div style={{display : "flex",  flexDirection : "row" }}>
                <div style={{marginRight : "10px"}}>모집상태</div>
                <button onClick={handleCloseJoinModal}>X</button>
                </div>
            </div>
            <div className='chatTitleInform'>
                <div>모집인원</div>
                <div>모집연령대</div>
                <div>모집성별</div>
            </div>
            <div
            style={{
                overflow : 'hidden',
                display : 'flex',
                height : '100%',
                boxSizing : 'border-box',
                
            }}
        >
            
            <MatchingChat />
            <div id="line"></div>
            <div className='chatInform'>
                    <div className="InformPerson"><MatchingUser /></div>
                    <div className="InformPlace"><MatchingPlace /></div>
                    <div className="InformTime"><MatchingTime /></div>
                    <div className="InformButton"><button>신청</button><button>나가기</button></div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default MatchingDetail