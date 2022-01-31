import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { userLogin } from '../../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
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

    dispatch(userLogin({
      userName,
      password,
    }))

    setUserName('')
    setPassword('')

    navigate('/')
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
