window.onload = function(){tableNationCity()};

/* creazione tabella */
function tableNationCity() 
{
    s = "<thead>"
        + "<tr>"
        + "<th>" + "NATION" + "</th>" 
        + "<th>" + "CITY" + "</th>" 
        + "<th>" + "LATITUDE" + "</th>" 
        + "<th>" + "LONGITUDE" + "</th>" 
        +  "</tr>"
        + "</thead>"  
        + "<tbody>"

    for (var i in DB) 
    {
        des = DB[i].SOV0NAME.toUpperCase();

        s += "<tr>"
        s += '<td class = "nation" id="nation">' + DB[i].SOV0NAME + "</td>"
        s += '<td class = "city">' + DB[i].NAMEASCII + "</td>"
        s += '<td class = "nation" id="nation">' + DB[i].LATITUDE + "</td>"
        s += '<td class = "city">' + DB[i].LONGITUDE + "</td>"
        s += '</tr>'  
    }

    s += "</tbody>"
    s += "</table>"
    document.getElementById("content-table").innerHTML = s;
}

function tableCityPopulation() 
{
    s = "<thead>"
        + "<tr>"
        + "<th>" + "CITY" + "</th>" 
        + "<th>" + "POPULATION" + "</th>" 
        +  "</tr>"
        + "</thead>"  
        + "<tbody>"

    for (var i in DB) 
    {
        des = DB[i].NAMEASCII.toUpperCase();

        s += "<tr>"
        s += '<td class = "nation" id="nation">' + DB[i].NAMEASCII + "</td>"
        s += '<td class = "city">' + DB[i].POP_MAX + "</td>"
        s += '</tr>'  
    }

    s += "</tbody>"
    s += "</table>"
    document.getElementById("content-table").innerHTML = s;
}


  
   }); // fine addEventListener

   $(document).ready(function() {
    $.ajax({
        //url: "http://rest-service.guides.spring.io/greeting"
        //url: "http://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02"
        //url: "http://earthquake.usgs.gov/fdsnws/event/1/version"
        //url: "http://earthquake.usgs.gov/fdsnws/event/1/count?starttime=2014-01-01&endtime=2014-01-02"
        //url: "http://earthquake.usgs.gov/fdsnws/event/1/count?format=geojson"
    }).then(function(data) {
       //console.log(data.features.length);
       var nDati;
       
       nDati = data.features.length;

	    $('#counter').append(nDati);
        $('#counterContent').append(s);
    });
});

var puntitrovati = new Array();

function mappaPunti() {
    var frame = document.getElementById('mappa');

    frame.contentWindow.postMessage(puntitrovati, '*');

}

function cittav(stato, n) {
    puntitrovati=new Array();
    s = "<table>";

    var h = 0;
    stato = stato.toUpperCase();
    s += "<tr>";
        s += "<td id=zero1>" + "" + "</td>";
            s += "<td id=zero>" + "Stato" + "</td>";
            s += "<td id=zero>" + "CittÃ " + "</td>";
            s += "<td id=zero>" + "Popolazione" + "</td>";
            s += "<td id=zero>" + "Fuso Orario" + "</td>";
    s += "</tr>";
    a = 0;
    risultati = 0;
    for (var i in DB.Punti) {

        des = DB.Punti[i].SOV0NAME.toUpperCase();
        
        if (des.indexOf(stato) >= 0) {

            if (a==0) {
                s += "<tr>";
                s += "<td id=uno bgcolor=#a8c0a8 align=center>" + (risultati+1) + "</td>";
                s += "<td id=due bgcolor=#83aaa8>" + DB.Punti[i].SOV0NAME + "</td>";
                s += "<td id=tre bgcolor=#83aaa8>" + DB.Punti[i].NAMEASCII + "</td>";
                s += "<td id=quattro bgcolor=#83aaa8>" + DB.Punti[i].POP_MAX + "</td>";
                s += "<td id=cinque bgcolor=#83aaa8>" + DB.Punti[i].TIMEZONE + "</td>";
                s += "</tr>";
                a = 1;
            }else{
                s += "<tr>";
                s += "<td id=uno bgcolor=#a8c0a8 align=center>" + (risultati+1) + "</td>";
                s += "<td id=due bgcolor=#b5d0d6>" + DB.Punti[i].SOV0NAME + "</td>";
                s += "<td id=tre bgcolor=#b5d0d6>" + DB.Punti[i].NAMEASCII + "</td>";
                s += "<td id=quattro bgcolor=#b5d0d6>" + DB.Punti[i].POP_MAX + "</td>";
                s += "<td id=cinque bgcolor=#b5d0d6>" + DB.Punti[i].TIMEZONE + "</td>";
                s += "</tr>";
                a = 0;
            }
            puntitrovati[risultati] = DB.Punti[i];
            risultati++;
            
            
            h=1;
            
        }
    }

    if (h==0) {
        s= "<tr>";
        s+= "<td bgcolor=#03ab19 width=4%>" + "La tua ricerca non ha prodotto risultati" + "</td>";
        s+= "</tr>";
    }

    s+="</table>";

    mappaPunti();
    document.getElementById("risultati").innerHTML ="Risultati Trovati: " + risultati;
    document.getElementById("P1").innerHTML = s;
    
}

