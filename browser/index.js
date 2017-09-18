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
    this.state = { products: [], categories: [], showErrorNmUnique: false, showErrorNmBlk: false };
    this.fetchAll = this.fetchAll.bind(this);
    this.onProductAdd = this.onProductAdd.bind(this);
    this.onProductChanges = this.onProductChanges.bind(this);
    this.onProductDelete = this.onProductDelete.bind(this);
  }

  fetchAll (route) {
    return axios.get(route)
      .then(res => res.data)
  }

  componentDidMount () {
    Promise.all([
      this.fetchAll('/api/products'),
      this.fetchAll('/api/categories')
    ])
      .then(([products, categories]) => this.setState({ products, categories, showErrorNmUnique: false, showErrorNmBlk: false }))
  }

//on all the following: .catch.... showErrorXXX: true

  onProductChanges (prodObj) {
    console.log('onProductChange - ', prodObj);
  }

  onProductDelete (productId) {
    console.log('onProductDelete - ', productId);
  }

  onProductAdd (prodObj) {
    prodObj.categoryId = (prodObj.categoryId !== '0') ? prodObj.categoryId : null;
    this.setState({ showErrorNmUnique: false, showErrorNmBlk: false });
    if (prodObj.name !== '') {
      axios.post('/api/products', prodObj)
        .then(() => Promise.all([
          this.fetchAll('/api/products'),
          this.fetchAll('/api/categories')
        ]))
        .then(([products, categories]) => this.setState({ products, categories, showErrorNmUnique: false, showErrorNmBlk: false }))
        .catch(() => this.setState({ showErrorNmUnique: true }))
    } else {
      this.setState({ showErrorNmBlk: true })
    }
  }

  render () {
    return (
      <Router>
        <div className="container-fluid">
          <h2>Acme Products/Categories React</h2>
          <div className="col-md-6">
            <ProductList state={ this.state } onChanges={ this.onProductChanges } onDelete={ this.onProductDelete } />
          </div>
          <div className="col-md-3">
            <ProductForm state={ this.state } onAdd={ this.onProductAdd } />
          </div>
          <div className="col-md-3">
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
