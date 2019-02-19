
Template.templateBase.onRendered(function(){
	$(".button-collapse").sideNav();
	$('ul.tabs').tabs();
 });

Template.nav.events({
	'click #logout': function(){
		$('#exampleModalCenter').modal('toggle')
		Meteor.logout(function(error){
			if(error){
				toastr.error("Error al cerrar sesión");
			}else{
				$('#exampleModalCenter').modal('toggle');
				FlowRouter.go('/');
				//FlowRouter.reload();
			}
		});
		
		return false;
	},
	'click .btn_notas': function(e){
		e.preventDefault();
		templateOpcionesDocentes.set("notas");
	},
	'click .btn_perfil': function(e){
		e.preventDefault();
		templateOpcionesDocentes.set("perfilDocente");
	}
});

//para ir a home
/*
myTemplate = new ReactiveVar();
myTemplate.set("home");

Template.nav.helpers({
	template(){
		return myTemplate.get();
	}
});*/