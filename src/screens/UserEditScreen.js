import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Container,
  Typography,
  Grid,
  TextField,
  Button,
  CircularProgress,
  makeStyles,
  Checkbox,
  FormLabel
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';
import Dashboard from '../components/Dashboard';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { user, error, loading } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = userUpdate;

  useEffect( () => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    };

    if (!user.firstName || user._id !== userId) {
      dispatch(getUserDetails(userId));
    } else {
      setFirstName(user.firstName);
      setLastName(user.lastName);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    };
  }, [user, userId, dispatch, successUpdate, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({_id: userId, firstName, lastName, isAdmin}));
  };
  
  const classes = useStyles();

  return (
    <>
      <Dashboard>
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
              {`${firstName} ${lastName}`}
            </Typography>
            <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button variant='contained' color='primary'>Edit {`${firstName}'s Exercises`}</Button>
                  </Grid>
                </Grid>
              </div>
          </Container>
        </div>
          {/* End hero unit */}
          <Grid container justify='center'>
            <Grid item sm={11} md={7}>
            <form className={classes.form} onSubmit={submitHandler} noValidate>
              {error || errorUpdate && <Alert align='center' severity='error'>{error}</Alert>}
              {loading || loadingUpdate ? <CircularProgress /> : (
                <>
                  <TextField
                      value={firstName || ''}
                      onChange={(e) => setFirstName(e.target.value)}
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      id="first-name"
                      label="First Name"
                      name="first-name"
                      autoFocus
                  />
                  <TextField
                    value={lastName || ''}
                    onChange={(e) => setLastName(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="last-name"
                    label="Last Name"
                    name="last-name"
                    autoFocus
                  />
                  <TextField
                    value={email || ''}
                    onChange={(e) => setEmail(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                  />
                  <FormLabel>Administrator Access</FormLabel>
                  <Checkbox
                    checked={isAdmin || false}
                    onChange={e => setIsAdmin(e.target.checked)}
                    name="is-admin"
                    color="secondary"
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

export default UserEditScreen;