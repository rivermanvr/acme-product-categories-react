import React, { Component } from 'react';

export default class ProductForm extends Component {
  constructor () {
    super();
    this.state = {
      id: '',
      name: '',
      price: '',
      inStock: false,
      categoryId: '0'
    }

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangePrice = this.onChangePrice.bind(this);
    this.onChangeInStock = this.onChangeInStock.bind(this);
    this.onChangeCategory = this.onChangeCategory.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  resetState (parentForm) {
    if (parentForm === 'index') {
      this.setState({
        id: '',
        name: '',
        price: '',
        inStock: false,
        categoryId: '0'
      })
    } else {
      const product = this.props.product;
      if (!product.categoryId) product.categoryId = '0';
      this.setState({
        id: product.id,
        name: product.name,
        price: product.price,
        inStock: product.inStock,
        categoryId: product.categoryId
      })
    }
  }

  componentDidMount () {
    const appState = this.props.state.errorObj;
    if (!appState.showErrorNmBlk && !appState.showError) {
      this.resetState(this.props.parentForm);
    }
  }

  componentWillReceiveProps (nextProps) {
    const currentProps = this.props;
    //error handling props (current & next)
    const showErrorNmBlkCurr = currentProps.state.errorObj.showErrorNmBlk;
    const showErrorNmBlkNext = nextProps.state.errorObj.showErrorNmBlk;
    const showErrorCurr = currentProps.state.errorObj.showError;
    const showErrorNext = nextProps.state.errorObj.showError;
    //-----  ------ ------ ------

    if (showErrorNmBlkNext !== showErrorNmBlkCurr && showErrorNmBlkNext === false && showErrorNext === false) this.resetState(this.props.parentForm);
    else if (nextProps.state.products.length !== currentProps.state.products.length) this.resetState(this.props.parentForm);
  }

  handleSubmit (event) {
    event.preventDefault();
    const newProduct = this.state;
    newProduct.price = newProduct.price * 1;
    if (this.props.parentForm === 'index') {
      this.props.onAdd(newProduct);
    } else if (this.props.parentForm === 'list') {
      this.props.onChanges(newProduct);
    }
  }

  onChangeName (event) {
    this.setState({ name: event.target.value });
  }

  onChangePrice (event) {
    this.setState({ price: event.target.value });
  }

  onChangeInStock (event) {
    this.setState({ inStock: event.target.checked });
  }

  onChangeCategory (event) {
    this.setState({ categoryId: event.target.value });
  }

  render (){
    const categories = this.props.state.categories;
    const none = [{ id: '0', name: '--none--' }];
    const categoriesSelect = none.concat(categories);
    const product = this.state;
    const optionSelected = product.categoryId;

    if (!categories.length) return <div></div>;

    //error handling assorted errors:

    const errorObj = this.props.state.errorObj;
    const showError = errorObj.showError;
    const showErrorNmBlk = errorObj.showErrorNmBlk;
    const errorMsg = errorObj.errorMsg;
    const productId = errorObj.productId;
    const parentId = errorObj.parentId;

    const showErrorTrue = showError && this.props.parentForm === parentId && product.id === productId;
    const showErrorNmBlkTrue = showErrorNmBlk && this.props.parentForm === parentId && product.id === productId;

    const errorStyle = showErrorTrue ? 'panel-body center bg-danger show' : 'panel-body center bg-danger hidden';
    const errorStyleNmBlk = showErrorNmBlkTrue ? 'panel-body center bg-danger show' : 'panel-body center bg-danger hidden';

    //create some JSX for add a product component or for the product_list component

    let variableJSXHead, variableJSXButton, variableJSXButton2;
    if (this.props.parentForm === 'index') {
      variableJSXHead = (<div className="panel-heading">Add a Product</div>);
      variableJSXButton = (<button className="btn btn-primary margintop" type="submit">Add Product</button>);
    } else if (this.props.parentForm === 'list') {
      variableJSXButton = (<button className="btn btn-primary margintop colWidth150p" type="submit">Save</button>);
      variableJSXButton2 = (<button className="btn btn-danger margintop colWidth150p" type="submit">Delete</button>);
    }
    
    return (
      <div className="panel panel-default">
        { variableJSXHead }
        <div className={ errorStyle }>
            <strong>{ errorMsg }</strong>
        </div>
        <div className={ errorStyleNmBlk }>
            <strong>Name cannot be blank</strong>
        </div>
        <div className="panel-body">
          <form onSubmit={ this.handleSubmit }>
            <label htmlFor="name">Name</label>
            <input
              onChange={ this.onChangeName }
              className="form-control"
              value={ this.state.name }
              type="text"
            />
            <label htmlFor="name" className="margintopsm">Price</label>
            <input
              onChange={ this.onChangePrice }
              className="form-control"
              value={ this.state.price }
              type="text"
            />
            <label htmlFor="name" className="margintopsm">inStock</label>
            <input
              onChange={ this.onChangeInStock }
              className="form-control"
              type="checkbox"
              checked={ this.state.inStock }
            />
            <label htmlFor="name" className="margintopsm">Category</label>
            <select
              onChange={ this.onChangeCategory }
              className="form-control"
              type="text"
              value={ optionSelected }
            >
              {
                categoriesSelect.map(category => {
                  return <option key={ category.id } value={ category.id }>{ category.name }</option>
                })
              }
            </select>
            { variableJSXButton }
          </form>
          { variableJSXButton2 }
        </div>
      </div>
    )
  }
}
