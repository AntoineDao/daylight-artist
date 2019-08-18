import React, { Component } from 'react';
import { SketchField, Tools } from 'react-sketch';

import DrawControl from '../DrawControl';

class SketchBoard extends Component {
  constructor(props) {
    super(props);

    this.state = {
        lineWidth: 10,
        lineColor: 'black',
        fillColor: '#68CCCA',
        backgroundColor: 'transparent',
        shadowWidth: 0,
        shadowOffset: 0,
        tool: Tools.Line,
        enableRemoveSelected: false,
        fillWithColor: false,
        fillWithBackgroundColor: false,
        drawings: [],
        canUndo: false,
        canRedo: false,
        controlledSize: false,
        sketchWidth: 600,
        sketchHeight: 600,
        stretched: true,
        stretchedX: false,
        stretchedY: false,
        originX: 'left',
        originY: 'top',
        imageUrl: 'https://files.gamebanana.com/img/ico/sprays/4ea2f4dad8d6f.png',
        expandTools: false,
        expandControls: false,
        expandColors: false,
        expandBack: false,
        expandImages: false,
        expandControlled: false,
        text: 'a text, cool!',
        enableCopyPaste: false,
    };

   //  this.setLineColor = this.setLineColor.bind(this);
   //  this.setTool = this.setTool.bind(this);
   }

   _selectTool = event => {
      this.setState({
         tool: event.target.value,
         enableRemoveSelected: event.target.value === Tools.Select,
         enableCopyPaste: event.target.value === Tools.Select
      });
   };

   _save = () => {
      let drawings = this.state.drawings;
      drawings.push(this._sketch.toDataURL());
      this.setState({ drawings: drawings });
   };

   _download = () => {
      console.save(this._sketch.toDataURL(), 'toDataURL.txt');
      console.save(JSON.stringify(this._sketch.toJSON()), 'toDataJSON.txt');

      /*eslint-enable no-console*/

      let { imgDown } = this.refs;
      let event = new Event('click', {});

      imgDown.href = this._sketch.toDataURL();
      imgDown.download = 'toPNG.png';
      imgDown.dispatchEvent(event);
   };

   _removeMe = index => {
      let drawings = this.state.drawings;
      drawings.splice(index, 1);
      this.setState({ drawings: drawings });
   };

   undo = () => {
      this._sketch.undo();
      this.setState({
         canUndo: this._sketch.canUndo(),
         canRedo: this._sketch.canRedo(),
      });
   };

   redo = () => {
      this._sketch.redo();
      this.setState({
         canUndo: this._sketch.canUndo(),
         canRedo: this._sketch.canRedo(),
      });
   };

   clear = () => {
      this._sketch.clear();
      this._sketch.setBackgroundFromDataUrl('');
      this.setState({
         controlledValue: null,
         backgroundColor: 'transparent',
         fillWithBackgroundColor: false,
         canUndo: this._sketch.canUndo(),
         canRedo: this._sketch.canRedo(),
      });
   };

   _removeSelected = () => {
      this._sketch.removeSelected()
   };

   _onSketchChange = () => {
      let prev = this.state.canUndo;
      let now = this._sketch.canUndo();
      if (prev !== now) {
         this.setState({ canUndo: now });
      }
   };

   _onBackgroundImageDrop = (accepted /*, rejected*/) => {
      if (accepted && accepted.length > 0) {
         let sketch = this._sketch;
         let reader = new FileReader();
         let { stretched, stretchedX, stretchedY, originX, originY } = this.state;
         reader.addEventListener(
            'load',
            () =>
               sketch.setBackgroundFromDataUrl(reader.result, {
                  stretched: stretched,
                  stretchedX: stretchedX,
                  stretchedY: stretchedY,
                  originX: originX,
                  originY: originY,
               }),
            false,
         );
         reader.readAsDataURL(accepted[0]);
      }
   };

   _addText = () => this._sketch.addText(this.state.text);

   setLineColor = (color) => this.setState({ lineColor: color });

   setTool = (tool) => this.setState({ tool });

   componentDidMount = () => {
      (function (console) {
         console.save = function (data, filename) {
            if (!data) {
               console.error('Console.save: No data');
               return;
            }
            if (!filename) filename = 'console.json';
            if (typeof data === 'object') {
               data = JSON.stringify(data, undefined, 4);
            }
            var blob = new Blob([data], { type: 'text/json' }),
               e = document.createEvent('MouseEvents'),
               a = document.createElement('a');
            a.download = filename;
            a.href = window.URL.createObjectURL(blob);
            a.dataset.downloadurl = ['text/json', a.download, a.href].join(':');
            e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
            a.dispatchEvent(e);
         };
      })(console);
   };

   predict = () => {
      alert('Magic prediction!')
   }
  

  render() {
    let { controlledValue } = this.state;

    return (
      <div className="row">
        <div className="col-xs-7 col-sm-7 col-md-9 col-lg-9">
          <SketchField
              name="sketch"
              className="canvas-area"
              ref={c => (this._sketch = c)}
              lineColor={this.state.lineColor}
              lineWidth={this.state.lineWidth}
              fillColor={
                this.state.fillWithColor
                    ? this.state.fillColor
                    : 'transparent'
              }
              backgroundColor={
                this.state.fillWithBackgroundColor
                    ? this.state.backgroundColor
                    : 'transparent'
              }
              width={
                this.state.controlledSize ? this.state.sketchWidth : null
              }
              height={
                this.state.controlledSize ? this.state.sketchHeight : null
              }
            //   defaultValue={dataJson}
              value={controlledValue}
              forceValue
              onChange={this._onSketchChange}
              tool={this.state.tool}
          />
        </div>
        <div className="col-xs-5 col-sm-5 col-md-3 col-lg-3">
          <DrawControl 
            lineColor={this.state.lineColor}
            setLineColor={this.setLineColor = this.setLineColor.bind(this)}
            setTool={this.setTool = this.setTool.bind(this)}
            undo={this.undo.bind(this)}
            redo={this.redo.bind(this)}
            clear={this.clear.bind(this)}
            canUndo={this.state.canUndo}
            predict={this.predict.bind(this)}
          />
        </div>
      </div>
    );
  }
}

export default SketchBoard;