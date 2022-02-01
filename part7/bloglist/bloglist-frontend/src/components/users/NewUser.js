import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addNewUser } from '../../reducers/usersReducer'

const NewUser = (props) => {
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const addName = (event) => {
    setName(event.target.value)
  }

  const addUserName = (event) => {
    setUserName(event.target.value)
  }

  const addPassword = (event) => {
    setPassword(event.target.value)
  }

  const handleCreateUser = async (event) => {
    event.preventDefault()

    dispatch(addNewUser({ name, userName, password }))
    setName('')
    setUserName('')
    setPassword('')
    props.userRef.current.toggleVisibility()
  }

  return (
    <form onSubmit={handleCreateUser}>
      <label htmlFor="uname">name</label>
      <input
        type="text"
        id="uname"
        value={name}
        onChange={addName}
        name="uname"
        required
      />
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        value={userName}
        onChange={addUserName}
        name="username"
        required
      />
      <label htmlFor="password">password</label>
      <input
        type="text"
        id="password"
        value={password}
        onChange={addPassword}
        name="password"
        required
      />
      <button type="submit">sign up</button>
    </form>
  )
}

export default NewUser
