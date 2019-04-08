import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CodeBoard from './CodeBoard';
import MemberList from './MemberList';
import Output from './Output';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginTop: '80px',
    height: '100%'
  },
  paperBoard: {
    padding: theme.spacing.unit * 1,
    height: '100%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperMember: {
    marginBottom: '2%',
    padding: theme.spacing.unit * 1,
    height: '30%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  paperResult: {
    padding: theme.spacing.unit * 1,
    height: '64.5%',
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
});

class Room extends Component {
    render() {
      const { classes } = this.props;
      return (
        <div className={classes.root}>
          <Grid container spacing={8} style={{height: '100%'}}>
            <Grid item xs={6}>
              <Paper className={classes.paperBoard}>
                <CodeBoard id={+this.props.match.params.id}/>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paperMember}>
                <MemberList />
              </Paper>
              <Paper className={classes.paperResult}>
                <Output />
              </Paper>
            </Grid>
          </Grid>
        </div>
      )
    }
}

Room.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Room);