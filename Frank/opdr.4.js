var SANDBOX = "SANDBOX";
var LINEAIR = "LINEAIR";
var GPS_AVAILABLE = 'GPS_AVAILABLE';
var GPS_UNAVAILABLE = 'GPS_UNAVAILABLE';
var POSITION_UPDATED = 'POSITION_UPDATED';
var REFRESH_RATE = 1000;
var currentPosition = currentPositionMarker = customDebugging = debugId = map = interval =intervalCounter = updateMap = false;
var locatieRij = markerRij = [];

// Event functies - bron: http://www.nczonline.net/blog/2010/03/09/custom-events-in-javascript/ Copyright (c) 2010 Nicholas C. Zakas. All rights reserved. MIT License
// Gebruik: ET.addListener('foo', handleEvent); ET.fire('event_name'); ET.removeListener('foo', handleEvent);
function EventTarget(){this._listeners={}}
EventTarget.prototype={constructor:EventTarget,addListener:function(a,c){"undefined"==typeof this._listeners[a]&&(this._listeners[a]=[]);this._listeners[a].push(c)},fire:function(a){"string"==typeof a&&(a={type:a});a.target||(a.target=this);if(!a.type)throw Error("Event object missing 'type' property.");if(this._listeners[a.type]instanceof Array)for(var c=this._listeners[a.type],b=0,d=c.length;b<d;b++)c[b].call(this,a)},removeListener:function(a,c){if(this._listeners[a]instanceof Array)for(var b=
this._listeners[a],d=0,e=b.length;d<e;d++)if(b[d]===c){b.splice(d,1);break}}}; var ET = new EventTarget();


var SPACE = SPACE || {};


(function() {
	SPACE.gps = {

		init: function(){

			var self = this;

			debugMessage("Controleer of GPS beschikbaar is...");
		    ET.addListener(GPS_AVAILABLE, self.startInterval);
		    ET.addListener(GPS_UNAVAILABLE, function(){debug.debugMessage('GPS is niet beschikbaar.')});
		    (geo_position_js.init())?ET.fire(GPS_AVAILABLE):ET.fire(GPS_UNAVAILABLE);
		}

		startInterval: function() {

			var self = this;

			debug.debugMessage("GPS is beschikbaar, vraag positie.");
		    this.updatePosition();
		    interval = setInterval(this.updatePosition, REFRESH_RATE);
		    ET.addListener(POSITION_UPDATED, self.checkLocations);
		}

		updatePosition: function() {

			var self = this;

			intervalCounter++;
	    	geo_position_js.getCurrentPosition(self.setPosition, debug.geoErrorHandler, {enableHighAccuracy:true});
		}

		setPosition: function() {
			currentPosition = position;
		    ET.fire("POSITION_UPDATED");
		    debug.debugMessage(intervalCounter+" positie lat:"+position.coords.latitude+" long:"+position.coords.longitude);
		}

		checkLocations: function() {
		    // Liefst buiten google maps om... maar helaas, ze hebben alle coole functies
		    for (var i = 0; i < locaties.length; i++) {
		        var locatie = {coords:{latitude: locaties[i][3],longitude: locaties[i][4]}};

		        console.log(currentPostion);

		        if(this.calculateDistance(locatie, currentPosition)<locaties[i][2]){

		            // Controle of we NU op die locatie zijn, zo niet gaan we naar de betreffende page
		            if(window.location!=locaties[i][1] && localStorage[locaties[i][0]]=="false"){
		                // Probeer local storage, als die bestaat incrementeer de locatie
		                try {
		                    (localStorage[locaties[i][0]]=="false")?localStorage[locaties[i][0]]=1:localStorage[locaties[i][0]]++;
		                } catch(error) {
		                    debug.debugMessage("Localstorage kan niet aangesproken worden: "+error);
		                }

						// TODO: Animeer de betreffende marker

		                window.location = locaties[i][1];
		                debug.debugMessage("Speler is binnen een straal van "+ locaties[i][2] +" meter van "+locaties[i][0]);
		            }
		        }
	    	}
		}

		calculateDistance: function() {
			var pos1 = new google.maps.LatLng(p1.coords.latitude, p1.coords.longitude);
		    var pos2 = new google.maps.LatLng(p2.coords.latitude, p2.coords.longitude);
		    return Math.round(google.maps.geometry.spherical.computeDistanceBetween(pos1, pos2), 0);
		}

	};




	SPACE.map = {

		generateMap: function() {

			var self = this;

			debug.debugMessage("Genereer een Google kaart en toon deze in #"+canvasId)
		    map = new google.maps.Map(document.getElementById(canvasId), myOptions);

		    var routeList = [];
		    // Voeg de markers toe aan de map afhankelijk van het tourtype
		    debug.debugMessage("Locaties intekenen, tourtype is: "+tourType);
		    for (var i = 0; i < locaties.length; i++) {

		        // Met kudos aan Tomas Harkema, probeer local storage, als het bestaat, voeg de locaties toe
		        try {
		            (localStorage.visited==undefined||isNumber(localStorage.visited))?localStorage[locaties[i][0]]=false:null;
		        } catch (error) {
		            debug.debugMessage("Localstorage kan niet aangesproken worden: "+error);
		        }

		        var markerLatLng = new google.maps.LatLng(locaties[i][3], locaties[i][4]);
		        routeList.push(markerLatLng);

		        markerRij[i] = {};
		        for (var attr in locatieMarker) {
		            markerRij[i][attr] = locatieMarker[attr];
		        }
		        markerRij[i].scale = locaties[i][2]/3;

		        var marker = new google.maps.Marker({
		            position: markerLatLng,
		            map: map,
		            icon: markerRij[i],
		            title: locaties[i][0]
		        });
		    }
			// TODO: Kleur aanpassen op het huidige punt van de tour
		    if(tourType == LINEAIR){
		        // Trek lijnen tussen de punten
		        debug.debugMessage("Route intekenen");
		        var route = new google.maps.Polyline({
		            clickable: false,
		            map: map,
		            path: routeList,
		            strokeColor: 'Black',
		            strokeOpacity: .6,
		            strokeWeight: 3
		        });

		    }

		    // Voeg de locatie van de persoon door
		    currentPositionMarker = new google.maps.Marker({
		        position: kaartOpties.center,
		        map: map,
		        icon: positieMarker,
		        title: 'U bevindt zich hier'
		    });

		    // Zorg dat de kaart geupdated wordt als het POSITION_UPDATED event afgevuurd wordt
		    ET.addListener(POSITION_UPDATED, self.updatePosition);
		}

		updatePosition: function() {
			// use currentPosition to center the map
		    var newPos = new google.maps.LatLng(currentPosition.coords.latitude, currentPosition.coords.longitude);
		    map.setCenter(newPos);
		    currentPositionMarker.setPosition(newPos);
		    //HOE PAK JE EEN OBJECT BINNENIN EEN METHODE?
		}

	}

	SPACE.debug = {

		geoErrorHandler: function() {
			this.debugMessage('geo.js error '+code+': '+message);
		}

		debugMessage: function() {
			(customDebugging && debugId)?document.getElementById(debugId).innerHTML:console.log(message);
		}

		setCustomDebugging: function() {
			debugId = this.debugId;
			//HOE PAK JE EEN VARIABELE BINNENIN EEN METHODE?
	    	customDebugging = true;
		}

	}

	SPACE.helper = {

		isNumber: function() {
			return !isNaN(parseFloat(n)) && isFinite(n);
		}

	}
})();