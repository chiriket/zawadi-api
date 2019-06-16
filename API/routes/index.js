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

// admin is protected
router.get('/admin', (req, res) =>
  res.render('admin', {
    // name: req.user.name
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