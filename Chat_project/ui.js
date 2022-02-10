class ChatUI {
    constructor(l) {
        this.list = l;
    }

    set list(l) {
        this._list = l;
    }

    get list() {
        return this._list;
    }

    templateLI(doc) {
        let id = doc.id;
        let d = doc.data();
        let li;
        if(d.username == localStorage.username){
            li = `<li class="right" id="${id}"><span>${d.username}</span>: ${d.message} <br> ${this.formatDate(d)} <img src ="https://previews.123rf.com/images/tifani1/tifani11801/tifani1180100203/93475788-trash-bin-vector-icon-.jpg"></li>`
        }
        else{
            li = `<li class="left" id="${id}"><span>${d.username}</span>: ${d.message} <br> ${this.formatDate(d)} <img src ="https://previews.123rf.com/images/tifani1/tifani11801/tifani1180100203/93475788-trash-bin-vector-icon-.jpg"></li>`
        }

        this.list.innerHTML += li;
    }

    formatDate(d) {
        let date = d.created_at.toDate();
        let day = date.getDate();
        let month = date.getMonth()+1;
        let year = date.getFullYear();
        let hour = date.getHours();
        let minute = date.getMinutes();
        day = String(day).padStart(2, "0");
        month = String(month).padStart(2, "0");
        minute = String(minute).padStart(2, "0");
        if(day == new Date().getDate()){
            let dateFormat = `${hour}:${minute}`;
            return dateFormat;
        }
        else{
            let dateFormat = `${day}. ${month}. ${year} - ${hour}:${minute}`;
            return dateFormat;
        }
    }

    clear() {
        this.list.innerHTML = "";
    }
}

export default ChatUI;