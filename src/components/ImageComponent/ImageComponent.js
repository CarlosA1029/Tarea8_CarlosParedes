import React, {Component} from 'react'

import styles from './ImageComponent.scss';
import config from '../../config';

class ImageComponent extends Component{
    constructor(props){
        super(props);
    }

    componentDidUpdate(){
        let ctx = document.getElementById('canvas').getContext('2d');
        let width = this.props.img.width;
        let height = this.props.img.height;
        let d_height = config.WIDTH_CANVAS * height / width; //calculamos el alto proporcional
        ctx.canvas.width = config.WIDTH_CANVAS;
        ctx.canvas.height = d_height;
        ctx.drawImage(this.props.img, 0, 0, width, height, 0, 0, config.WIDTH_CANVAS, d_height);
    }

    render(){
        return(
            <div>
                <canvas id="canvas" className={styles.canvas}></canvas>
            </div>
        )
    }
}

export default ImageComponent;