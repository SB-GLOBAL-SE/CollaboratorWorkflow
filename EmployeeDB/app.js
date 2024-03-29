/**
=======
 * Testing Testing 1 2 3 
 * 
 * Module dependencies.
 */

///  / additional change comments need to go here
// and here 
// and here here
//
//
//
//
//
// additional change
//
//asdfasdf
//
// some comment for 
//
// A subsequent small change
//
//
//
// Small change here
//
// Extra comments
//
//
// More Extra Comments
//
// test asdfasdfasdf
// Donnas Comment
//
// I'm just going to add some commentary
// additional change 
// Adding an extra Comment
// removal is not a good idea
// Change for collaborator review
// Additional Change
//
// Change for changes sake
// To demonstrate code review
// Collab changes
// random comments here 
// This is a new branch for collaborator work
// Comment commen t

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , EmployeeProvider = require('./employeeprovider').EmployeeProvider;
//Rudy's comment
// remove
var app = express();
// changed and changed back
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.set('view options', {layout: false});
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

// extra
// extra comment

app.configure('development', function(){
  app.use(express.errorHandler());
});

var employeeProvider= new EmployeeProvider('localhost', 27017);
/// These are the Voyages
//Routes

//index
app.get('/', function(req, res){
  employeeProvider.findAll(function(error, emps){
      res.render('index', {
            title: 'Employees',
            employees:emps
        });
  });
});

// New Comment

//new employee
app.get('/employee/new', function(req, res) {
    res.render('employee_new', {
        title: 'New Employee'
    });
});

//save new employee
app.post('/employee/new', function(req, res){
    employeeProvider.save({
        title: req.param('title'),
        name: req.param('name')
    }, function( error, docs) {
        res.redirect('/')
    });
});

// Hello world
//update an employee
app.get('/employee/:id/edit', function(req, res) {
	employeeProvider.findById(req.param('_id'), function(error, employee) {
		res.render('employee_edit',
		{ 
			title: employee.title,
			employee: employee
		});
	});
});

//save updated employee
app.post('/employee/:id/edit', function(req, res) {
	employeeProvider.update(req.param('_id'),{
		title: req.param('title'),
		name: req.param('name')
	}, function(error, docs) {
		res.redirect('/')
	});
});

//delete an employee
app.post('/employee/:id/delete', function(req, res) {
	employeeProvider.delete(req.param('_id'), function(error, docs) {
		res.redirect('/')
	});
});

app.listen(process.env.PORT || 3000);
