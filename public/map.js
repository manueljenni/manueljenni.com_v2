
// Token
mapboxgl.accessToken = 'pk.eyJ1IjoibWFudWVsbm9haGplbm5pIiwiYSI6ImNrdmk2N2NhazAyajgycG52Y2l5N2p5MGYifQ.ZHY3Gijy7ldNBUzPKlA2mg';
 
// generate Map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/manuelnoahjenni/ckvi68nsgiypn14s7uppns39h',
    center: [-10.16,30],
    zoom: 1.8,
    projection: 'globe'
});

addMarkers();

async function addMarkers() {
    let response = await fetch('https://damp-atoll-27311.herokuapp.com/api/places/getAllPlacesUnique');
    let data = await response.json();
    var markers = data;

    

    markers.forEach(element => {
        var el = document.createElement('div');
        el.className = 'marker';
        console.log(element);

        new mapboxgl.Marker(el)
            .setLngLat([element.longitude, element.latitude])
            .addTo(map);
    });
}