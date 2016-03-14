$(document).ready(function(){
	$("img.lazy").lazyload();
});

var Descuentos = function(){

	this.titulo = "Descuentos";
	this.dom = $(".seccion.descuentos");

	this.scrolltop = 0;
	this.cat = null;
	this.neg = null;


	this.mostrar = function(cat,neg){
		header.dom.find(".mapa").show();
		header.dom.find(".ant").hide();
		header.dom.find(".menu").show();
		if(cat!=this.cat || neg!=this.neg){

			this.cat = cat;
			this.neg = neg;
			$(".seccion.descuentos").empty();
			

			if(neg==undefined){

				if(cat==0){
					this.titulo = "Descuentos";
					$.each(data.descuentos,function(key,val){
						var it = new ItemDescuento(val);
						//console.log(it.html);
						$(".seccion.descuentos").append(it.html);

						
					})

				}else{
					
					$.each(data.descuentos,function(key,val){
						//this.titulo = "DESCUENTOS";
						//console.log(val);
						if(cat == val.categoria_id){
							
							descuentos.titulo = val.categoria;
							var it = new ItemDescuento(val);
							$(".seccion.descuentos").append(it.html);


						}

					})

				}
			}else{
				$.each(data.descuentos,function(key,val){
					if(neg == val.negocio_id){
						descuentos.titulo = val.negocio;
						var it = new ItemDescuento(val);
						$(".seccion.descuentos").append(it.html);
					}
				})
			}

			$("img.lazy").lazyload({
				container: $(".contenido"),
				skip_invisible : true,
				effect : "fadeIn",
				//placeholder:'img/md.jpg'
			});
			setTimeout(function(){
				$(window).trigger('resize');

				$(".seccion.descuentos .item").each(function(t){
					var infoh = $(this).find(".info").innerHeight();
					var imageh = $(this).find(".imagen img").innerHeight();

					$(this).css("height",infoh+imageh-30-6);
					$(this).css("opacity",1);
				})
			},300);
			

			

			$(".seccion.descuentos .item img.lazy").attr("height",w*367/616);
		}else{
			console.log("misma lista"+descuentos.scrolltop);
			//$(".contenido").hide();
			$(".contenido").animate({scrollTop:descuentos.scrolltop},1);
			//$("")
		}
		
		Descuentos.prototype.mostrar.call(this);
		
	}
	
}

Descuentos.prototype = new Seccion();

var descuentos =  new Descuentos();

var ItemDescuento = function(d){
	

	var mh = (w-12)*367/616;

	this.html = $(lib.ItemDescuento);
	
	this.html.find(".imagen").css("height",mh);
	this.html.find(".imagen img").attr("data-original",d.imagen);
	this.html.find(".info .categoria").html(d.categoria);
	this.html.find(".info .titulo").html(d.nombre);
	this.html.find(".info .negocio").html(d.negocio);
	this.html.find(".info .descripcion").html(d.descripcion);

	this.html.find(".imagen .nube").css("width",w-11);
	this.html.find(".imagen .nube").css("height",(w-12)*50/300);

	this.html.css("height",mh+this.html.find(".info").innerHeight());
	//this.html.find(".info ");
	new Boton(this.html,function(){
		descuentos.scrolltop = $(".contenido").scrollTop();
		//descuentos.scrolltop
		getContent({page:"detalle",id:d.id},true);

	});

}