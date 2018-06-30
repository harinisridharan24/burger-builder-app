import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
// import {withRouter} from 'react-router-dom';

const burger = ( props ) => {
    console.log(props);
    let transformedIngredients = Object.keys(props.ingredients) // Object keys is also a Javascript method
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map(( _, i ) => {
                return <BurgerIngredient key = {igKey + i} type = {igKey} />      // igKey --> salad/cheese/meat/bacon and i --> how many salad/cheese/meat/bacon do we need like 1 or 3.
            });  // Array()--> JavaScript method....  Also length of the array is important
        } )
        .reduce((arr, el) => {
            return arr.concat(el); // It simply concats the new array(el) with original array (arr)
        }, [] );   // It takes function in that takes 2 arguements previous value(arr) and current value(el)

        if(transformedIngredients.length === 0) {
            transformedIngredients = <p> Please start adding Ingredients!!! </p>
        }

        console.log(transformedIngredients);

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type ='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type ='bread-bottom'/>
        </div>
    );
};

export default burger;

// export default withRouter(burger);    withRouter is used inorder to get match props loaded 