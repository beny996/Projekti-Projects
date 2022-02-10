let pitanje1 = {
    tekst: "Izbaciti uljeza",
    odgovori: ["if", "while", "for", "forEach"],
    indeksTacnogOdgovora: 0
}

let pitanje2 = {
    tekst: "Sta znaci skracenica 'PC'?",
    odgovori: ["Racunar", "Mikroracunar", "Personalni racunar", "Mikroframe racunar za jednog korisnika"],
    indeksTacnogOdgovora: 2
}

let pitanje3 = {
    tekst: "Izbaciti uljeza",
    odgovori: ["Windows", "Linux", "MacOS", "PowerPoint"],
    indeksTacnogOdgovora: 3
}

let pitanje4 = {
    tekst: "Softver za obradu slika je?",
    odgovori: ["Photoshop", "Word", "Excel", "Visusal Studio Code"],
    indeksTacnogOdgovora: 0
}

let pitanje5 = {
    tekst: "Windows je?",
    odgovori: ["Program za editovanje teksta", "Operativni sistem", "Programski jezik", "Racunar"],
    indeksTacnogOdgovora: 1
}

let pitanje6 = {
    tekst: "Izbaciti uljeza",
    odgovori: ["Audi", "Mercedes", "Citroen", "Gorenje"],
    indeksTacnogOdgovora: 3
}

let pitanje7 = {
    tekst: "Izbaciti uljeza",
    odgovori: [".jpg", ".png", ".mp3", ".jpeg"],
    indeksTacnogOdgovora: 2
}

let pitanje8 = {
    tekst: "Koliko bitova sadrzi jedan bajt?",
    odgovori: ["1", "15", "64", "8"],
    indeksTacnogOdgovora: 3
}

let pitanje9 = {
    tekst: "Elon Musk je izvrsni direktor koje kompanije?",
    odgovori: ["Tesla", "Amazon", "Microsoft", "Google"],
    indeksTacnogOdgovora: 0
}

let pitanje10 = {
    tekst: "Ko je napravio Facebook?",
    odgovori: ["Elon Musk", "Jeff Bezos", "Mark Zuckerberg", "Bill Gates"],
    indeksTacnogOdgovora: 2
}

let pitanja = [pitanje1, pitanje2, pitanje3, pitanje4, pitanje5, pitanje6, pitanje7, pitanje8, pitanje9, pitanje10];

let forma = document.getElementById("forma");


function random(niz) {
    let trenutniIndex = niz.length;
    let randomIndex;
    while (trenutniIndex != 0) {
      randomIndex = Math.floor(Math.random() * trenutniIndex);
      trenutniIndex--;
      [niz[trenutniIndex], niz[randomIndex]] = [
        niz[randomIndex], niz[trenutniIndex]];
    }

    return niz;
}

random(pitanja);


for(let i = 0; i < pitanja.length / 2; i++){
    let div = document.createElement("div");
    div.setAttribute("class", "container");
    let tekst = document.createElement("h3");
    
    pitanja[i].odgovori.forEach((o, indeks) => {
        let labela = document.createElement("label");
        let odgovori = document.createElement("input");
        labela.setAttribute(`for`, `${o}`)
        labela.style.display = "table";
        odgovori.setAttribute('id', `${o}`);
        odgovori.setAttribute("type", "radio")
        odgovori.setAttribute(`name`, `${i}`);
        odgovori.setAttribute(`value`, `${indeks}`); 
        labela.innerHTML += o;
        labela.appendChild(odgovori);
        if(indeks == pitanja[i].indeksTacnogOdgovora){
            odgovori.setAttribute("class", "tacan")
        }
        div.appendChild(labela);
    });
 
    tekst.innerHTML = `${i+1}. `;
    tekst.innerHTML +=  pitanja[i].tekst;
    tekst.style.padding = "0px";
    tekst.style.margin = "0px";
    div.appendChild(tekst);
    div.insertBefore(tekst, div.firstChild);
    forma.appendChild(div);
}


let posalji = document.createElement("input");
posalji.setAttribute("type", "button");
posalji.setAttribute("value", "Posalji odgovore");

let tacanOdgovor = document.getElementsByClassName("tacan");
let ispisOdgovori = document.createElement("div");
ispisOdgovori.setAttribute("class", "ispis");

posalji.addEventListener("click", () => {
    ispisOdgovori.innerHTML = "";
    let radio = document.querySelectorAll("input[type='radio']");
    for(let i = 0; i < radio.length; i++){
        radio[i].disabled = true;
    }
    for(let i = 0; i < tacanOdgovor.length; i++){
        if(tacanOdgovor[i].checked){
            ispisOdgovori.innerHTML += `<h3 style = "color: green">Tacno ste odgovorili na pitanje broj ${i+1}</h3>`;
        }
        else{
            ispisOdgovori.innerHTML += `<h3 style = "color: red">Netacno ste odgovorili na pitanje broj ${i+1}</h3>`;
        }
    }
    forma.appendChild(ispisOdgovori);

});

let novaPitanja = document.createElement("input");
novaPitanja.setAttribute("type", "reset");
novaPitanja.setAttribute("value", "Nova pitanja");

novaPitanja.addEventListener("click", () => {
    document.location.reload(true);
});

forma.appendChild(posalji);
forma.appendChild(novaPitanja);
document.body.appendChild(forma);