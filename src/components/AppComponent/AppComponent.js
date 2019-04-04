import React, {Component} from 'react'

import styles from './AppComponent.scss';
import FileSelectorComponent from '../FileSelectorComponent/FileSelectorComponent';
import ImageComponent from '../ImageComponent/ImageComponent';



class AppComponent extends Component{
    constructor(props){
        super(props);

        this.state = {
            image: null,            
        }

        this.handleFileOnChange = this.handleFileOnChange.bind(this);
    }

    handleFileOnChange(e){
        let img = new Image();
        img.src = URL.createObjectURL(e.target.files[0]); // seleccionamos el primero del array de ficheros seleccionados
        img.onload = ()=>{
            this.setState({
                image: img
            });
        };
    }

    render(){
        return(
            <div className={"d-flex flex-column align-items-center "+styles.main}>
            <h1>Image palette generator</h1>
            <FileSelectorComponent onChange={this.handleFileOnChange}/>
            <ImageComponent img={this.state.image}/>
            
           
            </div>
        )
    }
}

export default AppComponent;