function capitaliCo(capitali) {
    puntitrovati = new Array();
    s = "<table>";

    var h = 0;
    capitali = capitali.toUpperCase();

    s += "<tr>";
        s += "<td id=zero1>" + "" + "</td>";
            s += "<td id=zero>" + "Stato" + "</td>";
            s += "<td id=zero>" + "Città" + "</td>";
            s += "<td id=zero>" + "Popolazione" + "</td>";
            s += "<td id=zero>" + "Fuso Orario" + "</td>";
    s += "</tr>";
    var a = 0;
    risultati = 0;
    for (var i in DB.Punti) {
        
        des = DB.Punti[i].FEATURECLA;
        das = DB.Punti[i].TIMEZONE.toUpperCase();
        dasindex = das.lastIndexOf("/");
        das = das.slice(0,dasindex);
        
        if (des.indexOf("Admin-0 capital") >= 0 && das.indexOf(capitali) >= 0) {
            
            if (a==0) {
                s += "<tr>";
                s += "<td id=uno bgcolor=#a8c0a8 align=center>" + (risultati+1) + "</td>";
                s += "<td id=due bgcolor=#83aaa8>" + DB.Punti[i].SOV0NAME + "</td>";
                s += "<td id=tre bgcolor=#83aaa8>" + DB.Punti[i].NAMEASCII + "</td>";
                s += "<td id=quattro bgcolor=#83aaa8>" + DB.Punti[i].POP_MAX + "</td>";
                s += "<td id=cinque bgcolor=#83aaa8>" + DB.Punti[i].TIMEZONE + "</td>";
                s += "</tr>";
                a = 1;
            }else{
                s += "<tr>";
                s += "<td id=uno bgcolor=#a8c0a8 align=center>" + (risultati+1) + "</td>";
                s += "<td id=due bgcolor=#b5d0d6>" + DB.Punti[i].SOV0NAME + "</td>";
                s += "<td id=tre bgcolor=#b5d0d6>" + DB.Punti[i].NAMEASCII + "</td>";
                s += "<td id=quattro bgcolor=#b5d0d6>" + DB.Punti[i].POP_MAX + "</td>";
                s += "<td id=cinque bgcolor=#b5d0d6>" + DB.Punti[i].TIMEZONE + "</td>";
                s += "</tr>";
                a = 0;
            }
            puntitrovati[risultati] = DB.Punti[i];
            risultati++;
            
            h=1;
            
        }
    }

    if (h==0) {
        s= "<tr>";
        s+= "<td bgcolor=#03ab19 width=4%>" + "La tua ricerca non ha prodotto risultati" + "</td>";
        s+= "</tr>";
    }

    s+="</table>";
    mappaPunti();
    document.getElementById("risultati").innerHTML ="Risultati Trovati: " + risultati;
    document.getElementById("P1").innerHTML = s;
}


