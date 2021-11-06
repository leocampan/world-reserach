window.onload = function(){displayTable()};


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



