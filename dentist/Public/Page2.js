var time = new Date(getCookie('godzina'));
document.getElementById('rezerwacja').innerHTML = time.getHours() + ':00';
document.getElementById('rezerwacjainput').value = getCookie('godzina');

    //https://www.w3schools.com/js/js_cookies.asp
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
