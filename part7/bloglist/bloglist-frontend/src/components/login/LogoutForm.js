import { useDispatch, useSelector } from 'react-redux'
import { userLogout } from '../../reducers/loginReducer'

const Logout = () => {
  const dispatch = useDispatch()
  const userName = useSelector((state) => state.user ? state.user.userName : '')

  const handleLogout = (event) => {
    event.preventDefault()

    dispatch(userLogout(userName))
  }

  return(
    <button className="logoutbtn" onClick={handleLogout}>logout</button>
  )
}

export default Logout
