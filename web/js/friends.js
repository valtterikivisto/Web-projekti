
const list = document.querySelector("tbody");


const url = "http://localhost:3000/friends";
const base_url = "http://localhost:3000/";

const getFriends = async () => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Response status: ", response.status);
        }
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error.message);
    }
}

const addFriendsToTable = async () => {
    const friends_list = await getFriends();
    
    
    for (let i = 0; i < friends_list.length; i++) {
        const row = list.insertRow(i);
        const col1 = row.insertCell(0);
        const col2 = row.insertCell(1);
        const col3 = row.insertCell(2);
        const col4 = row.insertCell(3);

        const img = document.createElement("img");
        img.src = friends_list[i].avatarmedium;
        col1.appendChild(img);
        col2.innerHTML = friends_list[i].personaname;
        col3.innerHTML = readStatus(friends_list[i].personastate);
        col4.innerHTML = friends_list[i].friends_since;

    }
}

const test = async () => {
    const me = await getMe();
    
    
    for (let i = 0; i < 5; i++) {
        const row = list.insertRow(i);
        const col1 = row.insertCell(0);
        const col2 = row.insertCell(1);
        const col3 = row.insertCell(2);
        const col4 = row.insertCell(3);


        const img = document.createElement("img");
        img.src = me.avatarmedium;
        col1.appendChild(img);
        col2.innerHTML = me.personaname;
        col3.innerHTML = readStatus(me.personastate);
        col4.innerHTML = "5.2.2020";

    }
}

const readStatus = (status) => {
    switch (status) {
        case 0:
            return "Offline";
        case 1:
            return "Online";
        case 2:
            return "Busy";
        case 3:
            return "Away";
        case 4:
            return "Snooze";
        case 5:
            return "Looking to trade"
        case 6:
            return "Looking to play";
        default:
            return "Offline";
    }
}



addFriendsToTable();