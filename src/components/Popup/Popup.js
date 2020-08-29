import React, { Component } from 'react';
import './Popup.css';
import Backdrop from '../Backdrop/Backdrop';

class popup extends Component{
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children;
    }
    render(){
        return(
            <React.Fragment>
                <Backdrop show={this.props.show} close={this.props.close}/>
                <div 
                className="Popup"
                style={{
                    transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.show ? '1' : '0'
                }}
                >
                <h2>{this.props.title}</h2><br/>
                <div className="text">
                {this.props.text}
                </div><br/>
                <a className="link" href={this.props.link}>See Full Post Here</a>
            </div>
            </React.Fragment>   
        );
    }
} 

export default React.memo(popup);
