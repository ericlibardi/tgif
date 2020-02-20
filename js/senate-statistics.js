function responseJson (){
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
            votesTotal (listMemb);
            firstTable(listMemb);
            leastEng(listMemb);
            mostEngaged(listMemb)
        })
}

function spinner (){
var test = Array.from(document.getElementsByClassName("spinner-border"))
test.forEach(element=> {
    element.className = "d-none"
})
}

responseJson()

function votesTotal (array) {
    var result = 0;
    array.forEach(element=>{
        result = result + Number(element.votes_with_party_pct);
    })
    var total = (result/array.length).toFixed(2)
    return total;
}

function firstTable(array) {
    function votesPer (array, canParty) {
        var test = [];
        for (i=0; i<array.length; i++){
            if (array[i].party===canParty) {
                test.push(array[i].votes_with_party_pct)
            }   
        }        
        return (test.reduce((a,b)=>a+b) / test.length).toFixed(2)
        
    } 
    
    var votesPerCan = [votesPer(array, "R"), votesPer(array, "D"), votesPer(array, "ID")]
    function test (array, canParty) {
    return array.filter (senator=>senator.party===canParty).length
}
for (i=0; i<4; i++) {
    var partyCan = ["Republican", "Democrat", "Independent", "Total"];
    var partyNom = ["R", "D", "ID"]
    var fromElem = document.getElementById("tableSenate");
    var para = document.createElement("tr");
    
    fromElem.appendChild(para);

    para.insertCell().innerHTML = partyCan[i]
    if (i<3) {
        para.insertCell().innerHTML = test(array, partyNom[i]);
    } else {
        para.insertCell().innerHTML = array.length;
    }
    if (i<3) {
        para.insertCell().innerHTML = votesPerCan[i] + "%";
    } else {
        para.insertCell().innerHTML = votesTotal(array) + "%"
        }
}}

function leastEng (array) {
    var test = []
    for (i=0; i < array.length; i++) {
        
        test.push(array[i].missed_votes_pct)
    }

    var percent = Math.floor(test.length/100*10)
    var x = test.sort((a,b)=> b - a).slice(0, percent)
    var minEngag = Math.min.apply(null, x)

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
    return maxEng
}