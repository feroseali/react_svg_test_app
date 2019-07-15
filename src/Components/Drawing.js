import React, { Component } from 'react';
import '../App.css'
import Draggable from 'react-draggable';

export default class Drawing extends Component {

    render() {
        let className1 = "draggable";
        if (this.props.draw === true) {
            className1 = "static";
        }
        let style = {
            display: "block"
        }
        return (

            <svg className="drawing">

                {this.props.point.map((p, index) => (
                    <circle key={index} cx={p.x} cy={p.y} r="4" stroke="green" strokeWidth="2" fill="yellow" />
                ))}
                {this.props.shapes.map((s, index) => (
                    <Draggable key={index}>
                        <rect style={style} className={className1} x={s[0].x} y={s[0].y} width={s[0].w} height={s[0].h} key={index} name={'poly' + index} strokeDasharray="10,10" fill="blue" stroke="black" fillOpacity="0.1">
                            <title>Object {index + 1} </title>
                        </rect>
                    </Draggable>

                ))}

            </svg>
        );
    }
}
