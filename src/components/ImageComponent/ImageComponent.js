import React, {Component} from 'react'

import styles from './ImageComponent.scss';
import config from '../../config';

class ImageComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            color_space: [], // un array de tres dimensiones donde vamos a almacenar todos los pixeles de la imagen usando su RGB como los 3 indices del array.
            image_data: null
        }

        this.readPixels = this.readPixels.bind(this);
    }

    componentDidUpdate(prevProps, prevState){
        if(prevProps.img != this.props.img){
            let ctx = document.getElementById('canvas').getContext('2d');
            let width = this.props.img.width;
            let height = this.props.img.height;
            let d_height = config.WIDTH_CANVAS * height / width; //calculamos el alto proporcional
            ctx.canvas.width = config.WIDTH_CANVAS;
            ctx.canvas.height = d_height;
            ctx.drawImage(this.props.img, 0, 0, width, height, 0, 0, config.WIDTH_CANVAS, d_height);
            let imageData = ctx.getImageData(0, 0, config.WIDTH_CANVAS, d_height);
            this.setState({
                image_data: Uint8ClampedArray.from(imageData.data)
            });            
        }
        if(prevState.image_data != this.state.image_data){
            this.readPixels();
        }
            
    }

    readPixels(){
        let array = [];
        let vector;
        this.state.image_data.map((e, index)=>{          
            //el imageData de un canvas contiene todos los pixeles consecutivamente en un array de una dimensión.
            //cada pixel ocupa 4 bytes (8 bits por cada canal), uno para R,G,B,Alpha respectivamente.
            if(index%4 == 0){ //el R
                vector = {R:0, G:0, B:0};
                vector.R = e;
            }
            else if(index%4 == 1){ //el G
                vector.G = e;
            }
            else if(index%4 == 2){ //el B
                vector.B = e;
                array.push(vector);
            }
        });
        
        console.log(array);
    }

    render(){
        return(
            <div>
                <canvas id="canvas" className={styles.canvas}></canvas>
                {this.state.image_data && this.state.image_data[0]}
            </div>
        )
    }
}

export default ImageComponent;