
//shortcut
var listMembers = dataSenate.results[0].members


for (i=0; i<listMembers.length; i++) {
    var element = document.getElementById("senate-data");
    var para = document.createElement("tr");
    var linkElem = document.createElement("a")

    element.appendChild(para);
    

    if (listMembers[i].middle_name === null) {
        var name = listMembers[i].last_name + ", " + listMembers[i].first_name
    } else {
        var name = listMembers[i].last_name + ", " + listMembers[i].first_name + " " + listMembers[i].middle_name;
    }
    para.insertCell().innerHTML = '<a href="' + listMembers[i].url + '" target=_blank>' + name + '</a>'       


    var partyCand = listMembers[i].party.split("");
    para.insertCell().innerHTML = partyCand[0]

    var candState = listMembers[i].state;
    para.insertCell().innerHTML = candState
    
    if (listMembers[i].seniority == 0 || listMembers[i].seniority == 1) {
        var candSeniority = listMembers[i].seniority + " year"
    } else {
        var candSeniority = listMembers[i].seniority + " years"
    }
    para.insertCell().innerHTML = candSeniority;

    var candVotes = listMembers[i].votes_with_party_pct + " %"
    para.insertCell().innerHTML = candVotes
}

//document.getElementById("senate-data")

var checkLeng = listMembers.length

console.log(checkLeng)
