var production = true;
var pathapi;
var login;
var user;
var seccion = "";

var w; //ancho de pantalla

var registrationId;
var deviceId;
var dispositivo = "Android";

if(production){
    //pathapi = "http://picnic.pe/clientes/bancofalabella/RESTAPI/";
    //pathapi = 'http://52.34.151.159/RESTAPI/';
    pathapi = "http://192.168.0.14/bancofalabella/CuentaSueldo/RESTAPI/";
}else{
    //pathapi = 'http://52.34.151.159/RESTAPI/';
    //pathapi = "http://192.168.0.14/bancofalabella/CuentaSueldo/RESTAPI/";
    pathapi = "http://localhost/bancofalabella/CuentaSueldo/RESTAPI/";
}

var apiurl = pathapi+"api.php";

var app = {
    
    initialize: function() {
        
        this.bindEvents();
    },

    bindEvents: function() {
        if(production) document.addEventListener('deviceready', this.onDeviceReady, false);
        else $(document).ready(this.onDeviceReady);
    },
    

    onDeviceReady: function() {
        console.log("----device");
        console.log(device);
        
        
        login = new Login();
        w = $(window).innerWidth();
    },
};




var Boton = function(dom,callback){
    var flagtouch=false;
    if(production){
        dom.on({
            "touchstart":function(){
                flagtouch=true;
                $(this).addClass("over");
            },
            "touchmove":function(){

                flagtouch=false;
            },
            "touchend":function(){
                if(flagtouch){
                    $(this).removeClass("over");

                    callback($(this));
                }
                

            }
        });
       

    }else{
        dom.bind({
            "mousedown":function(){
                $(this).addClass("over");
            },
            "mouseup":function(){
                $(this).removeClass("over");
                callback($(this));
            }
        });
    }

};

var Espera = function(){
    this.mensaje = function(str){
        $("#espera .msg").html(str);
    }
    this.show = function(){
        $("#espera").show();
    }
    this.hide = function(){
        $("#espera").hide();
        $("#espera .msg").html("");
    }
}

var Alerta = function(msg,callback,title,button){
    if(production){
        navigator.notification.alert(msg, callback, title, button);
    }else{
        alert(msg);
        callback();
    }
}

var Data = function(){

    this.categorias = new Array();
    this.descuentos = new Array();
    this.beneficios = new Array();
    this.locales = new Array();
    this.tipos = new Array();
    this.canales =  new Array();

}

var data = new Data();


window.onpopstate = function(event) {

   
    getContent(event.state,false);
   

    

};


function getContent(obj,addEntry){
    
   
    var antseccion = seccion;
    seccion=obj.page;

   
    if(antseccion!="") window[antseccion].ocultar();
       
    switch(seccion){
        case "descuentos":

            descuentos.mostrar(obj.cat,obj.neg);
            break;
        case "beneficios":
            beneficios.mostrar();
            break;
        case "encuentranos":
            encuentranos.mostrar();
            break;
        case "detalle":
            detalle.mostrar(obj.id);
            break;
        case "gmaps":
            gmaps.mostrar(obj.cat,obj.neg);
            break;
        case "ubicacion":
            ubicacion.mostrar(obj.negocio);
            break;
        case "canales":
            canales.mostrar();
            break;
    }

    if(menu.abierto) menu.cerrar();

    


   
   
    

    

    //window[antseccion].ocultar();
    //window[seccion].mostrar();

    if(addEntry == true) {
        history.pushState(obj,null); 
    }

    //window.scrollTo(0,0);

    
    


}

var Seccion = function(){

    this.mostrar = function(){
        this.dom.css('display',"block");
        this.dom.transition({opacity:0},0);
        this.dom.transition({opacity:1});

        header.setTitulo(this.titulo);

        //this.dom.show();
    }

    this.ocultar = function(){
        this.dom.hide();
    }
}