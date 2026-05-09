const profile_image = document.querySelector("img");
const profile_name = document.getElementById("profile-name");
const profile_status = document.getElementById("status");

const base_url = "http://localhost:3000/";


const getInfo = async () => {
    try {
        const response = await fetch(base_url);
        if (!response.ok) {
            throw new Error("Response status: ", response.status);
        }
        const result = await response.json();

        profile_image.src = result.avatarfull;
        profile_name.innerHTML = result.personaname;
        profile_status.innerHTML = readStatus(result.personastate);
    } catch (error) {
        console.log(error.message);
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


getInfo();