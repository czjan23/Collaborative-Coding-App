import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import store from '../../store';

class Output extends Component {
  render() {
    return (
      <div style={{width: '100%', height: '50%'}}>
        {store.getState().executionResult === '' ?
          <Typography variant="h5" color="inherit">
            Running Results Will be here
          </Typography>
          :
          store.getState().executionResult
        }
      </div>
    );
  }
}

export default Output;
