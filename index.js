const express    = require('express'),
      ejs        = require('ejs'),
      bodyParser = require('body-parser'),
      mongoose   = require('mongoose');

app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));

mongoose.connect('mongodb://127.0.0.1/cars');

let Schema = mongoose.Schema;

var CarSchema = new Schema({
  name    : String,
  company : String,
  type    : String,
  image   : String
});

var cars_collection = mongoose.model('cars_collection', CarSchema);

app.get('/', function(req, res) {
  res.redirect('/cars');
});

// let dataList = [
//   {
//     'name'    : 'Hector',
//     'company' : 'MG',
//     'type'    : 'SUV',
//     'image'   : 'https://media.zigcdn.com/media/content/2019/Apr/mg-hector-0001_720x540.jpg'
//   },
//   {
//     'name'    : 'Huracan',
//     'company' : 'Lamborghini',
//     'type'    : 'SEDAN',
//     'image'   : 'https://photos7.motorcar.com/new-2019-lamborghini-huracan-performantespyder-8868-18368147-9-1024.jpg'
//   }
// ];

app.get('/cars', function(req, res) {
  cars_collection.find({}, function(err, quer) {
    if (err) {
      console.log("Error on find");
      console.log(err);
    }else {
      res.render('cars', {'carsdata' : quer});
    }
  })
});

app.get('/addcar', function(req, res) {
  res.render('add');
});

app.post('/addcar', function(req, res) {
  // console.log(req.body);
  // dataList.push(req.body);
  cars_collection.create(req.body, function(err, query) {
    if (err) {
      console.log("Error on data entry");
      console.log(err);
    }else {
      res.redirect('/cars');
    }
  })
});

let port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log(`Server Running in Port : ${port}`);
});
