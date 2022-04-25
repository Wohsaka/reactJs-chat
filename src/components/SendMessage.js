import {BiPaperPlane} from 'react-icons/bi'

function SendMessage(props) {
    return (
        <div className='send-div'>
            <input className='message-input' type='text' autoComplete='off' id='userMessage' placeholder='Message' onKeyPress={props.handleEnter}></input>
            <BiPaperPlane id='sendBtn' className='send-btn' onClick={props.handleSendMessage} />
        </div>
    )
}

export default SendMessage