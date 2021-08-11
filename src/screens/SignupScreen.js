import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Header from '../components/Header';
import { signup } from '../actions/userActions';
import Alert from '@material-ui/lab/Alert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.nbssportstherapy.co.uk/">
        NBS Sports Therapy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const SignupScreen = ({ location, history, match }) => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;
  
  const userLogin = useSelector(state => state.userLogin);
  const { userInfo: loggedinUserInfo } = userLogin;
  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (loggedinUserInfo) {
      history.push('/')
    };
    if (userInfo) {
      history.push(redirect);
    };
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();

    const isInputValid = checkInput();

    if (isInputValid.submit) {
      dispatch(signup(validator.escape(firstName), validator.escape(lastName), email, password));
    } else {
      setMessage(isInputValid.message);
      return setTimeout(() => setMessage(''), 5000);
    };
  };

  const checkInput = () => {
    let message = '';
    const isValidEmail = validator.isEmail(email);

    if (password !== confirmPassword) {
      message = 'Passwords do not match';
    }

    if (!isValidEmail) {
      message = 'Please enter a valid email';
      return { submit: false, message }
    }

    if (!firstName.length) {
      message = 'Please enter a valid first name';
      return { message, submit: false };
    };

    if (!validator.isStrongPassword(password)) {
      message = 'Password must be at least 8 characters, contain 1 number and one special character';
      return { message, submit: false };
    };
  
    return { submit: true };
  };

  return (
    <>
      <Header match={match} />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className={classes.form} onSubmit={submitHandler} noValidate>
            {error && <Alert className={classes.alert} align='center' severity='error'>{error}</Alert>}
            {message && <Alert className={classes.alert} align='center' severity='warning'>{message}</Alert>}
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
                value={email}
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
                Sign Up
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
          </form>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  alert: {
    pading: '0.5rem'
  }
}));

export default SignupScreen;