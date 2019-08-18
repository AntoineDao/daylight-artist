import React, { Component } from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ToggleCard from '../ToggleCard';
import { Tools } from 'react-sketch';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

import Clear from '@material-ui/icons/Clear'
import Undo from '@material-ui/icons/Undo'
import BlurOn from '@material-ui/icons/BlurOn'
import Button from '@material-ui/core/Button';

const styles = theme => ({
  group: {
    width: 'auto',
    height: 'auto',
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: 'row',
  }
});

const marks = [
  {
    value: 0,
    label: '0 m'
  },
  {
    value: 0.5,
    label: '0.5 m'
  },
  {
    value: 1,
    label: '1 m'
  },
  {
    value: 1.5,
    label: '1.5 m'
  },
  {
    value: 2,
    label: '2 m'
  },
  {
    value: 2.5,
    label: '2.5 m'
  },
  {
    value: 3,
    label: '3 m'
  },
]

const valuetext = (value) => {
  return `${value} m`
}

const colorMap = {
  "0": 'black',
  "0.5": 'blue',
  "1": 'green',
  "1.5": 'red',
  "2": 'yellow',
  "2.5": 'purple',
  "3": 'orange',
}

class DrawControl extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      type: 'wall',
      wall: {
        tool: Tools.Line
      },
      window: {
        height: 1.5
      },
    }

    this.handleSurfaceChange = this.handleSurfaceChange.bind(this);
    this.handleToolChange = this.handleToolChange.bind(this);
    this.handleHeightChange = this.handleHeightChange.bind(this);
  }
  
  handleSurfaceChange(event) {
    switch (event.target.value) {
      case 'wall':
        this.props.setTool(this.state.wall.tool);
        this.props.setLineColor('black');
        break;

      case 'window':
        this.props.setTool(Tools.Line);
        this.props.setLineColor(colorMap[this.state.window.height]);
        break;

      default:
        console.log(event.target.value);
        break;      
    }
    this.setState({ type: event.target.value });
  }

  handleToolChange = (event) => {
    this.props.setTool(event.target.value);
    this.setState({ wall: { tool: event.target.value } })
  }

  handleHeightChange = (event, value) => {
    this.props.setLineColor(colorMap[value]);
    this.setState({ window: { height: value } });
  }

  undo = () => {
    this._sketch.undo();
    this.setState({
      canUndo: this._sketch.canUndo(),
      canRedo: this._sketch.canRedo(),
    });
  };
  
  render() {
    const { classes } = this.props;
    let options;

    switch (this.state.type) {
      case 'wall':
        options = (
          <div className="row">
            <div className="col-lg-12">
              <TextField
                select={true}
                label="Drawing Tool"
                defaultValue="Line"
                value={this.state.wall.tool}
                onChange={this.handleToolChange}
                helperText="Please select a Tool">
                <MenuItem value={Tools.Line} key="Line">Line</MenuItem>
                <MenuItem value={Tools.Rectangle} key="Rectangle">Rectangle</MenuItem>
              </TextField>
            </div>
          </div>
        )
        break;

      case 'window':
        options = (
          <div className="row">
            <div className="col-lg-12">
              <Typography variant="subtitle1">Window Height</Typography>
              <Slider
                defaultValue={1.5}
                getAriaValueText={valuetext}
                aria-labelledby="discrete-slider-small-steps"
                step={0.5}
                onChange={this.handleHeightChange}
                marks={marks}
                min={0}
                max={3}
                valueLabelDisplay="off"
              />
              </div>
            </div>
        );
        break;

      default:
        options = null;
        break;
    }

    return (
      <ToggleCard title="Drawing Controls" subheader="Pick a surface type and start drawing!">
        <Button disabled={!this.props.canUndo} onClick={this.props.undo}>
          <Undo/> Undo
        </Button>
        <Button disabled={!this.props.canUndo} onClick={this.props.clear}>
          <Clear/> Clear
        </Button>
        <Button disabled={!this.props.canUndo} onClick={this.props.predict}>
          <BlurOn/> Predict
        </Button>
        <Typography variant="h5">Surface Type</Typography>
        <RadioGroup
          aria-label="type"
          name="type"
          className={classes.group}
          row
          style={{ display: 'flex' }}
          value={this.type}
          onChange={this.handleSurfaceChange}
          defaultValue={this.state.type}
        >
          <FormControlLabel value="wall" control={<Radio />} label="Wall" />
          <FormControlLabel value="window" control={<Radio />} label="Window" />
        </RadioGroup>
        <Typography variant="h5">Options</Typography>
        <br/>
        <br/>
        {options}
  </ToggleCard>
    );
  }
}

export default withStyles(styles)(DrawControl);