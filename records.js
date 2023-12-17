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

var initRecords = () => {
    let dict = [];
    getCookie(dict);
    newDict = dict.slice(0,10).sort((a, b) => b[1] - a[1])
    console.log(document.cookie)
    for (let i = 0; i < 10; i++) {
        document.getElementById("p" + i).textContent = i + 1 + ". " + newDict[i][0] + ": " + newDict[i][1];
    }

}

document.addEventListener("DOMContentLoaded", initRecords);