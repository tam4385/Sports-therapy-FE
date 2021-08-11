import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import Dashboard from '../components/Dashboard';
import Searchbar from '../components/SearchBar';
import { userListExercises } from '../actions/userActions';

const MyExercisesScreen = ({ history }) => {
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;
  
  const userListExercisesState = useSelector(state => state.userListExercises);
  const { userExercises, loading } = userListExercisesState;

  useEffect(() => {
    if (!userInfo) {
      history.push('/signin')
    };
    
    dispatch(userListExercises(userInfo._id))

  }, []);

  const classes = useStyles()

  return (
    <Dashboard>
      <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                My Exercises
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Searchbar history={history} />
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
          <Container className={classes.cardGrid} maxWidth="lg">
            {/* End hero unit */}
            <Grid container spacing={4}>
              {loading ? <CircularProgress /> : (
                <>
                {!userExercises.length 
                  ? <Typography>No exercises associated with user.</Typography>
                  : userExercises.map((e) => (
                  <Grid item key={e.title} xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                      <CardMedia
                        className={classes.cardMedia}
                        image={e.image}
                        title={e.title}
                      />
                      <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                          {e.title}
                        </Typography>
                        <Typography>
                          {e.notes}
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" to={`/exercises/${e._id}`} variant='contained' color="primary" component={Link}>
                          View
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                ))}
                </>
              )}
            </Grid>
          </Container>
        </main>
    </Dashboard>
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
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default MyExercisesScreen
