import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Login = ({ loginUser, setErrorMessage }) => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

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
      setErrorMessage('Wrong credentials')

      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="user">Username</label>
        <input
          type="text"
          id="user"
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
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

Login.prototype = {
  loginUser: PropTypes.func.isRequired
}

export default Login
