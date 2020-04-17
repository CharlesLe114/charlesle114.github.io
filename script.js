/*Gloabal variables */
let doorImage1 = document.querySelector("#door1");
let doorImage2 = document.querySelector("#door2");
let doorImage3 = document.querySelector("#door3");

let numClosedDoors = 3;

let openDoor1;
let openDoor2;
let openDoor3;

const botDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/robot.svg";
const beachDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/beach.svg";
const spaceDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/space.svg";
const closedDoorPath =
  "https://s3.amazonaws.com/codecademy-content/projects/chore-door/images/closed_door.svg";

let startButton = document.querySelector("#start");

let currentScoreDisplay = document.querySelector("#score-number");
let bestScoreDisplay = document.querySelector("#high-score-number");

let currentScore = 0;
let bestScore = 0;

let currentlyPlaying = true;
/*Link to door in HTML file and make it clickable(change to robot)*/
const isBot = (door) => {
  return door.src === botDoorPath ? true : false;
};

const isClicked = (door) => {
  return door.src !== closedDoorPath ? true : false;
};

const playDoor = (door) => {
  numClosedDoors--;
  if (numClosedDoors === 0) {
    gameOver("win");
  } else if (isBot(door)) {
    gameOver();
  }
};
/*------------------------------------------------------------------------------------------*/

const randomChoreDoorGenerator = () => {
  const choreDoor = Math.floor(Math.random() * numClosedDoors);
  switch (choreDoor) {
    case 0:
      openDoor1 = botDoorPath;
      openDoor2 = beachDoorPath;
      openDoor3 = spaceDoorPath;
      break;
    case 1:
      openDoor2 = botDoorPath;
      openDoor1 = spaceDoorPath;
      openDoor3 = beachDoorPath;
      break;
    case 2:
      openDoor3 = botDoorPath;
      openDoor2 = spaceDoorPath;
      openDoor1 = beachDoorPath;
      break;
    default:
      break;
  }
};
randomChoreDoorGenerator();

/*------------------------------------------------------------------------------------------*/
doorImage1.onclick = () => {
  if (!isClicked(doorImage1) && currentlyPlaying) {
    doorImage1.src = openDoor1;
    playDoor(doorImage1);
  }
};

doorImage2.onclick = () => {
  if (!isClicked(doorImage2) && currentlyPlaying) {
    doorImage2.src = openDoor2;
    playDoor(doorImage2);
  }
};

doorImage3.onclick = () => {
  if (!isClicked(doorImage3) && currentlyPlaying) {
    doorImage3.src = openDoor3;
    playDoor(doorImage3);
  }
};

const startRound = () => {
  doorImage1.src = closedDoorPath;
  doorImage2.src = closedDoorPath;
  doorImage3.src = closedDoorPath;
  numClosedDoors = 3;
  startButton.innerHTML = "Good luck!";
  currentlyPlaying = true;
  randomChoreDoorGenerator();
};

startButton.onclick = () => {
  if (!currentlyPlaying) startRound();
};

const updateScore = () => {
  if (!currentlyPlaying) {
    currentScore++;
    bestScore = currentScore > bestScore ? currentScore : bestScore;
    currentScoreDisplay.innerHTML = currentScore;
    bestScoreDisplay.innerHTML = bestScore;
  }
};

const resetScore = () => {
  currentScore = 0;
  currentScoreDisplay.innerHTML = currentScore;
};

/*------------------------------------------------------------------------------------------*/
const gameOver = (status) => {
  if (status === "win") {
    startButton.innerHTML = "You win! Play again?";
    currentlyPlaying = false;
    updateScore();
  } else {
    startButton.innerHTML = "You lose! Play again?";
    currentlyPlaying = false;
    resetScore();
  }
};
