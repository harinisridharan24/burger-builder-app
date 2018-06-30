import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  //The commented section below is used inorder to check the componentdidunmount() in withErrorHandler.js file
  // state = {
  //   show : true
  // };

  // This method is used for unsetting the show value (i.e) making the show value to false
  // componentDidMount () {
  //   setTimeout(() => {
  //     this.setState({ show : false });
  //   }, 5000);
  // }

  render() {
    return (
      <div>
        <Layout>
          {/* {this.state.show ? <BurgerBuilder /> : null } 
            The path with a '/' will loaded first always. It is kind of root
            For checkout both burger builder and checkout will be loaded*/}
          <Switch>
            <Route path = "/checkout" component = {Checkout} />
            <Route path = "/orders" component = {Orders} />
            <Route path = "/" exact component = {BurgerBuilder} />       {/*Note: The Route tag is a self closing tag only. With exact order doesn't matter*/}
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
