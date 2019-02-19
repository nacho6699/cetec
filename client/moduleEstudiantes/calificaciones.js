Meteor.subscribe('publi_gestiones');
Meteor.subscribe('publi_carreras');
Meteor.subscribe('publi_modulos');
Meteor.subscribe('publi_materias');
var idCarreraEstudianteCal=new ReactiveVar();

Template.calificaciones.onRendered(function(){
	//$("#sec_listaDesignacion").hide();
	$('.contenedorModulosCal').css('display','none');
});
Template.calificaciones.events({
	'click .btn_carreraNotasCal':function(){
		idCarreraEstudianteCal.set(this);
		$("#contenedorCarrerasCal").slideUp(1000);
		$(".contenedorModulosCal").slideDown(1000);
	},
	'click .btn_volverCalificacionesCal':function(){
		$(".contenedorModulosCal").slideUp(1000);
		$("#contenedorCarrerasCal").slideDown(1000);
	}
})
Template.calificaciones.helpers({
	matricula:function(){
		var user=Meteor.user();    
	 	var id=user._id;
	 	//ultima gestion
	 	var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Matriculas.find({$and:[{idUs:id},{id_gestion:gestion._id},{id_carrera:idCarreraEstudiante.get().toString()}]});
	},
	carrerasUserCal:function(){
		var user=Meteor.user();    
		return user.profile.id_carrera;
	},
	carrerasCal:function(){
		return Carreras.findOne({_id:this.toString()});
	},
	carreraElegidaCal:function(){
		return Carreras.findOne({_id:idCarreraEstudianteCal.get().toString()});
    },
    modulosCal:function(){
		//var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Modulos.find({id_carrera:this._id});
	},
	notas:function(){
        var user=Meteor.user(); 
        var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Notas.find({$and:[
            {id_gestion:gestion._id},
            {idUs:user._id},
            {id_modulo:this._id}
        ]});
    },
    nombreModulo:function(){
        var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
        return Modulos.findOne({$and:[
            {id_carrera:idCarreraEstudianteCal.get().toString()},
            {_id:this.id_modulo}
        ]});
    }
});