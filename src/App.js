import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';

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
          {/* {this.state.show ? <BurgerBuilder /> : null } */}
          <BurgerBuilder />
        </Layout>
      </div>
    );
  }
}

export default App;
