"use strict";
function loadDefinitions(searchAll)
{
    var searchTerm = document.getElementById("searchBox").value.toLowerCase();
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() 
    {
        if (this.readyState == 4 && this.status == 200) 
        {
            parseXMLData(this, searchAll, searchTerm);
        }
    };
    xhttp.open("GET", "request.php", true);
    xhttp.send();
}

function parseXMLData(xml, searchAll, searchTerm) 
{
    var i;
    var xmlDoc = xml.responseXML;
    var allDef="<ol>"; 
    var x = xmlDoc.getElementsByTagName("definition");
    var notFound = true;
    
    if (searchAll) 
    {
        for (i = 0; i <x.length; i++) 
        { 
            allDef += "<li>" + "<h3>" + x[i].getAttributeNode("name").value + "</h3>" + 
            "<p>" + x[i].childNodes[0].nodeValue + "</p>" +                             
            "<p> - " + x[i].getAttributeNode("author").value + "</p>" +                
            "</li>";  
        }
        allDef += "</ol>";
        document.getElementById("result").innerHTML = allDef;
    }
    else 
    {
        for (i = 0; i <x.length; i++) 
        { 
            if (x[i].getAttributeNode("name").value.toLowerCase() == searchTerm)
            {
                document.getElementById("result").innerHTML = "<ol><li>" + "<h3>" + x[i].getAttributeNode("name").value + 
                "</h3>" + "<p>" + x[i].childNodes[0].nodeValue + "</p>" + 
                "<p> - " + x[i].getAttributeNode("author").value + "</p>" +                 
                "</li></ol>";
                notFound = false;
                break;
            }
            
        }
        
        if(notFound)
        {
            document.getElementById("result").innerHTML  = "<h3>No Results found for: '" + searchTerm + "'</h3>";
        }
    }
}