Meteor.subscribe('publi_gestiones');
Template.modalMantenerModulos.events({
	'click .btn_mantenerModulos': function () {
		var gestionActual = Gestiones.findOne({}, {sort: {gestion: -1}});
		var gestionElegida=$("input[name='gestion']:checked").val();
		var datos={
			"gestionActual":gestionActual._id,
			"gestionElegida":gestionElegida
		}
		//alert(gestionElegida);
		Meteor.call('mantenerModulos', datos, function(error){
			if(error){
                alert(error.reason); 
                swal(
				  'Lo sentimos',
				  'Error al Copiar modulos',
				  'error'
				)
			}
            else{
            	swal({
				  type: 'success',
				  title: 'Modulos copiados correctamente',
				  showConfirmButton: false,
				  timer: 2000
				});
            	//$("#formRegistrarGestion")[0].reset();
            	$("#modalmantenerModulos").modal('hide');
            }
                
		});
	}
});
Template.modalMantenerModulos.helpers({
	gestionPasada: function () {
		var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return gestion.gestion-1;
	},
	gestiones:function(){
		var gestionActual = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Gestiones.find({_id:{$ne: gestionActual._id}});
	}
});