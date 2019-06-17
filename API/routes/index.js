var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// login is protected
router.get('/login', (req, res) =>
  res.render('login', {
    // name: req.user.name
  })
);

let data = [{
    id: 1,
    name: "Java House"
  },
  {
    id: 2,
    name: "Galitos"
  },
  {
    id: 3,
    name: "Chicken Inn"
  },
  {
    id: 3,
    name: "Pizza Inn"
  },
  {
    id: 3,
    name: "Steers"
  }, {
    id: 3,
    name: "Something Inn"
  }
];

// admin is protected
router.get('/admin', (req, res) =>
  res.render('admin', {
    data: data
  })
);

// documentation is protected
router.get('/documentation', (req, res) =>
  res.render('documentation', {
    // name: req.user.name
  })
);

// register is protected
router.get('/register', (req, res) =>
  res.render('register', {
    // name: req.user.name
  })
);

module.exports = router;