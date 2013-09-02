
function getRandom () {
	var randomNum = Math.floor((Math.random()*100)+1);
	return randomNum;
}

$(document).ready(function () {
	var setRandom = getRandom();
	console.log("The correct number is: " + setRandom);

	var guessArray = [];
	var guesses = 0;

	function guess1 (setRandom, currentVal)
	{
		if (setRandom == currentVal)
		{
			$('#response').text("That is correct, great job!");
		} 
		else if (setRandom > currentVal)
		{
			$('#response').text("That was a nice try, try again to see if you can get closer (hint: try a larger number)");
		} 
		else if (setRandom < currentVal)
		{
			$('#response').text("That was a nice try, try again to see if you can get closer (hint: try a smaller number)");
		};

		guesses++;
	}

	function followUps (setRandom, currentVal)
	{
		var hotter = setRandom - guessArray[guessArray.length - 1];
		var colder = setRandom - currentVal;

		if (setRandom == currentVal)
		{
			$('#response2').text("That is correct, great job!");
			$( "#backgroundSelector" ).removeClass().addClass( "finalBackground" );
			console.log("That is correct, great job!");
		} 
		else if (hotter > colder)
		{
			$('#response2').text("You're getting warmer!");
			$( "#backgroundSelector" ).removeClass().addClass( "warmerBackground" );
			console.log("warmer");
		} 
		else
		{
			$('#response2').text("You're getting colder");
			$( "#backgroundSelector" ).removeClass().addClass( "colderBackground" );
			console.log("colder");
		}
		console.log(hotter);
		console.log(colder);
		guesses++;
	}

	$('#buttonClick').click( function() {

		var currentVal = Math.abs(parseInt($('#inputBox').val(), 10));

		if (guesses == 0)
		{
			guess1(setRandom, currentVal);
			guessArray.push(currentVal);
		}
		else
		{
			$('#response').empty();
			followUps(setRandom, currentVal);
			guessArray.push(currentVal);
		}
		
		console.log(guessArray);
		
		console.log(guesses);

	});

})			