// https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Instructions/import

import './css/main.css';
import './scss/main.scss';

//import {hello, quoiDe9, inc} from './js/module';
import * as outils from './js/module';

//var moment = require('moment');
import moment from 'moment';
import 'moment/locale/fr';

// CLASS METEO
//import Meteo from './js/meteocanvas';
import Meteo from './js/meteoclassinfoshandlebarsparam';


// VARIABLES
const datedujour = document.querySelector('.date'), maintenant = moment();


// FONCTIONS
// --------------------------- CANVAS ---------------------------
function valideCanvas() {
  if (!outils.isCanvas) {
      //$(".msg").html('<p class="msg-canvas">Votre navigateur ne supporte pas la technologie Canvas.</p><h3>Mettez à jour votre navigateur</h3>');
      console.log("Canvas non supporté.");
  }
}

// ----------------------- DATE MOMENT ---------------------------
function dateDuJour() {
  console.log("Date du jour : " + maintenant.format('LLLL'));
  datedujour.innerHTML = outils.capLettre(maintenant.format('LLLL'));
}

// ---------------------- MÉTÉO --------------------------
// QC : 6325494 | PARIS : 2988507
// metric - imperial
//
function meteoDuJour() {
  
  const infosMeteo = {
    "villeID":"6325494",
    "units":"metric",
    "lang":"fr"
  };
  
  const maMeteo = new Meteo(infosMeteo);
  const msgMeteo = maMeteo.getMeteoInformations();
  console.log(msgMeteo);
}


// ************ -------- ****** -------- ************
// ---------------------- INIT --------------------------
$(document).ready(function() {
    
    dateDuJour();
    meteoDuJour();
});












