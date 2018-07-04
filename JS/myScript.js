/*jslint devel: true */
/*jslint white: true */
/*global window */

(function () {
	"use strict";
	//get a random Integer
	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function randomize()
	{
		//load random animation
		window.document.getElementById("anim-object").setAttribute('data', 'animations/anim'+getRandomIntInclusive(1,4)+'.html');
		
		//random color
		var colorSchemes = [
						["white", "#eb0a72", "#0f69e3"],
						["#240041", "#900048", "#ff4057"],
						["white", "#FEDF03", "#0BB4C1"]
			];
		
		var rdmInt = getRandomIntInclusive(0,2);
		window.document.documentElement.style.setProperty('--bg', colorSchemes[rdmInt][0]);
		window.document.documentElement.style.setProperty('--c3', colorSchemes[rdmInt][1]);
		window.document.documentElement.style.setProperty('--c4', colorSchemes[rdmInt][2]);
		
	}

	//on page load event
	window.document.addEventListener("DOMContentLoaded", function() {
		randomize();
//		window.document.getElementById('anim-click').onclick = function() { randomize(); };
	});

}());





