import { Router } from 'express';
import { getRestaurants, getBorough, getCuisine, getRestaurant } from './database.js';

const router = new Router();

/**
 * Déclaration des routes de l'app
 */

router.get("/", getHome);
router.get("/resto", getResto);
router.get("/explore", getRestoByBoroughByCuisine);

function getHome(req, res) {
  res.render('index');
}


function getResto(req, res) {
  var name = "";
  if (req.query.name !== undefined) {
    console.log(req.query.name);
    name = req.query.name;
  };
  getRestaurants(name).then((restos)=>{
    res.render('resto', {restos});
  });
}

function getRestoByBoroughByCuisine(req, res) {
  let restos = [];
  getBorough().then((boroughs)=>{
    getCuisine().then((cuisines)=>{
      if (req.query.borough !== undefined) {
        let borough = req.query.borough;
        let cuisine = req.query.cuisine;
        getRestaurant(borough,cuisine).then((restos)=>{
          res.render('explore', {boroughs,cuisines,restos});
        });
      }else{
        let restos = []
        res.render('explore', {boroughs,cuisines,restos});
      }
    });
  });
  
}

// Exporte le routeur pour le fichier principal
export default router;