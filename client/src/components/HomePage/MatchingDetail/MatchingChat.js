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
    <div
        style={{
            width : '50%',
            padding : '50px',
        }}
    >
        <div
            style={{
                height : '90%',
                maxHeight : '90%',
                width : '100%',
                overflow : 'scroll',
            }}
        >
              <div className ="chatContainer">
                            <ChatIn/>
            {
                //채팅 내용이 남는 공간
                value.map((data, i) => {
                    return (
                        // <div
                        //     style={{
                        //         padding : '10px',
                        //         backgroundColor : 'gray',
                        //         borderRadius : '10px',
                        //         margin : '20px 0',
                        //         wordBreak : 'break-all'
                        //     }}
                        //     key ={i}
                        // >{data}</div>
                        <ChatOut message = {data} key = {i}/>
                    )
                })
            }
            </div>
        </div>
        <div
            style={{
                display : 'flex',
                height : '5%',
            }}
        >   
                <div className="sendContainer">
                    <input value={text} type="text" className="chatInput" onChange={onChangeText}/>
                    <button className="chatButton"  onClick={handleSubmit}>전송</button>
                </div>
        </div>
    </div>
  )
}

export default MatchingChat