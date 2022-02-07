import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { userLogin } from '../../reducers/loginReducer'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import Visibility from '@material-ui/icons/Visibility'
import InputAdornment from '@material-ui/core/InputAdornment'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Input from '@material-ui/core/Input'

const Login = () => {
  const [userName, setUserName] = useState({
    userName: ''
  })
  const [password, setPassword] = useState({
    password: '',
    showPassword: false,
  })
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleUsernameChange = (event) => {
    setUserName({ userName: event.target.value })
  }

  const handlePasswordChange = (prop) => (event) => {
    setPassword({ ...password, [prop]: event.target.value })
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    dispatch(
      userLogin({
        userName: userName.userName,
        password: password.password,
      })
    )

    setUserName('')
    setPassword('')

    navigate('/')
  }

  const handleClickShowPassword = () => {
    setPassword({ ...password, showPassword: !password.showPassword })
  }

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  return (
    <div id='login-form'>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin} className='login-form'>
        <InputLabel htmlFor="username">Username</InputLabel>
        <Input
          type="text"
          id="username"
          value={userName.userName}
          onChange={handleUsernameChange}
          name="Username"
          required
        />
        <InputLabel htmlFor="Password">Password</InputLabel>
        <Input
          type={password.showPassword ? 'text' : 'password'}
          id="Password"
          value={password.password}
          onChange={handlePasswordChange('password')}
          endAdornment={<InputAdornment style={{ 'position': 'absolute', 'right' : '-25%' }}>
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              style={{ 'background': '#ffffff00' }}
            >
              {password.showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>}
          required
        />
        <button className="loginbtn" type="submit">
          Login
        </button>
      </form>
    </div>
  )
}

Login.prototype = {
  loginUser: PropTypes.func.isRequired,
}

export default Login
