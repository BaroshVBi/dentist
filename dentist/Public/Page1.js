var panel = document.getElementById('panel');
var t = new Date();
const tydzien = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek','Piątek', 'Sobota']
alert(getCookie('rez'));

for (w = 0; w < 6; w++) {
    panel.innerHTML += "<div id='tydzien" + w + "' class='mySlides'>";
    var panel2 = document.getElementById('tydzien' + w);

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
        panel2.innerHTML += string + "</div>";

        t.setDate(t.getDate() + 1);
    }
}
panel.innerHTML += "<button type='button' onclick='plusDivs(-1)'>&#10095;</button>";

var dzisiaj = new Date();
for (i = 0; i < 5; i++) {
    wylacz(dzisiaj.getFullYear() + "-" + (dzisiaj.getMonth() + 1) + "-" + dzisiaj.getDate() + " 1" + i + ':00:00');
}
//wylacz('2022-12-14 14:00:00');


function wylacz(id) {
    var el = document.getElementById("godzina" + id);
    var label = findLabel(el);

    el.disabled = 'true';
    label.style.backgroundColor = 'gray';
}

//https://stackoverflow.com/questions/285522/find-html-label-associated-with-a-given-input
/////////////////////////////////////////////////////////////////////////////
function findLabel(el) {
    var idVal = el.id;
    labels = document.getElementsByTagName('label');
    for (var i = 0; i < labels.length; i++) {
        if (labels[i].htmlFor == idVal)
            return labels[i];
    }
}
/////////////////////////////////////////////////////////////////////////////

//https://www.w3schools.com/w3css/tryit.asp?filename=tryw3css_slideshow_self
/////////////////////////////////////////////////////////////////////////////
var slideIndex = 1;
showDivs(slideIndex);

function plusDivs(n) {
    showDivs(slideIndex += n);
}

function showDivs(n) {
    var i;
    var x = document.getElementsByClassName("mySlides");
    if (n > x.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = x.length }
    for (i = 0; i < x.length; i++) {
        x[i].style.display = "none";
    }
    x[slideIndex - 1].style.display = "block";
}
/////////////////////////////////////////////////////////////////////////////

//https://www.w3schools.com/js/js_cookies.asp
/////////////////////////////////////////////////////////////////////////////
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
/////////////////////////////////////////////////////////////////////////////