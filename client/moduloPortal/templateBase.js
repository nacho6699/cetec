
Template.templateBase.onRendered(function(){
	$(".button-collapse").sideNav();
	var user = {
		"username" : 'ignacio',
		"email" : 'cruzi3836@gmail.com',
		"password" : 'mejorenelmundo',
		"profile" : {
			"copiaPass":'nada',
			"nombres" : 'JOSE',
			"apellidoP" :'CRUZ',
			"apellidoM" :'CRUZ',
			"telefono" :'66666666',
			"rol" :'administrador'
		}
	};
	//console.log(user);
	
	Meteor.call('registrarAdmin', user );
 });
