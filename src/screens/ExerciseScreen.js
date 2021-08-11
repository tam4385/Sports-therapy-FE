import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Typography,
  Grid,
  Button,
  makeStyles,
  Card,
  CardMedia,
  CardContent,
  Paper
} from '@material-ui/core';
import { listExerciseDetails } from '../actions/exerciseActions';

import Dashboard from '../components/Dashboard';

const ExerciseScreen = ({ match }) => {
  const dispatch = useDispatch();

  const data = useSelector(state => state.exerciseDetails);
  const { error, loading, exercise } = data;

  useEffect(() => {
    
    dispatch(listExerciseDetails(match.params.id));

  }, [dispatch, match]);

  const classes = useStyles();

  return (
    <>
      <Dashboard>
        <main>
          {/* Hero unit */}
          <div className={classes.heroContent}>
            <Container maxWidth="sm">
              <Typography component="h1" variant="h3" align="center" color="textPrimary" gutterBottom>
                {exercise.title}
              </Typography>
              <div className={classes.heroButtons}>
                <Grid container spacing={2} justify="center">
                  <Grid item>
                    <Button 
                      component={Link} 
                      variant='contained' 
                      color='primary'
                      to='/admin/exerciselist'
                    >
                      Go Back
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </Container>
          </div>
            <Grid container justify='center' className={classes.cardGrid}>
              <Card className={classes.root}>
                <Grid container>
                  <Grid item sm={12} md={6}>
                    <CardMedia
                        className={classes.media}
                        title="Paella dish"
                        src={exercise.image}
                        component='img'
                    />
                  </Grid>
                  <Grid item sm={12} md={6}>
                  <CardContent>
                    <Grid>
                      <Typography className={classes.cardContent} align='left'>
                        Exercise Notes: {exercise.notes}
                      </Typography>
                      <Typography className={classes.cardContent} align='left'>
                        Sets: {exercise.sets}
                      </Typography>
                      <Typography className={classes.cardContent} align='left'>
                        Reps: {exercise.reps}
                      </Typography>
                    </Grid>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
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
  cardGrid: {
    paddingTop: theme.spacing(5),
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
  media: {
    height: 300
  },
  cardContent: {
    margin: theme.spacing(2)
  }
}));

export default ExerciseScreen
