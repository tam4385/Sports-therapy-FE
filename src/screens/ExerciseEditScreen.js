import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { 
  Container,
  Typography,
  TextField,
  Grid,
  CircularProgress,
  Button,
  makeStyles
} from '@material-ui/core';
import { Alert } from "@material-ui/lab";
import { useDispatch, useSelector } from 'react-redux';
import { listExerciseDetails, updateExercise } from '../actions/exerciseActions';
import { EXERCISE_UPDATE_RESET } from '../constants/exerciseConstants';
import Dashboard from '../components/Dashboard';

const ExerciseEditScreen = ({ match, history }) => {
  const exerciseId = match.params.id;

  const [title, setTitle] = useState('');
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [notes, setNotes] = useState('');
  const [image, setImage] = useState('');
  const [uploading, setUploading] = useState(false);

  const dispatch = useDispatch();

  const exerciseDetails = useSelector(state => state.exerciseDetails);
  const { exercise, error, loading } = exerciseDetails;

  const exerciseUpdate = useSelector(state => state.exerciseUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = exerciseUpdate;

  useEffect( () => {
    if (successUpdate) {
      dispatch({ type: EXERCISE_UPDATE_RESET })
      history.push('/admin/exerciselist');
    } else if (exercise.title) {
      setTitle(exercise.title);
      setSets(exercise.sets);
      setReps(exercise.reps);
      setNotes(exercise.notes);
      setImage(exercise.image);
    };
    if (!exercise.title || exercise._id !== exerciseId) {
      dispatch(listExerciseDetails(exerciseId));
    } else {
      setTitle(exercise.title);
      setSets(exercise.sets);
      setReps(exercise.reps);
      setNotes(exercise.notes);
      setImage(exercise.image);
    };
  }, [exercise, exerciseId, dispatch, successUpdate, history]);

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }

      const { data } = await axios.post('/api/uploads', formData, config);

      setImage(data);
      setUploading(false);

    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateExercise({title, sets, reps, notes, _id: exercise._id, image}))
  }

  const classes = useStyles();

  return (
    <>
      <Dashboard>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              Edit Exercise
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Link variant='contained' to='/admin/exerciselist'>
                    <Button variant='contained' color='primary'>Go Back</Button>
                  </Link>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
          {/* End hero unit */}
          <Grid container justify='center'>
            <Grid item sm={11} md={7}>
            <form className={classes.form} onSubmit={submitHandler} noValidate>
              {error && <Alert align='center' severity='error'>{error}</Alert>}
              {loading ? <CircularProgress /> : (
                <>
                  <TextField
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="first-name"
                      label="title"
                      name="title"
                      autoFocus
                  />
                  <TextField
                    value={sets}
                    onChange={(e) => setSets(e.target.value)}
                    type='number'
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="sets"
                    label="Sets"
                    name="sets"
                    autoFocus
                  />
                  <TextField
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    type='number'
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="reps"
                    label="Reps"
                    name="reps"
                    autoComplete="reps"
                    autoFocus
                  />
                  <TextField
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="notes"
                    label="Notes"
                    id="notes"
                    autoComplete="notes"
                  />
                  <TextField
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="image"
                    label="Image"
                    id="image"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Save Changes
                  </Button>
                </>
              )}
            </form>
          </Grid>
        </Grid>
      </main>
      </Dashboard>
    </>
  )
};

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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }, 
}));

export default ExerciseEditScreen;