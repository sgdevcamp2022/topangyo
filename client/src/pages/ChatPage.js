import './../styles/ChatPage.scss';


const ChatPage = () => {
    return (
       <>
       <div>
        <div>
            <div>모집글제목 모집상태</div>
            <div>모집인원 모집연령대 모집성별</div>
        </div>
        <div className='chat'> {/*컴포넌트로 따로 빼기*/}
            <div className="chatOut">
                <div>안녕하세요</div>
            </div>
            <div className ="chatIn">
                <img src = "" className='chatInImg'/>
                <div className = "chatInText">반가워요</div>
            </div>
        </div>
        <div>
            참여자
            장소
            시간
            신청버튼 나가기버튼
        </div>
       </div>
       </>
    );
  }
  
  export default ChatPage;