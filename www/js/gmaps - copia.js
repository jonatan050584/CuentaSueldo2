var Gmaps = function(){
  this.markersData = new Array();
  this.map = null;
  this.currentpos = null;

  this.dom = $(".seccion.gmaps");

  this.mostrar = function(){


    
    this.setData();
    //console.log(this.markersData);

    header.showBack();

    Gmaps.prototype.mostrar.call(this);
    

    $(".seccion.gmaps .leyenda").empty();

    $.each(data.categorias,function(key,val){
      
      var it = new ItemLeyenda(val);
      gmaps.dom.find(".leyenda").append(it.html);
    });
    gmaps.dom.find(".leyenda").append('<div class="clear"></div>');

    var ioh = gmaps.dom.find(".leyenda").innerHeight();

    $("#map_canvas").css("height","calc(100% - "+ioh+"px)");

    navigator.geolocation.getCurrentPosition(this.onMyPosition, this.onError);

  }

  this.onMyPosition = function(position){
    this.currentpos = position.coords;


    var div = document.getElementById("map_canvas");
    var coor = new plugin.google.maps.LatLng(position.coords.latitude,position.coords.longitude);
      // Initialize the map view
    gmaps.map = plugin.google.maps.Map.getMap(div,{
        'camera':{
          'latLng':coor,
          'zoom':13
        },
        'controls':{
          'myLocationButton':true,
          'zoom':true
        }
    });

      // Wait until the map is ready status.
    gmaps.map.addEventListener(plugin.google.maps.event.MAP_READY, gmaps.onMapReady);
  }

  this.onMapReady = function(){
    console.log("map ready");
    gmaps.llenar(0);

  }

  this.llenar = function(cat){
    //console.log(gmaps.markersData);
    $.each(gmaps.markersData,function(key,val){

      if(key<10){
        var coor = new plugin.google.maps.LatLng(val.lat, val.lng);

        //var myIcon = new plugin.google.maps.MarkerImage(val.icono,null,null,null,new plugin.google.maps.Size(30,30));

        gmaps.map.addMarker({
          position:coor,
          icon:val.icono
        })
      }
      

    })
  }

  this.onError = function(error){
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
  }

  this.setData = function(){


    $.each(data.descuentos,function(key,val){
      
      $.each(val.locales,function(k,v){
        var obj = new Object();
        obj.descuento_id = val.id;
        obj.negocio = val.negocio;
        obj.categoria_id = val.categoria_id;
        obj.direccion = v.direccion;
        obj.telefonos = v.telefonos;
        obj.icono = val.icono;

        var coor = v.coordenadas.split(",");

        obj.lat = coor[0];
        obj.lng = coor[1];

        gmaps.markersData.push(obj);

      });
    });

  }
}

Gmaps.prototype = new Seccion();

var gmaps = new Gmaps();


var ItemLeyenda = function(d){

  this.html = $(lib.ItemLeyenda);
  this.html.find(".txt").html(d.nombre);
  this.html.css("background-image","url("+d.icono+")");

}