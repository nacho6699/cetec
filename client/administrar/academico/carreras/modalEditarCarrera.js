Template.modalEditarCarrera.helpers({
	carrera:  function(){
		return datos_carrera.get();
	},
	cantidad:function(){
		return datos_carrera.get();
	}
});

Template.modalEditarCarrera.events({
	'submit #formEditarCarrera':function(e){
		e.preventDefault();
		var datos={
			'id_carrera':datos_carrera.get().id_carrera,
			'nombreCarrera':e.target.txt_nombreCarrera.value,
			'numeroModulos':e.target.txt_cantidadModulos.value,
			'numeroEstudiantes':e.target.txt_cantidadEstudiantes.value
		};
	    Meteor.call('editarCarrera', datos, function(error){
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
            	$("#formEditarCarrera")[0].reset();
            	$("#modalEditarCarrera").modal('hide');
            }
                
		});    

	}
});