function responseJson() {
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
            var listMemb = result.results[0].members
            spinner()
            votesTotal(listMemb)
            tableFirst(listMemb)
            votesAgain(listMemb)
            leastTable(listMemb)
            mostTable(listMemb)
        })
}
responseJson()

function spinner (){
    var test = Array.from(document.getElementsByClassName("spinner-border"))
    test.forEach(element=> {
        element.className = "d-none"
    })
    }

function votesTotal (array) {
    var result = 0;
    array.forEach(element=>{
        result = result + Number(element.votes_with_party_pct);
    })
    var total = (result/array.length).toFixed(2)
    return total;
}

function tableFirst(array) {
    function numOfReps (array, canParty) {
    var resultArray = [];
    array.forEach(element=>{
        if (element.party===canParty){
            resultArray.push(element)
        }
    }) 
    return resultArray.length
    }   
    function votesParty (array, canParty) {
        var resultArray = 0;
        var resultLength = 0
        array.forEach(element=>{
            if(element.party===canParty){
              var x = element.votes_with_party_pct;
              resultArray = resultArray + x
              resultLength = resultLength + 1
            }
        })
        return (resultArray / resultLength).toFixed(2)
    }
    for (i=0; i<4; i++) {  
    var element = document.getElementById("senGlance");
    var para = document.createElement("tr");
    var party = ["Republican", "Democrat", "Independent", "Total"]
    var canParty = ["R", "D", "ID"]
    element.appendChild(para)
    para.insertCell().innerHTML = party[i]
    if (i<3) {
        para.insertCell().innerHTML = numOfReps(array, canParty[i])
    } else {
        para.insertCell().innerHTML = array.length
    }
    if (i<3) {
        para.insertCell().innerHTML = votesParty(array, canParty[i]) + "%"
    } else {
        para.insertCell().innerHTML = votesTotal(array) + "%"
        }
}}

function votesAgain(array){
var test = []
array.forEach(element=>{
    test.push(element.votes_against_party_pct)
})
return test
}


function leastTable(array) {
var percent = Math.floor(array.length/100*10)
var lessLoyal = votesAgain(array).sort((a,b)=>b-a).slice(0, percent)
var minNum = Math.min.apply(null, lessLoyal)

array.forEach(element=>{
    if (element.votes_against_party_pct >= minNum) {
        var element2 = document.getElementById("leastLoyal");
        var para = document.createElement("tr");
        element2.appendChild(para)
        if (element.middle_name===null) {
            para.insertCell().innerHTML = '<a href="' + element.url + '" target=_blank>' + element.last_name + ", " + element.first_name + '</a>';
        } else {
            para.insertCell().innerHTML = '<a href="' + element.url + '" target=_blank>' + element.last_name + ", " + element.first_name + " " + element.middle_name + '</a>'
        }
        para.insertCell().innerHTML = Math.round((element.total_votes - element.missed_votes)*element.votes_with_party_pct/100) + "/" + (element.total_votes - element.missed_votes)
        para.insertCell().innerHTML = element.votes_with_party_pct.toFixed(2) + "%"
    }
    })}

function mostTable(array) {
    var percent = Math.floor(array.length/100*10)
    var mostLoyal = votesAgain(array).sort((a,b)=> a-b).slice(0, percent)
    var maxNum = Math.max.apply(null, mostLoyal)

    array.forEach(element=>{
    if (element.votes_against_party_pct <= maxNum) {
        var element2 = document.getElementById("mostLoyal");
        var para = document.createElement("tr");
        element2.appendChild(para) 
        if (element.middle_name===null) {
            para.insertCell().innerHTML = '<a href="' + element.url + '" target=_blank>' + element.last_name + ", " + element.first_name + '</a>';
        } else {
            para.insertCell().innerHTML = '<a href="' + element.url + '" target=_blank>' + element.last_name + ", " + element.first_name + " " + element.middle_name + '</a>'
        }
        para.insertCell().innerHTML = Math.round((element.total_votes - element.missed_votes)*element.votes_with_party_pct/100) + "/" + (element.total_votes - element.missed_votes)
        para.insertCell().innerHTML = element.votes_with_party_pct.toFixed(2) + "%"
    }
})}