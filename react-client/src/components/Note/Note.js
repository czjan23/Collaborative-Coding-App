import React, { Component } from 'react';
import { withStyles } from "@material-ui/core/styles";

import store from '../../store';

const styles = {
  note: {
    height: 300
  },
};

class Note extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div style={{width: '100%', height: '100%'}}>
        <textarea placeholder="Take some notes here..." style={{width: '100%', height: '100%', fontSize: 18, border: '0 solid white'}}/>
      </div>
    );
  }
}

export default withStyles(styles)(Note);
