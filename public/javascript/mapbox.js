  mapboxgl.accessToken = token;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: coord.geometry.coordinates,
    zoom: 15
  });

 new mapboxgl.Marker({
	color: "#00008b"
	})
	   .setLngLat(coord.geometry.coordinates)
	   .setPopup(
		new mapboxgl.Popup({ offset: 20})
		.setHTML(
	       `<h4>${coord.title}</h4><p>${coord.location}`
		))
           .addTo(map)
