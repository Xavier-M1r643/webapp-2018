// MÉTHODE MODULE CLASS

// TEMPLATING.
import Handlebars from 'handlebars';
import {capLettre} from './module';

class Meteo {

  constructor(infos) {
    this.infos = infos;
    // console.log(this.infos);
  }

  getMeteoInformations(infos) {
    // console.log('OK | getMeteoInformations() : ' + this.infos);

    // Variable "privée".
    const _infos = this.infos;
    

    // ----------------------- OPENWEATHERMAP -----------------------
    // https://openweathermap.org/current
    const maClefAPPID = "0c98af945c8169d1e0fb538cd4ff153f";
    const monURL = "http://api.openweathermap.org/data/2.5/weather?id=" + _infos.villeID + "&units=" + _infos.units + "&lang=" + _infos.lang + "&APPID=" + maClefAPPID;

    
    $.ajax({
      'url': monURL,
      'type': 'GET',
      'format': 'json',
      'cache': 'false', 
      'dataType': 'json'
                                                                                                                           
    }).done(function (data, textStatus, jqXHR) {

      // DONNÉES DE LA JOURNÉE.
      // console.dir(data);

      
      // VARIABLES
      const tendance = data.weather[0].main;
      const tendanceLang = data.weather[0].description;
      
      const unite = _infos.units == "metric" ? "ºC" : "ºF";
      
      // data.weather[0].icon;
      //imgIcone.src = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";

      
      // CONSOLE
      console.log("Ville : " + data.name);
      console.log("Température : " + data.main.temp + unite);
      console.log("Humidité : " + data.main.humidity);
      console.log("Tendance : " + tendance);
      console.log("TendanceLang : " + tendanceLang);
      console.log("ID : " + data.weather[0].id);
      //console.log("Description : " + data.weather[0].description);
      console.log("Vitesse du vent : " + data.wind.speed);
      console.log("Icône : " + data.weather[0].icon);

      
      
      // ----------------------- SVG -----------------------
      // https://css-tricks.com/using-svg/
      
      let imgsource = "";
      const chemin = "images/";
      
      switch (tendance) {
      case "Rain":
          imgsource = chemin + "rain.svg";
          break;
      case "Clear":
          imgsource = chemin + "sunny.svg";
          break;
      case "Clouds":
          imgsource = chemin + "cloudy.svg";
          break;
      case "Snow":
          imgsource = chemin + "snow.svg";
          break;
      default:
          imgsource = chemin + "variable.svg";
      }
      
      
      
      // ---------------------- HANDLEBARS ----------------------
      // ATTN Cf. package.json d'handlebars ajout de 
      // "browser": "dist/handlebars.js",

      const source = $('#handlebars-meteo').html();
      
      const template = Handlebars.compile(source);
      
      const context = { "ville": data.name, "temperature": data.main.temp + unite, "humidite": data.main.humidity + "%", "tendance": capLettre(tendanceLang), "imagemeteo": imgsource };
      
      const result = template(context);
      
      $(".jumbotron").html(result);

      
      
      // ---------------------- BACKGROUND ----------------------
      // quebec.jpg ou paris.jpg
      const dest = _infos.villeID == "6325494" ? "ciel" : "paris";
      
      $(".jumbotron").css({background:"url(images/" + dest + ".jpg)", backgroundRepeat:"no-repeat", backgroundSize:"125% 740px"});
      

      
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
        console.log('errorThrown : ' + textStatus);
    })
    .always(function (jqXHR, textStatus) {
        console.log('Fin de l\'exécution.');
    });

    return "****** getMeteoInformations() OK. Affichage avec Handlebars param.";
  }


}

export default Meteo
