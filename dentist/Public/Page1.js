//alert("halo");
var panel = document.getElementById('panel');
var string = "";
var d = 0;
var h = 10;
var t = new Date();
var time = "" + t.getFullYear() + "-" + (t.getMonth() + 1) + "-" + t.getDate() + " ";

string += "<div class='radio-toolbar'>";
for (i = 0; i < 5; i++)
{
    var time2 = time + h + ":00:00";
    //alert(time2);
    string += "<input type='radio' id='godzina" + d + "" + i + "' name='godzina' value='" + time2 + "'><label for='godzina" + d + "" + i + "'>"+ h + ": 00</label>"
    h = h + 1;
}
panel.innerHTML +=string + "</div>";

