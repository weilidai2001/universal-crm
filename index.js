'use strict';

const _ = require('lodash');
const uuid = require('uuid');
const express = require("express");
const bodyParser = require('body-parser');
const app = express();
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));
app.use(express.static("public"));

class Repo {
  constructor() {
    this.db = [];
  }

  add(obj){
    this.db.push(obj);
  }

  getById(id){
    return _.find(this.db, item => item.id == id);
  }

  getCollection(project, collection){
    return _.filter(this.db, item => item.project == project && item.collection == collection);
  }

  update(obj){
    _.remove(this.db, item => item.id == obj.id);
    this.db.push(obj);
  }

  delete(id){
    _.remove(this.db, item => item.id == id);
  }
}

var repo = new Repo();

const book1 = {
  id: 1,
  project: 'library',
  collection: 'books',
  bookName: 'Harry Potter'
};

const book2 = {
  id: 2,
  project: 'library',
  collection: 'books',
  bookName: 'Lord of the Rings'
};

const film1 = {
  id: 3,
  project: 'library',
  collection: 'films',
  bookName: '007'
};

repo.add(book1);
repo.add(book2);
repo.add(film1);

const server = app.listen(8091, function () {
  app.get('/objects', function(req, res){
    const project = req.query.project;
    const collection = req.query.collection;

    res.send(repo.getCollection(project, collection));
  });

  app.get('/objects/:id', function(req, res){
    const id = req.params.id;

    res.send(repo.getById(id));
  });

  app.post('/objects/', function(req, res){
    var obj = req.body;
    obj.id = uuid.v1();

    res.send(repo.add(obj));
  });

  app.put('/objects/:id', function(req, res){
    res.send(repo.update(req.body));
  });

  app.delete('/objects/:id', function(req, res){
    const id = req.params.id;

    res.send(repo.delete(id));
  });
});