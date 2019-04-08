import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';


import store from '../../store';

export default class UsernameDialog extends React.Component {
  state = {
    open: true,
    newUsername: ''
  };

  handleSubmit = () => {
    if (this.state.newUsername === '') {
      return;
    }
    store.dispatch({type: 'setUsername', username: this.state.newUsername});
    this.setState({ open: false });
  }
  
  handleNameChange = (e) => {
    this.setState({newUsername: e.target.value});
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleSubmit}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Your Name</DialogTitle>
          <DialogContent>
            <DialogContentText>
                This will be viewed by other users.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Username"
              type="text"
              onChange={this.handleNameChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleSubmit} color="primary">
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}