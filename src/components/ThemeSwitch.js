import {FaSun, FaMoon} from 'react-icons/fa'

const ThemeSwitch = props => {
    return (
    <div onClick={props.handleClick}>
        <FaSun className='theme-switch sun hide' id='sun' />
        <FaMoon className='theme-switch moon' id='moon' />
    </div>
    )
}
export default ThemeSwitch