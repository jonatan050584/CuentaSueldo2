var Beneficios = function(){
	this.total = 0;
	this.page = 1;
	this.data = new Array();

	this.titulo = "Beneficios";

	this.dom = $(".seccion.beneficios");

	$(".seccion.beneficios .lista").empty();
	$(".seccion.beneficios .nav .dots").empty();

	this.mostrar = function(){

		if(this.total==0){
			this.cargar();
		}
		header.dom.find(".mapa").hide();
		Beneficios.prototype.mostrar.call(this);
	}

	this.cargar = function(){
		$(".seccion.beneficios .lista").empty();
		$(".seccion.beneficios .nav .dots").empty();
		$.ajax({
			url:apiurl,
			data:{
				'ac':'beneficios',
				'nivel':user.nivel
			},
			dataType:'json',
			success:function(response){

				var dom = beneficios.dom;

				var total =  response.length;
				beneficios.total = total;
				dom.find(".lista").css("width",total*w);
				
				$.each(response,function(key,val){
					var it = new ItemBeneficio(val);
					dom.find(".lista").append(it.html);
					dom.find(".nav .dots").append('<div class="dot"></div>');
				});
				dom.find(".nav .dots .dot").first().addClass('ac');
				dom.find(".lista .item").css("width",w);

				
			
				
				

				$(".seccion.beneficios .lista").bind("swipeleft",function(){
					console.log("left");
					var w = $(".seccion.beneficios .lista .item").innerWidth();
					console.log(w);
					if(beneficios.page<total){

						beneficios.page++;

						var mov = w*(beneficios.page-1);
					
						
						dom.animate({scrollLeft:mov});

						console.log("ok");

						dom.find(".nav .dots .dot").removeClass('ac');
						dom.find(".nav .dots .dot").eq(beneficios.page-1).addClass('ac');

					}

				});


				$(".seccion.beneficios .lista").bind("swiperight",function(){
					console.log("right");
					var w = $(".seccion.beneficios .lista .item").innerWidth();
					console.log(w);

					if(beneficios.page>1){
						console.log("oks");
						beneficios.page--;
						var mov = w*(beneficios.page-1);
						dom.animate({scrollLeft:mov});
						dom.find(".nav .dots .dot").removeClass('ac');
						dom.find(".nav .dots .dot").eq(beneficios.page-1).addClass('ac');
					}
				})
			}
		})
	}

}

var ItemBeneficio = function(d){
	this.html = $(lib.ItemBeneficio);

	this.html.css("background-image","url("+d.imagen+")");
}

Beneficios.prototype = new Seccion();

var beneficios = new Beneficios();