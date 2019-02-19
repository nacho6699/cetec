
Template.modalEditarModulo.events({
	'submit #formEditarModulo':function(e){
		e.preventDefault();
		var datos={
			'id_modulo':datos_modulo.get().id_modulo,
			"id_carrera":e.target.sel_editCarrera.value,
			"nombreModulo":e.target.sel_nombreModuloEdit.value,
			'nombreMateria':e.target.txt_nombreMateriaEdit.value,
			'sigla':e.target.txt_siglaEdit.value
		};
	    Meteor.call('editarModulo', datos, function(error){
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
            	$("#modalEditarModulo").modal('hide');
            }
                
		});    

	}
});
Meteor.subscribe('publi_carreras');
Template.modalEditarModulo.helpers({
	datosModulo:  function(){
		return datos_modulo.get();
	},
	carreras: function () {
		return Carreras.find({id_gestion:idGestion.get()});
	},
	cantidadModulosEdit:function(){
		var item=[];
		for (var i = idCarrera.get().numero_modulos - 1; i >= 0; i--) {
			item[i]="Modulo"+(i+1);
		}
		return item;
	
	}
});