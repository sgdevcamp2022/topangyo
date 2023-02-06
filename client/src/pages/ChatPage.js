import ChatOut from '../components/ChatPage/ChatOut';
import ChatIn from '../components/ChatPage/ChatIn';
import './../styles/ChatPage.scss'
import { useState } from 'react';

const ChatPage = () => {

    const [message, setMessage] = useState([]);

    const [tempText, setTempText] = useState("");

    const onChange = (e) => {
        let txt = e.target.value;
        setTempText(txt);
    };

    const send = () => {
       setMessage(message => ([...message,tempText]));
       console.log(message);
    }

    return (
       <>
       <div className = "chatPage">
            <div className = "chatTitle">
                <div>모집글제목 </div>
                <div>모집상태</div>
            </div>
            <div className='chatTitleInform'>
                <div>모집인원</div>
                <div>모집연령대</div>
                <div>모집성별</div>
            </div>
            <div className='chatRoom'>
                <div className='chatting'>
                    <div className ="chatContainer">
                            <ChatOut/>
                            <ChatIn message = {message}/>
                        <div className = "sendContainer">
                            <input type="text" class="chatInput" onChange={onChange}/>
                            <button class = "chatButton" onClick={send}>전송</button>
                        </div>
                    </div>
                </div>
                <div id = "line"></div>
                <div className='chatInform'>
                    <div className = "InformPerson">참여자</div>
                    <div className = "InformPlace">장소</div>
                    <div className = "InformTime">시간</div>
                    <div className = "InformButton"><button>신청</button><button>나가기</button></div>
                </div>
            </div>
        </div>
       </>
    );
  }
  
  export default ChatPage;