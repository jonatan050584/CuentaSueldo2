var Login = function(){
	

	


	new Boton($("#login .bt.login"),function(){

		var dni = $("#login input[name=dni]").val();

		if(dni.length<8){
			new Alerta("DNI INCORRECTO", function(){}, "Error", "Aceptar");
		}else{

			
			
			login.validar(dni,function(){
				$("#login .error").show();
			})
			

		}

	});

	new Boton($("#login .error .cerrar"),function(){
		$("#login .error").hide();

	});
	new Boton($("#login .error .bt.cuentasueldo"),function(){
		window.open("https://www.bancofalabella.pe/solicitud/?p=6", '_system');
	})


	this.validar = function(doc,onNoExiste){

		var es = new Espera();
		es.mensaje("Validando...");
		es.show();

		$.ajax({
			url:apiurl,
			data:{
				ac:'login',
				dni:doc
			},
			dataType:'json',
			success: function(res){
				
				if(res.existe){
					
					user = new User(res.info);

					window.localStorage.setItem("doc",user.dni);
					es.mensaje("Cargando descuentos...");
					$.ajax({
						url:apiurl,
						data:{
							'ac':'descuentos',
							'nivel':user.nivel
						},
						dataType:'json',
						success:function(response){

							data.categorias = response.categorias;
							data.descuentos = response.descuentos;
							data.locales = response.locales;
							es.hide();

							$("#login").hide();
							$("#header").show();
							$(".contenido").show();

							getContent({page:"descuentos",cat:0},true);
							


							
							

							

							menu.iniciar();
							
						}
					})
					
					

				}else{
					es.hide();
					onNoExiste();
				}
			}
		})
	}

	this.reiniciar = function(){
		$("#login").show();
		 $("#login input[name=dni]").val("");
		 beneficios.total=0;
		 beneficios.page=1;
		 beneficios = new Beneficios();
		 $(".seccion.beneficios .lista").empty();
		 $(".seccion.beneficios .nav .dots").empty();
		 $(".seccion.beneficios .lista").unbind();
	}

	
	if(window.localStorage.getItem("doc")==null){
		$("#login").show();
	}else{
		this.validar(window.localStorage.getItem("doc"),function(){
			$("#login").show();
		});
	}
}