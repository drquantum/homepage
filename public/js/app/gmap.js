var styles = exports.flatGreenStyle = [{
	"featureType": "poi.park",
	"elementType": "geometry.fill",
	"stylers": [{
		"hue": "#00ff91"
	}]
}, {
	"featureType": "road",
	"elementType": "geometry.fill",
	"stylers": [{
		"hue": "#00e5ff"
	}]
}, {
	"featureType": "road",
	"elementType": "geometry",
	"stylers": [{
		"hue": "#00ffd5"
	}]
}, {
	"featureType": "water",
	"elementType": "geometry",
	"stylers": [{
		"hue": "#0044ff"
	}]
}, {
	"featureType": "landscape",
	"elementType": "geometry.fill",
	"stylers": [{
		"hue": "#00eeff"
	}]
}, {
	"featureType": "administrative",
	"elementType": "labels.text.fill",
	"stylers": [{
		"hue": "#0091ff"
	}, {
		"color": "#424242"
	}]
}];


exports.init = function(mapId, marker_title, styles, lat, lng) {

	var myLatlng = new google.maps.LatLng(lat, lng);
	var styledMap = new google.maps.StyledMapType(styles, {
		name: "StyledMap"
	});

	var map_canvas = document.getElementById(mapId);

	var map_options = {
		center: myLatlng,
		zoom: 13,
		mapTypeControlOptions: {
			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
		}
	};

	var map = new google.maps.Map(map_canvas, map_options);

	var marker = new google.maps.Marker({
		position: myLatlng,
		map: map,
		title: marker_title,
		animation: google.maps.Animation.DROP,
		draggable: false
	});
	
	
	map.mapTypes.set('map_style', styledMap);
	map.setMapTypeId('map_style');

	google.maps.event.addListener(marker, 'click', function() {
		if (marker.getAnimation() != null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	});
};

