import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

import store from '../store';

export default class AddRoomDialog extends React.Component {
  state = {
    open: false,
    newRoomName: '',
    newRoomLanguage: 'java'
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    let newRoom = {name: this.state.newRoomName, language: this.state.newRoomLanguage};
    fetch(
      'http://localhost:3001/rooms',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRoom)
      }
    )
    .then(res => res.json())
    .then(json => store.dispatch({type: 'addRoom', room: json}))
    .catch(err => console.log(err))
    this.setState({ open: false });
  }
  
  handleNameChange = (e) => {
    this.setState({newRoomName: e.target.value});
  }

  handleLanguageChange = (e) => {
    this.setState({newRoomLanguage: e.target.value});
  }

  render() {
    return (
      <div>
        <Fab color="secondary" aria-label="Add" onClick={this.handleClickOpen}>
          <AddIcon />
        </Fab>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create New Room</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Room Name"
              type="text"
              onChange={this.handleNameChange}
              fullWidth
            />
            <br />
              <Select
                value={this.state.newRoomLanguage}
                onChange={this.handleLanguageChange}
              >
              <MenuItem value="java" selected={true}>Java</MenuItem>
              <MenuItem value="javascript">Javascript</MenuItem>
              <MenuItem value="python">Python</MenuItem>
              </Select>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}