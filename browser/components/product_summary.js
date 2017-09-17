import React, { Component } from 'react';

export default class ProductSummary extends Component {

  render (){
    const products = this.props.state.products;
    const categories = this.props.state.categories;

    if (!products.length && !categories.length) return <div></div>;

    const categoryZero = { id: 0, products: [] };
    products.forEach(product => {
      if (!product.categoryId) categoryZero.products.push('foundOne');
    })
    const listCategory = categories.concat(categoryZero);
    const productHighPrice = products.reduce((memo, product) => {
      if (product.price >= memo.price) return product;
      else return memo;
    }, { price: 0 });
    const productsNotStockedObjArr = products.filter(product => !product.inStock);
    const productsNotStocked = productsNotStockedObjArr.map(product => product.name).join(', ');

    return (
      <div className="panel panel-default">

        <div className="panel-heading">
          Product Summary
        </div>
        <div className="panel-body">

          <ul className="list-group">
            <li className="list-group-item">
                <h5>Categories:</h5>
                <ul className="liststyling tabtoright">
                {
                  listCategory.map(category => {
                    return (
                      category.id ?
                        <li key={ category.id }>{ category.name } has { category.products.length } products.</li> :
                        <li key={ category.id }>{ category.products.length } product(s) with no category.</li>
                    )
                  })
                }
              </ul>
            </li>
            <li className="list-group-item">There are { products.length } products.</li>
            <li className="list-group-item">
                The most expensive product is <strong>{ productHighPrice.name } </strong>
                at a price of $ <strong>{ productHighPrice.price } </strong>US dollars.
            </li>
            <li className="list-group-item">Products not in stock: <strong>{ productsNotStocked }</strong></li>
          </ul>

        </div>
      </div>
    )
  }
}
