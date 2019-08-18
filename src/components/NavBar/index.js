import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar/Toolbar';
import Typography from '@material-ui/core/Typography/Typography';
import IconButton from '@material-ui/core/IconButton';
import UndoIcon from '@material-ui/icons/Undo';
import RedoIcon from '@material-ui/icons/Redo';
import DeleteIcon from '@material-ui/icons/Delete';
import SaveIcon from '@material-ui/icons/Save';
import DownloadIcon from '@material-ui/icons/CloudDownload';
import { withStyles } from '@material-ui/styles';

const styles = {
  appBar: {
    backgroundColor: '#333',
  },
};

const NavBar = (props) => (
  <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
    <AppBar title="Sketch Tool" position="static" style={styles.appBar}>
      <Toolbar>
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>Sketch Tool</Typography>
        <IconButton
          color="primary"
          disabled={!props.state.canUndo}
          onClick={props._undo}>
          <UndoIcon />
        </IconButton>
        <IconButton
          color="primary"
          disabled={!props.state.canRedo}
          onClick={props._redo}>
          <RedoIcon />
        </IconButton>
        <IconButton
          color="primary"
          onClick={props._save}>
          <SaveIcon />
        </IconButton>
        <IconButton
          color="primary"
          onClick={props._download}>
          <DownloadIcon />
        </IconButton>
        <IconButton
          color="primary"
          onClick={props._clear}>
          <DeleteIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  </div>
)

export default withStyles(styles)(NavBar);