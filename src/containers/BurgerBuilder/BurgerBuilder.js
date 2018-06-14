import React, { Component } from 'react';
import Aux from '../../hoc/Auxi/Aux'; // <Aux> is a wrapping element instead of <div>
import Burger from '../../components/Burger/Burger'; 
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.7
};

class BurgerBuilder extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {...}
    // }

    state = {
        ingredients : null,
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading : false,
        error : false
    }

    componentDidMount () {
        axios.get('https://react-my-burger-application.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients : response.data});
            })
            .catch(error => {
                this.setState({ error : true });
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)    //keys here is how many salad do you need for the bacon (ie) salad : 3
        .map(igKey => {
            return ingredients[igKey];
        })
        .reduce((sum , el) => {
            return sum + el;                                  //el is the value of ingredients[igKey] 
        },0) ;
        this.setState({purchasable : sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngrdientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice : newPrice, ingredients : updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing : true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        //alert('You continue!');
        this.setState({ loading : true });
        const order = {
            ingredients : this.state.ingredients,     
            price : this.state.totalPrice,                           //Note: For real app, will calculate the price in server
            customer : {
                name : 'Harini Sridharan',
                address : {
                    street : 'Random Street',
                    zipCode : '1234',
                    country : 'United States'
                },
                email : 'random@random.com'
            },
            deliveryMethod : 'fastest'
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({ loading : false, purchasing : false });
        })
        .catch(error => {
            this.setState({ loading : false,  purchasing : false });
        });
    }


    render () {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0  //salad : true, meat : false, cheese : true, bacon : false
        }

        let orderSummary = null;

        let burger = this.state.error ? <p> Ingredients can be loaded!! </p> : <Spinner />;

        if(this.state.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients = {this.state.ingredients} />
                        <BuildControls 
                            ingredientAdded = {this.addIngredientHandler} 
                            ingredientRemoved = {this.removeIngrdientHandler}
                            disabled = {disabledInfo}
                            purchasable = {this.state.purchasable}
                            ordered = {this.purchaseHandler}
                            price = {this.state.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary 
                                ingredients={this.state.ingredients}
                                price={this.state.totalPrice}
                                purchaseCancelled={this.purchaseCancelHandler}
                                purchaseContinued={this.purchaseContinueHandler} />

        }
        if(this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }

}


export default withErrorHandler(BurgerBuilder, axios);