var statistics = {
    "numOfReps": "",
    "numOfDem": "",
    "numOfInd": "",
    "total": "",
    "mostLoyal": "",
    "leastLoyal": "",
    "mostEngaged": "",
    "leastEngaged": ""
}

var shortSenate = dataSenate.results[0].members

function numOfReps (array, canParty) {
    var resultArray = [];
    array.forEach(element=>{
        if (element.party===canParty){
            resultArray.push(element)
        }
    })
    return resultArray.length
}

//console.log(numOfReps(shortSenate, "ID"))

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

function votesTotal (array) {
    var result = 0;
    array.forEach(element=>{
        result = result + Number(element.votes_with_party_pct);
    })
    var total = (result/array.length).toFixed(2)
    return total;
}
//console.log(votesTotal(shortSenate))

//console.log(votesParty(shortSenate, "ID"))

for (i=0; i<4; i++) {  
    var element = document.getElementById("senGlance");
    var para = document.createElement("tr");
    var party = ["Republican", "Democrat", "Independent", "Total"]
    var canParty = ["R", "D", "ID"]
    element.appendChild(para)
    para.insertCell().innerHTML = party[i]
    if (i<3) {
        para.insertCell().innerHTML = numOfReps(shortSenate, canParty[i])
    } else {
        para.insertCell().innerHTML = shortSenate.length
    }
    if (i<3) {
        para.insertCell().innerHTML = votesParty(shortSenate, canParty[i]) + "%"
    } else {
        para.insertCell().innerHTML = votesTotal(shortSenate) + "%"
        }
}

var test = []
shortSenate.forEach(element=>{
    test.push(element.votes_against_party_pct)
})

var percent = Math.floor(shortSenate.length/100*10)
var lessLoyal = test.sort((a,b)=>b-a).slice(0, percent)
var minNum = Math.min.apply(null, lessLoyal)

//console.log(votesAgainst)
shortSenate.forEach(element=>{
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
    })

var mostLoyal = test.sort((a,b)=> a-b).slice(0, percent)
var maxNum = Math.max.apply(null, mostLoyal)
//console.log(maxNum)

shortSenate.forEach(element=>{
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
})