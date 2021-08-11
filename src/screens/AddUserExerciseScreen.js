import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Typography,
  Table,
  TableContainer,
  TableRow,
  TableHead,
  TableCell,
  Paper,
  TableBody,
  IconButton,
  Grid,
  makeStyles,
  Container
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import { deleteUserExercise, userListExercises, getUserDetails, userAddExercise } from '../actions/userActions';
import { listExercises } from '../actions/exerciseActions';
import Dashboard from '../components/Dashboard';

/* COMPONENT*/ 
const AddUserExerciseScreen = ({ history, match }) => {
  const userId = match.params.id;
  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { user, error: userError, loading: userLoading } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userListExercisesState = useSelector(state => state.userListExercises);
  const { loading, userExercises } = userListExercisesState;

  const exerciseList = useSelector(state => state.exerciseList);
  const { exercises, error: exercisesError, loading: exercisesLoading } = exerciseList;

  const userDeleteExercise = useSelector(state => state.userDeleteExercise);
  const { success: deleteSuccess, error: deleteError, loading: loadingDelete } = userDeleteExercise;

  const addExercise = useSelector(state => state.userAddExercise);
  const { success: addSuccess } = addExercise;

  const addExerciseHandler = (exerciseId, userId) => {
    dispatch(userAddExercise(exerciseId, userId));
  };

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/signin');
    };
    
    if (!user.firstName) dispatch(getUserDetails(userId));

    dispatch(listExercises());
    dispatch(userListExercises(userId));

  }, [history, dispatch, addSuccess, deleteSuccess]);

  const classes = useStyles();

  return (
    <Dashboard>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
              <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              Edit {`${user.firstName}'s` } Exercises
            </Typography>
          </Container>
        </div>
        <Grid container justify='center'>
          <Grid item sm={12} md={10}>
            <TableContainer align='center' className={classes.tableContainer} component={Paper}>
              <Typography className={classes.heading} variant='h6'>
                {`${user.firstName}'s Exercises`}
              </Typography>
              {userError && <Alert severity='error'>{userError}</Alert>}
              {userExercises && !userExercises.length > 0 
                ? <Typography>No exercises have been appended to this user</Typography>
                : (
                  <Table className={classes.table} aria-label="User Exercise Table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell align='right'></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {userExercises && userExercises.map(e => (
                        <TableRow key={e._id}>
                          <TableCell>{e._id}</TableCell>
                          <TableCell>{e.title}</TableCell>
                          <TableCell  align='right'>
                            <IconButton onClick={() => dispatch(deleteUserExercise(e._id, userId))} color='secondary'>
                              <DeleteIcon /> 
                            </IconButton>  
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
            </Grid>
            <Grid item sm={12} md={10}>
              <TableContainer align='center' className={classes.tableContainer} component={Paper}>
              <Typography className={classes.heading} variant='h6'>Exercise List</Typography>
              {userError && <Alert severity='error'>{userError}</Alert>}
              {exercises && (
                  <Table className={classes.table} aria-label="User Exercise Table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell align='right'></TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {exercises.map(e => (
                        <TableRow key={e._id}>
                          <TableCell>{e._id}</TableCell>
                          <TableCell>{e.title}</TableCell>
                          <TableCell  align='right'>
                          <IconButton onClick={() => addExerciseHandler(e._id, user._id)} color='secondary'>
                            <AddCircleIcon />
                          </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TableContainer>
            </Grid>
          </Grid>
        </main>
      </Dashboard>
  )
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heading: {
    padding: '1rem'
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
  }
}));

export default AddUserExerciseScreen
