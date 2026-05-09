const list = document.querySelector("tbody");
const games_owned = document.querySelector("#games_count");

const url = "http://localhost:3000/games";
const game_icon_url = "https://media.steampowered.com/steamcommunity/public/images/apps/"




const getGames = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        games_owned.innerHTML = result.games_count
        return result.games;
    } catch (error) {
        console.log(error.message);
    }
}


const addGamesToTable = async () => {
    const games = await getGames();
    for (let i = 0; i < games.length; i++) {
        const row = list.insertRow(i);
        const col1 = row.insertCell(0);
        const col2 = row.insertCell(1);
        const col3 = row.insertCell(2);
        const col4 = row.insertCell(3);

        const img = document.createElement("img");
        img.src = `${game_icon_url}/${games[i].appid}/${games[i].img_icon_url}.jpg`;
        img.style.height = "50px";
        img.style.width = "50px"
        col1.appendChild(img);

        col2.innerHTML = games[i].name;
        col3.innerHTML = (games[i].playtime_forever / 60).toFixed(1) + " tuntia";
        col4.innerHTML = timeConverter(games[i].rtime_last_played)
    }
}


const timeConverter = (UNIX_timestamp) => {
        const a = new Date(UNIX_timestamp * 1000);
        const year = a.getFullYear();
        const month = a.getMonth();
        const date = a.getDate();
        return date + "." + month + "." + year;
    }


addGamesToTable();
