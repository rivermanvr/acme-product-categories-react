import React from 'react';
import ProductForm from './product_form';

export default (props) =>  {
    const state = props.state
    const products = state.products;
    const categories = state.categories;

    if (!products.length && !categories.length) return <div></div>;

    return (
      <div className="row">
        {
          products.map(product => {
            return (
              <div className="col-md-4" key={ product.id }>
                <ProductForm state={ state } product={ product } onChanges={ props.onChanges } onDelete={ props.onDelete } parentForm={ 'list' } />
              </div>
            )
          })
        }
      </div>
    )
  }
