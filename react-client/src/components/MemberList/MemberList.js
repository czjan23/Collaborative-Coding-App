import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';

import store from '../../store';

class MemberList extends Component {
  render() {
    return (
        <div>
          <Typography variant="h6" color="inherit">
            Members
          </Typography>
          {store.getState().memberList.map((member, index) => {
            return (
              <Typography key={index}  variant="body1" color="inherit">
                {member}
              </Typography>
            )
          })}
        </div>
    );
  }
}

export default MemberList;
