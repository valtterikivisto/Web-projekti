const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;


app.use(cors());

const base_url = "https://api.steampowered.com/ISteamUser/";
const games_url = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/"
const api_key = "9AE063C14074063D148A9A1EE85FDD96"; // API-key here
const profile_id = "76561198330315604";

app.get("/", async (request, response, next) => {
    const info = await getInfo(profile_id);
    response.json(info);
});

app.get("/friends", async (request, response, next) => {
    const info = await getFriends();
    response.json(info);
});

app.get("/games", async(request, response, text) => {
    const info = await getGames();
    response.json(info);
})


const getInfo = async (id) => {
    const url = `${base_url}GetPlayerSummaries/v0002/?key=${api_key}&steamids=${id}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status1: ${response.status}`);
        }
        const result = await response.json();
        const info = result.response.players[0];
        return info;
    } catch (error) {
        console.log(error.message);
    }

}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const getFriends = async () => {
    const url = `${base_url}GetFriendList/v0001/?key=${api_key}&steamid=${profile_id}&relationship=friend`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status1: ${response.status}`);
        }
        const result = await response.json();
        const friends_list = result.friendslist.friends;

        const batch_size = 5;
        const friends = [];

        for (let i = 0; i < friends_list.length; i += batch_size) {
            const batch = friends_list.slice(i, batch_size + i);
            const batchPromises = batch.map(friend => (getInfo(friend.steamid)));
            
            const batchResults = await Promise.all(batchPromises);

            friends.push(...batchResults);
            if (i + batch_size < friends_list.length) {
                await delay(500); // To prevent api rate limiting
            }
        }
        for (let i = 0; i < friends_list.length; i++) {
            friends[i].friends_since = timeConverter(friends_list[i].friend_since)
        }
        
        return friends; 
        } catch (error) {
            console.log(error.message)
        }
            
    }

const getGames = async () => {
    const url = `${games_url}?key=${api_key}&steamid=${profile_id}&include_appinfo=true`; 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        const result = await response.json();
        const info = {"games_count": result.response.game_count, "games": result.response.games};
        return info;
    } catch (error) {
        console.log(error.message);
    }

}    



const timeConverter = (UNIX_timestamp) => {
        const a = new Date(UNIX_timestamp * 1000);
        const year = a.getFullYear();
        const month = a.getMonth();
        const date = a.getDate();
        return date + "." + month + "." + year;
    }




    app.listen(port);