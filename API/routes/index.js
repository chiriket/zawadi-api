var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/home', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});


// home is protected
router.get('/pricing', (req, res) =>
  res.render('pricing', {
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
router.get('/admin', (req, res) =>
  res.render('admin', {
    // name: req.user.name
  })
);

module.exports = router;