// generates the random number
function getRandom () {
	var randomNum = Math.floor((Math.random()*100)+1);
	return randomNum;
}

$(document).ready(function () {
    // sets the random number for the session and prints it to the console
	var setRandom = getRandom();
	console.log("The correct number is: " + setRandom);

    // initializes the array and guess count
	var guessArray = [];
	var guesses = 0;

    // runs the function for the first guess
	function guess1 (setRandom, currentVal)
	{
		if (setRandom == currentVal)
		{
			$('#response').text("That is correct, and you did it on your first try, you probably cheated!");
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

    // runs the function for the 2nd guess
	function followUps (setRandom, currentVal)
	{
		
		// initialize vars and create values that pull in the new value
		// and pulls the last value from the array
		var hotter = setRandom - guessArray[guessArray.length - 1];
		var colder = setRandom - currentVal;

		// very important, convert the number to absolute values
		// comparison statements are buggy without this
        hotter = Math.abs(hotter);
        colder = Math.abs(colder);
        
        // logic that changes the background color based on the guess accuracy
		if (setRandom == currentVal)
		{
			$('#response2').text("That is correct, great job!  It took you a total of " + guesses + " guesses.");
			$( "#backgroundSelector" ).removeClass().addClass( "finalBackground" );
			console.log("That is correct, great job!");
		} 
		else if (hotter > colder && colder > 25 && currentVal > setRandom)
		{
			$('#response2').text("You're getting warmer, but you're still over 25 away, start going down...");
			$( "#backgroundSelector" ).removeClass().addClass( "slightlyWarmer" );
			console.log("slightly warmer");
		} 
        else if (hotter > colder && colder > 25 && currentVal < setRandom)
		{
			$('#response2').text("You're getting warmer, but you're still over 25 away, start heading up...");
			$( "#backgroundSelector" ).removeClass().addClass( "slightlyWarmer" );
			console.log("slightly warmer");
		} 
        else if (hotter > colder && currentVal > setRandom)
		{
			$('#response2').text("You're not too far away, head down a little bit...");
			$( "#backgroundSelector" ).removeClass().addClass( "warmerBackground" );
			console.log("slight warmer");
		} 
        else if (hotter > colder)
		{
			$('#response2').text("You're getting warmer, and you're within 25, just up a little bit!");
			$( "#backgroundSelector" ).removeClass().addClass( "warmerBackground" );
			console.log("warmer");
		} 
		else if (hotter < colder)
		{
            $('#response2').text("You're getting colder");
			$( "#backgroundSelector" ).removeClass().addClass( "colderBackground" );
			console.log("colder");
		}
        else if (guessArray[guessArray.length - 1] === currentVal)
		{
			$('#response2').text("Ummmm, that was the same number, let's mix it up a bit, k?");
			$( "#backgroundSelector" ).removeClass().addClass( "colderBackground" );
			console.log("duplicate");
		}
        else
		{
			$('#response2').text("Ugh, conditions weren't met, fix the bug");
			$( "#backgroundSelector" ).removeClass().addClass( "colderBackground" );
			console.log("colder");
		}

		// outputs the hotter/colder values to the console
		console.log(hotter);
		console.log(colder);
		guesses++;
	}
    
    // function for triggering the click when the enter key is pressed
    $('#inputBox').keydown(function(event){    
        if(event.keyCode==13){
           $('#buttonClick').trigger('click');
        }
    });

    // starts the game on the click
	$('#buttonClick').click( function() {

		var currentVal = parseInt($('#inputBox').val(), 10);

        if (currentVal <= 0 || currentVal > 100 || currentVal == NaN)
        {
            alert("Oops, looks like you didn't enter a valid number, please try again and enter a number between 1 and 100");
        }
        
		if (guesses == 0 && (currentVal > 0 || currentVal < 101))
		{
            guess1(setRandom, currentVal);
			guessArray.push(currentVal);
		}
		else if (guesses > 0 && (currentVal > 0 || currentVal < 101))
		{
            $('#response').empty();
            followUps(setRandom, currentVal);
            guessArray.push(currentVal);
		}
		
		console.log(guessArray);
		
		console.log(guesses);

	});

})			