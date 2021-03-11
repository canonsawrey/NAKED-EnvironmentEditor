import './App.css';
import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { Feature, FeatureModel } from './Feature.js'

const buffer = 40

class EnvEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 10,
      height: 10,
      gridSize: 1,
      features: []
    }
    this.features = []
    this.featureCounter = 0
    this.addFeature = this.addFeature.bind(this);
    this.onFeatureChange = this.onFeatureChange.bind(this);
    this.removeFeature = this.removeFeature.bind(this);
  }
  
  addFeature() {
    this.features.push(new FeatureModel(this.featureCounter));
    this.featureCounter += 1;
    this.setState({features: this.features});
    console.log(`Added feature! Current list: ${this.features.map((feature) => feature.getKey())}`);
  }

  onFeatureChange(fm) {
    let toChange = this.features.find(function (el) {
      return el.getKey() === fm.getKey();
    })
    if (toChange) {
      toChange.newVals(fm);
    } else {
      console.log(fm)
    }
    console.log(this.features)
    this.forceUpdate()
  }

  removeFeature(fm) {
    let toRemove = this.features.find(function (el) {
      return el.getKey() === fm.getKey();
    })
    if (toRemove) {
      console.log(toRemove);
    } else {
      console.log(fm)
    }
    console.log(this.features)
  }

  render() {
    return (
      <div className="splitScreen">
        <div className="left">
            <Stage width={window.innerWidth / 2} height={window.innerHeight}>
              <Layer>
                {this.state.features.map((feature) => 
                  (!feature.problem(this.state.gridSize)) ? 
                  <Rect
                    key={feature.key}
                    x={convert_x(this.state.width, this.state.height, feature.x)}
                    y={convert_y(this.state.width, this.state.height, parseFloat(feature.y) + parseFloat(feature.height))}
                    width={feature.width * scale(this.state.width, this.state.height)}
                    height={feature.height * scale(this.state.width, this.state.height)}
                    stroke="black"
                    fill={(feature.qr) ? "black" : (feature.target) ? "green" : "red"}/> : 
                  <Text 
                    key={feature.getKey()} 
                    text={`* Feature not rendering: ${feature.problem(this.state.gridSize)}`} 
                    fontSize={10} x ={this.state.width / 4} 
                    x={convert_x(this.state.width, this.state.height, feature.x)}
                    y={convert_y(this.state.width, this.state.height, parseFloat(feature.y) + parseFloat(feature.height))}
                    />)}
                <Text text={"(0, 0)"} fontSize={15} x={buffer / 2 + x_offset(this.state.width, this.state.height)} y={this.state.height * scale(this.state.width, this.state.height) + buffer * 1.5 + y_offset(this.state.width, this.state.height)}/>
                <Text text={`(${this.state.width}, ${this.state.height})`} fontSize={15} x={this.state.width * scale(this.state.width, this.state.height) + x_offset(this.state.width, this.state.height)} y={buffer / 2 + + y_offset(this.state.width, this.state.height)}/>
                <Rect
                  x={buffer + x_offset(this.state.width, this.state.height)}
                  y={buffer + y_offset(this.state.width, this.state.height)}
                  width={this.state.width * scale(this.state.width, this.state.height)}
                  height={this.state.height * scale(this.state.width, this.state.height)}
                  stroke="black"
                />
              </Layer>
            </Stage>
        </div>
        <div className="right">
            <label htmlFor="width_edit">Width (m)</label>
            <input id="width_edit" value={this.state.width} onChange={event => this.setState({width: event.target.value.replace(/(?!-)[^0-9.]/g,'')})}/>
            <br/>
            <label htmlFor="height_edit">Height (m)</label>
            <input id="height_edit" value={this.state.height} onChange={event => this.setState({height: event.target.value.replace(/(?!-)[^0-9.]/g,'')})}/>            
            <br/>
            <label htmlFor="gridSize_edit">Grid size (m)</label>
            <input id="gridSize_edit" value={this.state.gridSize} onChange={event => this.setState({gridSize: event.target.value.replace(/(?!-)[^0-9.]/g,'')})}/>
            <br/>
            <button type="button" onClick={this.addFeature}>
              Add feature
            </button>
            {this.state.features.map((feature) => <Feature key={feature.getKey()} onChange={this.onFeatureChange} delete={this.deleteFeature} model={feature}/>)}
        </div>
      </div>
    );
  }
}

function scale(x, y) {
  return (x / y < (window.innerWidth / 2 - 2 * buffer) / (window.innerHeight - 2 * buffer)) ? (window.innerHeight - 2 * buffer) / y : (window.innerWidth / 2 - 2 * buffer) / x;
}

function x_offset(x, y) {
  return (x / y < (window.innerWidth / 2 - 2 * buffer) / (window.innerHeight - 2 * buffer)) ? (window.innerWidth / 2 - x * scale(x, y)) / 2 : 0; 
}

function y_offset(x, y) {
  return (x / y < (window.innerWidth / 2 - 2 * buffer) / (window.innerHeight - 2 * buffer)) ? 0 : (window.innerHeight - y * scale(x, y)) / 2; 
}

function convert_x(x, y, val) {
  return buffer + x_offset(x, y) + val * scale(x, y)
}

function convert_y(x, y, val) {
  return buffer + y_offset(x, y) + (y - val) * scale(x, y)
}

export default EnvEditor;