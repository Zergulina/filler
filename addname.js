var cookieDict = [];
document.addEventListener("DOMContentLoaded", () => {

    var getCookie = (dict) => {
        splitedCookie = document.cookie.split(";").map(Function.prototype.call, String.prototype.trimStart);
        for (let i = 0; i < 11; i++) {
            dict.push([]);
            for (let j = 0; j < 22; j++) {
                if (splitedCookie[j].split("=")[0].slice(6) == i && splitedCookie[j].split("=")[0].slice(0,6) == 'player'){
                    dict[i][0] = (splitedCookie[j].split("=")[1]);
                    break;
                }
            }
            for (let j = 1; j < 22; j++) {
                if (splitedCookie[j].split("=")[0].slice(6) == i && splitedCookie[j].split("=")[0].slice(0,6) == 'record'){
                    dict[i][1] = (splitedCookie[j].split("=")[1]);
                    break;
                }
            }
        }
    }
    getCookie(cookieDict);
    score = cookieDict[10][1];

    document.getElementById("header-name").textContent = cookieDict[10][0] + ', вы победили!';

    let minIndex = 0;
    for (let i = 0; i < 10; ++i) {
        if (parseInt(cookieDict[i][1]) < cookieDict[minIndex][1]) {
            minIndex = i;
        }
    }
    console.log(document.cookie)
    document.getElementById("back-main-menu").onclick = () => {
        document.cookie = "player" + minIndex + "=" + document.getElementById('nameInput').value;
        console.log(document.getElementById('nameInput').value);
        document.cookie = "record" + minIndex + "=" + cookieDict[10][1];
        console.log(document.cookie)
        window.open("index.html", "_self");
    }

    console.log(cookieDict);
});