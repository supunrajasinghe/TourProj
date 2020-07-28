import React from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './App.css';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: 'auto',
        width: theme.spacing(50),
        height: theme.spacing(50),
        marginTop: '20vh'
      }
    },
  }),
);

function App() {

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3} />
    </div>
  );
}

export default App;
