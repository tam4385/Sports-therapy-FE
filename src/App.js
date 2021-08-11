
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './theme';

import SignupScreen from './screens/SignupScreen';
import ExercisesScreen from './screens/ExercisesScreen';
import SigninScreen from './screens/SigninScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen';
import ExerciseListScreen from './screens/ExerciseListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ExerciseEditScreen from './screens/ExerciseEditScreen';
import MyExercisesScreen from './screens/MyExercisesScreen';
import ExerciseScreen from './screens/ExerciseScreen';
import AddUserExerciseScreen from './screens/AddUserExerciseScreen';
import AdminDashboard from './screens/AdminDashboard';


function App() {
  return (
    <div className="App">
      <Router>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Route path='/' component={ExercisesScreen} exact />
            <Route path='/signin' component={SigninScreen} />
            <Route path='/signup' component={SignupScreen} />
            <Route path='/profile' component={ProfileScreen} />
            <Route path='/myexercises' component={MyExercisesScreen} />
            <Route path='/exercises/:id' component={ExerciseScreen} />
            <Route path='/search/:keyword' component={ExercisesScreen} />
            {/* { ADMIN ROUTES } */}
            <Route path='/admin/dashboard' component={AdminDashboard} exact />
            <Route path='/admin/userlist' component={UserListScreen} />
            <Route path='/admin/users/:id/edit' component={UserEditScreen} />
            <Route path='/admin/users/:id/exercises/edit' component={AddUserExerciseScreen} />
            <Route path='/admin/exerciselist' component={ExerciseListScreen} />
            <Route path='/admin/exercises/:id/edit' component={ExerciseEditScreen} />
          </CssBaseline>
        </ThemeProvider>
      </Router>
    </div>
  );
}

export default App;
