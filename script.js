
document.addEventListener("DOMContentLoaded", function () {
  let pinkScore = 1;
  let aquaScore = 1;
  let prevAquaCounter = 1;
  let prevPinkCounter = 1;
  var currentPlayer = 'aqua';
  var changePlayerFlag = false;
  var tileMap = [];
  var cookieDict = [];
  const gridContainer = document.getElementById("grid-container");
  fillGrid();

  var checkClick = (currentPlayer, xPos, yPos) => {
    if (xPos > 0 && xPos < 23) {
      if (document.getElementById((xPos - 1) + ';' + (yPos)).style.backgroundColor == currentPlayer ||
        document.getElementById((xPos + 1) + ';' + (yPos)).style.backgroundColor == currentPlayer) {
        return true;
      }
    }
    if (xPos == 0) {
      if (document.getElementById((xPos + 1) + ';' + (yPos)).style.backgroundColor == currentPlayer) {
        return true;
      }
    }
    if (xPos == 23) {
      if (document.getElementById((xPos - 1) + ';' + (yPos)).style.backgroundColor == currentPlayer) {
        return true;
      }
    }
    if (yPos > 0 && yPos < 19) {
      if (document.getElementById((xPos) + ';' + (yPos - 1)).style.backgroundColor == currentPlayer ||
        document.getElementById((xPos) + ';' + (yPos + 1)).style.backgroundColor == currentPlayer) {
        return true;
      }
    }
    if (yPos == 0) {
      if (document.getElementById((xPos) + ';' + (yPos + 1)).style.backgroundColor == currentPlayer) {
        return true;
      }
    }
    if (yPos == 19) {
      if (document.getElementById((xPos) + ';' + (yPos - 1)).style.backgroundColor == currentPlayer) {
        return true;
      }
    }
    return false;
  }

  var recolor = (currentPlayer, color, xPos, yPos) => {
    if (xPos >= 0 && xPos < 24 && yPos >= 0 && yPos < 20) {
      let tile = document.getElementById(xPos + ';' + yPos);
      if (!(tile.style.backgroundColor == color || tile.style.backgroundColor == 'aqua' || tile.style.backgroundColor == 'pink')) {
        return;
      }
      if (tileMap[yPos][xPos] == false) {
        if ((tile.style.backgroundColor == color || tile.style.backgroundColor == currentPlayer) && checkClick(currentPlayer, xPos, yPos)) {
          changePlayerFlag = true;
          tile.style.backgroundColor = currentPlayer;
        }
        tileMap[yPos][xPos] = true;
        recolor(currentPlayer, color, xPos + 1, yPos);
        recolor(currentPlayer, color, xPos - 1, yPos);
        recolor(currentPlayer, color, xPos, yPos + 1);
        recolor(currentPlayer, color, xPos, yPos - 1);
      }
    }
  }

  function fillGrid() {
    var list_colors_grid = [];
    lc = [];
    lc1 = [];
    counter = 0;
    check = 0;
    for (let i = 0; i < 20; i++) {
      tileMap.push([]);
      for (let j = 0; j < 24; j++) {
        const gridItem = document.createElement("div");
        gridItem.classList.add("grid-item");
        list = ["green", "purple", "blue", "red", "yellow", "grey"];
        var randcol = Math.floor(Math.random() * 6);
        var once = 0;
        gridItem.style.backgroundColor = list[randcol];
        if (i == 0 && j == 0) {
          once = 1;
          gridItem.style.backgroundColor = "aqua";
        }
        if (i == 19 && j == 23) {
          once = 2;
          gridItem.style.backgroundColor = "pink";
        }
        if (once == 0) {
          list_colors_grid.push(list[randcol]);
        }
        else {
          if (once == 1) {
            list_colors_grid.push("aqua");
          }
          else {
            list_colors_grid.push("pink");
          }
        }
        tileMap[i].push(false);
        gridItem.id = j + ";" + i;
        gridItem.onclick = () => {
          if (gridItem.style.backgroundColor != 'pink' && gridItem.style.backgroundColor != 'aqua') {
            let xPos = parseInt(gridItem.id.split(';')[0]);
            let yPos = parseInt(gridItem.id.split(';')[1]);
            if (checkClick(currentPlayer, xPos, yPos)) {
              recolor(currentPlayer, gridItem.style.backgroundColor, xPos, yPos);
              if (changePlayerFlag) {
                if (currentPlayer == 'aqua') {
                  currentPlayer = 'pink';
                  document.getElementById("Player_2").classList.add("activePlayer");
                  document.getElementById("Player_1").classList.remove("activePlayer");
                }
                else {
                  currentPlayer = 'aqua';
                  document.getElementById("Player_1").classList.add("activePlayer");
                  document.getElementById("Player_2").classList.remove("activePlayer");
                }
                changePlayerFlag = false;
              }
              checkWin();
              for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 24; j++) {
                  tileMap[i][j] = false;
                }
              }
            }
          }
        }
        gridContainer.appendChild(gridItem);
      }
    }

    var checkWin = () => {
      let aquaCounter = 0;
      let pinkCounter = 0;
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 24; j++) {
          switch (document.getElementById(j + ';' + i).style.backgroundColor) {
            case 'pink': {
              pinkCounter++;
              break;
            }
            case 'aqua': {
              aquaCounter++;
              break;
            }
          }
        }
      }
      aquaScore += Math.pow(aquaCounter - prevAquaCounter, 2);
      pinkScore += Math.pow(pinkCounter - prevPinkCounter, 2);
      let playerName;
      if (aquaCounter > 240) {
        let minIndex = 0;
        getCookie();
        console.log(cookieDict);
        for (let i = 0; i < 10; ++i) {
          if (cookieDict[i][1] < cookieDict[minIndex][1]) {
            minIndex = i;
          }
        }
        if (aquaCounter >= cookieDict[minIndex][1]) {
          playerName = 'Player 1';
          setCookie(playerName, aquaScore);
          window.open("addname.html", "_self")
        }
        else
        window.open("index.html", "_self")
      }
      else if (pinkCounter > 240) {
        let minIndex = 0;
        getCookie();
        console.log(cookieDict);
        for (let i = 0; i < 10; ++i) {
          if (cookieDict[i][1] < cookieDict[minIndex][1]) {
            minIndex = i;
          }
        }
        if (pinkCounter >= cookieDict[minIndex][1]) {
          playerName = 'Player 2';
          setCookie(playerName, pinkScore);
          window.open("addname.html", "_self")
        }
        else
        window.open("index.html", "_self")
      }
      prevAquaCounter = aquaCounter;
      prevPinkCounter = pinkCounter;
      document.getElementById('score_1').textContent = 'Score: ' + aquaScore;
      document.getElementById('score_2').textContent = 'Score: ' + pinkScore;
    }
  }
  var getCookie = () => {
    cookieDict = [];
    console.log(document.cookie);
    splitedCookie = document.cookie.split(";").map(Function.prototype.call, String.prototype.trimStart);
    for (let i = 0; i < 22; i += 2) {
      cookieDict[parseInt(i / 2)] = [splitedCookie[i].split("=")[1], splitedCookie[i + 1].split("=")[1]];
    }
  }

  var setCookie = (playerName, playerScore) => {
    for (let i = 0; i < 10; ++i) {
      document.cookie = "player" + i + "=" + cookieDict[i][0];
      document.cookie = "record" + i + "=" + cookieDict[i][1];
    }
    document.cookie = "player" + 10 + "=" + playerName;
    document.cookie = "record" + 10 + "=" + playerScore;
  }
});