import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import ProductList from './components/product_list';
import ProductForm from './components/product_form';
import ProductSummary from './components/product_summary';

class AppContainer extends Component {
  constructor () {
    super();
    this.state = { products: [], categories: [] };

    this.fetchAll = this.fetchAll.bind(this);
  }

  fetchAll (route) {
    return axios.get(route)
      .then(res => res.data)
  }

  componentDidMount () {
    this.fetchAll('/api/products')
      .then(products => this.setState({ products }))
      .then(() => this.fetchAll('/api/categories'))
      .then(categories => this.setState({ categories }))
  }

  render () {
    return (
      <Router>
        <div className="container-fluid">
          <h2>Acme Products/Categories React</h2>
          <div className="col-xs-7">
            <ProductList />
          </div>
          <div className="col-xs-2">
            <ProductForm />
          </div>
          <div className="col-xs-3">
            <ProductSummary state={ this.state } />
          </div>
        </div>
      </Router>
    )
  }
}

ReactDOM.render(
  <AppContainer />,
  document.getElementById('root')
);
