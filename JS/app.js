'use strict';

(function(){
const appRoot = document.querySelector('#app-root');
		const sortingCriteria = document.querySelector('#games-sorting-criteria');
		const gamesToBeDisplayed = document.getElementById('games-to-be-displayed');
	    const xhr = new XMLHttpRequest();
	    const data = [];
	    
	    xhr.onload = () => {
	        data.push(...JSON.parse(xhr.responseText).games);
	        console.log(data);

        	changeCriteria('recent-release');
	        
	        sortingCriteria.addEventListener("change", changeCriteriaListener);
	        gamesToBeDisplayed.addEventListener("change", changeSortingNumber);
	    }

	    // Render function
	    const renderGame = game => {
	    	const gameData = document.createElement('div');
	    	let gameHTMLString = '';

	    	// returning keys from object
	    	// forEach is iterating over those keys
	    	// [bracket syntax] prop is variable 
	    	Object.keys(game).forEach(prop => {
	    		const currentProp = String(game[prop]);

		    		if (currentProp.includes('.jpg') || currentProp.includes('.png')) {
						gameHTMLString = `${gameHTMLString}<img src="https://mosaic-mock-api.herokuapp.com/${game[prop]}"/><hr>`;
		    		} else {
		    			gameHTMLString = `${gameHTMLString}<p>${game[prop]}</p>`;	    			
		    		}

	    	});
	    	gameData.innerHTML = gameHTMLString;
	    	appRoot.appendChild(gameData);
	    }

	    // Change criteria function
	    function changeCriteriaListener(e) {

	    	// everytime you have an event, the element that generates the event
	    	// is called the target, eg. e.target
	    	const selectedOption = e.target.value;

	    	changeCriteria(selectedOption);
	    }

	    function changeCriteria(selectedOption){
	    	switch(selectedOption) {
	    		case 'recent-release':
	    			//console.log(selectedOption);
	    			data.sort(function (a, b){
	    				let dateA = Date.parse(a.release_date);
	    				let dateB = Date.parse(b.release_date);
	    				return dateB - dateA;
	    			});
	    			//console.log(data);
	    			changeRender();
	    			break;
	    		case 'oldest-release':
	    			//console.log(selectedOption);
	    			data.sort(function (a, b){
	    				let dateA = Date.parse(a.release_date);
	    				let dateB = Date.parse(b.release_date);
	    				return dateA - dateB;
	    			});
	    			changeRender();
	    			break;
	    		case 'alphabetically':
	    			//console.log(selectedOption);
	    			data.sort(function (a, b){
	    				let nameA = a.title.toUpperCase();
	    				let nameB = b.title.toUpperCase();
	    				if (nameA < nameB) {
	    					return -1;
	    				}
	    				if (nameA > nameB) {
	    					return 1;
	    				}
	    				return 0;
	    			});
	    			//console.log(data);
    				changeRender();
	    			break;
	    		case 'reverse-alphabetically':
	    			//console.log(selectedOption);
	    			data.sort(function (a, b){
	    				let nameA = a.title.toUpperCase();
	    				let nameB = b.title.toUpperCase();
	    				if (nameA < nameB) {
	    					return 1;
	    				}
	    				if (nameA > nameB) {
	    					return -1;
	    				}
	    				return 0;
	    			});
	    			//console.log(data);
    				changeRender();
	    			break;
	    		case 'rating':
	    			//console.log(selectedOption);
	    			data.sort(function (a, b){
	    				let ratingA = a.rating;
	    				let ratingB = b.rating;
	    				let reviewsA = a.reviews;
	    				let reviewsB = b.reviews;
	    				return ((ratingA - ratingB) || (reviewsA - reviewsB));
	    			});
	    			//console.log(data);
    				changeRender();
	    			break;
	    		case 'genre':
	    			//console.log(selectedOption);
	    			data.sort(function (a, b){
	    				let genreA = a.genre.toUpperCase();
	    				let genreB = b.genre.toUpperCase();
	    				if (genreA < genreB) {
	    					return -1;
	    				}
	    				if (genreA > genreB) {
	    					return 1;
	    				}
	    				return 0;
	    			});
	    			//console.log(data);
	    			changeRender();
	    			break;
	    		default:
	    			break;
	    	}
	    }

	    function changeSortingNumber(e){
	    	const selectedOption = e.target.value;
	    	switch(selectedOption){
	    		case '1':
	    			changeRender();
	    			break;
	    		case '3':
	    			changeRender();
	    			break;
	    		case '5':
	    			changeRender();
	    			break;
	    		case '10':
	    			changeRender();
	    			break;
	    		default:
	    			changeRender();
	    			break;
	    	}
	    }

	    // Re-render when changing criteria
	    function changeRender() {
	    	appRoot.innerHTML = '';
	    	data.forEach((game, i) => {
	        	if (i < gamesToBeDisplayed.value) {
	        		renderGame(game);
	        	}
	        });
	    }

	    xhr.open("GET", "https://mosaic-mock-api.herokuapp.com/api/games", false);
	    xhr.send();
	})();