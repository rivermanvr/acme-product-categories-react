import React, { Component } from 'react';

export default class ProductForm extends Component {
  constructor () {
    super();
    this.state = {
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

  resetState () {
    this.setState({
      name: '',
      price: '',
      inStock: false,
      categoryId: '0'
    })
  }

  componentDidMount () {
    const appState = this.props.state;
    if (!appState.showErrorNmBlk && !appState.showErrorNmUnique) {
      this.resetState();
    }
  }

  componentWillReceiveProps (nextProps) {
    const currentProps = this.props;
    //error handling props (current & next)
    const showErrorNmBlkCurr = currentProps.state.showErrorNmBlk;
    const showErrorNmBlkNext = nextProps.state.showErrorNmBlk;
    const showErrorNmUniqueCurr = currentProps.state.showErrorNmUnique;
    const showErrorNmUniqueNext = nextProps.state.showErrorNmUnique;
    //-----  ------ ------ ------
    if (showErrorNmBlkNext !== showErrorNmBlkCurr && showErrorNmBlkNext === false) this.resetState();
    else if (showErrorNmUniqueNext !== showErrorNmUniqueCurr && showErrorNmUniqueNext === false) this.resetState();
    else if (nextProps.state.products.length !== currentProps.state.products.length) this.resetState();
  }

  handleSubmit (event) {
    event.preventDefault();
    const newProduct = this.state;
    newProduct.price = newProduct.price * 1;
    this.props.onAdd(newProduct)
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
    const categoryId = (event.target.value) ? event.target.value : null;
    this.setState({ categoryId });
  }

  render (){
    const categories = this.props.state.categories;
    const none = [{ id: 0, name: '--none--' }];
    const categoriesSelect = none.concat(categories);

    //error handling:

    const showErrorNmUnique = this.props.state.showErrorNmUnique;
    const showErrorNmBlk = this.props.state.showErrorNmBlk;
    const errorStyleNmUnique = showErrorNmUnique ? 'panel-body center bg-danger show' : 'panel-body center bg-danger hidden';
    const errorStyleNmBlk = showErrorNmBlk ? 'panel-body center bg-danger show' : 'panel-body center bg-danger hidden';
  
    if (!categories.length) return <div></div>;
    
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Add a Product
        </div>
        <div className={ errorStyleNmUnique }>
            <strong>Name must be unique</strong>
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
            >
              {
                categoriesSelect.map(category => {
                  return <option key={ category.id } value={ category.id }>{ category.name }</option>
                })  
              }
            </select>
            <button className="btn btn-primary margintop" type="submit">Add Product</button>
          </form>
        </div>
      </div>
    )
  }
}
