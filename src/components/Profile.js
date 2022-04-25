import {FaUserCircle} from 'react-icons/fa'
import {BiEditAlt, BiSave, BiArrowBack} from 'react-icons/bi'

function Profile(props) {
    return (
        <div className='profile'>
            <div className='back-div'><BiArrowBack className='back-arrow' onClick={props.handleShowChat} /></div>
            {
                props.user.photoURL ?
                <img className='profile-avatar' id='avatarImg' width='200' src={props.user.photoURL} onClick={props.handleInputImg} alt={props.user.displayName}></img>
                :
                <span onClick={props.handleInputImg}><FaUserCircle className='profile-default-avatar' /></span>
            }
            <input className='username' type='text' id='userInput' placeholder='Username' autoComplete='off' value={props.nickName} onChange={(e) => props.setNickName(e.target.value)}></input>
            {
                props.edit ?
                <BiEditAlt className='edit-username' onClick={props.handleSwitchEditSave} />
                :
                <BiSave id='save' className='save' onClick={props.handleChangeUsername} />
            }
            <hr></hr>
            <h4>{props.user.email}</h4>
            <hr></hr>
            <h4>Bio</h4>
            <textarea id='bio' className='bio' defaultValue={props.bio} placeholder='Write something'></textarea>
            <BiSave id='saveBio' className='save' onClick={props.updateBio} />
            <input className='avatar-input' type='file' id='avatar' accept='image/*' onChange={props.handleUploadAvatar}></input>
        </div>
    )
}

export default Profile