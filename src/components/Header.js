import PropTypes from 'prop-types'
//allows us to look at the route that we're currently on 
import { useLocation } from 'react-router-dom'
import Button from './Button'

const Header = ({title, onAdd, showAdd }) => {
    const location = useLocation()
    return (
    <header className='header'>
        <h1>{title}</h1>
        {location.pathname ==='/' && (
        <Button 
        color={showAdd? 'red':'green'} 
        text={showAdd ? 'Close': 'Add'} 
        onClick={onAdd}
        />
        )}
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Tracker'
}
Header.propTypes = {
    title: PropTypes.string
}

// You can style stuff inline with variables if you want to 
// const headingStyle= {
//     color: 'red',
//     backgroundColor: 'black'
// }

export default Header