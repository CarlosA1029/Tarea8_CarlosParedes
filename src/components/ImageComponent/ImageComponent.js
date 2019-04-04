import React, {Component} from 'react'

import styles from './ImageComponent.scss';
import config from '../../config';

//define un cubo en el espacio RGB
class Bucket{
    constructor(ri,rf,gi,gf,bi,bf){
        this.Ri = ri;
        this.Rf = rf;
        this.Gi = gi;
        this.Gf = gf;
        this.Bi = bi;
        this.Bf = bf;
        this.pixels = [];
    }
}


class ImageComponent extends Component{
    


    constructor(props){
        super(props);

        this.state = {
            colors: [], 
            image_data: null
        }

        this.readPixels = this.readPixels.bind(this);
        this.getMostPopulated = this.getMostPopulated.bind(this);
        this.calculateAverageColors = this.calculateAverageColors.bind(this);
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
            let histogram_buckets = [];

            for(let r=0; r<config.GRID_SIZE;r++){
                histogram_buckets[r] = [];
                for(let g=0; g<config.GRID_SIZE;g++){
                    histogram_buckets[r][g] = [];
                    for(let b=0; b<config.GRID_SIZE;b++){
                        let bucket = new Bucket(r*config.STEP_SIZE, (r+1)*config.STEP_SIZE-1, 
                                            g*config.STEP_SIZE, (g+1)*config.STEP_SIZE-1,
                                            b*config.STEP_SIZE, (b+1)*config.STEP_SIZE);
                        histogram_buckets[r][g][b] = bucket;
                    }
                }
            }

            //aqui metemos todos los pixeles en sus correspondientes buckets
            this.readPixels(histogram_buckets);
            let most_populated = this.getMostPopulated(histogram_buckets);
            let average_colors = this.calculateAverageColors(histogram_buckets, most_populated);
            this.setState({
                colors: average_colors
            });               
        }            
    }

    readPixels(histogram_buckets){
        let vector;
        let step_size = config.STEP_SIZE;
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
                //console.log(Math.floor(vector.R/step_size)+" "+Math.floor(vector.G/step_size)+" "+Math.floor(vector.B/step_size));
                histogram_buckets[Math.floor(vector.G/step_size)][Math.floor(vector.B/step_size)][Math.floor(vector.R/step_size)].pixels.push(vector);
            }
        });
        
    }

    //devuelve un array con los 10 buckets más poblados de puntos de coordenadas r,g,b
    getMostPopulated(histogram_buckets){
        let array_most = [];
        for(let r=0; r<config.GRID_SIZE;r++){
            for(let g=0; g<config.GRID_SIZE;g++){                
                for(let b=0; b<config.GRID_SIZE;b++){
                   array_most.push({r,g,b,size: histogram_buckets[r][g][b].pixels.length});
                }
            }
        }
        array_most.sort((a,b)=>{
            if(a.size > b.size)
                return -1;
            else if (a.size < b.size)
                return 1;
            else
                return 0;
        })
        return array_most.slice(0,10);
    }

    calculateAverageColors(histogram_buckets, array_most){
        let colors = [];
        array_most.map((e=>{
            let average_r = 0;
            let average_g = 0;
            let average_b = 0;
            for(let i=0;i<e.size; i++){
                average_r+=histogram_buckets[e.r][e.g][e.b].pixels[i].R;
                average_g+=histogram_buckets[e.r][e.g][e.b].pixels[i].G;
                average_b+=histogram_buckets[e.r][e.g][e.b].pixels[i].B;
            }
            let average_color = { r: Math.floor(average_r/e.size), g: Math.floor(average_g/e.size), b: Math.floor(average_b/e.size)} ;
            colors.push(average_color);
        }));
        return colors;
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