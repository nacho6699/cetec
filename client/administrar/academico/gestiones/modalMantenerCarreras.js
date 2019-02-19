Meteor.subscribe('publi_gestiones');
Template.modalMantenerCarreras.events({
	'click .btn_mantenerCarreras': function () {
		var gestionActual = Gestiones.findOne({}, {sort: {gestion: -1}});
		var gestionElegida=$("input[name='gestion']:checked").val();
		var datos={
			"gestionActual":gestionActual._id,
			"gestionElegida":gestionElegida
		}
		//alert(gestionElegida);
		Meteor.call('mantenerCarreras', datos, function(error){
			if(error){
                alert(error.reason); 
                swal(
				  'Lo sentimos',
				  'Error al Copiar las Carreras',
				  'error'
				)
			}
            else{
            	swal({
				  type: 'success',
				  title: 'Carreras copiadas correctamente',
				  showConfirmButton: false,
				  timer: 2000
				});
            	//$("#formRegistrarGestion")[0].reset();
            	$("#modalmantenerCarreras").modal('hide');
            }
                
		});
	}
});
Template.modalMantenerCarreras.helpers({
	/*gestionActual: function () {
		var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return gestion.gestion;
	},*/
	gestiones:function(){
		var gestionActual = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Gestiones.find({_id:{$ne: gestionActual._id}});
	}
});