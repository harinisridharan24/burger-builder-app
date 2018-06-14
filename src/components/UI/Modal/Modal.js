import React, { Component } from 'react';
import classes from './Modal.css';
import Aux from '../../../hoc/Auxi/Aux';                                                   
import Backdrop from '../BackDrop/BackDrop'; 

class Modal extends Component {
    //The order summary keeps on rendering for each order hence the modal should include the above method in order to prevent re-rendering of order summary class
    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children; 
    }

    componentWillUpdate() {
        console.log("[Modal] Will Update");
    }

    render () {
        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed} />
                <div
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>
                    {this.props.children}
                </div>
            </Aux>

        );
    }
}

export default Modal;