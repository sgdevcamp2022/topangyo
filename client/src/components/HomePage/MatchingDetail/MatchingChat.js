import React, {useState} from 'react'
import './../../../styles/MatchingChat.scss'
import ChatOut from '../../ChatPage/ChatOut';
import ChatIn from '../../ChatPage/ChatIn';

const MatchingChat = () => {
    const [text, setText] = useState('');
    const [value, setValue] = useState([]);

    const onChangeText = (e) => {
        e.preventDefault();

        setText(e.target.value);
    }

    const handleSubmit = () => {
        setValue([...value, text]);
    }

  return (
    <div className='matchingchat'>
        <div className='matchingchat-container'>
            <div className ="ballon-container">
                <ChatIn/>
                <ChatIn/>
                { //채팅 내용이 남는 공간
                    value.map((data, i) => {
                        return (
                            <div
                                style={{
                                    clear : 'right',
                                    wordBreak : 'break-all'
                                }}
                                key ={i}>
                                <ChatOut message = {data}/>
                            </div>
                        )  
                    })
                }
            </div>
        </div> 
        <div className="send-container">
            <input value={text} type="text" className="chat-input" onChange={onChangeText}/>
            <button className="chat-submit-button"  onClick={handleSubmit}>전송</button>
        </div>
    </div>
  )
}

export default MatchingChat