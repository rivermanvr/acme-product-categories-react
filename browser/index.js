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
    this.fetchAll('/api/products')
      .then(products => this.setState({ products }))
      .then(() => this.fetchAll('/api/categories'))
      .then(categories => this.setState({ categories, showErrorNmUnique: false, showErrorNmBlk: false }))
  }

  componentWillReceiveProps (nextProps) {
    // const currentProps = this.props;
    // const productsCurr = currentProps.state.products;
    // const productsNext = nextProps.state.products;

    // if (productsNext.length !== productsCurr.length) this.resetState();
    
    //-----  ------ ------ ------
    console.log(currentProps, '<---current props - index')
    console.log('next props - index: ', nextProps);
    //-----  ------ ------ ------
  }

//on all the following: .catch.... showErrorXXX: true

  onProductChanges (prodObj) {
    console.log('onProductChange - ', prodObj);
  }

  onProductDelete (productId) {
    console.log('onProductDelete - ', productId);
  }

  onProductAdd (prodObj) {
    console.log(prodObj)
    prodObj.categoryId = (prodObj.categoryId !== '0') ? prodObj.categoryId : null;
    this.setState({ showErrorNmUnique: false, showErrorNmBlk: false });
    if (prodObj.name !== '') {
      axios.post('/api/products', prodObj)
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
