import React, { Component } from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
    state = {
        orders : [],
        loading : true
    }
    //This method is loaded only when there is orders   inorder to fetch data
    componentDidMount () {
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for(let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id : key
                    });  // here key is the ID created by firebase DB
                }
                this.setState({ loading : false, orders : fetchedOrders });
            })
            .catch(err => {
                this.setState({ loading : false });
            });
    }
    render () {
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order key = {order.id}
                    ingredients = {order.ingredients}
                    price = {order.price} />         //price = +{order.price} is a trick to convert string to number
                ))}
            </div>
        );
    }

}


export default withErrorHandler(Orders, axios);