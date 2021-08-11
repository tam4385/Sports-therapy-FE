import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import EventIcon from '@material-ui/icons/Event';
import SportsIcon from '@material-ui/icons/Sports';
import GroupIcon from '@material-ui/icons/Group';
import ListAltIcon from '@material-ui/icons/ListAlt';
import { Link } from 'react-router-dom'

const linkStyle = {
  textDecoration: 'none',
  color: 'black'
}

const iconStyle = {
  color: 'red'
}

export const mainListItems = (
  <div>
    <Link to={'/'} style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon style={iconStyle} />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      </Link>
    <Link to={'/myexercises'} style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <SportsIcon />
        </ListItemIcon>
        <ListItemText primary="My Exercises" />
      </ListItem>
    </Link>
    <Link to={'/profile'} style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <PersonIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </Link>
    <Link to={'/profile'} style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <EventIcon />
        </ListItemIcon>
        <ListItemText primary="Appointments" />
      </ListItem>
    </Link>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Admin</ListSubheader>
    <Link to={'/admin/dashboard'} style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon style={iconStyle} />
        </ListItemIcon>
        <ListItemText primary="Admin Board" />
      </ListItem>
    </Link>
    <Link to={'/admin/exerciselist'} style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <ListAltIcon />
        </ListItemIcon>
        <ListItemText primary="Exercises List" />
      </ListItem>
    </Link>
    <Link to={'/admin/userlist'} style={linkStyle}>
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Users List" />
      </ListItem>
    </Link>
    {/* <ListItem button>
      <ListItemIcon>
        <SupervisorAccountIcon />
      </ListItemIcon>
      <ListItemText primary="Admin" />
    </ListItem> */}
  </div>
);