import React, { Component } from 'react';
import '../App.css'
import { Button, Badge } from 'react-bootstrap';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default class SideBar extends Component {

    render() {
        return (
            <div className="sidebar">
                <h5 className="h5-title"> Objects</h5>
                {this.props.shapes.map((s, index) => (
                    <div className="obj" key={index} id={index}>
                        <Button className="btn-radius btn-no-border" variant="secondary" id={'poly' + index} onClick={this.props.toggle}>
                            <FontAwesomeIcon icon={faEye} />
                        </Button>
                        <Badge className=" badge-size" variant="secondary" > Object - {index + 1}</Badge>
                    </div>))}
            </div>
        )
    }
}