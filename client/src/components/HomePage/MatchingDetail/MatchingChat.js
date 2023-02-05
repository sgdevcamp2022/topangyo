import React, {useState} from 'react'

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
                height : '95%',
                maxHeight : '95%',
                width : '100%',
                overflow : 'scroll',
            }}
        >
            {
                //채팅 내용이 남는 공간
                value.map((data, i) => {
                    return (
                        <div
                            style={{
                                padding : '10px',
                                backgroundColor : 'gray',
                                borderRadius : '10px',
                                margin : '20px 0',
                                wordBreak : 'break-all'
                            }}
                            key ={i}
                        >{data}</div>
                    )
                })
            }
        </div>
        <div
            style={{
                display : 'flex',
                height : '5%',
            }}
        >
            <input onChange={onChangeText} value={text} className='input-box' type="text" style={{ width : '90%'}} />
            <button onClick={handleSubmit} style={{ width : '10%'}}>전송</button>
        </div>
    </div>
  )
}

export default MatchingChat