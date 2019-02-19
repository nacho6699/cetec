Template.modalEditarAdministradores.events({
	'submit #formEditarAdmin': function(e){
		e.preventDefault();
		var user = {
			"idUs":datosEditarAdmin.get().idUs,
			"username" : e.target.txt_ci.value,
			"email" : [{'address':e.target.email.value}],
			"password" : e.target.password.value,
			"profile" : {
				"nombres" : e.target.txt_nombres.value,
				"apellidoP" :e.target.txt_Ap.value,
				"apellidoM" :e.target.txt_Am.value,
				"telefono" :e.target.txt_telefono.value,
			}
		};
		console.log(user);
		Meteor.call('editarAdmin', user, function(error,result){
			if(error){
                alert(error.reason); 
                swal(
				  'Oops...',
				  'Error al Actualizar datos',
				  'error'
				)
			}else{
            	swal({
				  //position: 'top-end',
				  type: 'success',
				  title: 'Actualización exitosa',
				  showConfirmButton: false,
				  timer: 2000
				});
            	//$("#formEditarAdmin")[0].reset();
            	$("#modalEditarAdministradores").modal('hide');
            	//Meteor.loginWithPassword(user.username, user.password);
            }
                
		});

		//console.log(user);

	}
});

Template.modalEditarAdministradores.helpers({
	datosUsuario: function () {
		return datosEditarAdmin.get();
	}
});