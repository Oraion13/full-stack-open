import React, { useRef } from 'react'
import Togglable from '../Togglable'
import LoginForm from './LoginForm'
import LogoutForm from './LogoutForm'
import NewBlog from '../blogs/NewBlog'
import Blog from '../blogs/Blog'
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
          <h3>{user.name} logged in</h3>

          <div>
            <LogoutForm />

            <Togglable buttonLable="Create blog" ref={blogFormRef}>
              <NewBlog />
            </Togglable>
          </div>
        </div>
      )}
      <Blog />
    </div>
  )
}

export default Login
