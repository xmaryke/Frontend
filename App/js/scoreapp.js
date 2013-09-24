//The namespace
var SCOREAPP = SCOREAPP || {};

//A self invoking function
(function () {

	//A data object containing information
	SCOREAPP.game = {

		title: 'Pool A - Score: Boomsquad vs. Burning Snow',

		gameInfo: [
		    { score: "1", team1: "Boomsquad", team1Score: "1", team2: "Burning Snow", team2Score: "0"},
		    { score: "2", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "0"},
		    { score: "3", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "1"},
		    { score: "4", team1: "Boomsquad", team1Score: "2", team2: "Burning Snow", team2Score: "2"},
		    { score: "5", team1: "Boomsquad", team1Score: "3", team2: "Burning Snow", team2Score: "2"},
		    { score: "6", team1: "Boomsquad", team1Score: "4", team2: "Burning Snow", team2Score: "2"},
		    { score: "7", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "2"},
		    { score: "8", team1: "Boomsquad", team1Score: "5", team2: "Burning Snow", team2Score: "3"},
		    { score: "9", team1: "Boomsquad", team1Score: "6", team2: "Burning Snow", team2Score: "3"},
		    { score: "10", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "3"},
		    { score: "11", team1: "Boomsquad", team1Score: "7", team2: "Burning Snow", team2Score: "4"},
		    { score: "12", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "4"},
		    { score: "13", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "5"},
		    { score: "14", team1: "Boomsquad", team1Score: "8", team2: "Burning Snow", team2Score: "6"},
		    { score: "15", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "6"},
		    { score: "16", team1: "Boomsquad", team1Score: "9", team2: "Burning Snow", team2Score: "7"},
		    { score: "17", team1: "Boomsquad", team1Score: "10", team2: "Burning Snow", team2Score: "7"},
		    { score: "18", team1: "Boomsquad", team1Score: "11", team2: "Burning Snow", team2Score: "7"},
		    { score: "19", team1: "Boomsquad", team1Score: "12", team2: "Burning Snow", team2Score: "7"},
		    { score: "20", team1: "Boomsquad", team1Score: "13", team2: "Burning Snow", team2Score: "7"},
		    { score: "21", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "7"},
		    { score: "22", team1: "Boomsquad", team1Score: "14", team2: "Burning Snow", team2Score: "8"},
		    { score: "23", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"}
	    ],

	};

	//A data object containing information
	SCOREAPP.ranking = {

		title: 'Pool A - Ranking',

		gameInfo: [
		    { team: "Chasing", won: "2", lost: "2", sw: "7", sl: "9", pw: "35", pl: "39"},
		    { team: "Boomsquad", won: "2", lost: "2", sw: "9", sl: "8", pw: "36", pl: "34"},
		    { team: "Burning Snow", won: "3", lost: "1", sw: "11", sl: "4", pw: "36", pl: "23"},
		    { team: "Beast Amsterdam", won: "2", lost: "2", sw: "6", sl: "8", pw: "30", pl: "34"},
		    { team: "Amsterdam Money Gang", won: "1", lost: "3", sw: "6", sl: "10", pw: "30", pl: "37"}
    	]
	};

	//A data object containing information
	SCOREAPP.schedule = {

		title: 'Pool A - Schedule',

		gameInfo: [
		    { date: "Monday, 9:00am", team1: "Chasing", team1Score: "13", team2: "Amsterdam Money Gang", team2Score: "9"},
		    { date: "Monday, 9:00am", team1: "Boomsquad", team1Score: "15", team2: "Beast Amsterdam", team2Score: "11"},
		    { date: "Monday, 10:00am", team1: "Beast Amsterdam", team1Score: "14", team2: "Amsterdam Money Gang", team2Score: "12"},
		    { date: "Monday, 10:00am", team1: "Chasing", team1Score: "5", team2: "Burning Snow", team2Score: "15"},
		    { date: "Monday, 11:00am", team1: "Boomsquad", team1Score: "11", team2: "Amsterdam Money Gang", team2Score: "15"},    
		    { date: "Monday, 11:00am", team1: "Burning Snow", team1Score: "15", team2: "Beast Amsterdam", team2Score: "6"},
		    { date: "Monday, 12:00pm", team1: "Chasing", team1Score: "8", team2: "Beast Amsterdam", team2Score: "15"},
		    { date: "Monday, 12:00pm", team1: "Boomsquad", team1Score: "15", team2: "Burning Snow", team2Score: "8"},
		    { date: "Monday, 1:00pm", team1: "Chasing", team1Score: "15", team2: "Boomsquad", team2Score: "14"},
		    { date: "Monday, 1:00pm", team1: "Burning Snow", team1Score: "15", team2: "Amsterdam Money Gang", team2Score: "11"}
    	]
	};

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
					//Execute function game inside SCOREAPP.page
					SCOREAPP.page.game();
			    },

				'/ranking': function() {
					SCOREAPP.page.ranking();
			    },

			    '/schedule': function() {
			    	SCOREAPP.page.schedule();
			    },

			    //Default
			    '*': function() {
			    	SCOREAPP.page.game();
		    	}
		    });
		},

		//A function adding or removing classes from sections, depending on the data in the URL, when executed by a function inside SCOREAPP.page
		change: function () {

			//Slice the string inside method hash, from object location, into a string starting from the character at index 2 (which is character 3)
			//Variable route contains the outcome
        	var route = window.location.hash.slice(2);
        	
        	//Variable sections contains an array of HTML element sections with attribute data-route  
        	var sections = qwery('section[data-route]'); 

            //Variable section contains a data-route filled with the content of variable route
        	var section = qwery('[data-route=' + route + ']')[0];

        	if (section) {
            	
            	//For all keys from the array inside variable sections
            	for (var i=0; i < sections.length; i++){

            		//Remove class active
            		sections[i].classList.remove('active');
            	}

            	//And add class active to the current section being visited
            	section.classList.add('active');
            	
            }

            //Default route
            if (!route) {
            	sections[0].classList.add('active');
            }

		}

	};

	//An object containing functions which bind the data objects to an HTML element when executed
	SCOREAPP.page = {

		//If function game is executed by function init inside object SCOREAPP.router
		game: function () {
			//Bind data object SCOREAPP.game to an HTML element containing data-route=game
			Transparency.render(qwery('[data-route=game]')[0], SCOREAPP.game);
			//And excute function change inside object SCOREAPP.router
			SCOREAPP.router.change();
		},

		ranking: function () {
			Transparency.render(qwery('[data-route=ranking]')[0], SCOREAPP.ranking);
			SCOREAPP.router.change();
		},

		schedule: function () {
			Transparency.render(qwery('[data-route=schedule]')[0], SCOREAPP.schedule);
			SCOREAPP.router.change();
		}

	}

	//When the DOM is fully loaded,
	domready(function () {

		// Execute function init inside the controller object
		SCOREAPP.controller.init();

	});

})();