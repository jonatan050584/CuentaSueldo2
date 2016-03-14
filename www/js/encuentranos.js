var Encuentranos = function(){
	this.titulo = "Encuéntranos";
	this.dom = $(".seccion.encuentranos");


	new Boton(this.dom.find(".bt.buscar"),function(){
		getContent({page:"canales"},true);
	});

	new Boton(this.dom.find(".bt.llamar"),function(){
		window.open("tel:+5116154300", '_system');
	})
}

Encuentranos.prototype = new Seccion();

var encuentranos = new Encuentranos();