function popo4M() {
    puntitrovati=new Array();
    s = "<table>";

    var h = 0;
    s += "<tr>";
        s += "<td id=zero1>" + "" + "</td>";
            s += "<td id=zero>" + "Stato" + "</td>";
            s += "<td id=zero>" + "Città" + "</td>";
            s += "<td id=zero>" + "Popolazione" + "</td>";
            s += "<td id=zero>" + "Fuso Orario" + "</td>";
    s += "</tr>";
    a = 0;
    risultati = 0;
    for (var i in DB.Punti) {

        des = DB.Punti[i].POP_MAX;
        
        if (des > 4000000) {

            if (a==0) {
                s += "<tr>";
                s += "<td id=uno bgcolor=#a8c0a8 align=center>" + (risultati+1) + "</td>";
                s += "<td id=due bgcolor=#83aaa8>" + DB.Punti[i].SOV0NAME + "</td>";
                s += "<td id=tre bgcolor=#83aaa8>" + DB.Punti[i].NAMEASCII + "</td>";
                s += "<td id=quattro bgcolor=#83aaa8>" + DB.Punti[i].POP_MAX + "</td>";
                s += "<td id=cinque bgcolor=#83aaa8>" + DB.Punti[i].TIMEZONE + "</td>";
                s += "</tr>";
                a = 1;
            }else{
                s += "<tr>";
                s += "<td id=uno bgcolor=#a8c0a8 align=center>" + (risultati+1) + "</td>";
                s += "<td id=due bgcolor=#b5d0d6>" + DB.Punti[i].SOV0NAME + "</td>";
                s += "<td id=tre bgcolor=#b5d0d6>" + DB.Punti[i].NAMEASCII + "</td>";
                s += "<td id=quattro bgcolor=#b5d0d6>" + DB.Punti[i].POP_MAX + "</td>";
                s += "<td id=cinque bgcolor=#b5d0d6>" + DB.Punti[i].TIMEZONE + "</td>";
                s += "</tr>";
                a = 0;
            }
            puntitrovati[risultati] = DB.Punti[i];
            risultati++;
            
            h=1;
            
        }
    }

    if (h==0) {
        s= "<tr>";
        s+= "<td bgcolor=#03ab19 width=4%>" + "La tua ricerca non ha prodotto risultati" + "</td>";
        s+= "</tr>";
    }

    s+="</table>";
    mappaPunti();
    document.getElementById("risultati").innerHTML ="Risultati Trovati: " + risultati;
    document.getElementById("P1").innerHTML = s;
}


function cittaPop(capitali) {
    puntitrovati=new Array();
    s = "<table>";

    var h = 0;
    capitali = capitali.toUpperCase();

    
    var a = 0;
    risultati = 0;var pos;des2 = 0;
    for (var i in DB.Punti) {
        
        des = DB.Punti[i].POP_MAX;
        das = DB.Punti[i].TIMEZONE.toUpperCase();
        dasindex = das.lastIndexOf("/");
        das = das.slice(0,dasindex);
        

        if (des > des2 && das.indexOf(capitali) >= 0) {
            des2 = des;
            pos = i;
            risultati=1;
            console.log(des2);
            h=1;
        }
    }

    s += "<tr>";
    s += "<td id=zero1>" + "" + "</td>";
    s += "<td id=zero>" + "Stato" + "</td>";
    s += "<td id=zero>" + "Città" + "</td>";
    s += "<td id=zero>" + "Popolazione" + "</td>";
    s += "<td id=zero>" + "Fuso Orario" + "</td>";
    s += "</tr>";
    if (a==0) {
        s += "<tr>";
        s += "<td id=uno bgcolor=#a8c0a8 align=center>" + (1) + "</td>";
        s += "<td id=due bgcolor=#83aaa8>" + DB.Punti[pos].SOV0NAME + "</td>";
        s += "<td id=tre bgcolor=#83aaa8>" + DB.Punti[pos].NAMEASCII + "</td>";
        s += "<td id=quattro bgcolor=#83aaa8>" + DB.Punti[pos].POP_MAX + "</td>";
        s += "<td id=cinque bgcolor=#83aaa8>" + DB.Punti[pos].TIMEZONE + "</td>";
        s += "</tr>";
        a = 1;
    }else{
        s += "<tr>";
        s += "<td id=uno bgcolor=#a8c0a8 align=center>" + (risultati+1) + "</td>";
        s += "<td id=due bgcolor=#b5d0d6>" + DB.Punti[pos].SOV0NAME + "</td>";
        s += "<td id=tre bgcolor=#b5d0d6>" + DB.Punti[pos].NAMEASCII + "</td>";
        s += "<td id=quattro bgcolor=#b5d0d6>" + DB.Punti[pos].POP_MAX + "</td>";
        s += "<td id=cinque bgcolor=#b5d0d6>" + DB.Punti[pos].TIMEZONE + "</td>";
        s += "</tr>";
        a = 0;
    }
    
    puntitrovati[0] = DB.Punti[pos];
    
            
        
    

    if (h==0) {
        s= "<tr>";
        s+= "<td bgcolor=#03ab19 width=4%>" + "La tua ricerca non ha prodotto risultati" + "</td>";
        s+= "</tr>";
    }

    s+="</table>";
    mappaPunti();
    document.getElementById("risultati").innerHTML ="Risultati Trovati: " + risultati;
    document.getElementById("P1").innerHTML = s;
}
