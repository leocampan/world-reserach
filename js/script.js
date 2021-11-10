window.onload = function(){cittatable("")};

function valore(valore, select) {
    
    if (select == "city") {
        cittatable(valore);
    }else if(select == "population"){
        popo4M(valore);
    }else if(select == "capitals"){
        capitaliCo(valore);
    }else if(select == "continent"){
        cittaPop(valore);
    }
    
}

var puntitrovati = new Array();

function mappaPunti() {
    var frame = document.getElementById('mappa');

    frame.contentWindow.postMessage(puntitrovati, '*');

}

function cittatable(stato) {
    puntitrovati=new Array();
    
    s = "<table>";

    var h = 0;
    stato = stato.toUpperCase();

    s += "<tr>";
       
            s += "<th id=zero >" + "STATE" + "</th>";
            s += "<th id=zero>" + "CITY " + "</th>";
            s += "<th id=zero>" + "POPULATION" + "</th>";
            s += "<th id=zero>" + "TIME ZONE" + "</th>";
    s += "</tr>";
    a = 0;
    risultati = 0;
    for (var i in DB.Punti) {

        des = DB.Punti[i].SOV0NAME.toUpperCase();
        
        if (des.indexOf(stato) >= 0) {

            if (a==0) {
                s += "<tr>";
           
                s += "<td id=due >" + DB.Punti[i].SOV0NAME + "</td>";
                s += "<td id=tre >" + DB.Punti[i].NAMEASCII + "</td>";
                s += "<td id=quattro >" + DB.Punti[i].POP_MAX + "</td>";
                s += "<td id=cinque >" + DB.Punti[i].TIMEZONE + "</td>";
                s += "</tr>";
                a = 1;
            }else{
                s += "<tr>";
              
                s += "<td id=due >" + DB.Punti[i].SOV0NAME + "</td>";
                s += "<td id=tre >" + DB.Punti[i].NAMEASCII + "</td>";
                s += "<td id=quattro >" + DB.Punti[i].POP_MAX + "</td>";
                s += "<td id=cinque >" + DB.Punti[i].TIMEZONE + "</td>";
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
        s+= "<td bgcolor=red width=4%>" + "NO RESULTS!" + "</td>";
        s+= "</tr>";
    }

    s+="</table>";

    if (stato == "") {
        mappaPuntinit();
    }else{
        mappaPunti();
    }
    document.getElementById("counter").innerHTML ="Results: " + risultati;
    document.getElementById("content-table").innerHTML = s;
    
}

function mappaPuntinit() {
    var frame = document.getElementById('mappa');

    puntitrovati=new Array();
    frame.contentWindow.postMessage(puntitrovati, '*');

}

function capitaliCo(capitali) {
    puntitrovati = new Array();
    s = "<table>";

    var h = 0;
    capitali = capitali.toUpperCase();

    s += "<tr>";
        
    s += "<th id=zero >" + "STATE" + "</th>";
    s += "<th id=zero>" + "CITY " + "</th>";
    s += "<th id=zero>" + "POPULATION" + "</th>";
    s += "<th id=zero>" + "TIME ZONE" + "</th>";
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
           
                s += "<td id=due >" + DB.Punti[i].SOV0NAME + "</td>";
                s += "<td id=tre >" + DB.Punti[i].NAMEASCII + "</td>";
                s += "<td id=quattro >" + DB.Punti[i].POP_MAX + "</td>";
                s += "<td id=cinque >" + DB.Punti[i].TIMEZONE + "</td>";
                s += "</tr>";
                a = 1;
            }else{
                s += "<tr>";
               
                s += "<td id=due >" + DB.Punti[i].SOV0NAME + "</td>";
                s += "<td id=tre >" + DB.Punti[i].NAMEASCII + "</td>";
                s += "<td id=quattro >" + DB.Punti[i].POP_MAX + "</td>";
                s += "<td id=cinque >" + DB.Punti[i].TIMEZONE + "</td>";
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
    document.getElementById("counter").innerHTML ="Results: " + risultati;
    document.getElementById("content-table").innerHTML = s;
}


function popo4M(capitali) {
    puntitrovati=new Array();
    s = "<table>";

    capitali = capitali.toUpperCase();
    var h = 0;
    s += "<tr>";
        
    s += "<th id=zero >" + "STATE" + "</th>";
    s += "<th id=zero>" + "CITY " + "</th>";
    s += "<th id=zero>" + "POPULATION" + "</th>";
    s += "<th id=zero>" + "TIME ZONE" + "</th>";
    s += "</tr>";
    a = 0;
    risultati = 0;
    for (var i in DB.Punti) {

        des = DB.Punti[i].POP_MAX;
        das = DB.Punti[i].TIMEZONE.toUpperCase();
        dasindex = das.lastIndexOf("/");
        das = das.slice(0,dasindex);
        
        if (des > 4000000 && das.indexOf(capitali) >= 0) {

            if (a==0) {
                s += "<tr>";
               
                s += "<td id=due >" + DB.Punti[i].SOV0NAME + "</td>";
                s += "<td id=tre >" + DB.Punti[i].NAMEASCII + "</td>";
                s += "<td id=quattro >" + DB.Punti[i].POP_MAX + "</td>";
                s += "<td id=cinque >" + DB.Punti[i].TIMEZONE + "</td>";
                s += "</tr>";
                a = 1;
            }else{
                s += "<tr>";
                
                s += "<td id=due >" + DB.Punti[i].SOV0NAME + "</td>";
                s += "<td id=tre >" + DB.Punti[i].NAMEASCII + "</td>";
                s += "<td id=quattro >" + DB.Punti[i].POP_MAX + "</td>";
                s += "<td id=cinque >" + DB.Punti[i].TIMEZONE + "</td>";
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
    document.getElementById("counter").innerHTML ="Results: " + risultati;
    document.getElementById("content-table").innerHTML = s;
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
   
    s += "<th id=zero >" + "STATE" + "</th>";
    s += "<th id=zero>" + "CITY " + "</th>";
    s += "<th id=zero>" + "POPULATION" + "</th>";
    s += "<th id=zero>" + "TIME ZONE" + "</th>";
    s += "</tr>";
    if (a==0) {
        s += "<tr>";
     
        s += "<td id=due bgcolor=#83aaa8>" + DB.Punti[pos].SOV0NAME + "</td>";
        s += "<td id=tre bgcolor=#83aaa8>" + DB.Punti[pos].NAMEASCII + "</td>";
        s += "<td id=quattro bgcolor=#83aaa8>" + DB.Punti[pos].POP_MAX + "</td>";
        s += "<td id=cinque bgcolor=#83aaa8>" + DB.Punti[pos].TIMEZONE + "</td>";
        s += "</tr>";
        a = 1;
    }else{
        s += "<tr>";
       
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
    document.getElementById("counter").innerHTML ="Results: " + risultati;
    document.getElementById("content-table").innerHTML = s;
}

