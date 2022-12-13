var panel = document.getElementById('panel');
var t = new Date();
const tydzien = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek','Piątek', 'Sobota']

for (j = 0; j < 5; j++) {
    var string = "";
    var h = 10;
    var time = "" + t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate();

    string += "<div class='radio-toolbar'><h2>" + tydzien[t.getDay()] + "</h2><p>(" + time + ")</p>";
    for (i = 0; i < 5; i++) {
        var time2 = time + " " + h + ":00:00";
        string += "<input type='radio' id='godzina" + time2 + "' name='godzina' value='" + time2 + "'><label for='godzina" + time2 + "'>" + h + ": 00</label>"
        h = h + 1;
    }
    panel.innerHTML += string + "</div>";
    t.setDate(t.getDate() + 1);
}
panel.innerHTML += "<input type='submit' value='Submit'>";