$(document).ready(function() {

	var boxer1Id,
	boxer2Id,
	BOXbtn = $("#boxBtn"),
	boxers,
	boxer1Hlth,
	boxer2Hlth,
	boxer1Attk,
	boxer2Attk,
	boxer1AttkOrig,
	counter = 0,
	punchCounter = 0,
	roundCounter = 0,
	voiceBubble = $("<img>"); // necessary to separate boxer imgs from voice bubble imgs
	
	// apply random health and power values to boxers
	healthPower();
	function healthPower() {
		healthArray = [100, 120, 150, 180];
		healthArray.sort(function(){return 0.5 - Math.random()});

		attackPower = [5, 8, 20, 25];
		attackPower.sort(function(){return 0.5 - Math.random()});

		// JSON boxer details
		boxers = {
			perrier: {
				health: healthArray[0],
				power: attackPower[0]
			},			
			boneCrusher: {
				health: healthArray[1],
				power: attackPower[1]
			},
			dragonLotus: {
				health: healthArray[2],
				power: attackPower[2]
			},
			chops: {
				health: healthArray[3],
				power: attackPower[3]
			}
		};

		// display random health values in thumbs
		$("#health1").html(boxers.perrier.health);
		$("#health2").html(boxers.boneCrusher.health);
		$("#health3").html(boxers.dragonLotus.health);
		$("#health4").html(boxers.chops.health);
	}

/****** START - CLICK ON BUTTON ELEMENT *********************************************/
	$("button").on("click", function() {

/****** BOXERS ARE CHOSEN ***********************************************************/
		// Make sure the 'BOX' button is hidden
		if (BOXbtn.css("display") == "none") {
			// boxer1 selection
			if (boxer1Id == undefined) {
				boxer1Id = $(this).attr("id"); // capture the 'id' value
				$(this).css("display", "none"); // hide thumbnail				
				$("<img>") // create an img element
				.attr("src", "assets/images/" + boxer1Id + ".png") // set 'src' attr
				.appendTo($("#boxer1")); // append img element to boxer1
				$("#thumbsCont").children("button").removeClass("thumb").addClass("thumbRed"); // color the thumbnail borders red
				$("#crowd")[0].play(); // play crowd audio (ensures that crowd plays on boxer1 pick after a draw)
				$("h1").html("Choose an Opponent");// change H1 innerHTML				
				$("#donKing").slideDown("slow"); // bring in Don King
				// Don King voice bubble			
				voiceBubble.attr({src: "assets/images/showMoney.png", id: "vBubble", style: "position:absolute; bottom:250px; right:200px; width:200px; display:none"}) // set attributes				
				.appendTo($("#bottomPush")); // append to bottom of page
				// timer to delay voice bubble until Don King is on screen
				setTimeout(function() {
					voiceBubble.slideDown("fast"); // show voice bubble
				}, 1000);
			}
			// boxer2 selection
			else if (boxer2Id == undefined){
				
				boxer2Id = $(this).attr("id"); // capture the 'id' value
				$(this).css("display", "none"); // hide thumbnail				
				$("<img>") // create an img element
				.attr("src", "assets/images/" + boxer2Id + ".png") // set 'src' attr
				.appendTo($("#boxer2")) // append img element to boxer2
				$("#contenders").css("opacity", "1"); // show 'contenders' message
				$(".health").css("opacity", "1"); // show 'health' info

				// check if this is final opponent
				if (counter > 1) {
					// timer to display final opponent message
					setTimeout(function() {
						voiceBubble.hide();
						voiceBubble.attr("src", "assets/images/doThis.png"); // set new voice bubble img
						voiceBubble.slideDown("fast");
					}, 1000); // hide voice bubble
					$("#contenders").css("opacity", "0"); // hide 'contenders' message
					$("#finalBanner").slideDown("slow"); // show 'Event of the Century' message
					$("#crowd")[0].play(); // play crowd audio					
				}
				// timer to delay hiding Don King in case boxer2 quickly selected (leaves voice bubble on screen)
				else {
					setTimeout(function() {
						$("#donKing").slideUp("slow"); // hide Don King
						voiceBubble.hide();
					}, 1000); // hide voice bubble
				}				

/************** HEALTH AND POWER IS ASSIGNED ***************************************/
				// assign and display health points above boxer 1
				switch (boxer1Id) {
			        case "perrier":
			            boxer1Hlth = boxers.perrier.health;
			            break;
			        case "boneCrusher":
			            boxer1Hlth = boxers.boneCrusher.health;
			            break;
			        case "dragonLotus":
			            boxer1Hlth = boxers.dragonLotus.health;
			            break;
			        case "chops":
			            boxer1Hlth = boxers.chops.health;
			            break;
			    }
				$("#hlthBoxer1").html(boxer1Hlth);
				
				// assign and display health points above boxer 2
				switch (boxer2Id) {
			        case "perrier":
			            boxer2Hlth = boxers.perrier.health;
			            break;
			        case "boneCrusher":
			            boxer2Hlth = boxers.boneCrusher.health;
			            break;
			        case "dragonLotus":
			            boxer2Hlth = boxers.dragonLotus.health;
			            break;
			        case "chops":
			            boxer2Hlth = boxers.chops.health;
			            break;
			    }			    
				$("#hlthBoxer2").html(boxer2Hlth);

			    // assign attack power to boxer 1
				switch (boxer1Id) {
			        case "perrier":
			            boxer1Attk = boxers.perrier.power;
			            break;
			        case "boneCrusher":
			            boxer1Attk = boxers.boneCrusher.power;
			            break;
			        case "dragonLotus":
			            boxer1Attk = boxers.dragonLotus.power;
			            break;
			        case "chops":
			            boxer1Attk = boxers.chops.power;
			            break;
			    }
			    boxer1AttkOrig = boxer1Attk; // sets a static attack value that gets added to attack power with each round

				// assign attack power to boxer 2
				switch (boxer2Id) {
			        case "perrier":
			            boxer2Attk = boxers.perrier.power;
			            break;
			        case "boneCrusher":
			            boxer2Attk = boxers.boneCrusher.power;
			            break;
			        case "dragonLotus":
			            boxer2Attk = boxers.dragonLotus.power;
			            break;
			        case "chops":
			            boxer2Attk = boxers.chops.power;
			            break;
			    }

				$("h1").css("display", "none"); // hide the 'h1' message				
				BOXbtn.css("display", "block"); // show the 'BOX' button
			}
			else  {
				return false; // stops thumbnails from being selected after 2 boxers are chosen
			}
		}

		// If the 'BOX' button is visible
		else if ($(this).attr("id") != "boxBtn") { // check if they clicked on a button other than 'BOX' button
			// triggered when a contender thumbnail is clicked and 2 boxers have already been selected
			return false;			
		}

/****** 'BOX' BUTTON WAS CLICKED - RUN THE MATCH ************************************/
		else {
			BOXbtn.css("display", "none"); // hide the 'BOX' button			
			$("#oneRing")[0].play(); // play one bell ring audio
			$("#donKing").slideUp("slow"); // hide Don King
			voiceBubble.hide();
			// play punches audio x2
			setTimeout(function() {
				if (punchCounter % 2 === 0) {
			   		$("#punches")[0].play();
			   	}
			   	else {
			   		$("#punch")[0].play();
			   	}
			   	punchCounter++;
			}, 1000);
			boxer1Hlth = boxer1Hlth - boxer2Attk; // calculate health damage of boxer1
			boxer2Hlth = boxer2Hlth - boxer1Attk; // calculate health damage of boxer2
			// timer to delay round results for readability
			setTimeout(function() {
				$("h1").css("display", "block"); // show the 'h1' message field
				$("h1").html("You lost " + boxer2Attk + " health points - " + " Your opponent lost " + boxer1Attk); // change H1 innerHTML to display results of round
				$("#hlthBoxer1").html(boxer1Hlth); // display boxer1 new health points
				$("#hlthBoxer2").html(boxer2Hlth); // display boxer2 new health points		
			}, 3000);
			
			// WINNER
			if (boxer2Hlth < 1 && boxer1Hlth > 0) {
				// timer to delay message for readability
				setTimeout(function() {
					$("h1").html("You won the match"); // change H1 innerHTML to display results of round				
					$("#crowd")[0].play(); // play crowd audio
					$("#threeRings")[0].play(); // play three bell rings audio
					$(".health").css("opacity", "0"); // hide health info					
					$("#donKing").slideDown("slow"); // bring in Don King
					// timer to delay voice bubble until Don King on screen
					setTimeout(function() {
						if (roundCounter === 2) {
							voiceBubble.attr("src", "assets/images/3rounds.png"); // set new voice bubble img
							voiceBubble.slideDown("fast"); // show voice bubble
							roundCounter = 0;
						}
						else if (roundCounter === 7) {
							voiceBubble.attr("src", "assets/images/8rounds.png"); // set new voice bubble img
							voiceBubble.slideDown("fast"); // show voice bubble
							roundCounter = 0;
						}
						else {
							voiceBubble.attr("src", "assets/images/gotHeart.png"); // set new voice bubble img
							voiceBubble.slideDown("fast"); // show voice bubble
							roundCounter = 0;
						}
					}, 1000);
				}, 5000);
				counter++;
				// check if opponents available
				if (counter < 3) {
					// timer to delay message for readability
					setTimeout(function() {						
						$("h1").html("Choose Your Next Opponent"); // return H1 innerHTML to original state
						$("#boxer2").empty("<img>"); // remove boxer2 from ring
						boxer2Id = undefined; // reset boxer2 variable
					}, 7000);
				}
				// if no opponents available
				else {
					// timer to delay message for readability
					setTimeout(function() {
						$("#contenders").css("opacity", "0"); // hide 'contenders' message
						$("h1").html("CHAMPION of the WORLD!");// change H1 innerHTML to display final message
						$("#donKing").slideDown("slow"); // bring in Don King
						// timer to hide and show new voice bubble after Don King on screen
						setTimeout(function() {
							voiceBubble.hide(); // hide current voice bubble message
							voiceBubble.attr("src", "assets/images/sureThing.png"); // set new img attribute
							voiceBubble.slideDown("fast"); // show voice bubble
						}, 1000);
						resetGame();
					}, 7000);
				}
			}
			// LOSER
			else if (boxer1Hlth < 1 && boxer2Hlth > 0) {
				// timer to delay message for readability
				setTimeout(function() {
					$("h1").html("You lost the match - GAME OVER");// change H1 innerHTML to display results of round	
					$("#crowd")[0].play(); // play crowd audio
					$("#threeRings")[0].play(); // play three bell rings audio
					$("#donKing").slideDown("slow"); // bring in Don King
					// timer to delay voice bubble until Don King on screen
					setTimeout(function() {
						voiceBubble.attr("src", "assets/images/wantIt.png"); // set new img attribute
						voiceBubble.slideDown("fast"); // show voice bubble
					}, 1000);
					resetGame();
				}, 5000);									
			}				
			// DRAW
			else if (boxer1Hlth < 1 && boxer2Hlth < 1) {
				// timer to delay message for readability
				setTimeout(function() {
					$("h1").html("It's a draw - No decision!");// change H1 innerHTML to display results of round
					// play crowd audio
					$("#crowd")[0].play(); // play crowd audio
					$("#threeRings")[0].play(); // play three bell rings audio
					$("#donKing").slideDown("slow"); // bring in Don King
					// timer to delay voice bubble until Don King on screen
					setTimeout(function() {
						voiceBubble.attr("src", "assets/images/ahead.png"); // set new img attribute
						voiceBubble.slideDown("fast"); // show voice bubble
					}, 1000);
					counter++;
					resetGame();
				}, 5000);
			}
			// run again for continuing rounds
			else {
				// timer to delay round results messages
				setTimeout(function() {
					boxer1Attk = boxer1Attk + boxer1AttkOrig; // increase boxer1 attack power by original amount				
					$("h1").css("display", "none"); // hide the 'h1' message
					BOXbtn.css("display", "block"); // show the 'BOX' button
				}, 5000);
				roundCounter++;
			}

/********** RESET THE GAME FOR LOSE / DRAW SCENARIOS ********************************/
			function resetGame() {
				// timer to delay automatic reset at end of matches
				setTimeout(function() {
					$("#contenders").css("opacity", "0"); // hide 'contenders' message
					$("#thumbsCont").children("button").removeClass("thumbRed").addClass("thumb"); // return thumbnails to original state
					$(".thumb").show(); // show all thumbnails
					$("#finalBanner").hide(); // hide 'Event of the Century' message
					$("h1").html("Choose Your Boxer"); // return H1 innerHTML to original state
					$(".health").css("opacity", "0"); // hide health info				
					$("#boxer1").empty("<img>"); // remove boxer1 from ring
					$("#boxer2").empty("<img>"); // remove boxer2 from ring
					boxer1Id = undefined; // reset boxer1 variable
					boxer2Id = undefined; // reset boxer2 variable
					counter = 0;
					punchCounter = 0;
					roundCounter = 0;
					healthPower(); // reset health and attack power variables
				}, 3000);
			}
		}
	});
});