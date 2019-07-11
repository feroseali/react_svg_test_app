import React, { Component } from 'react';
import './App.css';
import Draggable from 'react-draggable';
import { Button, Badge } from 'react-bootstrap';
import { faArrowsAlt, faObjectUngroup, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library,dom } from '@fortawesome/fontawesome-svg-core';

library.add(faEyeSlash, faEye)
dom.watch()


class DrawArea extends Component {
  constructor(props) {
    super(props);

    this.state = {
      points: [],
      shapes: [],
      isDrawing: true,
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.draw = this.draw.bind(this);
    this.drag = this.drag.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  draw() {
    this.setState({ isDrawing: true });

  }
  drag() {
    this.setState({ isDrawing: false });

  }
  toggle(e) {
    let str = e.currentTarget.id


    if (document.getElementsByName(str)[0].style.display === "block") {
      document.getElementsByName(str)[0].style.display = "none"
      document.getElementById(str).innerHTML = '<i class="fas fa-eye-slash"></i>'
    }
    else {
      document.getElementsByName(str)[0].style.display = "block"
      document.getElementById(str).innerHTML = '<i class="fas fa-eye"></i>'
    }

  }

  componentDidMount() {
    document.addEventListener("mouseup", this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown(mouseEvent) {
    if (mouseEvent.button !== 0) {
      return;
    }
    const boundingRect = this.refs.drawArea.getBoundingClientRect();
    const point = [{ x: mouseEvent.clientX - boundingRect.left, y: mouseEvent.clientY - boundingRect.top }]
    if (this.state.isDrawing === true) {
      this.setState({
        points: [...this.state.points, ...point],
      });
    }

  }


  handleMouseUp(e) {

    if (this.state.points.length >= 4 && this.state.points.length % 4 === 0 && this.state.isDrawing === true) {
      let x = [];
      let y = [];

      let sx, sy, lx, ly, width, height;

      this.state.points.map((p) => (
        x.push(p.x),
        y.push(p.y)
      ))
      sx = Math.min(...x);
      sy = Math.min(...y);
      lx = Math.max(...x);
      ly = Math.max(...y);
      width = lx - sx;
      height = ly - sy;

      let rect = [{ x: sx, y: sy, w: width, h: height }];
      this.setState({
        shapes: [...this.state.shapes, rect],
        points: [],
        isDrawing: true,
      });
    }
  }


  render() {
    let className = "drawArea";
    if (this.state.isDrawing === true) {
      className += " cursor"
    }
    return (
      <div>
        <div className="header">
          <h3 className="title">Test App</h3>
        </div>
        <div className="flex">
          <div className="tool-div">
            <h5 className="h5-title">Tools</h5>
            <Button className="tool" variant="outline-light" onClick={this.drag} title="Drag"><FontAwesomeIcon icon={faArrowsAlt} /></Button>
            <Button variant="outline-light" onClick={this.draw} title="Select"><FontAwesomeIcon icon={faObjectUngroup} /></Button>
          </div>
          <div
            className={className}
            ref="drawArea"
            onMouseDown={this.handleMouseDown}
            onMouseUp={this.handleMouseUp}
          >
            <Drawing point={this.state.points} draw={this.state.isDrawing} rectangles={this.state.rectangles} shapes={this.state.shapes} />
          </div>
          <div className="sidebar">
            <h5 className="h5-title"> Objects</h5>
            {this.state.shapes.map((s, index) => (<div className="obj" key={index}  ><Button className="btn-radius btn-no-border" variant="secondary" id={'poly' + index} onClick={this.toggle}><FontAwesomeIcon icon={faEye} /></Button><Badge className=" badge-size" variant="secondary"  > Object - {index + 1}</Badge> </div>))}
          </div>
        </div>

      </div>
    );
  }
}

function Drawing({ point, draw, shapes }) {
  let className1 = "draggable";
  if (draw === true) {
    className1 = "static";
  }
  let style = {
    display: "block"
  }

  return (
    <svg className="drawing">
      {point.map((p, index) => (
        <circle key={index} cx={p.x} cy={p.y} r="4" stroke="green" strokeWidth="2" fill="yellow" />
      ))}
      {shapes.map((s, index) => (
        <Draggable key={index}>
          <rect style={style} className={className1} x={s[0].x} y={s[0].y} width={s[0].w} height={s[0].h} key={index} name={'poly' + index} strokeDasharray="10,10" fill="blue" stroke="black" fillOpacity="0.1"><title>Object {index + 1} </title></rect>
        </Draggable>
      ))}
    </svg>
  );

}


export default DrawArea;
