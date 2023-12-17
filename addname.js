
document.addEventListener("DOMContentLoaded", () => {
    var cookieDict;

    var getCookie = () => {
        cookieDict = [];
        splitedCookie = document.cookie.split(";").map(Function.prototype.call, String.prototype.trimStart);
        for (let i = 0; i < 22; i += 2) {
            cookieDict[parseInt(i / 2)] = [splitedCookie[i].split("=")[1], splitedCookie[i + 1].split("=")[1]];
        }
    }

    var setCookie = () => {
        for (let i = 0; i < 10; ++i) {
            document.cookie = "player" + i + "=" + cookieDict[i][0];
            document.cookie = "record" + i + "=" + cookieDict[i][1];
        }
    }
    getCookie();
    score = cookieDict[10][1];

    document.getElementById("header-name").textContent = cookieDict[10][0] + ', вы победили!';

    let minIndex = 0;
    for (let i = 0; i < 10; ++i) {
        if (cookieDict[i][1] < cookieDict[minIndex][1]) {
            minIndex = i;
        }
    }

    document.getElementById("back-main-menu").onclick = () => {
        cookieDict[minIndex] = [document.getElementById("nameInput").value, score];
        setCookie();
        window.open("index.html", "_self");
    }
});