import React, { useEffect } from 'react';
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
  Grid,
  Button
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { listExercises, deleteExercise, addExercise } from '../actions/exerciseActions';
import { EXERCISE_ADD_RESET } from '../constants/exerciseConstants';
import Dashboard from '../components/Dashboard';

const ExerciseListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const exerciseList = useSelector(state => state.exerciseList);
  const { loading, error, exercises } = exerciseList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const exerciseDelete = useSelector(state => state.exerciseDelete);
  const { success: successDelete, error: errorDelete, loading: deleteLoading } = exerciseDelete;

  const exerciseAdd = useSelector(state => state.exerciseAdd);
  const { success: successAdd, error: errorAdd, loading: addLoading, exercise: addedExercise } = exerciseAdd;

  const deleteHandler = (id) => {
    if(window.confirm('Are you sure you want to delete this exercise?')) {
      dispatch(deleteExercise(id));
    };
  };

  const addExerciseHandler = () => {
    dispatch(addExercise());
  };

  useEffect(() => {
    dispatch({ type: EXERCISE_ADD_RESET })

    if(!userInfo.isAdmin) {
      history.push('/signin')
    } else {
      dispatch(listExercises());
    }

    if (successAdd) {
      history.push(`/admin/exercises/${addedExercise._id}/edit`)
    } else {
      dispatch(listExercises());
    }

  }, [dispatch, history, successDelete, successAdd, addedExercise, userInfo]);

  const classes = useStyles();

  return (
    <>
      <Dashboard>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                Exercise List Table
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button onClick={addExerciseHandler} variant='contained' color='primary'>Create Exercise</Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <TableContainer className={classes.tableContainer} component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Title</TableCell>
                  <TableCell align='right'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {exercises && exercises.map(e => (
                  <TableRow key={e._id}>
                    <TableCell>{e._id}</TableCell>
                    <TableCell>{e.title}</TableCell>
                    <TableCell align='right'>
                      <Link to={`/admin/exercises/${e._id}/edit`}>
                        <IconButton><EditIcon></EditIcon></IconButton>
                      </Link>
                      <IconButton onClick={() => deleteHandler(e._id)}><DeleteIcon color='secondary'></DeleteIcon></IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
  }
}));

export default ExerciseListScreen;
