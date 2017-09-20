(($) =>
{
	let isStarting; // Card reveal at the start of the game
	let doCompare; // Card comparison toggle
	let paused; // Pause game toggle
	let turns; // Number of turns
	let stars; // Star rating
	let activeCards; // List of active cards
	let time; // Time counter
	let timer; // Time interval

	// Symbols list. Names match icon names from Font Awesome
	const symbols =
	[
		'paper-plane',
		'anchor',
		'snowflake-o',
		'star',
		'heart',
		'tree',
		'globe',
		'gear'
	];

	// Create list of cards from symbols
	let cards = symbols;

	// Push symbols again to create pairs
	cards.push(...symbols);

	// Shuffle function from http://stackoverflow.com/a/2450976
	function shuffle(array)
	{
		let currentIndex = array.length, temporaryValue, randomIndex;

		while (currentIndex !== 0)
		{
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	}

	// Main function
	function newGame()
	{
		cards = shuffle(cards); // Randomize cards

		isStarting = true;
		doCompare = false;
		turns = 0;
		stars = 3;
		time = 0;
		paused = false;
		activeCards = [];

		// Reset timer
		clearInterval(timer);
		$('.timer').html(time);

		setTurns(false); // Set as is, without increment
		setStars(false); // Set as is, without decrement

		// Reset the board
		$('#game').html('');

		// Create and add each card
		for(let card of cards)
		{
			$('#game').append(
				`<div class="cell">
					<div class="memory-card" name="${card}">
						<figure class="front"></figure>
						<figure class="back"><i class="fa fa-${card}"></i></figure>
					</div>
				</div>`
			);
		}

		resizeCards(); // Ensure cards height equals their widths to make them square, then sets new line height to align symbols

		// Reveal all cards for the player to memorize, then hide them and start the game
		setTimeout(function()
		{
			$('.memory-card').addClass('flipped');
			setTimeout(function()
			{
				$('.memory-card').removeClass('flipped');
				isStarting = false;
				startTimer();
			}, 3000);
		}, 500);
	}

	// Game stats related functions
	function setStars(decrement)
	{
		if(decrement)
			stars--;

		$('.rating').html('');

		// Full stars
		for(let i = 0; i < stars; i++)
		{
			$('.rating').append('<i class="fa fa-star">');
		}

		// Empty stars
		let x = 3 - stars;

		if(x > 0)
		{
			for(let i = 0; i < x; i++)
			{
				$('.rating').append('<i class="fa fa-star-o">');
			}
		}
	}

	function setTurns(increment)
	{
		if(increment)
			turns++;

		$('.turns').html(turns);
		checkScore(); // Check if star rating should change
	}

	function startTimer()
	{
		timer = setInterval(function()
		{
			if(!paused)
			{
				time++;
				$('.timer').html(time);
			}
		}, 1000);
	}

	function checkScore()
	{
		// Star rating milestones
		if(turns === 16 || turns === 21)
			setStars(true); // Decrement star rating
	}

	function checkWin()
	{
		if($('.matched').length === 16)
		{
			clearInterval(timer);
			$('.modal').modal('show');
		}
	}

	// Card manipulation functions
	function flipCard(card, position)
	{
		switch(position)
		{
			case 'up':
				card.addClass('flipped');
				checkCard(card);
			break;
			case 'down':
				card.effect('shake', 400, function()
				{
					setTimeout(function()
					{
						card.removeClass('flipped');
					}, 600);
				});
			break;
			case 'matched':
				setTimeout(function()
				{
					card.find('.back').html('<i class="fa fa-check"></i>'); // Change symbol to checkmark
					card.toggleClass('flipped matched');
					checkWin(); // Check if winning conditions are met
				}, 400);
			break;
		}
	}

	function checkCard(card)
	{
		saveCard(card)

		if(doCompare)
			compareCards();
		else
			doCompare = true; // Trigger comparison on next card
	}

	function saveCard(card)
	{
		activeCards.push(card);
	}

	function compareCards()
	{
		// Allow player to continue revealing cards while comparing
		let cards = [];
		cards.push(...activeCards);
		clearActiveCards();

		// Check for symbol match
		if(cards[0].attr('name') === cards[1].attr('name'))
			matchCards(cards);
		else
			hideCards(cards);

		doCompare = false;
		setTurns(true); // Increment turns
	}

	function clearActiveCards()
	{
		activeCards = [];
	}

	function matchCards(cards)
	{
		for(let card of cards)
		{
			flipCard(card, 'matched');
		}
	}

	function hideCards(cards)
	{
		for(let card of cards)
		{
			flipCard(card, 'down');
		}
	}

	function resizeCards()
	{
		let height = $('.cell').width();
		$('.cell').height(height + 'px');
		$('.memory-card').css('line-height', height + 'px');
	}

	// Event listeners
	$('#game').on('click', '.memory-card', function(e)
	{
		// Player may only flip two hidden cards at a time
		if(!$(this).hasClass('flipped') && activeCards.length < 2 && !isStarting && !paused)
			flipCard($(this), 'up');
	});

	$('.restart').on('click', function(e)
	{
		e.preventDefault();

		$('.pause').html('<i class="fa fa-pause"></i>');

		if($('body').hasClass('modal-open'))
			$('.modal').modal('hide');

		newGame();
	});

	$('.pause').on('click', function(e)
	{
		e.preventDefault();

		if(paused)
			$('.pause').html('<i class="fa fa-pause"></i>');
		else
			$('.pause').html('<i class="fa fa-play"></i>');

		paused = !paused;
	});

	$(this).on('resize', function(e)
	{
		resizeCards();
	});

	newGame();
})(jQuery);