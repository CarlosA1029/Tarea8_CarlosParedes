import React, {Component} from 'react'

import styles from './FileSelectorComponent.scss';

class FileSelectorComponent extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                Pick an image: <input type="file" name="image" accept="image/*" onChange={this.props.onChange}/>
            </div>
        )
    }
}

export default FileSelectorComponent;