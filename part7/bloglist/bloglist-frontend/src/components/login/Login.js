import React, { useRef } from 'react'
import Togglable from '../Togglable'
import LoginForm from './LoginForm'
import LogoutForm from './LogoutForm'
import NewBlog from '../blogs/NewBlog'
import { useSelector } from 'react-redux'

const Login = () => {

  const blogFormRef = useRef()
  const user = useSelector((state) => state.user)

  return (
    <div>
      {user === null ? (
        <div>
          <Togglable buttonLable="Log in">
            <LoginForm />
          </Togglable>
        </div>
      ) : (
        <div>
          <h3>{user.userName} logged in</h3>

          <div>
            <LogoutForm />

            <Togglable buttonLable="Create blog" ref={blogFormRef}>
              <NewBlog />
            </Togglable>
          </div>
        </div>
      )}
    </div>
  )
}

export default Login
