// ------------------- Variabili Globali ------------------------------ \\

var puntitrovati=new Array();
var numpuntitrovati = -1;


// ------------------------- Metodo Scelta ------------------------------------ \\

// viene creato dinamicamante il campo di ricerca e il metodo corrispondente
function ScegliMetodo(scelta) {
    var s;
    switch (scelta) {
        case 0:
            s = "<input  id='Text1' type='text' onkeypress='if (event.keyCode == 13) VisualizzaProvStati(Text1.value)' placeholder='Inserisci lo stato...' />"
            break;

        case 1:
            VisualizzaCapitali("#");
            s = "<input  id=\"Text1\" type=\"text\" value=\"\" onkeypress=\"if (event.keyCode == 13) VisualizzaCapitali(Text1.value)\" placeholder=\"Inserisci un continente...\" />"
            break;

        case 2:
            VisualizzaPop("#");
            s = "<input  id=\"Text1\" type=\"text\" value=\"\" onkeypress=\"if (event.keyCode == 13) VisualizzaPop(Text1.value)\" placeholder=\"Inserisci un continente...\" />"
            break;

        case 3:
            VisualizzaMaxPop("#");
            s = "<input  id=\"Text1\" type=\"text\" value=\"\" onkeypress=\"if (event.keyCode == 13) visualizzaMaxPop(Text1.value)\" placeholder=\"Inserisci un continente...\" />"
            break;
    }

    document.getElementById("P1").innerHTML = s;
}


// -------------------- Medodi Di Ricerca ------------------------------ \\

// 1 \\
function VisualizzaProvStati(chiave) {
    puntitrovati = [];  // azzera vettore
    numpuntitrovati = -1;

    chiave = chiave.toUpperCase();

    for (var i = 0; i < DB.Punti.length; i++) {

        des = DB.Punti[i].SOV0NAME.toUpperCase();
        if (des.indexOf(chiave) >= 0) {
            numpuntitrovati++;
            puntitrovati[numpuntitrovati] = DB.Punti[i];
        }
    }
    MostraAlert(numpuntitrovati);
}

// 2 \\
function VisualizzaCapitali(chiave) {
    var cont;
    puntitrovati = [];
    numpuntitrovati = -1;

    // se non è specificato un continente
    if (chiave == "#") {
       for (var i = 0; i < DB.Punti.length; i++) {
            des = DB.Punti[i].FEATURECLA;
            if (des == "Admin-0 capital") {
                numpuntitrovati++;
                puntitrovati[numpuntitrovati] = DB.Punti[i];
            }
        }			
    }
    else {
        cont = "#";
        chiave = chiave.toUpperCase();
        switch (chiave)
        {
            case "EUROPA":
                cont = "EUROPE/";
                break;
            case "AMERICA":
                cont = "AMERICA/";
                break;
            case "ASIA":
                cont = "ASIA/";
                break;
            case "AFRICA":
                cont = "AFRICA/";
                break;
            default:
                cont = "#########";
                break;
        }

        for (var i = 0; i < DB.Punti.length; i++) {
            des = DB.Punti[i].FEATURECLA;
            // aggiungo nella ricerca il controllo sul continente
            des1 = DB.Punti[i].TIMEZONE.toUpperCase();
            if ((des == "Admin-0 capital") && (des1.indexOf(cont) >= 0)) {
                numpuntitrovati++;
                puntitrovati[numpuntitrovati] = DB.Punti[i];
            }
        }   
    }
    MostraAlert(numpuntitrovati);
}

// 3 \\
function VisualizzaPop(chiave) {
    puntitrovati = [];
    numpuntitrovati = -1;
    
    for (const i = 0; i < DB.Punti.length; i++) {
        if (DB.Punti[i].POP_MAX > 4000000) {
            numpuntitrovati++;
            puntitrovati[numpuntitrovati] = DB.Punti[i];
        }
    }

    MostraAlert(numpuntitrovati);
}

// 4 \\
function VisualizzaMaxPop(chiave) {
    puntitrovati = [];
    numpuntitrovati = -1;
   
    // da fare
     MostraAlert(numpuntitrovati);
}


// ----- Passaggio dei punti trovati al frame che contiene la mappa--- \\

function mappaPunti() {
    var frame = document.getElementById('mappa');

    frame.contentWindow.postMessage(puntitrovati, '*');

}

// ----------------- Controllo alert ---------------------------------- \\

function MostraAlert(numero) {
    if (numero > 0) {
        mappaPunti();
        document.getElementById("Alert").innerHTML = "punti trovati: " + numero;
    }
    else {
        document.getElementById("Alert").innerHTML = "<div class='alert'><span class='closebtn' onclick='this.parentElement.style.display=" + "\"none\"" + ";Text1.value = \"\";'>&times;</span><strong>Attenzione!</strong> Indicare uno Stato/Continente corretto!</div>"
    }

}
