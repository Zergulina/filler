var gameInit = () => {
    if (document.cookie.length == 0) {
        for (let i = 0; i < 11; ++i) {
            document.cookie = "player" + i + "=_____";
            document.cookie = "record" + i + "=0";
        }
    }
}

document.addEventListener("DOMContentLoaded", gameInit);