window.onload = function(){displayTable()};

/* creazione tabella generale */
function displayTable() 
{
    s = "<thead>"
        + "<tr>"
        + "<th>" + "NATION" + "</th>" 
        + "<th>" + "CITY" + "</th>" 
        +  "</tr>"
        + "</thead>"  
        + "<tbody>"

    for (var i in DB) 
    {
        des = DB[i].SOV0NAME.toUpperCase();

        s += "<tr>"
        s += '<td class = "nation" id="nation">' + DB[i].SOV0NAME + "</td>"
        s += '<td class = "city">' + DB[i].NAMEASCII + "</td>"
        s += '</tr>'  
    }

    s += "</tbody>"
    s += "</table>"
    document.getElementById("content-table").innerHTML = s;
}



function countRows() {
    var totalRows = 0;

    for (let index = 0; index < DB.length; index++) {
        DB.forEach(element => {
            
        });
        
    }
}


function ows() {
    rows = document.getElementById("content-table").rows;
    console.log(rows);
}

function displayedRows() {
    var totalRowCount = 0;
    var rowCount = 0;
    var table = document.getElementById("content-table");
    var rows = table.getElementsByTagName("tr")
    
    for (var i = 0; i < rows.length; i++) {
        totalRowCount++;
        if (rows[i].getElementsByTagName("td").length > 0) {
            rowCount++;
        }
    }

    var message = "Total Row Count: " + totalRowCount;
    message += "\nRow Count: " + rowCount;
    alert(message);
}

/*
function sortTable() 
{
    const searchInput = document.getElementById("search");
    const rows = document.querySelectorAll("tbody tr");
    console.log(rows);

    searchInput.addEventListener("keyup", function (event) 
    {
        const q = event.target.value.toLowerCase();
        rows.forEach((row) => 
        {
            row.querySelector("td").textContent.toLowerCase().startsWith(q)
            ? (row.style.display = "table-row")
            : (row.style.display = "none");
        });
    });
}
*/

function init() {
    // Definisco la variabilie mappa come un oggetto OpenLayers.Map utilizzando il DivMappa, poi aggiungo il Layer OSM (Open Street Map)
    //var 
    Mappa = new OpenLayers.Map("DivMappa");
    //Mappa.addLayer(new OpenLayers.Layer.OSM());

    var mapnik = new OpenLayers.Layer.OSM("OpenStreetMap (Mapnik)");
    Mappa.addLayer(mapnik);

    // Creo una variabile contenete il layer dei marker poi collego il layer dei markers alla mappa
    //  var 
    LayerMarkers = new OpenLayers.Layer.Markers( "Markers" );
    Mappa.addLayer(LayerMarkers);
  
    // Imposto le coordinate di lonLat come centro della mappa di partenza
    // var 
    lonLat = new OpenLayers.LonLat(DB.CenterMap_Lon,DB.CenterMap_Lat)
         .transform(
           new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
           Mappa.getProjectionObject() // to Spherical Mercator Projection
         );
             
     // imposto centro della mappa e zoom
     Mappa.setCenter (lonLat, DB.ZoomLevel);
    } // fine init
   
    function visualizza(p) {
     // posiziono in base ai punti trovati i segnaposto sulla mappa
     
     LayerMarkers.clearMarkers();  //#####
     
     for (i = 0; i < p.length; i++) {
     // Creo l'oggetto contenente le coordinate (prima longitudine e poi latitudine)
     //var
     LonLat = new OpenLayers.LonLat( p[i].LONGITUDE, p[i].LATITUDE)
         .transform(
           new OpenLayers.Projection("EPSG:4326"), // Transformazione da WGS 1984..
           Mappa.getProjectionObject() // .. a Spherical Mercator Projection
         );
     // Aggiungo al layer dei marker un marker (utilizzando l'oggetto lonLat per le coordinate)
     marker = new OpenLayers.Marker(LonLat);
     marker.icon.url="./img/default.png";
     LayerMarkers.addMarker(marker);
     //LayerMarkers.addMarker(new OpenLayers.Marker(LonLat));
     } // fine for
    
    // alert("prova");
    // Mappa.removeLayer(LayerMarkers);
   
   }  // fine visualizza

 
   // aggiunta di un Listener alla finestra, il nuovo listener viene usato per la 
   // gestione parametri: tutti i punti trovati nella pagina 
   // ricerca.html sono in "event.data"
   window.addEventListener('message', function(event) {
   // console.log(event.origin);
   // IMPORTANT: Check the origin of the data!
   if (event.origin.indexOf('///')) {
       // The data has been sent from your site
       // The data sent with postMessage is stored in event.data
       visualizza(event.data);
   //    console.log(event.data[1].NAMEASCII);
   } else {
       // The data hasn't been sent from your site!
       // Be careful! Do not use it.
       console.log("errore");
       return;
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

/*
function displayTable() 
{
    s = "<thead>"
        + "<tr>"
        + "<th>" + "NATION" + "</th>" 
        + "<th>" + "CITY" + "</th>" 
        + "<th>" + "POPULATION" + "</th>" 
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
        s += '<td class = "population">' + DB[i].POP_MAX +"</td>"
        s += '<td class = "latitude">' + DB[i].LATITUDE +"</td>"
        s += '<td class = "longitude">' + DB[i].LONGITUDE +"</td>"
        s += '</tr>'  
    }

    s += "</tbody>"
    s += "</table>"
    document.getElementById("content-table").innerHTML = s;
}
*/

/****************************************************************************************************************************/
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
