Meteor.subscribe('publi_gestiones');
Meteor.subscribe('publi_carreras');
Meteor.subscribe('publi_modulos');
Meteor.subscribe('publi_designaciones');
//para mi gestion elegida
varGestionSelecionado = new ReactiveVar();
//para mi id de designacion y grupo de docente
varDesigGrupo = new ReactiveVar();	
Template.notas.onRendered(function(){
	$("#sec_listaDesignacion").hide();
})
Template.notas.helpers({
	gestiones:function(){
		return Gestiones.find({},{sort: { _id: -1 },limit:2});
	},
	gestionElegida:function(){
		return Gestiones.find({_id:varGestionSelecionado.get().id_gestion});
	},
	designaciones:function(){
		var user=Meteor.user();    
	 	var id=user._id;
		return Designaciones.find({$and:[{idUs:id},{id_gestion:varGestionSelecionado.get().id_gestion}]});
	},
	
	modulos:function(){
		return Modulos.find({_id:this.id_modulos});
	},
	carreras:function(){
		return Carreras.findOne({_id:this.id_carrera});
	},
	grupos:function(){
		return Grupos.findOne({_id:this.id_grupo});
	},/**para la parte de habilitar y deshabilitar los botones selecionar a calificar */
	moduloActual:function(){
		var fechaActual=new Date();
		var ver=Modulos.findOne({$and:[{_id:this.id_modulos},{fechaFin:{$gte:fechaActual}},{fechaInicio:{$lte:fechaActual}}]});
		if(ver){
			return true;
		}else{
			return false;
		}
	},
	gestionPresionado:function(){
		return varGestionSelecionado.get().gestion;
	}
});
Template.notas.events({
	'click .btn_seleccionar':function(e){
		var dato={
			"id_modulos":this.id_modulos,
			"id_grupo":this.id_grupo
		}
		varDesigGrupo.set(dato);
		$(".contenidoNotas").slideUp();
		$(".contenidoPlanilla").css("display", "block");
	},
	'click .btn_selGestiones':function(){
		var datos={
			"id_gestion":this._id,
			"gestion":this.gestion
		}
		varGestionSelecionado.set(datos);
		$("#sec_listaDesignacion").show();
	}
})