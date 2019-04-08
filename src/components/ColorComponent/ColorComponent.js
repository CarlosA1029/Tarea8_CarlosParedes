import React, {Component} from 'react'

import styles from './ColorComponent.scss';

class ColorComponent extends Component{
    constructor(props){
        super(props);
        this.rgb2hex = this.rgb2hex.bind(this);
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    componentDidMount(){
        $("#color"+this.props.index).popover({content: `R: ${this.props.r}, G: ${this.props.g}, B: ${this.props.b} (${this.props.percentage}%)`, trigger: "hover", placement:"bottom"});
    }

    rgb2hex(r,g,b){
        return "#" +
         ("0" + parseInt(r,10).toString(16)).slice(-2) +
         ("0" + parseInt(g,10).toString(16)).slice(-2) +
         ("0" + parseInt(b,10).toString(16)).slice(-2);
    }

    handleOnClick(e){
        $('.toast').toast("show");
        var range = document.createRange();
        range.selectNode(document.getElementById(e.target.id));
        window.getSelection().removeAllRanges(); 
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
    }

    render(){
        return(
            <div id={"color"+this.props.index} className={styles.color} style={{backgroundColor: `rgb(${this.props.r}, ${this.props.g}, ${this.props.b})`}}
             onClick={this.handleOnClick}>
            {this.rgb2hex(this.props.r,this.props.g,this.props.b)}
            </div>
        )
    }
}

export default ColorComponent;

