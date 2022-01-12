var whoseTurn;
var gameOver;
var gameStarted = false;
var ties = 0;
var colors = ["#005ce6", "red"];
var markers = ["X", "O"];
var players = [];
var playerWins = [0,0];
var totals = [];
var winCodes = [7,56,73,84,146,273,292,448];

function fillDiv(clickedDiv, divValue)
{
	if(gameStarted && !gameOver)
	{
		clickedDiv.style.color = colors[whoseTurn];
		clickedDiv.innerText = markers[whoseTurn];
		totals[whoseTurn] += divValue;
		
		if(isWin())
		{
			document.getElementById("gameMessage").innerText = players[whoseTurn] + " Wins!";
			document.getElementById("submit").className = "hide";
			document.getElementById("playAgain").className = "show";
			document.getElementById("button").style.width = "129px";
			playerWins[whoseTurn]++;
			updateScore();
		}
		else if(gameOver)
		{
			document.getElementById("gameMessage").innerText = "Tie Game!";
			document.getElementById("submit").className = "hide";
			document.getElementById("playAgain").className = "show";
			document.getElementById("button").style.width = "129px";
			ties++;
			document.getElementById("ties").innerText = "Ties: " + ties;
		}
		else
		{
			clickedDiv.attributes["0"].nodeValue = "";
			whoseTurn == 0 ? whoseTurn = 1:whoseTurn = 0;
			document.getElementById("gameMessage").innerText = "It's " + players[whoseTurn] + "'s Turn";
		}
	}
}

function isWin()
{
	for(i = 0; i < winCodes.length; i++)
	{
		if ((totals[whoseTurn] & winCodes[i]) == winCodes[i]) 
		{
			gameOver = true; 
			return true;
		}
	}

	if (totals[0] + totals[1] == 511)
		gameOver = true;
	
	return false;
}

function startGame()
{
	if(document.getElementById("player1").value != "" && document.getElementById("player2").value != "")
	{
		document.getElementById("player1").className = "hide"
		document.getElementById("player2").className = "hide"
		document.getElementById("submit").className = "hide"
		
		if(!gameStarted)
			playerWins = [0,0];
		
		gameStarted = true;
		gameOver = false;
		whoseTurn = 0;
		totals = [0,0];
		
		players[0] = document.getElementById("player1").value;
		players[1] = document.getElementById("player2").value;
		
		document.getElementById("gameMessage").innerText = "It's " + players[whoseTurn] + "'s Turn";
		updateScore();
	}
	else
		document.getElementById("gameMessage").innerText = "Please Enter Player Names";
}

function updateScore()
{
	document.getElementById("scorePlayer1").innerHTML = "<h2>" + players[0] + "'s Wins:</h2><p>0" + playerWins[0] + "</p>";
	document.getElementById("scorePlayer2").innerHTML = "<h2>" + players[1] + "'s Wins:</h2><p>0" + playerWins[1] + "</p>";
}

function loadGame(){
	var counter = 1;
	var innerDivs = "<div id='tieGame'><h2 id='ties'>Ties: " + ties + "</div>";

	for (i = 1; i <= 3; i++)
		{
			innerDivs += '<div id="row' + i + '">';
			for(j = 1; j <= 3; j++)
			{
				innerDivs += '<div onclick="fillDiv(this,' + counter + ');"></div>';
				counter *= 2;
			}
			innerDivs += "</div>";
		}
	document.getElementById("gameBoard").innerHTML = innerDivs;
	
	if (gameStarted)
		startGame();
}