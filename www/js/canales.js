var Canales = function(){
	this.cargado = false;
	this.map = null;
	this.myloc = null;
	this.markers = new Array();
	this.titulo = "Encuéntranos";
	this.openinfo = false;
	this.popupdata = null;
	this.dom = $(".seccion.canales");
	this.markerCluster = null;
	this.es = null;

	this.mostrar = function(){
		Canales.prototype.mostrar.call(this);

		this.openinfo = false;
    	$(".seccion.canales .info").hide();

		if(!this.cargado){
			this.cargar();
		}else{
			this.dom.find(".leyenda .item").each(function(){
				if($(this).hasClass('ac')){
					console.log($(this).find(".txt").html());
					header.setTitulo($(this).find(".txt").html());
				}
			})
		}
		header.dom.find(".mapa").hide();
	}

	this.cargar = function(){
		this.es = new Espera();
		this.es.mensaje("Cargando ubicaciones...");
		this.es.show();

		$.ajax({
			url:apiurl,
			data:{
				'ac':'canales'
			},
			dataType:'json',
			success:function(response){
				data.canales = response.canales;
				data.tipos = response.tipos;

				canales.cargado = true;


				$.each(data.tipos,function(key,val){

					var it = new ItemLeyendaCanal(val);
					canales.dom.find(".leyenda").append(it.html);
					canales.markers[parseInt(val.id)] = new Array();
				});
				canales.dom.find(".leyenda").append('<div class="clear"></div>');
				navigator.geolocation.getCurrentPosition(canales.onMyPosition, this.onError);


			}
		})

	}

	this.onMyPosition = function(position){
	    this.currentpos = position.coords;


	    var styles = [
	      {
	        featureType:"poi.business",
	        elementType:"labels",
	        stylers:[
	          {
	            visibility:"on"
	          }
	        ]
	      }
	    ];
	    var mapOptions = {
	      center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
	      zoom: 15,
	      mapTypeId: 'roadmap',
	      streetViewControl:false,
	      mapTypeControl:false,
	      zoomControl: false,
	      styles: styles
	    };

	    canales.map = new google.maps.Map(document.getElementById('map_canvas3'), mapOptions);
	  
	    this.myloc = new google.maps.Marker({
	      clickable:false,
	     
	      icon: new google.maps.MarkerImage(pathapi+'files/current2.png',
	                                                    new google.maps.Size(22,22)
	                                                   ),
	      shadow:null,
	      zIndex:999,
	      map:canales.map,
	      position:{lat:position.coords.latitude,lng:position.coords.longitude}
	    });
	    google.maps.event.addListenerOnce(canales.map, 'idle', function(){
		    // do something only the first time the map is loaded
		    //alert(1);
		    setTimeout(function(){
		    	canales.setMarkers();
		    	//canales.llenar(0);
		    },1000)
		});

		google.maps.event.addListener(canales.map,'dragstart',function(){
	      this.openinfo = false;
	       $(".seccion.canales .info").transition({y:97},200);
	    })

	   // canales.llenar(0);

	}

	this.setMarkers = function(){
		 $.each(data.canales,function(key,val){
		 	canales.llenarMarker(val);
		 });
		 this.markerCluster = new MarkerClusterer(canales.map, new Array());
		 this.llenar(0);
		 

		 this.es.hide();
	   
	}

	this.llenar = function(cat){
		 this.openinfo = false;
    	$(".seccion.canales .info").transition({y:97},200);
		if(cat == 0){
			$(".seccion.canales .leyenda .item").removeClass("ac");
     		$(".seccion.canales .leyenda .item").removeClass("des");
		}
	  	
		try{

	      this.markerCluster.clearMarkers();
	    }catch(e){
	      //
	    }
  		

	    if(cat==0){
	    	header.setTitulo("Encuéntranos");
	    	$.each(data.tipos,function(key,val){
	    		canales.markerCluster.addMarkers(canales.markers[parseInt(val.id)]);
	    	})	
	    }else{
	    	canales.markerCluster.addMarkers(canales.markers[cat]);
	    	$.each(data.tipos,function(key,val){
	    		if(val.id==cat) header.setTitulo(val.nombre);
	    		//canales.markerCluster.addMarkers(canales.markers[parseInt(val.id)]);
	    	})
	    }

	    

	    //$.each()
	    //this.markers =[];

	    /*$.each(data.canales,function(key,val){
	    	
	    	if(cat==0){
	    		canales.llenarMarker(val);

	    		header.setTitulo("Encuéntranos");
	    	}else{
	    		if(val.tipo_id == cat){
	    			canales.llenarMarker(val);
	    			header.setTitulo(val.tipo);
	    		}
	    	}
			

	  		
	    });*/
	    //console.log(canales.markers);
	    

	    //find_closest_marker();
	}
	this.llenarMarker = function(val){
		var coor = val.coordenadas.split(",")

		var lat = parseFloat(coor[0]);
		var lng = parseFloat(coor[1]);


		var image = {
			url:val.icono,
			scaledSize:new google.maps.Size(35, 35),
			origin: new google.maps.Point(0, 0)
		};
		var latLng = new google.maps.LatLng(lat,lng);
		var marker = new google.maps.Marker({
			'position':latLng,
			icon:image,
			//title:val.direccion
		//map:gmaps.map
		});

		marker.addListener('click', function() {
			
    		var t=0;
	        if(canales.openinfo==true){
	          t=200;

	        }

	        canales.popupdata = val;

	        $(".seccion.canales .info").show();
	        $(".seccion.canales .info").transition({y:97},t,function(){
	            
	            $(".seccion.canales .info .tipo").html(val.tipo);
	            $(".seccion.canales .info .nombre").html(val.nombre);
	            $(".seccion.canales .info .dir").html(val.direccion);
	            //$(".seccion.canales .info .n2").css("background-image",'url('+val.icono+')');
	            $(".seccion.canales .info").transition({y:0},300);
	            canales.openinfo=true;
	        });
  		});
  		
		//console.log(val);
  		canales.markers[parseInt(val.tipo_id)].push(marker);
	}
	this.onError = function(error){
		alert('code: '    + error.code    + '\n' +
	      'message: ' + error.message + '\n');
	}

}


Canales.prototype = new Seccion();

var canales = new Canales();

var ItemLeyendaCanal = function(d){

  this.html = $(lib.ItemLeyenda);
  this.html.find(".txt").html(d.nombre);
  this.html.css("background-image","url("+d.icono+")");

  new Boton(this.html,function(dom){
  	if(dom.hasClass("ac")){
  		canales.llenar(0);
  	}else{
  		canales.llenar(d.id);
  		$(".seccion.canales .leyenda .item").removeClass("ac");
     	$(".seccion.canales .leyenda .item").addClass("des");
     	dom.removeClass("des");
     	dom.addClass("ac");
  	}
  })

}