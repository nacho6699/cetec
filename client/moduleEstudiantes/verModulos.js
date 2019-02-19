Meteor.subscribe('publi_gestiones');
Meteor.subscribe('publi_carreras');
Meteor.subscribe('publi_modulos');
Meteor.subscribe('publi_materias');
var idCarreraEstudiante=new ReactiveVar();

Template.verModulos.onRendered(function(){
	$("#sec_listaDesignacion").hide();
	$('#contenedorModulos').css('display','none');
});
Template.verModulos.events({
	'click .btn_carreraNotas':function(){
		idCarreraEstudiante.set(this);
		$("#contenedorCarreras").slideUp(1000);
		$("#contenedorModulos").slideDown(1000);
	},
	'click .btn_volver':function(){
		$("#contenedorModulos").slideUp(1000);
		$("#contenedorCarreras").slideDown(1000);
	}
})
Template.verModulos.helpers({
	matricula:function(){
		var user=Meteor.user();    
	 	var id=user._id;
	 	//ultima gestion
	 	var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Matriculas.find({$and:[{idUs:id},{id_gestion:gestion._id},{id_carrera:idCarreraEstudiante.get().toString()}]});
	},
	modulos:function(){
		var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Modulos.find({_id:this.id_modulos});
	},
	materia:function(){
		return Materias.findOne({_id:this.id_materia});
	},
	grupo:function(){
		return Grupos.findOne({_id:this.id_grupo});
	},
	designaciones:function(){
		var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Designaciones.find({$and:[
			{id_modulos:this.id_modulos},
			{id_grupo:this.id_grupo},
			{id_gestion:gestion._id}
		]});
	},
	docentes:function(){
		return Meteor.users.findOne({_id:this.idUs});
	},
	carrerasUser:function(){
		var user=Meteor.user();    
		return user.profile.id_carrera;
	},
	carreras:function(){
		return Carreras.findOne({_id:this.toString()});
	},
	carreraElegida:function(){
		return Carreras.findOne({_id:idCarreraEstudiante.get().toString()});
	}/*,
	grupos:function(){
		return Grupos.findOne({_id:this.id_grupo});
	}*/
});