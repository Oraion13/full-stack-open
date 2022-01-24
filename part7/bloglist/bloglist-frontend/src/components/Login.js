import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { notification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const Login = ({ loginUser }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const addUserName = (event) => {
    setUserName(event.target.value)
  }

  const addPassword = (event) => {
    setPassword(event.target.value)
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      await loginUser({
        userName,
        password,
      })

      setUserName('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      dispatch(notification('Wrong credentials'))
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={userName}
          onChange={addUserName}
          name="Username"
          required
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          id="Password"
          value={password}
          onChange={addPassword}
          name="Password"
          required
        />
        <button className='loginbtn' type="submit">Login</button>
      </form>
    </div>
  )
}

Login.prototype = {
  loginUser: PropTypes.func.isRequired
}

export default Login
