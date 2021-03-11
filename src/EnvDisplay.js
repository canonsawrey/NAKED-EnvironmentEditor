import React, { Component } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

const buffer = 40

function scale(x, y) {
  return (x / y < (window.innerWidth / 2 - 2 * buffer) / (window.innerHeight - 2 * buffer)) ? (window.innerHeight - 2 * buffer) / y : (window.innerWidth / 2 - 2 * buffer) / x;
}

function x_offset(x, y) {
  return (x / y < (window.innerWidth / 2 - 2 * buffer) / (window.innerHeight - 2 * buffer)) ? (window.innerWidth / 2 - x * scale(x, y)) / 2 : 0; 
}

function y_offset(x, y) {
  return (x / y < (window.innerWidth / 2 - 2 * buffer) / (window.innerHeight - 2 * buffer)) ? 0 : (window.innerHeight - y * scale(x, y)) / 2; 
}

class EnvDisplay extends Component {
  constructor(props) {
    super(props);
  }
    
  render() {
    return (
    <Stage width={window.innerWidth / 2 + 1} height={window.innerHeight}>
      <Layer>
        <Text text={"(0, 0)"} fontSize={15} x={buffer / 2 + + x_offset(this.props.x, this.props.y)} y={this.props.y * scale(this.props.x, this.props.y) + buffer * 1.5 + y_offset(this.props.x, this.props.y)}/>
        <Text text={`(${this.props.x}, ${this.props.y})`} fontSize={15} x={this.props.x * scale(this.props.x, this.props.y) + x_offset(this.props.x, this.props.y)} y={buffer / 2 + + y_offset(this.props.x, this.props.y)}/>
        <Rect
          x={buffer + x_offset(this.props.x, this.props.y)}
          y={buffer + y_offset(this.props.x, this.props.y)}
          width={this.props.x * scale(this.props.x, this.props.y)}
          height={this.props.y * scale(this.props.x, this.props.y)}
          stroke="black"
        />
        <Rect
          x={window.innerWidth / 2}
          y={0}
          width={1}
          height={window.innerHeight}
          stroke="black"
        />
      </Layer>
    </Stage>
    );
  }
}

export default EnvDisplay;

