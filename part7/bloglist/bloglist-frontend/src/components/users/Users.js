import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Togglable from '../Togglable'
import NewUser from './NewUser'
import { styled } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { tableCellClasses } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'

const Users = () => {
  const userRef = useRef()
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }))

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }))

  const createData = (id, name, blogs) => {
    return { id, name, blogs }
  }

  const users = useSelector((state) => state.users)
  const usersInTable = users.map((user) =>
    createData(user.id, user.name, user.blogs.length)
  )

  const styles = {
    textDecoration: 'none',
    color: 'black',
  }

  return (
    <div className='user-table'>
      <Togglable buttonLable="Sign up" ref={userRef}>
        <NewUser userRef={userRef} />
      </Togglable>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Name</StyledTableCell>
              <StyledTableCell align="right">Blogs</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {usersInTable.map((user) => (
              <StyledTableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <StyledTableCell>
                  <Link style={styles} to={`/users/${user.id}`}>
                    {user.name}
                  </Link>
                </StyledTableCell>
                <StyledTableCell align="right">{user.blogs}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
