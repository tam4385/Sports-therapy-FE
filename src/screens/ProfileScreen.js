import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import { 
  makeStyles, 
  Typography,
  Container,
  TextField,
  Button,
  Grid,
  CircularProgress, 
} from '@material-ui/core/';
import { Alert } from '@material-ui/lab';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import Dashboard from '../components/Dashboard';

const ProfileScreen = ({ history }) => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect( () => {
    if (!userInfo) {
      history.push('/signin');
    } else {
      if (!user || !user.firstName || success) {
        dispatch(getUserDetails('profile'));
      } else {
        setFirstName(user.firstName);
        setLastName(user.lastName);
      };
    };
  }, [dispatch, history, userInfo, user]);

  const submitHandler = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setMessage('Passwords do not match');
    } 

    dispatch(updateUserProfile({ 
      id: user._id, 
      firstName: validator.escape(firstName), 
      lastName: validator.escape(lastName), 
      password 
    }));
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
              Edit Profile
            </Typography>
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
                      value={firstName}
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
                    value={lastName}
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                  <TextField
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirm Password"
                    type="password"
                    id="confirm-password"
                    autoComplete="current-password"
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
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  }, 
}));

export default ProfileScreen;