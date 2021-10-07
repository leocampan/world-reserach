window.onload = function(){displayTable()};

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

function counterRow() {
    r = getElementById("content-table").
    console.log("ciaooo")
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
