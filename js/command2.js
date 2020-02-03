var shortcutHouse = dataHouse.results[0].members

for (i=0; i<shortcutHouse.length; i++) {
     var element = document.getElementById("houseData");
     var para = document.createElement("tr")

     element.appendChild(para)
     
     //insert Full Name
     if (shortcutHouse[i].middle_name === null) {
         var nameHouse = shortcutHouse[i].last_name + ", " + shortcutHouse[i].first_name
     } else {
        var nameHouse = shortcutHouse[i].last_name + ", " + shortcutHouse[i].first_name + " " + shortcutHouse[i].middle_name 
     }

     para.insertCell().innerHTML = '<a href="' + shortcutHouse[i].url + '" target=_blank>' + nameHouse + '</a>'
    
     //inset Party
     var partyHouse = shortcutHouse[i].party;
     para.insertCell().innerHTML = partyHouse;

     //insert State
     var stateHouse = shortcutHouse[i].state;
     para.insertCell().innerHTML = stateHouse;

     //insertYear
     if (shortcutHouse[i].seniority === 1) {
         var yearsHouse = shortcutHouse[i].seniority + " year"
     } else {
        var yearsHouse = shortcutHouse[i].seniority + " years"
     }
     para.insertCell().innerHTML = yearsHouse;

     //votes with party
     var votesHouse = shortcutHouse[i].votes_with_party_pct + "%";

     para.insertCell().innerHTML = votesHouse;
}

