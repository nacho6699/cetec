Template.modalEditarDocente.events({
	'submit #formEditarDocente': function(e){
		e.preventDefault();
		var user = {
			"idUs":datosEditarDocente.get().idUs,
			"username" : e.target.txt_ci.value,
			"email" : [{'address':e.target.email.value}],
			"password" : e.target.password.value,
			"profile" : {
				"copiaPass" :e.target.password.value,
				"nombres" : e.target.txt_nombres.value,
				"apellidoP" :e.target.txt_Ap.value,
				"apellidoM" :e.target.txt_Am.value,
				"telefono" :e.target.txt_telefono.value,
				"profesion" :e.target.txt_profesion.value
			}
		};
		Meteor.call('editarDocente', user, function(error,result){
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
            	$("#formEditarDocente")[0].reset();
            	$("#modalEditarDocente").modal('hide');
            	//Meteor.loginWithPassword(user.username, user.password);
            }
                
		});

		//console.log(user);

	}
});

Template.modalEditarDocente.helpers({
	datosDocente: function () {
		return datosEditarDocente.get();
	}
});