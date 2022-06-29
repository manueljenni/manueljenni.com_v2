
// Token
mapboxgl.accessToken = 'pk.eyJ1IjoibWFudWVsbm9haGplbm5pIiwiYSI6ImNrdmk2N2NhazAyajgycG52Y2l5N2p5MGYifQ.ZHY3Gijy7ldNBUzPKlA2mg';
var mapbox_center = [-10.16,30];

// generate Map
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/manuelnoahjenni/ckvi68nsgiypn14s7uppns39h',
    center: [-10.16,30],
    zoom: 1.8,
    projection: 'globe'
});

// Current location
var currentLocationLongLat;
var currentLocationName;

addMarkers();

async function addMarkers() {
    // Fetch markers from API
    let markersResponse = await fetch('https://damp-atoll-27311.herokuapp.com/api/places/getAllPlacesUnique');
    let markersData = await markersResponse.json();
    var markers = markersData;

    // Add markers to map
    markers.forEach(element => {
        var el = document.createElement('div');
        el.className = 'marker';

        new mapboxgl.Marker(el)
            .setLngLat([element.longitude, element.latitude])
            .addTo(map);

        // Set current location
        if (element.type == 1) {
            currentLocationLongLat = [element.longitude, element.latitude];
            currentLocationName = element.city + " (" + element.countryCode + ")";

            var currentLocationButton = document.getElementById("currentLocation");
            currentLocationButton.textContent = "Current location: " + currentLocationName;
        }

        console.log(currentLocationName);
    });

    // Fetch upcoming routes from API
    let upcomingRoutesResponse = await fetch('https://damp-atoll-27311.herokuapp.com/api/flights/getUpcomingRoutes');
    let upcomingRoutesData = await upcomingRoutesResponse.json();
    var upcomingRoutes = upcomingRoutesData;

    // Add upcoming routes to map
    upcomingRoutes.forEach(element => {
        generateLine(
            [element.departureLongitude, element.departureLatitude],
            [element.arrivalLongitude, element.arrivalLatitude]);
    });

    // Fetch past routes from API
    let pastRoutesResponse = await fetch('https://damp-atoll-27311.herokuapp.com/api/flights/getPastRoutes');
    let pastRoutesData = await pastRoutesResponse.json();
    var pastRoutes = pastRoutesData;

    // Add past routes to map
    pastRoutes.forEach(element => {
        try {
            generateLine(
                [element.departureLongitude, element.departureLatitude],
                [element.arrivalLongitude, element.arrivalLatitude]);
        } catch (error) {
            // If there is an upcoming route
            // present that has already been a 
            // past route, do not add it again
            console.log("Existing route found.");
        }
    });
}

function generateLine(coord_start, coord_end) {

    var name = coord_start + coord_end;
    var start = { x: coord_start[0], y: coord_start[1] };
    var end = { x: coord_end[0], y: coord_end[1] };
  
    var generator = new arc.GreatCircle(start, end, {'name': name});
    var line = generator.Arc(100,{offset:20});
  
    map.addSource(name, {
  
    'type': 'geojson',
        'data':
        line.json()
    });
  
    map.addLayer({
        'id': name,
        'type': 'line',
        'source': name,
        'layout': {
        'line-join': 'round',
        'line-cap': 'round'
        },
        'paint': {
        'line-color': '#a2e3f5',
        'line-width': 6
        }
      });
  }

function mapZoomAll() {
    var width = $( window ).width();
  
  
    if(width < 1200) {
      // mobile
      map.flyTo({
        center: [parseInt(mapbox_center[0]) +10, parseInt(mapbox_center[1]) +10],
        zoom: 1,
        speed: 0.5,
        essential: true
      });
    } else {
      // desktop
      map.flyTo({
        center: mapbox_center,
        zoom: 1.8,
        speed: 0.5,
        essential: true
      });
    }
  }
  
  function mapZoomCurrentLocation() {
    // mobile
    map.flyTo({
      center: currentLocationLongLat,
      zoom: 3.5,
      speed: 0.5,
      essential: true
    });
  }