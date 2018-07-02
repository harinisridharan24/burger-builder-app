import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
    state = {
        orderForm : {
                name : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Your Name'
                    },
                    value : '',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                street : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Street'
                    },
                    value : '',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                zipCode : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'ZIP Code'
                    },
                    value : '',
                    validation : {
                        required : true,
                        minLength : 5,
                        maxLength : 5
                    },
                    valid : false,
                    touched : false
                },
                country : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'text',
                        placeholder : 'Country'
                    },
                    value : '',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                email : {
                    elementType : 'input',
                    elementConfig : {
                        type : 'email',
                        placeholder : 'Your E-mail'
                    },
                    value : '',
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                deliveryMethod : {
                    elementType : 'select',
                    elementConfig : {
                        options : [
                            {value : 'fastest', displayValue : 'Fastest'},
                            {value : 'cheapest', displayValue : 'Cheapest'}
                        ]
                    },
                    value : '',
                    validation : {},
                    valid : true
                }
        },
        formIsValid : false,
        loading : false
    }

    orderHandler = (event) => {
        event.preventDefault();  // inorder to prevent default which is to send the request. So it prevents from that happening
        this.setState({ loading : true });
        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
        }
        const order = {
            ingredients : this.props.ingredients,     
            price : this.props.price,                         //Note: For real app, will calculate the price in server
            orderData : formData
        }
        axios.post('/orders.json', order)
        .then(response => {
            this.setState({ loading : false });
            this.props.history.push('/'); //Go back to root page    
        })
        .catch(error => {
            this.setState({ loading : false });
        });
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm                // this will create a copy of orderform but not deep copy like elementType, elementConfig, etc...
        }
        //To create a full clone of orderform object
        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier]
        }
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        
        let formIsValid = true;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm : updatedOrderForm, formIsValid : formIsValid});
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        //Alternate method to dropdown list error (couldn't select other options)
        if (!rules) {
            return true;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if(rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if(rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    render () {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id : key, // key is name, street, email, etc
                config : this.state.orderForm[key] // config is elementtype, elementconfig, value
            });
        }
        let form = (
            <form onSubmit = {this.orderHandler}>
                {formElementsArray.map(formElement => (
                    <Input
                        key = {formElement.id} 
                        elementType = {formElement.config.elementType}
                        elementConfig = {formElement.config.elementConfig}
                        value = {formElement.config.value}
                        invalid = {!formElement.config.valid}
                        shouldValidate = {formElement.config.validation}
                        touched = {formElement.config.touched}
                        changed = {(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                <Button btnType = 'Success' disabled ={!this.state.formIsValid}> ORDER </Button>                
            </form>
        );
        if(this.state.loading){
            form = <Spinner />
        }
        return (
            <div className = {classes.ContactData}>
                <h4> Enter Your Contact Details </h4>
                {form}
            </div>
        );
    }

}


export default ContactData;