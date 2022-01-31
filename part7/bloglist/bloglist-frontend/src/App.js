import React, { useEffect } from 'react'
import Users from './components/users/Users'
import DetailsOfUser from './components/users/DetailsOfUser'
import DetailsOfBlog from './components/blogs/DetailsOfBlog'
import Logout from './components/login/LogoutForm'
import Login from './components/login/LoginForm'
import Blog from './components/blogs/Blog'
import Home from './components/Home'
import { useSelector, useDispatch } from 'react-redux'
import { initializeBlogs } from './reducers/blogsReducer'
import { setUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

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
      <div>
        <div>
          <Link style={padding} to="/">
            Home
          </Link>
          <Link style={padding} to="/blogs">
            Blogs
          </Link>
          <Link style={padding} to="/users">
            Users
          </Link>
          {!user ? (
            <Link style={padding} to="/login">
              <button className="logIn">login</button>
            </Link>
          ) : (
            <span>
              {user.name} logged in{' '}
              {<Logout />}
            </span>
          )}
        </div>

        {notification}
        <h1>Blog App</h1>

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
