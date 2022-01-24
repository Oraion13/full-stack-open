import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <>
      <div style={hideWhenVisible}>
        <button className='togbtn' onClick={toggleVisibility}>{props.buttonLable}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className='cancelbtn' onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
})

Togglable.propTypes = {
  buttonLable: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
