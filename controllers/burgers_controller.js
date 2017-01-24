var express = require('express');
var router = express.Router();
var db = require("../models");

router.get('/index', function (req,res) {
	db.Burger.findAll({}).then(function(dbBurgers) {
		var hbsObject = {
			burgers: dbBurgers
		};
		console.log(hbsObject.burgers);
		res.render('index', hbsObject);
	});
});

router.post('/index', function (req, res) {
	db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: 1
    }).then(function(dbBurgers) {
	var hbsObject = {
		burgers: dbBurgers
	};
	console.log(hbsObject.burgers);
	res.redirect('/index');
  });
});

router.put("/:id", function(req, res) {
  var condition = "id = " + req.params.id;
  db.Burger.update ({
  	devoured: req.params.devoured
  }, {
  	where: {
  		id: req.params.id
  	}
  }).then(function(dbBurgers) {
  	res.redirect("/index");
  });
  // burger.updateOne({
  //   devoured: req.body.devoured
  // }, condition, function() {
  //   res.redirect("/index");
  // });
});

module.exports = router;

