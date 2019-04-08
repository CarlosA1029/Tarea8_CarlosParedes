import React, {Component} from 'react';

import styles from './ImageComponent.scss';
import config from '../../config';
import ColorComponent from '../ColorComponent/ColorComponent';



class ImageComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            colors: [], 
            image_data: null,
            width: 0,
            height: 0,
            total_pixels: 0,
        }
        this.onMessage = this.onMessage.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps.loading==false && this.props.loading==true){
            let ctx = document.getElementById('canvas').getContext('2d');
            let width = this.props.img.width;
            let height = this.props.img.height;
            let d_height = config.WIDTH_CANVAS * height / width; //calculamos el alto proporcional
            ctx.canvas.width = config.WIDTH_CANVAS;
            ctx.canvas.height = d_height;
            ctx.drawImage(this.props.img, 0, 0, width, height, 0, 0, config.WIDTH_CANVAS, d_height);
            let imageData = ctx.getImageData(0, 0, config.WIDTH_CANVAS, d_height);
            this.setState({
                width: config.WIDTH_CANVAS,
                height: d_height,
                total_pixels: config.WIDTH_CANVAS*d_height
            });
            let worker = new Worker('worker.js');
            worker.onmessage = this.onMessage;
            worker.postMessage({image_data:imageData, total_pixels: config.WIDTH_CANVAS*d_height});
        }
    }

    onMessage(e){
        this.setState({
            colors: e.data
        }, this.props.onEnd());
    }

    render(){
        return(
            <div className={styles.container}>
                <canvas id="canvas" className={styles.canvas}></canvas>
                {      
                    <div className= {styles.palette}>
                    {
                        this.state.colors && this.state.colors.map((e,index)=>(
                            <ColorComponent index={index} key={index} r={e.r} g={e.g} b={e.b} percentage={e.percentage}/>
                        ))
                    }
                    </div>           
                }               
            </div>
        )
    }
}

export default ImageComponent;