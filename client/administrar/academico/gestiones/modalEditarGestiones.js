Template.modalEditarGestiones.helpers({
	gestion:  function(){
		return datos_gestion.get();
	}
});

Template.modalEditarGestiones.events({
	'submit #formEditarGestion':function(e){
		e.preventDefault();
		var datos={
			'id_gestion':datos_gestion.get().id_gestion,
			'gestion':e.target.txt_gestion.value
		};
	    Meteor.call('editarGestion', datos, function(error){
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
            	$("#formEditarGestion")[0].reset();
            	$("#modalEditarGestion").modal('hide');
            }
                
		});    

	},
	'change .txt_gestionEdit':function(){
		var gestion= Gestiones.findOne({}, {sort: {gestion: -1}});
		var fecha=new Date();
		var ano = fecha.getFullYear();
		if($('.txt_gestionEdit').val()<ano||$('.txt_gestionEdit').val()==gestion.gestion||$('.txt_gestionEdit').val()>(ano+1)){
			swal({
				type: 'info',
				title: 'La gestion no es valida ',
				showConfirmButton: false,
				timer: 4000
			});
			$('.txt_gestionEdit').val(gestion.gestion);
			document.getElementById('btn_crearGestionEdit').disabled=true;
		}else{
			document.getElementById('btn_crearGestionEdit').disabled=false;
		}
		
	}
});