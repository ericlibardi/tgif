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

function fillArray (array , canParty) {
    var resultArray = [];
for (i=0; i<array.length; i++) {
    if (array[i].party===canParty) {
        resultArray.push(array[i]);
    } 
}
    return resultArray.length;
}

function test (array, canParty) {
    return array.filter (senator=>senator.party===canParty).length
}

//console.log(test(shortSenate, "D"))
//console.log(test(shortSenate, "R"))
//console.log(test(shortSenate, "ID"))


function votesPer (array, canParty) {
    var test = [];
    for (i=0; i<array.length; i++){
        if (array[i].party===canParty) {
            test.push(array[i].votes_with_party_pct)
        }
        
    }
    
    return (test.reduce((a,b)=>a+b) / test.length).toFixed(2)
    
} 

var votesPerCan = [votesPer(shortSenate, "R"), votesPer(shortSenate, "D"), votesPer(shortSenate, "ID")]

//console.log(votesPerCan)

//console.log(votesPer(shortSenate, "D"))
//console.log(votesPer(shortSenate, "R"))
//console.log(votesPer(shortSenate, "ID"))

function votesTotal (array) {
    var result = 0;
    array.forEach(element=>{
        result = result + Number(element.votes_with_party_pct);
    })
    var total = (result/array.length).toFixed(2)
    return total;
}

for (i=0; i<4; i++) {
    var partyCan = ["Republican", "Democrat", "Independent", "Total"];
    var partyNom = ["R", "D", "ID"]
    var fromElem = document.getElementById("tableSenate");
    var para = document.createElement("tr");

    fromElem.appendChild(para);

    para.insertCell().innerHTML = partyCan[i]
    if (i<3) {
        para.insertCell().innerHTML = test(shortSenate, partyNom[i]);
    } else {
        para.insertCell().innerHTML = shortSenate.length;
    }
    if (i<3) {
        para.insertCell().innerHTML = votesPerCan[i] + "%";
    } else {
        para.insertCell().innerHTML = votesTotal(shortSenate) + "%"
        }
}

function leastEng (array) {
    var test = []
    for (i=0; i < array.length; i++) {
        
        test.push(array[i].missed_votes_pct)
    }

    var percent = Math.floor(test.length/100*10)
    var x = test.sort((a,b)=> b - a).slice(0, percent)
    var minEngag = Math.min.apply(null, x)

    /*for (i=0; i < array.length; i++) {
        if(array[i].missed_votes_pct >= minEngag){
            var para = document.createElement("tr");
            var lessEng = document.getElementById("tabEngBottom");
            
            para.insertCell().innerHTML = array[i].first_name
            para.insertCell().innerHTML = array[i].missed_votes
            para.insertCell().innerHTML = array[i].missed_votes_pct
            lessEng.appendChild(para)

        }
    }*/
    array.forEach(element=>{
       if(element.missed_votes_pct >= minEngag){
            var para = document.createElement("tr");
            var lessEng = document.getElementById("tabEngBottom");
            
            if (element.middle_name === null) {
                para.insertCell().innerHTML = '<a href="' + element.url + '" target=_blank>' + element.last_name + ", " + element.first_name + '</a>';
            } else {
                para.insertCell().innerHTML = '<a href="' + element.url + '" target=_blank>' + element.last_name + ", " + element.first_name + " " + element.middle_name + '</a>'
            }
            para.insertCell().innerHTML = element.missed_votes
            para.insertCell().innerHTML = element.missed_votes_pct.toFixed(2) + "%"
            lessEng.appendChild(para)

    } })
    

}
    
console.log(leastEng(shortSenate))

function mostEngaged (array) {
    var test = []
    array.forEach(element=>{
        test.push(element.missed_votes_pct)
    })
    var percent = Math.floor(array.length/100*10)
    var x = test.sort((a, b)=> a - b).slice(0, percent)
    var maxEng = Math.max.apply(null, x)

    array.forEach(element=>{
        if (element.missed_votes_pct <= maxEng){
            var para = document.createElement("tr");
            var inserElem = document.getElementById("tabEngTop")

            inserElem.appendChild(para);

            if (element.middle_name === null) {
                para.insertCell().innerHTML = '<a href="' + element.url + '" target=_blank>' + element.last_name + ", " + element.first_name + '</a>';
            } else {
                para.insertCell().innerHTML = '<a href="' + element.url + '" target=_blank>' + element.last_name + ", " + element.first_name + " " + element.middle_name + '</a>'
            }
            para.insertCell().innerHTML = element.missed_votes;
            para.insertCell().innerHTML = element.missed_votes_pct.toFixed(2) + "%";
            
        }


    })
    console.log(test)
    return maxEng
}

console.log(mostEngaged(shortSenate))