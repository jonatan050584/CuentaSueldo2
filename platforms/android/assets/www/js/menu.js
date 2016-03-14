

var Menu = function(){
	

	this.abierto = false;

	new Boton($("#menu .bt.logout"),function(){
		window.localStorage.removeItem("doc");

		
		$("#header").hide();
		$("#menu").hide();
		$("#menu").transition({x:0},0);
		$(".contenido").hide();
		$("#cubre").hide();

		login.reiniciar();
	})

	this.iniciar = function(){
		this.abierto = true;
		$("#menu .info .usuario").html(user.nombres);
		$("#menu .info .doc").html(user.dni);

		$("#menu .nav .categorias").empty();

		$.each(data.categorias,function(key,val){

			var it = new ItemCategoria(val);
			$("#menu .nav .categorias").append(it.html);
		});

		$("#menu").show();
		$("#cubre").show();

		new Boton($("#cubre"),menu.cerrar);

		new Boton($("#menu .nav .sec"),function(t){
			
			var s = t.data("sec");
			

			if(s == "descuentos"){
				getContent({page:"descuentos",cat:0},true);
			}else{
				getContent({page:s},true);
			}
			
		});

		
	}

	this.abrir = function(){

		if(gmaps.map != null){
			try{
				gmaps.map.setClickable(false);	
			}catch(e){
				console.log("catch");
			}
		}
		this.abierto = true;
		$("#cubre").unbind();
		$("#cubre").show();
		$("#cubre").transition({opacity:1},function(){
			new Boton($("#cubre"),menu.cerrar);
		});
		$("#menu").show();
		$("#menu").transition({x:0});

		
	}

	this.cerrar = function(){

		if(gmaps.map != null){
			try{
				gmaps.map.setClickable(true);
			}catch(e){
				console.log("catch");
			}
			

		}

		this.abierto = false;
		$("#cubre").transition({opacity:0},function(){
			$("#cubre").hide();
		});
		$("#menu").transition({x:-260},function(){
			$("#menu").hide();
		})
	}
}

var menu =  new Menu();

var ItemCategoria =  function(obj){
	this.html = $('<div class="item" style="background-image:url('+obj.icono+')">'+obj.nombre+'</div>');
	new Boton(this.html,function(){
		getContent({page:"descuentos",cat:obj.id},true);
	})
}