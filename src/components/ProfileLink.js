import {MdKeyboardArrowRight} from 'react-icons/md'
import {FaUserCircle} from 'react-icons/fa'

const ProfileLink = (props) => {
    return (
        <div className='profile-link'>
            {
                props.user.photoURL ?
                <img width='100px' src={props.user.photoURL} alt={props.user.displayName} />
                :
                <FaUserCircle className='profile-default-avatar' />
            }
            <div className='profile-link-info'>
                <h3>{props.user.displayName || 'No Name'}</h3>
                <h6>{props.user.email}</h6>
                <h5 onClick={props.handleShowProfile}>See full profile<MdKeyboardArrowRight /></h5>
            </div>
        </div>
    )
}

export default ProfileLink