import { notification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Logout = ({ userName, setUser }) => {
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()

    if (window.confirm(`Are you sure to logout ? ${userName}`)) {

      window.localStorage.removeItem('loggedBlogUser')
      setUser(null)

      dispatch(notification(`successfully logged out ${userName}`))
    }
  }

  return (
    <div>
      <button className="logoutbtn" onClick={handleLogout}>logout</button>
    </div>
  )
}

export default Logout
