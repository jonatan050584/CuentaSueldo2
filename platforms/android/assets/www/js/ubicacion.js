var Ubicacion = function(){
	this.map = null;
	this.dom = $(".seccion.ubicacion");
	this.negocio_id = null;
	this.markers = [];
	this.myloc = null;
	this.openinfo = false;
	this.popupdata = null;

	this.mostrar = function(negocio_id){
		this.negocio_id = negocio_id;
		Ubicacion.prototype.mostrar.call(this);

		this.openinfo = false;
    	$(".seccion.ubicacion .info").hide();
		

		navigator.geolocation.getCurrentPosition(this.onMyPosition, this.onError);
	}

	this.onMyPosition = function(position){
	    this.currentpos = position.coords;


	    var styles = [
	      {
	        featureType:"poi.business",
	        elementType:"labels",
	        stylers:[
	          {
	            visibility:"off"
	          }
	        ]
	      }
	    ];
	    var mapOptions = {
	      center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
	      zoom: 13,
	      mapTypeId: 'roadmap',
	      streetViewControl:false,
	      mapTypeControl:false,
	      zoomControl: false,
	      styles: styles
	    };

	    ubicacion.map = new google.maps.Map(document.getElementById('map_canvas2'), mapOptions);
	  
	    this.myloc = new google.maps.Marker({
	      clickable:false,
	     
	      icon: new google.maps.MarkerImage(pathapi+'files/current2.png',
	                                                    new google.maps.Size(22,22)
	                                                   ),
	      shadow:null,
	      zIndex:999,
	      map:ubicacion.map,
	      position:{lat:position.coords.latitude,lng:position.coords.longitude}
	    });


	    ubicacion.llenar(0);

	}

	this.llenar = function(cat){

	  	

  
	    this.markers =[];

	    $.each(data.locales,function(key,val){
	    	if(val.negocio_id == ubicacion.negocio_id){


				var coor = val.coordenadas.split(",")

				var lat = parseFloat(coor[0]);
				var lng = parseFloat(coor[1]);

	 
				var image = {
					url:val.icono,
					scaledSize:new google.maps.Size(25, 25),
					origin: new google.maps.Point(0, 0)
				};
				var latLng = new google.maps.LatLng(lat,lng);
				var marker = new google.maps.Marker({
					'position':latLng,
					icon:image,
					title:val.direccion
				//map:gmaps.map
				});

				marker.addListener('click', function() {

	        		var t=0;
			        if(ubicacion.openinfo==true){
			          t=200;

			        }

			        ubicacion.popupdata = val;

			        $(".seccion.ubicacion .info").show();
			        $(".seccion.ubicacion .info").transition({y:97},t,function(){
			            $(".seccion.ubicacion .info .thumb img").attr("src",val.thumb);
			            $(".seccion.ubicacion .info .des .cat").html(val.categoria);
			            $(".seccion.ubicacion .info .des .nombre").html(val.negocio);
			            $(".seccion.ubicacion .info .des .dir").html(val.direccion);
			            $(".seccion.ubicacion .info").transition({y:0},300);
			            ubicacion.openinfo=true;
			        });
	      		});

	      		ubicacion.markers.push(marker);

	  		}
	    });

	    var markerCluster = new MarkerClusterer(ubicacion.map, ubicacion.markers);
	    find_closest_marker();
	}

	this.onError = function(error){
		alert('code: '    + error.code    + '\n' +
	      'message: ' + error.message + '\n');
	}


	var rad = function(x){
		return x*Math.PI/180;
	}
	var find_closest_marker = function() {
		//console.log(ubicacion.markers);
	    var lat = this.currentpos.latitude;
	    var lng = this.currentpos.longitude;
	    var R = 6371; // radius of earth in km
	    var distances = [];
	    var closest = -1;
	    for( i=0;i<ubicacion.markers.length; i++ ) {
	        var mlat = ubicacion.markers[i].position.lat();
	        var mlng = ubicacion.markers[i].position.lng();
	        var dLat  = rad(mlat - lat);
	        var dLong = rad(mlng - lng);
	        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
	            Math.cos(rad(lat)) * Math.cos(rad(lat)) * Math.sin(dLong/2) * Math.sin(dLong/2);
	        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	        var d = R * c;
	        distances[i] = d;
	        if ( closest == -1 || d < distances[closest] ) {
	            closest = i;
	        }
	    }

	  

	    var bounds = new google.maps.LatLngBounds();
	    bounds.extend(this.myloc.getPosition());
	    bounds.extend(ubicacion.markers[closest].getPosition());
	    ubicacion.map.fitBounds(bounds);
	}
}


Ubicacion.prototype = new Seccion();

var ubicacion = new Ubicacion();

