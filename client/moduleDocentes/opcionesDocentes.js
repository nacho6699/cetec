templateOpcionesDocentes = new ReactiveVar();
templateOpcionesDocentes.set("perfilDocente");
Template.opcionesDocentes.onRendered(function(){

})

Template.opcionesDocentes.helpers({
	templateOpcionesDocentes : function(){
		return templateOpcionesDocentes.get();
	}
});
Template.opcionesDocentes.events({
	'click .btn_notas': function(e){
		e.preventDefault();
		templateOpcionesDocentes.set("notas");
	},
	'click .btn_perfil': function(e){
		e.preventDefault();
		templateOpcionesDocentes.set("perfilDocente");
	}
})