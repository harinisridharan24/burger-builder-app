import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxi/Aux';


const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        state = {
            error : null
        }

        componentWillMount () {
            this.reqInterceptors = axios.interceptors.request.use(req => {
                this.setState({ error : null });
                return req;
            });

            this.resInterceptors = axios.interceptors.response.use(res => res, error => {
                this.setState({ error : error });
                });
        }

        //this method is used for removing interceptors which will get occupied in the memory even when it is not used
        componentWillUnmount () {
            // console.log('Will Unmount', this.reqInterceptors, this.resInterceptors); to check the interceptors values
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        errorconfirmedHandler = () => {
            this.setState({ error : null});
        }

        render () {
            return (
                <Aux>
                    <Modal 
                    show = {this.state.error}
                    modalClosed = {this.errorconfirmedHandler} >
                        {this.state.error ? this.state.error.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}


export default withErrorHandler;