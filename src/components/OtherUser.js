import {FaUserCircle} from 'react-icons/fa'
import {BiArrowBack} from 'react-icons/bi'

const OtherUser = (props) => {
    return (
        <div className='profile'>
            <div className='back-div'><BiArrowBack className='back-arrow' onClick={props.handleShowChat} /></div>
            {
                props.otherUser.photoURL ?
                <img className='profile-avatar' id='avatarImg' width='200' src={props.otherUser.photoURL} alt={props.otherUser.username}></img>
                :
                <span><FaUserCircle className='profile-default-avatar' /></span>
            }
            <input className='username' type='text' id='userInput' placeholder='Username' autoComplete='off' value={props.otherUser.username}></input>
            <hr></hr>
            <h4>Bio</h4>
            <textarea id='bio' className='bio' defaultValue={props.otherUser.otherBio} placeholder='Write something' style={{pointerEvents: 'none'}}></textarea>
        </div>
    )
}

export default OtherUser