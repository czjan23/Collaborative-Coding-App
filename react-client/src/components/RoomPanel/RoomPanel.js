import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

import AddRoomDialog from '../AddRoomDialog/AddRoomDialog';

import store from '../../store';

const styles = theme => ({
  root: {
    margin: '0 auto',
    marginTop: '100px',
    width: '100%',
    textAlign: 'center',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  room: {
    textAlign: 'center',
  },
});

class RoomPanel extends React.Component {
  componentWillMount() {
    fetch('http://localhost:3001/rooms')
    .then(res => res.json())
    .then(json => store.dispatch({type: 'roomListInit', rooms: json}))
  }
  
  deleteRoom = (e, index) => {
    e.stopPropagation();
    e.preventDefault();
    fetch(
      `http://localhost:3001/rooms/${store.getState().roomList[index]._id}`,
      {
        method: "DELETE"
      })
    .then(res => store.dispatch({type: 'deleteRoom', index: index}))
    .catch(err => console.log(err));
  }

  getFilteredList = () => {
    let searchInput = store.getState().search;
    return store.getState().roomList.filter(room => room.name.toLowerCase().indexOf(searchInput.toLowerCase()) !== -1);
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <List component="nav">
          {this.getFilteredList().map((room, index) => {
            return (
                <ListItem key={index} button component={Link} to={`/room/${index}`}>
                  {room.language === 'java' ? <i className="fab fa-java"></i> : ''}
                  {room.language === 'javascript' ? <i className="fab fa-js-square"></i> : ''}
                  {room.language === 'python' ? <i className="fab fa-python"></i> : ''}
                  <ListItemText className={classes.room} primary={room.name} />
                  <IconButton aria-label="Delete" onClick={(e) => this.deleteRoom(e, index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
            )
          })}
        </List>
        <AddRoomDialog />
      </div>
    );
  }
}

RoomPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(RoomPanel);