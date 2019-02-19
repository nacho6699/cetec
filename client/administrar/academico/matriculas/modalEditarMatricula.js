

Template.modalEditarMatricula.events({
	'submit #formEditarMatricula': function (e,template) {
		e.preventDefault();
   		//obteniendo la ultima gestion
   		var gestionUltimo = Gestiones.findOne({}, {sort: {gestion: -1}});
   		//var gestionUltimo=Gestiones.findOne();
		var matricula={
			"idUs":varEstudianteEditar.get().idUs,
			"id_grupo":e.target.sel_grupoM.value,
			"id_gestion":gestionUltimo._id
		}
		//console.log(matricula);
		Meteor.call('editarMatricula', matricula, function(error){
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
            	$("#formEditarMatricula")[0].reset();
            	$("#modalEditarMatricula").modal('hide');
            }
                
		});

	}
});

Meteor.subscribe('publi_modulos');
Meteor.subscribe('publi_carreras');
Meteor.subscribe('publi_grupos');
Meteor.subscribe('publi_gestiones');
//mi super variable de gestion
//superGestion = new ReactiveVar();

Template.modalEditarMatricula.helpers({
	estudiante:function(){
		return Meteor.users.findOne({_id:varEstudianteEditar.get().idUs});
	},
	carreraEstudiante:function(){
		return Carreras.findOne({_id:varEstudianteEditar.get().id_carrera});
	},
	modulos: function () {
		//para mostrar modulos de la ultima gestion
		var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		// consulta mostrar modulos de la carrera del estudiante y la ultima gestion
		return Modulos.find({$and:[{id_carrera:varEstudianteEditar.get().id_carrera},{id_gestion:gestion._id}]});
	},
	grupos: function () {
		return Grupos.find({id_carrera:varEstudianteEditar.get().id_carrera});
	}
});