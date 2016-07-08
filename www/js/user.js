var User = function(info){
	this.dni = info.dni;
	this.nombres = info.nombres;
	this.apellido_paterno = info.apellido_paterno;
	this.apellido_materno = info.apellido_materno;

	this.nivel = info.level;


	var push = PushNotification.init({
        android: {
            senderID: "564039352699"
        },
        ios: {
            alert: "true",
            badge: "true",
            sound: "true"
        },
        windows: {}
    });

    push.on('registration', function(data) {
        
        /*$.ajax{
			url:apiurl,
			data:{
				'ac':'registrarDispositivo',
				'doc':this.dni,
				'registrationId':data.registrationId
			},
		}*/

		console.log(data);
    


    });

	

}