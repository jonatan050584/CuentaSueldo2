var Detalle = function(){
	this.dom = $(".seccion.detalle");
	this.titulo = "";
	this.data = null;
	

	new Boton(this.dom.find(".botones .btn.legal"),function(){
		detalle.dom.find(".popup.restricciones").show();
		//$(".seccion.detalle .popup.restricciones").transition({opacity:0},0);
		//$(".seccion.detalle .popup.restricciones").transition({opacity:1});
	});


	new Boton(this.dom.find(".popup.restricciones .cerrar"),function(){
		detalle.dom.find(".popup.restricciones").hide();
	});

	new Boton(this.dom.find(".botones .btn.mapa"),function(){
		getContent({page:"ubicacion",negocio:detalle.data.negocio_id},true);
	});

	new Boton(this.dom.find(".botones .btn.codigo"),function(){
		detalle.dom.find(".popup.codigobarras").show();
	});
	new Boton(this.dom.find(".popup.codigobarras .cerrar"),function(){
		detalle.dom.find(".popup.codigobarras").hide();
	});
	
	this.mostrar = function(id){

		$("#header .mapa").hide();
		$("#header .menu").hide();
		$("#header .ant").show();

		var dom = this.dom;
		var info;
		$.each(data.descuentos,function(key,val){
			if(val.id == id){

				info = val;
				detalle.data = info;

			}
		});


		this.titulo = info.negocio;

		var mh = w*422/639;

		dom.find(".imagen img").attr("src",info.imagen);
		dom.find(".imagen").css("height",mh);
		dom.find(".imagen img").attr("height",mh);

		dom.find(".imagen .nube").css("width",w);
		dom.find(".imagen .nube").css("height",w*50/300);

		//dom.find(".img").attr("src",info.imagen);
		dom.find(".info .categoria").html(info.categoria);
		dom.find(".info .titulo").html(info.nombre);
		dom.find(".info .negocio").html(info.negocio);
		dom.find(".info .descripcion").html(info.detalle);
		if(info.codigobarras==undefined){
			dom.find(".info .botones .btn.codigo").hide();
		}else{
			console.log(info.codigobarras);
			dom.find(".popup.codigobarras .area").css("background-image","url("+info.codigobarras+")");
			dom.find(".info .botones .btn.codigo").show();
		}
		dom.find(".popup.restricciones .txt").html(info.legal);
		
		setTimeout(function(){
			var sh = mh+dom.find(".info").innerHeight()-30;
			var dh = $(document).innerHeight()-58;
			
			$(".seccion.detalle").css("height",dh);
			
		},300);

		

		Detalle.prototype.mostrar.call(this);
	}
	this.ocultar = function(){
		this.dom.find(".img").attr("src","");

		Detalle.prototype.ocultar.call(this);
	}
}

Detalle.prototype = new Seccion();

var detalle = new Detalle();