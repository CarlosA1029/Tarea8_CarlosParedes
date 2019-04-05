import React, {Component} from 'react'

import styles from './ColorComponent.scss';

class ColorComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={styles.color} style={{backgroundColor: `rgb(${this.props.r}, ${this.props.g}, ${this.props.b})`}}>
            R: {this.props.r}, G: {this.props.g}, B: {this.props.b}, {this.props.percentage}    
            </div>
        )
    }
}

export default ColorComponent;