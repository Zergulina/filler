var getCookie = (dict) => {
    splitedCookie = document.cookie.split(";").map(Function.prototype.call, String.prototype.trimStart);
    for (let i = 0; i < 22; i += 2) {
        dict[i] = [splitedCookie[i].split("=")[1], splitedCookie[i + 1].split("=")[1]];
    }
}

var initRecords = () => {
    let dict = [];

    getCookie(dict);

    dict.sort((a,b) => b[1] - a[1])

    for (let i = 0; i < 10; ++i) {
        document.getElementById("p"+i).textContent = i+1 + ". " + dict[i][0] + ": " + dict[i][1];
    }

}

document.addEventListener("DOMContentLoaded", initRecords);