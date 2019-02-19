Template.modalEditarGrupo.helpers({
	grupos:  function(){
		return datos_grupo.get();
	}
});

Template.modalEditarGrupo.events({
	'submit #formEditarGrupo':function(e){
		e.preventDefault();
		var datos={
			'id_grupo':datos_grupo.get().id_grupo,
			'nombreGrupo':e.target.txt_nombreGrupo.value,
			"turno":e.target.sel_turnoA.value,
			'horaInicio':e.target.txt_horaInicio.value,
			'horaFin':e.target.txt_horaFin.value
		};
	    Meteor.call('editarGrupo', datos, function(error){
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
            	$("#formEditarGrupo")[0].reset();
            	$("#modalEditarGrupo").modal('hide');
            }
                
		});    

	}
});