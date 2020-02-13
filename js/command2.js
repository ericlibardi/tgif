var shortcutHouse = dataHouse.results[0].members

function finalTable (array) {
for (i=0; i<array.length; i++) {
     
     var para = document.createElement("tr")
     document.getElementById("houseData").appendChild(para)
     
     if (array[i].middle_name === null) {
         var nameHouse = array[i].last_name + ", " + array[i].first_name
     } else {
        var nameHouse = array[i].last_name + ", " + array[i].first_name + " " + shortcutHouse[i].middle_name 
     }
     para.insertCell().innerHTML = '<a href="' + array[i].url + '" target=_blank>' + nameHouse + '</a>'
    
     para.insertCell().innerHTML = array[i].party;
     para.insertCell().innerHTML = array[i].state;

     if (array[i].seniority === 1) {
         var yearsHouse = array[i].seniority + " year"
     } else {
        var yearsHouse = array[i].seniority + " years"
     }
     para.insertCell().innerHTML = yearsHouse;

     para.insertCell().innerHTML = array[i].votes_with_party_pct + "%";
}}

function load() { 
    Array.from(document.querySelectorAll('input[name="parties"]')).forEach(element=>{
    element.addEventListener("click", ()=>filterParty(shortcutHouse))
    })
    document.getElementById("selectState").addEventListener("change", ()=>filterParty(shortcutHouse) )
}
load()
finalTable(shortcutHouse)


function filterParty(array) {
    var e = document.getElementById("selectState").value
    var tableBody = document.getElementById("houseData")
    tableBody.innerHTML = ""
    var result = Array.from(document.querySelectorAll('input[name="parties"]:checked'))
    .map(myChoice=> {return myChoice.value} )
    //console.log(result)
    if (result.length > 0 && e == "All") {
        var filterArray = array.filter(table2=> result.includes(table2.party))
        //console.log(filterArray)
    finalTable(filterArray)
    }
    if(result.length == 0 && e == "All"){
    finalTable(shortcutHouse)
    }
    if (result.length == 0 && e !== "All") {
        var filterArray = array.filter(table2=> e.includes(table2.state))
    finalTable(filterArray)
    }
    if (result.length > 0 && e !== "All"){
        var filterArray = array.filter(table2=> e.includes(table2.state) && result.includes(table2.party))
    finalTable(filterArray)
    }
}

function estate (array) {
    var test = [];
    array.forEach(element=>{
        test.push(element.state) 
    })
    var final = test.filter((item, index)=>test.indexOf(item)== index).sort()
    return final
}

estate(shortcutHouse).forEach(element=>{
    document.getElementById("selectState").appendChild(document.createElement("option")).innerHTML = element;
})