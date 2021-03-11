import React, { Component } from 'react';

class FeatureModel {
    constructor(key) {
        this.key = key
        this.x = 0 
        this.y = 0
        this.width = 1
        this.height = 1
        this.instruction = 0
        this.target = false
        this.qr = false
    }

    getKey() {
        return this.key
    }

    newVals(fm) {
        this.instruction = fm.instruction
        this.target = fm.target
        this.qr = fm.qr
        this.x = fm.x
        this.y = fm.y
        this.width = fm.width
        this.height = fm.height
    }

    isMultiple(gridSize, val) {
        return gridSize * Math.floor(val / gridSize) == val
    }

    problem(gridSize) {
        var result = ''
        if (!this.isMultiple(gridSize, this.x) || !this.isMultiple(gridSize, this.y) || !this.isMultiple(gridSize, this.height) || !this.isMultiple(gridSize, this.width)) {
            result = "Dimension not a multiple of grid size"
        }
        if ((this.qr || this.target) && (this.width != gridSize || this.height != gridSize)) {
            result = "If QR or Target, size must be equal to grid size"
        }
        return result
    }
};

class Feature extends Component {
    constructor(props) {
      super(props);
      this.state = {
        x: props.model.x,
        y: props.model.y,
        width: props.model.width,
        height: props.model.height,
        instruction: props.model.instruction,
        target: props.model.target,
        qr: props.model.qr
      }
      this.onChange = this.onChange.bind(this);
      this.setX = this.setX.bind(this);
      this.setY = this.setY.bind(this);
      this.setWidth = this.setWidth.bind(this);
      this.setHeight = this.setHeight.bind(this);
      this.setInstruction = this.setInstruction.bind(this);
      this.setQR = this.setQR.bind(this);
      this.setTarget = this.setTarget.bind(this);

      this.target = props.model.target
      this.x = props.model.x
      this.y = props.model.y
      this.width = props.model.width
      this.height = props.model.height
      this.instruction = props.model.instruction
      this.qr = props.model.qr
    }

    setY(e) {
        this.y = e.target.value
        this.setState({ y: e.target.value });
        this.onChange();
    }
    setHeight(e) {
        this.height = e.target.value
        this.setState({ height: e.target.value });
        this.onChange();
    }
    setX(e) {
        this.x = e.target.value
        this.setState({ x: e.target.value });
        this.onChange();
    }
    setWidth(e) {
        this.width = e.target.value
        this.setState({ width: e.target.value });
        this.onChange();
    }
    setInstruction(e) {
        this.instruction = e.target.value
        this.setState({ instruction: e.target.value });
        this.onChange();
    }
    setTarget(e) {
        this.target = e.target.checked
        this.setState({ target: e.target.checked });
        this.onChange();
    }
    setQR(e) {
        this.qr = e.target.checked
        this.setState({ qr: e.target.checked });
        this.onChange();
    }

    onChange() {      
        this.props.model.x = this.x
        this.props.model.y = this.y
        this.props.model.width = this.width
        this.props.model.height = this.height
        this.props.model.instruction = this.instruction
        this.props.model.target = this.target
        this.props.model.qr = this.qr
        this.props.onChange(this.props.model);
    }

    render() {
        return (
            <div>
                <div className="splitScreen featureRow">
                    <label>X</label>
                    <input className="small-entry" value={this.state.x} onChange={this.setX}/>
                    <label>Y</label>
                    <input className="small-entry" value={this.state.y} onChange={this.setY}/>
                    <label>W</label>
                    <input className="small-entry" value={this.state.width} onChange={this.setWidth}/>
                    <label>H</label>
                    <input className="small-entry" value={this.state.height} onChange={this.setHeight}/>
                    <label>Target?</label>
                    <input type="checkbox" value={this.state.target} onChange={this.setTarget}/>
                    <label>Instr#</label>
                    <input className="small-entry" value={this.state.instruction} onChange={this.setInstruction}/>
                    <label>QR?</label>
                    <input type="checkbox" value={this.state.qr} onChange={this.setQR}/>
                </div>
            </div>
        )
    }
}

export { Feature, FeatureModel };