//The namespace
var SCOREAPP = SCOREAPP || {};

//A self invoking function
(function () {

	SCOREAPP.settings = {

		gameScoreUrl: "https://api.leaguevine.com/v1/game_scores/",

		rankingUrl: "https://api.leaguevine.com/v1/pools/?tournament_id=19389&access_token=82996312dc",

		scheduleUrl: "https://api.leaguevine.com/v1/games/?tournament_id=19389&pool_id=19222&access_token=73ab4c160e"

	}

	SCOREAPP.post = {

		postGameData: function(form) {
			var gamePostForm = qwery('#gamePostForm')[0];
			var team1ScoreInputField = qwery('#gamePostForm [name=team1score]')[0];
			var team2ScoreInputField = qwery('#gamePostForm [name=team2score]')[0];
			var isFinalInputField = qwery('#gamePostForm [name=isfinal]')[0];
			var json = {
				game_id: "129763",
				team_1_score: team1ScoreInputField.value,
				team_2_score: team2ScoreInputField.value,
				is_final: 'False'
			}

			var site = fermata.json(SCOREAPP.settings.gameScoreUrl);
			var headers = {
				'Content-type':'application/json',
				'Authorization':'bearer a6abfe991a'
			};
			site.post(headers, json, console.log('gelukt!'));

			return false; //return false is zodat de pagina niet opnieuw wordt geladen
		},
	}

	//A controller object meant to start the script when everything is loaded
	SCOREAPP.controller = {

		//Function init is executed at the end of the script
		init: function() {
			//When function init is executed, execute another function init inside SCOREAPP.router to start the script 
			SCOREAPP.router.init();
		}
	};

	SCOREAPP.router = {

		init: function () {

			//Execute a function inside object SCOREAPP.page if the associated href is added to the URL (when the link is clicked)
			routie({
				//If /game is added to the URL
				'/game': function() {
					SCOREAPP.utils.loaderShow();
					//Execute function game inside SCOREAPP.page
					SCOREAPP.page.game();
			    },

				'/ranking': function() {
					SCOREAPP.utils.loaderShow();
					SCOREAPP.page.ranking();
			    },

			    '/schedule': function() {
			    	SCOREAPP.utils.loaderShow();
			    	SCOREAPP.page.schedule();
			    },

			    //Default
			    '*': function() {
			    	SCOREAPP.utils.loaderShow();
			    	SCOREAPP.page.game();
		    	}
		    });
		},

		//A function adding or removing classes from sections, depending on the data in the URL, when executed by a function inside SCOREAPP.page
		change: function () {

			//Slice the string inside method hash, from object location, into a string starting from the character at index 2 (which is character 3)
			//Variable route contains the outcome
        	var route = window.location.hash.slice(2);
        	
        	//Variable articles contains an array of HTML element articles with attribute data-route  
        	var articles = qwery('article[data-route]'); 

            //Variable article contains a data-route filled with the content of variable route
        	var article = qwery('[data-route=' + route + ']')[0];

        	if (article) {
            	
            	//For all keys from the array inside variable articles
            	for (var i=0; i < articles.length; i++){

            		//Remove class active
            		articles[i].classList.remove('active');
            	}

            	//And add class active to the current section being visited
            	article.classList.add('active');
            	
            }

            //Default route
            if (!route) {
            	articles[0].classList.add('active');
            }

		}

	};

	//An object containing functions which bind the data objects to an HTML element when executed
	SCOREAPP.page = {

		//If function game is executed by function init inside object SCOREAPP.router
		game: function () {

			var gamePostForm = qwery('#gamePostForm');
		    gamePostForm[0].onsubmit = SCOREAPP.post.postGameData;

		},

		ranking: function () {

			var site = fermata.json(SCOREAPP.settings.rankingUrl);					
			var data = site.get(function (err, result) {

				if (!err) {

					SCOREAPP.ranking = result.objects;

					Transparency.render(qwery('[data-route=ranking]')[0], SCOREAPP.ranking);
					SCOREAPP.router.change();
					SCOREAPP.utils.loaderHide();

				} 

			});

		},

		schedule: function () {

			var site = fermata.json(SCOREAPP.settings.scheduleUrl);					
			var data = site.get(function (err, result) {

				if (!err) {

					SCOREAPP.schedule = result;

					Transparency.render(qwery('[data-route=schedule]')[0], SCOREAPP.schedule);
					SCOREAPP.router.change();
					SCOREAPP.utils.loaderHide();

				}

			});

		}
	};

	SCOREAPP.utils = {

		loader: qwery('div.loader')[0],

		loaderShow: function() {

			this.loader.classList.remove('loader');
			this.loader.classList.add('loader-active');

		},

		loaderHide: function() {

			this.loader.classList.remove('loader-active');
			this.loader.classList.add('loader');
		
		}
	}

	domready(function () {

		// Execute function init inside the controller object
		SCOREAPP.controller.init();

	});

})();
