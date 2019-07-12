const express    = require('express'),
      ejs        = require('ejs'),
      bodyParser = require('body-parser');

app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}));

app.get('/', function(req, res) {
  res.redirect('/cars');
});

let dataList = [
  {
    'name'    : 'Hector',
    'company' : 'MG',
    'type'    : 'SUV',
    'image'   : 'https://media.zigcdn.com/media/content/2019/Apr/mg-hector-0001_720x540.jpg'
  },
  {
    'name'    : 'Huracan',
    'company' : 'Lamborghini',
    'type'    : 'SEDAN',
    'image'   : 'https://photos7.motorcar.com/new-2019-lamborghini-huracan-performantespyder-8868-18368147-9-1024.jpg'
  }
];

app.get('/cars', function(req, res) {
  res.render('cars', {'carsdata' : dataList});
});

app.get('/addcar', function(req, res) {
  res.render('add');
});

app.post('/addcar', function(req, res) {
  // console.log(req.body);
  dataList.push(req.body);
  res.redirect('/cars');
});

let port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log(`Server Running in Port : ${port}`);
});
