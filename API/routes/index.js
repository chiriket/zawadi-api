var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


// home is protected
router.get('/home', (req, res) =>
  res.render('home', {
    // name: req.user.name
  })
);

// login is protected
router.get('/login', (req, res) =>
  res.render('login', {
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