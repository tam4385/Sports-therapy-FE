import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { 
  makeStyles, 
  Container, 
  Typography,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  TableContainer,
  Paper, 
  IconButton,
  CircularProgress
} from "@material-ui/core";
import { Alert } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SportsIcon from '@material-ui/icons/Sports';
import { listUsers, deleteUser } from '../actions/userActions';
import Dashboard from '../components/Dashboard';

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userList = useSelector(state => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector(state => state.userDelete);
  const { success: successDelete } = userDelete;

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    };
  };

  useEffect(() => {
    if(userInfo && userInfo.isAdmin) {
      dispatch(listUsers())
    } else {
      history.push('/');
    }
  }, [dispatch, history, successDelete, userInfo]);

  const classes = useStyles();

  return (
    <>
      <Dashboard>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                User List Table
              </Typography>
            </Container>
          </div>
          <TableContainer className={classes.tableContainer} component={Paper}>
            {error && <Alert severity='error'>{error}</Alert>}
            {loading ? <CircularProgress /> : (
              <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users && users.map(u => (
                  <TableRow key={u._id}>
                    <TableCell>{u._id}</TableCell>
                    <TableCell>{`${u.firstName} ${u.lastName}`}</TableCell>
                    <TableCell>{u.email}</TableCell>
                    <TableCell>
                      <Link to={`/admin/users/${u._id}/edit`}>
                        <IconButton>
                          <EditIcon></EditIcon>
                        </IconButton>
                      </Link>
                      <Link to={`/admin/users/${u._id}/exercises/edit`}>
                        <IconButton color='primary'><SportsIcon></SportsIcon></IconButton>
                      </Link>
                      <IconButton onClick={() => deleteHandler(u._id)}>
                        <DeleteIcon color='secondary'></DeleteIcon>
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            )}
          </TableContainer>
        </main>
      </Dashboard>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  tableContainer: {
    marginTop: '1rem',
  },
  
}));

export default UserListScreen;
