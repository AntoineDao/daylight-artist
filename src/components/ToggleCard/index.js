import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
// import IconButton from '@material-ui/core/IconButton';
// import ExpandMore from '@material-ui/icons/ExpandMore';
// import Collapse from '@material-ui/core/Collapse';
// import { CompactPicker } from 'react-color';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
import { withStyles } from '@material-ui/styles';

const styles = {
  card: {
    margin: '10px 10px 5px 0'
  }
};

class ColourControl extends Component {
  constructor(props) {
    super(props);
    
    this.toggle = this.toggle.bind(this);

    this.state = {
      expand: false
    }
  }

  toggle = () => {
    this.setState({ expand: !this.state.expand });
  }
    

  render() {
    return (
    <Card style={styles.card}>
        <CardHeader
          title={this.props.title}
          subheader={this.props.subheader}
          // action={
          //     <IconButton
          //       onClick={(e) => this.toggle()}>
          //       <ExpandMore />
          //     </IconButton>
          // } 
          />
        {/* <Collapse in={this.state.expand}> */}
          <CardContent>
            {this.props.children}
          </CardContent>
        {/* </Collapse> */}
    </Card>
    );
  }
}

export default withStyles(styles)(ColourControl);