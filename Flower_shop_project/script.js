let dugme = document.getElementById("racunaj");
let reset = document.getElementById("resetuj");

let ruze = document.getElementById("ruze");
let ljiljani = document.getElementById("ljiljani");
let gerberi = document.getElementById("gerberi");

let dodatakBombonjera = document.getElementById("bombonjera");
let dodatakCokolada = document.getElementById("cokolada");
let dodatakSampanjac = document.getElementById("sampanjac");
let divIspis = document.getElementById("ispis");
let kes = document.getElementById("kes");
let kartica = document.getElementById("kartica");
let paragraf = document.createElement("p");


dugme.addEventListener("click", (e) =>{
    e.defaultPrevented;
    divIspis.innerHTML = "";
    let cena = 0;
    ruze.value = parseInt(ruze.value);
    ljiljani.value = parseInt(ljiljani.value);
    gerberi.value = parseInt(gerberi.value);
    if(ruze.value > 0){
        cena = ruze.value * 150;
    }
    if(gerberi.value > 0){
        cena += gerberi.value * 70;
    }
    if(ljiljani.value > 0){
        cena += ljiljani.value * 120;
    }
    if(dodatakBombonjera.checked == true){
        cena += 500;
    }
    if(dodatakCokolada.checked == true){
        cena += 500;
    }
    if(dodatakSampanjac.checked == true){
        cena += 500;
    }

    divIspis.innerHTML = "";

    divIspis.innerHTML = `<h1>${'Vasa porudzbina:'}</h1>`;

    for(let i = 0; i < ruze.value; i++){
        let imgRuze = document.createElement("img");
        imgRuze.src = "ruza.png";
        imgRuze.style.width = "50px";
        imgRuze.style.height = "50px";
        divIspis.appendChild(imgRuze);
    }
    divIspis.innerHTML += `<p></p>`;

    for(let i = 0; i < ljiljani.value; i++){
        let imgLjiljani = document.createElement("img");
        imgLjiljani.src = "ljiljan.png";
        imgLjiljani.style.width = "50px";
        imgLjiljani.style.height = "50px";
        divIspis.appendChild(imgLjiljani);
    }
    divIspis.innerHTML += `<p></p>`;

    for(let i = 0; i < gerberi.value; i++){
        let imgGerber = document.createElement("img");
        imgGerber.src = "gerber.png";
        imgGerber.style.width = "50px";
        imgGerber.style.height = "50px";
        divIspis.appendChild(imgGerber);
    }

    if(dodatakBombonjera.checked == true){
        divIspis.appendChild(paragraf);
        divIspis.innerHTML += `+ bombonjera`;
    }
    if(dodatakCokolada.checked == true){
        divIspis.appendChild(paragraf);
        divIspis.innerHTML += `+ cokolada`;
    }
    if(dodatakSampanjac.checked == true){
        divIspis.appendChild(paragraf);
        divIspis.innerHTML += `+ sampanjac`;
    }
    let cenaPopust = cena - cena * 0.1;

    if(kartica.checked == true && cena > 2000){
        divIspis.style.color = "black";
        divIspis.appendChild(paragraf);
        divIspis.innerHTML += `Cena bez popusta je ${cena}`;
        divIspis.appendChild(paragraf);
        divIspis.innerHTML += `<h3>Cena sa popustom je ${cenaPopust}</h3>`;
    }
    else if(kartica.checked == true){
        divIspis.style.color = "black";
        divIspis.appendChild(paragraf);
        divIspis.innerHTML += `<h3>Cena : ${cena}</h3`;
    }
    else if(kes.checked == true) {
        divIspis.style.color = "black";
        divIspis.appendChild(paragraf);
        divIspis.innerHTML += `<h3>Cena : ${cena}</h3`;
    }
    else{
        divIspis.style.color = "red";
        divIspis.innerHTML = `<h2>Izaberite nacin placanja!</h2>`;
    }
    if(kartica.checked == false && kes.checked == false && ruze.value <= 0 && gerberi.value <= 0 && ljiljani.value <= 0 && dodatakCokolada.checked == false && dodatakBombonjera.checked == false && dodatakSampanjac.checked == false){
        divIspis.style.color = "red";
        divIspis.innerHTML = `<h2>Izaberite proizvode i nacin placanja!</h2>`;
    }
    if((ruze.value <= 0 && gerberi.value <= 0 && ljiljani.value <= 0 && dodatakCokolada.checked == false && dodatakBombonjera.checked == false && dodatakSampanjac.checked == false) && (kes.checked == true || kartica.checked == true)){
        divIspis.style.color = "red";
        divIspis.innerHTML = `<h2>Izaberite proizvode!</h2>`;
    }
});

reset.addEventListener("click", () => {
    document.location.reload(true);
});