import React from 'react';

import {ProgressBar} from 'react-bootstrap';

function RatingBar(props){
    
    const {label, value, color} = props;
    
    return (
        <ProgressBar className="rating-bar" label={label + ': ' + value} striped now={value} bsStyle={color} />    
    )
    
}

export function AttackBar(props){
    return <RatingBar label="ATK" value={props.value} color="warning" />
}

export function DefenseBar(props){
    return <RatingBar label="DEF" value={props.value} color="default" />
}

export function SpiritBar(props){
    return <RatingBar label="SPR" value={props.value} color="info" />
}

export function BarrierBar(props){
    return <RatingBar label="BAR" value={props.value} color="danger" />
}

export function SpeedBar(props){
    return <RatingBar label="SPD" value={props.value} color="success" />
}