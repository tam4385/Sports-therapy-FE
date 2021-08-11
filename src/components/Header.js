import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles } from '@material-ui/core';
import SportsMmaIcon from '@material-ui/icons/SportsMma';
import Toolbar from '@material-ui/core/Toolbar';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  title: {
    flexGrow: '1'
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
  link: {
    textDecoration: 'none',
    color: theme.palette.secondary.main,
  }
}));

const Header = ({ match }) => {

  const classes = useStyles();
  return (
    <AppBar position="relative">
      <Toolbar>
        <SportsMmaIcon className={classes.icon} />
        <Typography className={classes.title} variant="h6" color='secondary' noWrap>
          <span style={{ color: '#fff' }}>NBS</span> SportsTherapy
        </Typography>
        {match && match.path === '/signup' 
          ? <Link className={classes.link} to='/signin'>Sign In</Link> 
          : <Link to={'/signup'} className={classes.link}>Sign Up</Link>
        }   
      </Toolbar>
    </AppBar>
  )
};

export default Header
