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
    this.state = {
      products: [], categories: [],
      errorObj: {
        showError: false, showErrorNmBlk: false,
        errorMsg: '', parentId: '', productId: ''
      }
    };
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
      .then(([products, categories]) => {
        this.setState({
          products,
          categories,
          errorObj: {
            showError: false, showErrorNmBlk: false,
            errorMsg: '', parentId: '', productId: ''
          }
        })
      })
  }

//on all the following: .catch.... showErrorXXX: true

  onProductChanges (prodObj) {
    prodObj.categoryId = (prodObj.categoryId !== '0') ? prodObj.categoryId : '';
    if (prodObj.name !== '') {
      axios.put(`/api/products/${ prodObj.id }`, prodObj)
        .then(() => Promise.all([
          this.fetchAll('/api/products'),
          this.fetchAll('/api/categories')
        ]))
        .then(([products, categories]) => this.setState({
          products, categories,
          errorObj: {
            showError: false, showErrorNmBlk: false,
            errorMsg: '', parentId: '', productId: ''
          }
        }))
        .catch((err) => {
          this.setState({
            errorObj: {
              showError: true, showErrorNmBlk: false,
              errorMsg: err.response.data.errors[0].message,
              parentId: 'list', productId: prodObj.id
            }
          })
        })
    } else {
      this.setState({
        errorObj: {
          showError: false, showErrorNmBlk: true,
          errorMsg: '', parentId: 'list', productId: prodObj.id
        }
      })
    }
  }

  onProductDelete (productId) {
    console.log('onProductDelete - ', productId);
  }

  onProductAdd (prodObj) {
    prodObj.categoryId = (prodObj.categoryId !== '0') ? prodObj.categoryId : '';
    if (prodObj.name !== '') {
      axios.post('/api/products', prodObj)
        .then(() => Promise.all([
          this.fetchAll('/api/products'),
          this.fetchAll('/api/categories')
        ]))
        .then(([products, categories]) => this.setState({
          products,
          categories,
          errorObj: {
            showError: false, showErrorNmBlk: false, errorMsg: '',
            parentId: '', productId: ''
          }
        }))
        .catch((err) => {
          this.setState({
            errorObj: {
              showError: true, showErrorNmBlk: false,
              errorMsg: err.response.data.errors[0].message,
              parentId: 'index', productId: ''
            }
          })
        })
    } else {
      this.setState({
        errorObj: {
          showError: false, showErrorNmBlk: true, errorMsg: '',
          parentId: 'index', productId: ''
        }
      })
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
            <ProductForm state={ this.state } onAdd={ this.onProductAdd } parentForm={ 'index' } />
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
