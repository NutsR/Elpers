  mapboxgl.accessToken = 'pk.eyJ1IjoiYmxha2VucjAxIiwiYSI6ImNrdDFyZ3ZrZTBkOHMydm56Yjk3MGkwbnMifQ.G5bp_EBof1-WDjZ-WtRFcQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: coord,
    zoom: 15
  });

 new mapboxgl.Marker({
	color: "#00008b"
	})
	   .setLngLat(coord)
           .addTo(map)
