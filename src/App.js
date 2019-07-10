import React, { Component } from 'react';
import './App.css';
import Draggable from 'react-draggable';
import { Button, Badge } from 'react-bootstrap';
import { faArrowsAlt, faObjectUngroup, faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


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
      document.getElementById(str).innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye-slash" class="svg-inline--fa fa-eye-slash fa-w-20 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M320 400c-75.85 0-137.25-58.71-142.9-133.11L72.2 185.82c-13.79 17.3-26.48 35.59-36.72 55.59a32.35 32.35 0 0 0 0 29.19C89.71 376.41 197.07 448 320 448c26.91 0 52.87-4 77.89-10.46L346 397.39a144.13 144.13 0 0 1-26 2.61zm313.82 58.1l-110.55-85.44a331.25 331.25 0 0 0 81.25-102.07 32.35 32.35 0 0 0 0-29.19C550.29 135.59 442.93 64 320 64a308.15 308.15 0 0 0-147.32 37.7L45.46 3.37A16 16 0 0 0 23 6.18L3.37 31.45A16 16 0 0 0 6.18 53.9l588.36 454.73a16 16 0 0 0 22.46-2.81l19.64-25.27a16 16 0 0 0-2.82-22.45zm-183.72-142l-39.3-30.38A94.75 94.75 0 0 0 416 256a94.76 94.76 0 0 0-121.31-92.21A47.65 47.65 0 0 1 304 192a46.64 46.64 0 0 1-1.54 10l-73.61-56.89A142.31 142.31 0 0 1 320 112a143.92 143.92 0 0 1 144 144c0 21.63-5.29 41.79-13.9 60.11z"></path></svg>'
    } else {
      document.getElementsByName(str)[0].style.display = "block"
      document.getElementById(str).innerHTML = '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="eye" class="svg-inline--fa fa-eye fa-w-18 " role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M572.52 241.4C518.29 135.59 410.93 64 288 64S57.68 135.64 3.48 241.41a32.35 32.35 0 0 0 0 29.19C57.71 376.41 165.07 448 288 448s230.32-71.64 284.52-177.41a32.35 32.35 0 0 0 0-29.19zM288 400a144 144 0 1 1 144-144 143.93 143.93 0 0 1-144 144zm0-240a95.31 95.31 0 0 0-25.31 3.79 47.85 47.85 0 0 1-66.9 66.9A95.78 95.78 0 1 0 288 160z"></path></svg>'
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
            {this.state.shapes.map((s, index) => (<div className="obj" key={index}  ><Button className="btn-radius btn-no-border" variant="secondary" id={'poly' + index} onLoad={this.toggle} onClick={this.toggle}><FontAwesomeIcon icon={faEye} /></Button><Badge className=" badge-size" variant="secondary"  > Object - {index + 1}</Badge> </div>))}
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
  if (shapes.length !== 0) {

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

  } else {
    return (
      <svg className="drawing">

        {point.map((p, index) => (
          <circle key={index} cx={p.x} cy={p.y} r="4" stroke="green" strokeWidth="2" fill="yellow" />
        ))}
      </svg>
    );
  }
}


export default DrawArea;
