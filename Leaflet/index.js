let map = L.map('map').setView([0,0],1);

L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=f8XhqqItUC0E8uVL6dTd', {
    attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
}).addTo(map)