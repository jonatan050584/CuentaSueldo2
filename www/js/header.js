var Header = function(){
	this.dom = $("#header");
	new Boton($("#header .menu"),function(){
		menu.abrir();
		//getContent({page:"menu"},true);
		//$("#header .menu").transition({rotate:90});
		
	});

	new Boton($("#header .mapa"),function(){
		getContent({page:"gmaps",cat:descuentos.cat,neg:descuentos.neg},true);
	})

	new Boton($("#header .ant"),function(){
		history.back();
	})

	this.setTitulo = function(str){
		$("#header .titulo").html(str);
	}
	this.showBack = function(){
		$("#header .menu").hide();
		$("#header .ant").show();
	}


}
var header = new Header();