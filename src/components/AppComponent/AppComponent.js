import React, {Component} from 'react'

import styles from './AppComponent.scss';


class AppComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div className={styles.main}>
            <h1>Image palette generator</h1>
            </div>
        )
    }
}

export default AppComponent;