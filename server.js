const express = require( 'express' );
const app = express();
const path = require( 'path' );
const bodyParser = require( 'body-parser' );
const morgan = require( 'morgan' );

app.use('/css', express.static(path.join(__dirname, 'css')));
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/vendor/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap')));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`listening on port ${ port }`));

//------------------------

const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_sql');

const Product = conn.define('product', {
  name: {
    type: conn.Sequelize.STRING,
    unique: true
  },
  price: {
    type: conn.Sequelize.FLOAT,
    defaultValue: 0,
    validate: {
      min: 0
    }
  },
  inStock: {
    type: conn.Sequelize.BOOLEAN,
    defaultValue: true
  }
}, {
  hooks: {
    beforeValidate: function(product){
      if (product.categoryId === ''){
        product.categoryId = null;
      }
    }
  }
});

const Category = conn.define('category', {
  name: conn.Sequelize.STRING
});

Product.belongsTo(Category);
Category.hasMany(Product);


conn.sync({ force: true })
  .then(()=> {
    return Promise.all([
      Product.create({ name: 'Gibson', price: 2500 }),
      Product.create({ name: 'Redgate', price: 20000 }),
      Product.create({ name: 'Baldwin', inStock: false }),
      Product.create({ name: 'Korg', inStock: false }),
      Category.create({ name: 'Guitars' }),
      Category.create({ name: 'Pianos' }),
      Category.create({ name: 'Amplifiers' })
    ])
    .then(([gibson, redgate, baldwin,  korg, guitars, pianos]) => {
      return Promise.all([
        guitars.addProducts([ gibson, redgate ]),
        pianos.addProduct([baldwin, korg])
      ]);
    });
  })

//------------------------

app.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.get('/api/products', (req, res, next) => {
  Product.findAll({
    order: ['id'],
    include: Category
  })
  .then( products => res.send(products))
  .catch(next);
});

app.get('/api/categories', (req, res, next) => {
  Category.findAll({
    order: ['id'],
    include: Product
  })
  .then( categories => res.send(categories))
  .catch(next);
});

app.put('/api/products/:id', (req, res, next) => {
  Product.findById(req.params.id)
    .then( product => {
      if (!req.body.categoryId){
        req.body.categoryId = null;
      }
      Object.assign(product, req.body);
      return product.save();
    })
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.post('/api/products/', (req, res, next) => {
  Product.create(req.body)
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.delete('/api/products/:id', (req, res, next) => {
  Product.destroy({ where: { id: req.params.id }})
    .then(() => res.sendStatus(204))
    .catch(next);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).send(err);

});
