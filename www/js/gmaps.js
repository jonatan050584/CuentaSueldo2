var Gmaps = function(){
 
  this.map = null;
  this.currentpos = null;
  this.openinfo = false;
  this.popupdata = null;

  this.dom = $(".seccion.gmaps");
  this.markerCluster = null;
  this.myloc = null;
  this.markers = [];
  this.cat = 0;

  new Boton(this.dom.find(".info"),function(){
    
    var neg = gmaps.popupdata.negocio_id;
    var count=0;
    var did;
    $.each(data.descuentos,function(key,val){
      if(val.negocio_id==neg){
        did = val.id;
        count++;
      }
    });
    
    if(count==1){
      getContent({page:"detalle",id:did},true);
    }else{
      getContent({page:"descuentos",cat:null,neg:neg},true);
    }

  });

  this.mostrar = function(cat,neg){
    this.cat = cat;
    
   
    header.showBack();
    header.dom.find(".mapa").hide();

    this.openinfo = false;
    $(".seccion.gmaps .info").hide();


    Gmaps.prototype.mostrar.call(this);
    
    if($(".seccion.gmaps .leyenda .item").length==0){
      this.llenarLeyendas();
      navigator.geolocation.getCurrentPosition(this.onMyPosition, this.onError);
    }else{
     // console.log(gmaps.myloc);
     // gmaps.myloc.setPosition();

      gmaps.llenar(this.cat);
      //$(".seccion.gmaps .leyenda .item").removeClass("ac");
      //$(".seccion.gmaps .leyenda .item").removeClass("des");
      //header.setTitulo("Descuentos");


      navigator.geolocation.getCurrentPosition(function(pos){
        var newpos = new google.maps.LatLng(pos.coords.latitude,pos.coords.longitude);
        //var newpos = new google.maps.LatLng(-12.071854, -77.115097);
        gmaps.myloc.setPosition(newpos);
        gmaps.map.setCenter(newpos);
        gmaps.map.setZoom(13);
      },this.onError);
    }
    

    

  }


  this.llenarLeyendas = function(){
    var fl = false;

    $.each(data.categorias,function(key,val){
      
      var it = new ItemLeyenda(val);
      gmaps.dom.find(".leyenda").append(it.html);
      
      if(it.html.innerWidth()>w/3) fl = true;
    });
    if(fl){
      $(".gmaps .leyenda .item").css("width",w/2);
    }
    gmaps.dom.find(".leyenda").append('<div class="clear"></div>');

    var ioh = gmaps.dom.find(".leyenda").innerHeight();

    $("#map_canvas").css("height","calc(100% - "+ioh+"px)");
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
      styles: styles,
      zoomControl: false,
      /*zoomControlOptions: {
          position: google.maps.ControlPosition.RIGHT_CENTER
      },*/
    };

    gmaps.map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
  
    gmaps.myloc = new google.maps.Marker({
      clickable:false,
     
      icon: new google.maps.MarkerImage(pathapi+'files/current2.png',
                                                    new google.maps.Size(22,22)
                                                   ),
      shadow:null,
      zIndex:999,
      map:gmaps.map,
      position:{lat:position.coords.latitude,lng:position.coords.longitude}
    });
    google.maps.event.addListener(gmaps.map,'dragstart',function(){
      this.openinfo = false;
       $(".seccion.gmaps .info").transition({y:97},200);
    })

    gmaps.llenar(gmaps.cat);

  }



 

  this.llenar = function(cat){
    this.openinfo = false;
    $(".seccion.gmaps .info").transition({y:97},200);
    if(cat==0){

      $(".seccion.gmaps .leyenda .item").removeClass("ac");
      $(".seccion.gmaps .leyenda .item").removeClass("des");
      header.setTitulo("Descuentos");
    }else{
      
      $(".seccion.gmaps .leyenda .item").removeClass("ac");
      $(".seccion.gmaps .leyenda .item").addClass("des");
      $("#cat"+cat).removeClass("des");
      $("#cat"+cat).addClass("ac");

      $.each(data.categorias,function(key,val){
        if(val.id == cat){
          header.setTitulo(val.nombre);
        }
      })
    }
    try{

      this.markerCluster.clearMarkers();
    }catch(e){
      //
    }

    this.markers =[];

    $.each(data.locales,function(key,val){


      if(cat==0) gmaps.llenarMarker(val);
      else{
        if(val.categoria_id == cat){
          header.setTitulo(val.categoria);
          gmaps.llenarMarker(val);
        }
      }

    });

    this.markerCluster = new MarkerClusterer(gmaps.map, this.markers);
  }

  this.llenarMarker = function(val){
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
      //map:gmaps.map
    });

    marker.addListener('click', function() {
      //alert(val.nombre);
      
      var t=0;
      if(gmaps.openinfo==true){
        t=200;

      }

      gmaps.popupdata = val;

      $(".seccion.gmaps .info").show();
      $(".seccion.gmaps .info").transition({y:97},t,function(){
          $(".seccion.gmaps .info .thumb img").attr("src",val.thumb);
          $(".seccion.gmaps .info .des .cat").html(val.categoria);
          $(".seccion.gmaps .info .des .nombre").html(val.negocio);
          $(".seccion.gmaps .info .des .dir").html(val.direccion);
          $(".seccion.gmaps .info").transition({y:0},300);
          gmaps.openinfo=true;
      });
       
     
    });

    gmaps.markers.push(marker);
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
  this.html.attr("id","cat"+d.id);

  new Boton(this.html,function(dom){

    if(dom.hasClass("ac")){
      gmaps.llenar(0);
      //$(".seccion.gmaps .leyenda .item").removeClass("ac");
      //$(".seccion.gmaps .leyenda .item").removeClass("des");
      //header.setTitulo("Descuentos");
    }else{
      //$(".seccion.gmaps .leyenda .item").removeClass("ac");
      //$(".seccion.gmaps .leyenda .item").addClass("des");
      //dom.removeClass("des");
      //dom.addClass("ac");
      //header.setTitulo(d.nombre);
      gmaps.llenar(d.id);
    }
    
  })

}