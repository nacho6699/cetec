FlowRouter.route("/", {
	subscriptions : function(params, query){
		this.register("getArticulos", Meteor.subscribe('publi_articulos'))
	},
	action: function(params, query){
		BlazeLayout.render("templateBase",{menu_nav:"nav", contenido_menu:"home", articulos:"articulos"});
	}
});
FlowRouter.route("/admAcademica", {
	subscriptions : function(params, query){
		this.register("getEstudiantes", Meteor.subscribe('publi_estudiantes'))
	},
	action: function(params, query){
		var loggedInUser = Meteor.user();
	      if (loggedInUser && Roles.userIsInRole(loggedInUser, ['administrador', 'adm_academico'],'admin')) {

		      	BlazeLayout.render("templateBase",{menu_nav:"nav", opciones:"opcionesAcademicas"});

	      }else{
	         FlowRouter.go('/');
	      }
		//BlazeLayout.render("templateBase",{menu_nav:"nav", opciones:"opciones"});
	}
});
FlowRouter.route("/admDocentes", {
	action: function(params, query){
		var loggedInUser = Meteor.user();
	      if (loggedInUser && Roles.userIsInRole(loggedInUser, ['administrador','adm_academico','secretaria'],'admin')) {

		      	BlazeLayout.render("templateBase",{menu_nav:"nav", opciones:"menuDocentes"});

	      }else{
	         FlowRouter.go('/');
	      }
		//BlazeLayout.render("templateBase",{menu_nav:"nav", opciones:"opciones"});
	}
});
FlowRouter.route("/admAdministradores", {
	action: function(params, query){
		var loggedInUser = Meteor.user();
	      if (loggedInUser && Roles.userIsInRole(loggedInUser, ['administrador'],'admin')) {

		      	BlazeLayout.render("templateBase",{menu_nav:"nav", opciones:"administradores"});

	      }else{
	         FlowRouter.go('/');
	      }
		//BlazeLayout.render("templateBase",{menu_nav:"nav", opciones:"opciones"});
	}
});
FlowRouter.route("/admEstudiantes", {
	action: function(params, query){
		var loggedInUser = Meteor.user();
	      if (loggedInUser && Roles.userIsInRole(loggedInUser, ['administrador','adm_academico','secretaria'],'admin')) {

		      	BlazeLayout.render("templateBase",{menu_nav:"nav", opciones:"menuEstudiantes"});

	      }else{
	         FlowRouter.go('/');
	      }
		//BlazeLayout.render("templateBase",{menu_nav:"nav", opciones:"opciones"});
	}
});
FlowRouter.route("/editEstudiante", {
	action: function(params, query){
		var loggedInUser = Meteor.user();
	      if (loggedInUser && Roles.userIsInRole(loggedInUser, ['administrador','adm_academico','secreataria'],'admin')) {

		      	BlazeLayout.render("templateBase",{menu_nav:"nav", opciones:"buscarEditarEstudiante"});

	      }else{
	         FlowRouter.go('/');
	      }
		//BlazeLayout.render("templateBase",{menu_nav:"nav", opciones:"opciones"})buscarEditarEstudiante;
	}
});
FlowRouter.route("/nuevoDocente", {
	action: function(params, query){
		var loggedInUser = Meteor.user();
	      if (loggedInUser && Roles.userIsInRole(loggedInUser, ['administrador','adm_academico','secretaria'],'admin')) {

		      	BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"registrarDocente"});

	      }else{
	         FlowRouter.go('/');
	      }
		//BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"registrarDocente"});
	}
});
FlowRouter.route("/designarDocente", {
	action: function(params, query){
		var loggedInUser = Meteor.user();
	      if (loggedInUser && Roles.userIsInRole(loggedInUser, ['administrador','adm_academico','secretaria'],'admin')) {

		      	BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"designarDocente"});

	      }else{
	         FlowRouter.go('/');
	      }
		//BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"registrarDocente"});
	}
});
FlowRouter.route("/informesEstudiantes", {
	action: function(params, query){
		var loggedInUser = Meteor.user();
	      if (loggedInUser && Roles.userIsInRole(loggedInUser, ['administrador','adm_academico','secretaria'],'admin')) {

		      	BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"reporte"});

	      }else{
	         FlowRouter.go('/');
	      }
		//BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"registrarDocente"});
	}
});
FlowRouter.route("/admisiones", {
	action: function(params, query){
		BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"admisiones"});
	}
});
FlowRouter.route("/admisiones/nuevoEstudiante", {
	action: function(params, query){
		BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"registrarEstudiante"});
	}
});
FlowRouter.route("/docentes", {
	action: function(params,query) {
	 BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"opcionesDocentes"});
	}
});

//carreras
FlowRouter.route("/opciones/opcionesAcademicas", {
	subscriptions : function(params, query){
		this.register("getEstudiantes", Meteor.subscribe('publi_estudiantes'))
	},
	action: function(params,query) {
	 BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"opcionesAcademicas"});
	}
});
//perfil estudiante
FlowRouter.route("/perfilEstudiante", {
	action: function(params,query) {
		var loggedInUser = Meteor.user();
	      if (loggedInUser && Roles.userIsInRole(loggedInUser, ['estudiante'],'admin')) {

		      BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"perfilEstudiante"});

	      }else{
	         FlowRouter.go('/');
	      }

	 //BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"perfilEstudiante"});
	}
});
//para  gestionar mis administradores
FlowRouter.route("/gestionAdministradores", {
	action: function(params,query) {
	 BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"administradores"});
	}
});
//recuperar password
FlowRouter.route("/re-password", {
	action: function(params,query) {
	 BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"recuperar_pass"});
	}
});

FlowRouter.route("/matricular", {
	subscriptions : function(params, query){
		this.register("getEstudiantes", Meteor.subscribe('publi_estudiantes'))
	},
	action: function(params, query){
		var loggedInUser = Meteor.user();
	      if (loggedInUser && Roles.userIsInRole(loggedInUser, ['administrador', 'adm_academico','secretaria'],'admin')) {

		      	BlazeLayout.render("templateBase",{menu_nav:"nav", opciones:"gestionMatriculas"});

	      }else{
	         FlowRouter.go('/');
	      }
		//BlazeLayout.render("templateBase",{menu_nav:"nav", opciones:"opciones"});
	}
});
FlowRouter.route("/kardexDocente", {
	action: function(params, query){
		var loggedInUser = Meteor.user();
	      if (loggedInUser && Roles.userIsInRole(loggedInUser, ['administrador','adm_academico','secretaria'],'admin')) {

		      	BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"kardexDocente"});

	      }else{
	         FlowRouter.go('/');
	      }
		//BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"registrarDocente"});
	}
});
//acerca de nosotros
FlowRouter.route("/nosotros", {
	action: function(params,query) {
	 BlazeLayout.render("templateBase",{menu_nav:"nav",opciones:"nosotros"});
	}
});