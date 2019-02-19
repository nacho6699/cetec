Template.opcionesAcademicas.onRendered(function(){
	
})
Template.opcionesAcademicas.events({
	"click #btn_gestiones":function(){
		templateAdministrar.set('gestionGestiones');
	},
	"click #btn_carreras":function(){
		templateAdministrar.set('gestionCarreras');
	},
	"click #btn_materias":function(){
		templateAdministrar.set('gestionMaterias');
	},
	"click #btn_grupos":function(){
		templateAdministrar.set('gestionGrupos');
	},
	"click #btn_modulos":function(){
		templateAdministrar.set('gestionModulos');
	},
	"click #btn_matriculas":function(){
		templateAdministrar.set('gestionMatriculas');
	},
	"click #btn_designaciones":function(){
		templateAdministrar.set('designarDocente');
	},
	"click #btn_informacion":function(){
		templateAdministrar.set('informacion');
	},
	"click #btn_copias":function(){
		templateAdministrar.set('copias');
	}
})
//para marcar mis opciones reactivamente-----------
templateAdministrar = new ReactiveVar();
templateAdministrar.set("informacion");

Template.opcionesAcademicas.helpers({
	templateOpcionesAdministracion : function(){
		return templateAdministrar.get();
	}
});
//----------------------------------------------------