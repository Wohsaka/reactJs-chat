import {FaUserCircle} from 'react-icons/fa'

function Messages(props) {
    
    return (
        <div id='chat' className='chat'>
            {
            props.messages.map(message => {
            return (
                <div className='message'>
                    <div className='avatar-div'>
                        {
                            props.avatarsURL[message.path] ?
                            <img onClick={() => props.showOtherUsers(message.user, message.path )} id='avatarImg' src={props.avatarsURL[message.path]} className='message-avatar' alt={message.user}></img>
                            :
                            <FaUserCircle className='chat-default-avatar' onClick={() => props.showOtherUsers(message.user, message.path )} />
                        }
                    </div>
                    <div className='message-text'>
                        <h5>{message.user}</h5>
                        <p>{message.message}</p>
                        <p className='timestamp'>{message.timestamp}</p>
                    </div>
                </div>
            )
            })
            }
        </div>
    )
}

export default Messages