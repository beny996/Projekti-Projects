import Chatroom from "./chat.js";
import ChatUI from "./ui.js";

//DOM
let send = document.getElementById("send");
let inputSend = document.getElementById("inputSend")
let update = document.getElementById("update");
let inputUpdate = document.getElementById("inputUpdate");
let rooms = document.querySelectorAll("#rooms a");
let nameUpdate = document.querySelector("section p");
let ul = document.querySelector("ul");
let updateColor = document.getElementById("updateColor");
let colorChange = document.getElementById("color");
let section = document.querySelector("section");
let dateFilter = document.getElementById("dateFilter")
let date1 = document.getElementById("date1");
let date2 = document.getElementById("date2");



//Objekti klasa
let username = "anonymous";
let room = "general";
if(localStorage.username){
    username = localStorage.username;
}
if(sessionStorage.room){
    room = sessionStorage.room;
}
let chatroom = new Chatroom(room, username);
let chatUI = new ChatUI(ul);


//Highlight default sobe prilikom ucitavanja stranice
window.onload = () => {
    rooms.forEach(room => {
        if(room.innerHTML.includes(sessionStorage.room)){
            room.style.backgroundColor = "rgb(253, 188, 67)";
        }
    });
    if(localStorage.color){
        section.style.backgroundColor = localStorage.color;
        colorChange.value = localStorage.color;
    }
    if(!sessionStorage.room){
        rooms.forEach(room => {
            if(room.innerHTML.includes("general")){
                room.style.backgroundColor = "rgb(253, 188, 67)";
            }
        });
    }
    //Ispis dokumenata iz db na stranici
    chatroom.getChats(d => {
        chatUI.templateLI(d);
    });
    setTimeout(() => {
        section.scrollTop = section.scrollHeight;
    },300);
};


send.addEventListener("click", (e) => {
    e.preventDefault();
    let text = inputSend.value;
    if(text.trim() == ""){
        alert(`Nije moguce poslati praznu poruku`)
    }
    else{
        chatroom.addChat(text)
        .then(() => {
            inputSend.value = "";
        })
        .catch(err => {
            console.log(`Desila se neka greska : ${err}`);
        });
    }
    setTimeout(() => {
        section.scrollTop = section.scrollHeight;
    },100);
});


update.addEventListener("click", (e) => {
    e.preventDefault();
    let username = chatroom.username;
    let text = inputUpdate.value;
    if(text == "admin" || text == "Admin"){
        let promptPass = prompt("Unesite lozinku");
        if(promptPass !== "admin1234"){
            alert("Pogresna lozinka");
        }
        else{
            alert("Uspesno ste se ulogovali kao admin");
            inputUpdate.value = "";
            chatroom.updateUsername(text);
        }
    }
    else{
        chatroom.updateUsername(text);
        if(username != chatroom.username){
            ul.innerHTML = "";
            inputUpdate.value = "";
            nameUpdate.innerHTML = `Promenjeno korisnicko ime (${text})`;
            nameUpdate.style.display = "block";
            setTimeout(() => {
                nameUpdate.style.display = "none";
            }, 3000)
            localStorage.setItem("username", chatroom.username);
            chatroom.getChats(d => {
                chatUI.templateLI(d);
            });
        }
        else{
            inputUpdate.value = "";
        }
    }
});


rooms.forEach(room => {
    room.addEventListener("click", (e) => {
        rooms.forEach(room1 => {
            room1.style.backgroundColor = "purple";
        });
        e.preventDefault();
        chatUI.clear();
        let roomName = room.innerHTML.length -1;
        chatroom.updateRoom(room.innerHTML.slice(-roomName));
        chatroom.getChats(d => {
            chatUI.templateLI(d);
        });
        room.style.backgroundColor = "rgb(253, 188, 67)";
        sessionStorage.setItem("room", room.innerHTML.slice(-roomName));
    });
});

ul.addEventListener("click", e => {
    if(e.target.tagName == "IMG"){
        let id = e.target.parentElement.id;
        if(e.target.parentNode.firstChild.innerHTML == localStorage.username){
            let confirmation = confirm("Da li ste sigurni da zelite da obrisete poruku?");
            if(confirmation) {
                e.target.parentElement.remove();
                chatroom.deleteMsg(id);
                
            }
        }
        else if(chatroom.username == "admin" || chatroom.username == "Admin"){
            e.target.parentElement.remove();
            chatroom.deleteMsg(id);
        }
        else{
            e.target.parentElement.remove();
        }
    }
});


updateColor.addEventListener("click", (e) => {
    e.preventDefault();
    let color = colorChange.value;
    setTimeout(() => {
        section.style.backgroundColor = color;
    }, 500)
    localStorage.setItem("color", color);
});

dateFilter.addEventListener("click", (e) => {
    e.preventDefault();
    let date1T = new Date(date1.value);
    let date2T = new Date(date2.value);
    let date1TS = firebase.firestore.Timestamp.fromDate(date1T);
    let date2TS = firebase.firestore.Timestamp.fromDate(date2T);
    if(date1.value != "" && date2.value != ""){
        chatUI.clear();
        chatroom.dateFilter(d => {
            chatUI.templateLI(d);
        }, date1TS, date2TS);
        date1.value = "";
        date2.value = "";
    }
    else{
        alert("Nisu uneti validni datumi!");
    }
});

inputSend.addEventListener("keydown", (e) => {
    if(e.keyCode === 13 && !e.shiftKey){
        send.click();
    }
});
