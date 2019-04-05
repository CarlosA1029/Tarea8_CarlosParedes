import React, {Component} from 'react'

import styles from './LoadingComponent.scss';



class LoadingComponent extends Component{
    constructor(props){
        super(props);
       
    }


    render(){
        return(
            <div>
            {this.props.loading && "cargando"}         
            </div>
        )
    }
}

export default LoadingComponent;