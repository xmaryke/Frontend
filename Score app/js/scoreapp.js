var SCOREAPP = SCOREAPP || {};

(function () {

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

	SCOREAPP.page1 = {

		title: 'Pagina 1',
		description: 'Pagina 1 is de eerste pagina',
		items: [
			{
				title: 'Item 1',
				description: 'Item 1 is het eerste item'
			}, {
				title: 'Item 2',
				description: 'Item 2 is het tweede item'
			}, {
				title: 'Item 3',
				description: 'Item 3 is het derde item'
			}, {
				title: 'Item 4',
				description: 'Item 4 is het vierde item'
			}
		]
	};

	SCOREAPP.page2 = {
		title: 'Pagina 2',
		description: 'Pagina 2 is de tweede pagina'
	};

	SCOREAPP.page3 = {
		title: 'Pagina 3',
		description: 'Pagina 3 is de derde pagina'
	};

	SCOREAPP.controller = {
		
		init: function() {
			SCOREAPP.router.init();
		}
	};

	SCOREAPP.router = {

		init: function () {

			//Voer SCOREAPP.page uit als achter de URL van de app page1, page2 of page3 komt te staan.
			routie({
				'game': function() {
					SCOREAPP.page.game();
			    },

				'page1': function() {
					SCOREAPP.page.page1();
			    },

			    'page2': function() {
			    	SCOREAPP.page.page2();
			    },

			    'page3': function() {
			    	SCOREAPP.page.page3();
			    },

			    '*': function() {
			    	SCOREAPP.page.page1();
		    	}
		    });
		},

		change: function () {
			//In var route zit de tekst die na de hashtag (in de URL) staat (page1, page2 of page3 dus)
            var route = window.location.hash.slice(1);
            //In var sections zit data-route 
            var sections = qwery('section[data-route]'); 
            //In var section zit data-route met de inhoud van route (bijv. data-route='page2')
            var section = qwery('[data-route=' + route + ']')[0];

            if (section) {
            	//Verwijder alle class actives van de page sections
            	for (var i=0; i < sections.length; i++){
            		sections[i].classList.remove('active');
            	}

            	//En voeg class active toe aan de huidige section
            	section.classList.add('active');
            }

            //Default route
            if (!route) {
            	sections[0].classList.add('active');
            }

		}

	};

	SCOREAPP.page = {
		game: function () {
			Transparency.render(qwery('[data-route=game]')[0], SCOREAPP.game);
			SCOREAPP.router.change();
		},

		page1: function () {
			Transparency.render(qwery('[data-route=page1]')[0], SCOREAPP.page1);
			SCOREAPP.router.change();
		},

		page2: function () {
			Transparency.render(qwery('[data-route=page2]')[0], SCOREAPP.page2);
			SCOREAPP.router.change();
		},

		page3: function () {
			Transparency.render(qwery('[data-route=page3]')[0], SCOREAPP.page3);
			SCOREAPP.router.change();
		}
	}

	SCOREAPP.controller.init();
})();