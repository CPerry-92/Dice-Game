// Math Functions

Math.randomDec = function (low, high) {
  return Math.random() * (high - low) + low;
};

Math.randomInt = function (low, high) {
  return Math.floor(Math.randomDec(low, high));
};

Math.roundTo = function (num, numPlaces) {
  nun = num * 10 ** numPlaces;
  num = Math.round(num);
  return num / 10 ** numPlaces;
};

// Player Objects

let player1 = {
  totalPoints: 0,
  turnPoints: 0,
  id: "p1",
};

let player2 = {
  totalPoints: 0,
  turnPoints: 0,
  id: "p2",
};

// Work around to stop P2 section showing as active whilst P1 playing
document.getElementById("p2-header").classList.remove("active");

// Click Event Listeners
document.getElementById("p1-roll").addEventListener("click", function () {
  playerRoll(player1);
});
document.getElementById("p1-hold").addEventListener("click", function () {
  playerHold(player1);
});
document.getElementById("p2-roll").addEventListener("click", function () {
  playerRoll(player2);
});
document.getElementById("p2-hold").addEventListener("click", function () {
  playerHold(player2);
});

// Event Functions
function playerRoll(aPlayer) {
  // Use Math Function to generate number between 1-6
  let rollNum = Math.randomInt(1, 7);
  // Update the Dice image to represent number
  document.getElementById(aPlayer.id + "-dice-img").src =
    "./dice" + rollNum + ".png";
  // Check dice roll and act accordingly
  if (rollNum != 1) {
    // Update Points
    aPlayer.turnPoints += rollNum;
    document.getElementById(aPlayer.id + "-turn-points").innerHTML =
      aPlayer.turnPoints;
  } else {
    // Lose points
    aPlayer.turnPoints = 0;
    document.getElementById(aPlayer.id + "-turn-points").innerHTML =
      aPlayer.turnPoints;
    // Switch Player
    if (aPlayer.id === "p1") {
      switchTurn("p1", "p2");
    } else {
      switchTurn("p2", "p1");
    }
  }
}

function playerHold(aPlayer) {
  // Add Turn-Points to Total-Points
  aPlayer.totalPoints += aPlayer.turnPoints;
  document.getElementById(aPlayer.id + "-points").innerHTML =
    aPlayer.totalPoints;
  // Check for Win
  if (aPlayer.totalPoints >= 20) {
    alert("Winner!");
    document.location.reload();
  } else {
    // Reset Turn-Points
    aPlayer.turnPoints = 0;
    document.getElementById(aPlayer.id + "-turn-points").innerHTML = 0;

    // Switch Player
    if (aPlayer.id === "p1") {
      switchTurn("p1", "p2");
    } else {
      switchTurn("p2", "p1");
    }
  }
}

// Switch Player Function
function switchTurn(id1, id2) {
  document.getElementById(id1 + "-header").classList.remove("active");
  document.getElementById(id2 + "-header").classList.add("active");
  document.getElementById(id1 + "-roll").disabled = true;
  document.getElementById(id1 + "-hold").disabled = true;
  document.getElementById(id2 + "-roll").disabled = false;
  document.getElementById(id2 + "-hold").disabled = false;
}
