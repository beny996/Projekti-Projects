class Chatroom {
    constructor(r, u) {
        this.room = r;
        this.username = u;
        this.chats = db.collection("chats");
        this.unsub = false;
    }

    set room(r) {
        this._room = r;
    }

    get room() {
        return this._room;
    }

    set username(u) {
        let uTrim = u.trim();
        if(uTrim.length < 2 || uTrim.length > 10){
            alert("Korisnicko ime mora da sadrzi između 2 i 10 karaktera!");
        }
        else{
            this._username = uTrim;
        }
    }

    get username() {
        return this._username;
    }

    async addChat(msg) {
        let time = new Date();
        let timeTS = firebase.firestore.Timestamp.fromDate(time);
        
        let response = await this.chats.add({
            message: msg,
            username: this.username,
            room: this.room,
            created_at: timeTS
        });
        return response; // Vracam promise i mogu za njega da kazem .then() i .catch()    
    }

    getChats(callback) {
        this.unsub = this.chats
        .where("room", "==", this.room)
        .orderBy("created_at", "asc")
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                
                // Ispisati dokumente koji su dodati u bazu
                if(change.type == "added"){
                    callback(change.doc);
                }
            });
        });
    }

    updateUsername(username) {
        this.username = username;
    }

    updateRoom(room) {
        this.room = room;
        if(this.unsub != false){ //Unsub nije vise false nego je postao funkcija
            this.unsub(); //Unsub je sada fukncija i poziva se sa ()
        }
    }

    deleteMsg(id) {
        this.chats
        .doc(id)
        .delete()
        .then( () => {
            console.log(`Uspesno obrisana poruka`);
        })
        .catch(err => {
            console.log(`Desila se greska prilikom brisanja : ${err}`);
        });
    }

    dateFilter(callback, date1, date2) {
        this.unsub = this.chats
        .where("room", "==", this.room)
        .where("created_at", ">=", date1)
        .where("created_at", "<=", date2)
        .orderBy("created_at", "asc")
        .onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                
                // Ispisati dokumente koji su dodati u bazu
                if(change.type == "added"){
                    callback(change.doc);
                }
            });
        });
    }
}

export default Chatroom;