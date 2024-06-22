const express = require('express');
const app = express();
const animeRoutes = express.Router();

let Anime = require('../model/anime');

// api to add anime
animeRoutes.route('/add').post(function (req, res) {
  let anime = new Anime(req.body);
  anime.save()
  .then(anime => {
    res.status(200).json({'status': 'success','mssg': 'anime added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get animes
animeRoutes.route('/').get(function (req, res) {
  Anime.find(function (err, animes){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','animes': animes});
    }
  });
});

// api to get anime
animeRoutes.route('/anime/:id').get(function (req, res) {
  let id = req.params.id;
  Anime.findById(id, function (err, anime){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','anime': anime});
    }
  });
});

// api to update route
animeRoutes.route('/update/:id').put(function (req, res) {
    Anime.findById(req.params.id, function(err, anime) {
    if (!anime){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        anime.name = req.body.name;
        anime.description = req.body.description;
        anime.year = req.body.year;
        anime.img = req.body.img;

        anime.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
animeRoutes.route('/delete/:id').delete(function (req, res) {
  Anime.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = animeRoutes;