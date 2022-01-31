import React from 'react'
import Togglable from '../Togglable'
import LoginForm from './LoginForm'

const Login = () => {


  return (
    <div>

      <div>
        <Togglable buttonLable="Log in">
          <LoginForm />
        </Togglable>
      </div>

      {/* <div>
        <h3>{user.name} logged in</h3>

        <div>
          <LogoutForm />

          <Togglable buttonLable="Create blog" ref={blogFormRef}>
            <NewBlog />
          </Togglable>
        </div>
      </div> */}

    </div>
  )
}

export default Login
