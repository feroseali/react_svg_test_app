import React, { Component } from 'react';
import '../App.css'
import { Button } from 'react-bootstrap';
import { faArrowsAlt, faObjectUngroup } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class ToolBar extends Component {

    render() {
        return (
            <div className="tool-div">
                <h5 className="h5-title">Tools</h5>
                <Button className="tool" variant="outline-light" onClick={this.props.drag} title="Drag"><FontAwesomeIcon icon={faArrowsAlt} /></Button>
                <Button variant="outline-light" onClick={this.props.draw} title="Select"><FontAwesomeIcon icon={faObjectUngroup} /></Button>
            </div>
        )
    }
}