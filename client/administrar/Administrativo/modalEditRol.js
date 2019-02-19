Template.modalEditarRol.events({
	'submit #formEditarRol':function(e){
		e.preventDefault();
		var datos={
			"idUs":datos_rol.get(),
			"nuevoRol":e.target.rol_edit.value
		}

	    Meteor.call('editarRol', datos, function(error){
			if(error){
                alert(error.reason); 
                swal(
				  'Oops...',
				  'Error al actualizar',
				  'error'
				)
			}
            else{
            	swal({
				  //position: 'top-end',
				  type: 'success',
				  title: 'Actualización correcta',
				  showConfirmButton: false,
				  timer: 2000
				});
            	//$("#formEditarModulo")[0].reset();
            	$("#modalEditarRol").modal('hide');
            }
                
		}); 

	}
});