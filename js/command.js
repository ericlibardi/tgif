function responseJson (){

    if(document.getElementById("test").innerHTML == "Senators") {
    fetch('https://api.propublica.org/congress/v1/116/senate/members.json', {
    method: "GET",
    headers: {
        "X-API-Key": "p81O1eNhl3Vq1wXCM01cXtMqzJoLktDn8rtymMRi"
    },
    mode: 'cors',
    cache: 'default'
    })
    .then(resp=>resp.json())
    .then(result=> {
        var members = result.results[0].members
        spinner()
        finalTable(members);
        filterParty(members);
        estate(members);
        formEstate(members);
        load(members)
    })
    .catch(err=> console.log(err)) 
} else if (document.getElementById("test").innerHTML == "Congressmen") {
    fetch ('https://api.propublica.org/congress/v1/116/house/members.json', {
    method: "GET",
    headers: {
        "X-API-Key": "p81O1eNhl3Vq1wXCM01cXtMqzJoLktDn8rtymMRi"
    },
    mode: 'cors',
    cache: 'default'
    })
    .then (resp =>resp.json())
    .then (result => {
        var members = result.results[0].members
        spinner()
        finalTable(members);
        load(members);
        filterParty(members);
        estate(members);
        formEstate(members);
    })
    .catch (err=> console.log(err)) 
}
}

responseJson()

function spinner (){
    var test = Array.from(document.getElementsByClassName("spinner-border"))
    test.forEach(element=> {
        element.className = "d-none"
    })
    }

//shortcut
//var listMembers = dataSenate.results[0].members

function finalTable(array){
for (i=0; i<array.length; i++) {
    
    var para = document.createElement("tr");
    document.getElementById("tableData").appendChild(para);
    
    if (array[i].middle_name === null) {
        var name = array[i].last_name + ", " + array[i].first_name
    } else {
        var name = array[i].last_name + ", " + array[i].first_name + " " + array[i].middle_name;
    }
    para.insertCell().innerHTML = '<a href="' + array[i].url + '" target=_blank>' + name + '</a>'       
    para.insertCell().innerHTML = array[i].party.split("")[0]
    para.insertCell().innerHTML = array[i].state
    
    if (array[i].seniority == 0 || array[i].seniority == 1) {
        para.insertCell().innerHTML = array[i].seniority + " year"
    } else {
        para.insertCell().innerHTML = array[i].seniority + " years"
    }
    para.insertCell().innerHTML = array[i].votes_with_party_pct + " %"
}}

function load(array) { 
    Array.from(document.querySelectorAll('input[name="parties"]')).forEach(element=>{
    element.addEventListener("click", ()=>filterParty(array))
    })  
    document.getElementById("selectState").addEventListener("change", ()=>filterParty(array) )
}
//load()
//finalTable(listMembers)
function filterParty(array) {
    var e = document.getElementById("selectState").value
    var tableBody = document.getElementById("tableData")
    tableBody.innerHTML = ""
    var result = Array.from(document.querySelectorAll('input[name="parties"]:checked'))
    .map(myChoice=> {return myChoice.value} )
    //console.log(result)
    if (result.length > 0 && e == "All") {
        var filterArray = array.filter(table2=> result.includes(table2.party))
        console.log(filterArray)
    finalTable(filterArray)
    }
    if(result.length == 0 && e == "All"){
    finalTable(array)
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
function estate(array) {
    var test = []
    array.forEach(element=>{
    test.push(element.state)
        })
    var final = test.filter((item, index)=>test.indexOf(item)== index).sort()
    return final
}

function formEstate(array) {
estate(array).forEach(element=>{
    document.getElementById("selectState").appendChild(document.createElement("option")).innerHTML = element
})}


var check = document.getElementById("test").innerHTML
console.log(check)