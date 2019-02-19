var id_carreraEditDesig=new ReactiveVar();
Template.modalEditarDesignacion.events({
	'click .btn_actualizarDesig':function(e){
		e.preventDefault();
		var dato = [];
		//obteniendo toda la tabla
		var ultimaGestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		var tabla = $('.t_modulosEdit tbody tr');
		tabla.each(function(){
			var id_modulo = $(this).attr('class');
			var	mod_elegido =$(this).find('input:checkbox[name=chek_moduloEdit]:checked').val();
			var	id_grupo =$(this).find('select[name=sel_grupoEdit]').val();
			var turno=$(this).find(':selected').data('turno');
			if (!(typeof mod_elegido === "undefined")){
				item={
					"idUs":varDocente.get().idUs,
					"id_gestion":ultimaGestion._id,
					"id_designacion":datos_designacion.get(),
					"id_modulos":mod_elegido,
					"id_grupo":id_grupo,
					"turno":turno
				}
				dato.push(item);
			}		
		});
		//console.log(dato);
		Meteor.call('editarDesignacion', dato, function(error,result){
			if(error){
                alert(error.reason); 
                swal(
				  'Lo sentimos',
				  'Error al registrar',
				  'error'
				)
			}else if(result){
				swal({
				  type: 'info',
				  title: result,
				  showConfirmButton: false,
				  timer: 3000
				});
			}else{
            	swal({
				  type: 'success',
				  title: 'Actualización Correcta!!!',
				  showConfirmButton: false,
				  timer: 2000
				});
            	//$("#formDesignarDocente")[0].reset();
            	$("#modalEditarDesignacion").modal('hide');
            }
                
		});
	},	
	'change #sel_carreraEditDesig' :function(e){
		e.preventDefault();
		id_carreraEditDesig.set(e.target.value);
	}
});

Meteor.subscribe('publi_carreras');
Meteor.subscribe('publi_grupos');
Meteor.subscribe('publi_modulos');
Meteor.subscribe('publi_designaciones');

Template.modalEditarDesignacion.helpers({
	carrerasEdit:function(){
		return Carreras.find();
	},
	modulosEdit:function(){
		return Modulos.find({id_carrera:id_carreraEditDesig.get()});
	},
	gruposEdit:function(){
		return Grupos.find({id_carrera:id_carreraEditDesig.get()});
	},
	gestionActual:function(){
		return Gestiones.findOne({}, {sort: {gestion: -1}});
	}
})	