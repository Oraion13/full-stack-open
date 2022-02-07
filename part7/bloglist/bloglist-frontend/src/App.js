import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Button } from '@mui/material'
import './App.css'
import Users from './components/users/Users'
import DetailsOfUser from './components/users/DetailsOfUser'
import DetailsOfBlog from './components/blogs/DetailsOfBlog'
import Logout from './components/login/LogoutForm'
import Login from './components/login/LoginForm'
import Blog from './components/blogs/Blog'
import Home from './components/Home'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const user = useSelector((state) => state.user)

  // get all data
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  // store user credentials and token
  useEffect(() => {
    dispatch(setUser())
  }, [])

  const padding = {
    padding: 5,
    textDecoration: 'none',
    color: 'black',
  }

  return (
    <Router>
      <div className="app">
        <div className="nav-bar">
          <div className="icon">
            <p>Blog App</p>
          </div>
          <div className="nav-items">
            <Button component={Link} style={padding} to="/" className="nav-item">
              <span id='nav-item'>Home</span>
            </Button>
            <Button component={Link} style={padding} to="/blogs" className="nav-item">
              <span id='nav-item'>Blogs</span>
            </Button>
            <Button component={Link} style={padding} to="/users" className="nav-item">
              <span id='nav-item'>Users</span>
            </Button>
            {!user ? (
              <Button component={Link} style={padding} to="/login" className="nav-item">
                <button className="logIn">login</button>
              </Button>
            ) : (
              <span className='user-name'>
                {user.name} logged in {<Logout />}
              </span>
            )}
          </div>
        </div>

        <p id='notification'>{notification}</p>

        <Routes>
          <Route path="/blogs/:id" element={<DetailsOfBlog />} />
          <Route path="/users/:id" element={<DetailsOfUser />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
