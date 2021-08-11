import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Grid, Card, makeStyles, Typography
} from '@material-ui/core';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import SportsIcon from '@material-ui/icons/Sports';
import LineChartComponent from '../components/LineChartComponent';
import Dashboard from '../components/Dashboard';
import { getUserGraphData } from '../actions/dataActions';

const AdminDashboard = ({ history }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userData = useSelector(state => state.userGraphData);
  const { userGraphData } = userData;

  userGraphData && console.log(userGraphData.intervals);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push('/signin')
    };

    dispatch(getUserGraphData());
  }, [])

  return (
    <Dashboard>
      <Grid container justify={'center'} alignContent='center' alignItems='center' spacing={4}>
        <Grid item xs={12} lg={8}>
          <Card className={classes.card}>
              { userGraphData && <LineChartComponent data={userGraphData.newUsersArr} intervals={userGraphData.intervals} /> }
          </Card>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Card className={classes.card}>
            <Typography className={classes.info} variant='h4'>
              <PeopleOutlineIcon fontSize='inherit' color='secondary' />
              {' '} Users: {}</Typography>
            <Typography className={classes.info} variant='h4'>
              <SportsIcon fontSize='inherit' color='secondary' />
              {' '}Exercises: 12
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Dashboard>
  )
};

const useStyles = makeStyles((theme) => ({
  card: {
    minHeight: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  info: {
    margin: '0.5rem',
  }
}));

export default AdminDashboard;
