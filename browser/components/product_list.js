import React, { Component } from 'react';

export default class ProductList extends Component {
  constructor () {
    super();
    this.state = { productForm: [] }
  }

  render (){
    const products = this.props.state.products;
    const categories = this.props.state.categories;

    if (!products.length && !categories.length) return <div></div>;

    return (
      <div className="row">
        <div className="well colWidth175p col-md-2 backWhite marginLandR">
          <div><h5>Name:</h5></div>
          <div>{ products[0].name }</div>
          <div>Price</div>
          <div>{ products[0].price }</div>
          <div>inStock</div>
          <div>{ products[0].inStock }</div>
          <div>Category</div>
          <div>{ products[0].category.name }</div>
          <div><button className="btn btn-primary">Save</button></div>
          <div><button className="btn btn-danger">Delete</button></div>
        </div>

        <div className="well colWidth175p col-md-2 backWhite marginLandR">
          testing 1
        </div>
        <div className="well colWidth175p col-md-2 backWhite marginLandR">
          testing 2
        </div>
        <div className="well colWidth175p col-md-2 backWhite marginLandR">
          testing 3
        </div>
        <div className="well colWidth175p col-md-2 backWhite marginLandR">
          testing 4
        </div>
        <div className="well colWidth175p col-md-2 backWhite marginLandR">
          testing 5
        </div>
      </div>
    )
  }
}
