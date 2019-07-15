import React, { Component } from 'react';
import './App.css';
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { library, dom } from '@fortawesome/fontawesome-svg-core';

import Drawing from './Components/Drawing';
import ToolBar from './Components/ToolBar';
import SideBar from './Components/SideBar';
import Header from './Components/Header';


library.add(faEyeSlash, faEye)
dom.watch()

export default class DrawArea extends Component {
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
    } else {
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
    dom.watch()
    return (
      <div>

        <Header></Header>
        <div className="flex">
          <ToolBar draw={this.draw} drag={this.drag}></ToolBar>
          <div className={className} ref="drawArea" onMouseDown={this.handleMouseDown} onMouseUp={this.handleMouseUp} >
            <Drawing point={this.state.points} draw={this.state.isDrawing} shapes={this.state.shapes} />
          </div>
          <SideBar toggle={this.toggle} shapes={this.state.shapes}></SideBar>
        </div>

      </div>
    );
  }
}
