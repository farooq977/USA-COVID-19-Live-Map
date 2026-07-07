// for mapbox 

mapboxgl.accessToken = 'Past here Your Mapbox Api Key';
	var map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v11',
	center: [-96, 37.8],
	zoom: 3,
});


$(document).ready(function(){
	$.ajax({
		url: "https://corona.lmao.ninja/v3/covid-19/jhucsse",
		type: "GET",
		dataType:"json",
		success: function(data){
			console.log(data[1]);
			for (i=0; i < data.length; i++) {
				var lat = data[i].coordinates.latitude
				var long = data[i].coordinates.longitude
				var country = data[i].country
				var confirmed = data[i].stats.confirmed
				var recovered = data[i].stats.recovered
				var deaths = data[i].stats.deaths
				var province = data[i].province

				// informaton popup box 
				var popup = new mapboxgl.Popup({ offset: 25 })
				.setHTML('<h2>Country '+country+'</h2>\
					<h4>Province '+province+'</h4>\
					<p><strong>Total Cases</strong> '+confirmed+'</p>\
					<p><strong>Recovered</strong> '+recovered+'</p>\
					<p><strong>Deaths</strong> '+deaths+'</p>');

				var el = document.createElement('div');
				el.id = 'marker';

				// // for mapbox marker
				new mapboxgl.Marker({
					draggable: false,
					color: "red",
				})
					.setLngLat([long, lat])
					.setPopup(popup)
					.addTo(map);

			}
			// out of forloop
			map.addControl(new mapboxgl.NavigationControl());
		},
	});
});



$(document).ready(function(){
  $('.next').on('click', function(){
    var currentImg = $('.active');
    var nextImg = currentImg.next();

    if(nextImg.length){
      currentImg.removeClass('active').css('z-index', -10);
      nextImg.addClass('active').css('z-index', 10);
    }
  });

  $('.prev').on('click', function(){
    var currentImg = $('.active');
    var prevImg = currentImg.prev();

    if(prevImg.length){
      currentImg.removeClass('active').css('z-index', -10);
      prevImg.addClass('active').css('z-index', 10);
    }
  });
});


// for world wide covid cases 

$(document).ready(function(){
	$.ajax({
		url: "https://corona.lmao.ninja/v3/covid-19/all",
		type: "GET",
		dataType: "json",
		success:function(allData){
			console.log(allData);
			var globleActive = allData.active
			var globleCases = allData.cases
			var globleDeaths = allData.deaths
			var globleRecovered = allData.recovered
			$(".info-bar").html("<h2 class='activec'>Active Cases "+globleActive+"</h2>\
				<h2 class='totalc'>Total Cases "+globleCases+"</h2>\
				<h2 class='totald'>Total Deaths "+globleDeaths+"</h2>\
				<h2 class='rec'>Recovered "+globleRecovered+"</h2>");
		},
	});
});