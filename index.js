/**************************
 *        env vars        *
 **************************/
const PORT = process.env.port || 5000;
const MONGODB_URI = process.env.MONGODB_URI;


/***************************************
 *        express configuration        *
 ***************************************/
const express = require('express');
const app = express();

app
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req,res,next) => {
    if (req.body) {
      console.log(req.method + " " + req.url + " " + JSON.stringify(req.body));
    }
    else {
      console.log(req.method + ' ' + req.url);
    }
    next();
  })


/****************************************
 *        mongoose configuration        *
 ****************************************/
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
};

mongoose.connect(MONGODB_URI, mongooseOptions);
mongoose.connection
  .once('open', () => console.log('Connected to database'))
  .on('error', (err) => console.error(err));

const Schema = mongoose.Schema;
const Users = mongoose.model(
  'Users',
  new Schema( {name: String, age: Number}, { collection: 'users'})
);

/**************************
 *        REST API        *
 **************************/
app

.get('/', (req, res) => {
  res.status(200).send('Bravo ! You made it to the front page');
})


.get('/api/users', (req, res) => {
  Users
    .find()
    .then((data) => {
      res.status(200).send(data);
    })
    .catch(err => console.error(err));
})

.get('/api/users/:id', (req, res) => {
  let filter = {_id : req.params.id};

  Users
    .findOne(filter)
    .then((data) => res.status(200).send(data))
    .catch(err => console.error(err));
})

.post('/api/users', (req, res) => {
  let a = new Users(req.body);

  a
    .save()
    .then(() => res.status(200).end())
    .catch(err => console.error(err));
})

.put('/api/users/:id', (req, res) => {
  let filter = {_id : req.params.id};
  let update = req.body;

  Users
    .findOneAndUpdate(filter, update)
    .then(() => res.status(200).end())
    .catch(err => console.error(err));
})

.delete('/api/users/:id', (req, res) => {
  let filter = {_id : req.params.id};

  Users
    .findOneAndDelete(filter)
    .then(() => res.status(200).end())
    .catch(err => console.error(err));
})

.use((req, res) => {
  res.status(404).end('404 Error: Page not found');
})

.use((req, res) => {
  res.status(500).end('500 Error: Server error');
});

module.exports = app.listen(PORT, () => {
  console.log("Listening on port "+PORT);
})