var var_id_carreraDesignacion= new ReactiveVar()

Template.verDesignaciones.events({ 
	'change #sel_carreraDesignacion' :function(e){
		e.preventDefault();
        var_id_carreraDesignacion.set(e.target.value);
	},
});
Meteor.subscribe('publi_designaciones'); 
Meteor.subscribe('publi_modulos'); 
Meteor.subscribe('publi_grupos'); 
Template.verDesignaciones.helpers({ 
    carreras:function(){
		var ultimaGestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Carreras.find({id_gestion:ultimaGestion._id});
    },
    gestionActual:function(){
		return Gestiones.findOne({}, {sort: {gestion: -1}});
	},
    modulos: function(){
        return Modulos.find({$and:[
            {id_carrera:var_id_carreraDesignacion.get()},
            {_id:this.id_modulos}
        ]});
    },
    designaciones: function() { 
        var ultimaGestion = Gestiones.findOne({}, {sort: {gestion: -1}});
        return Designaciones.find({id_gestion:ultimaGestion._id});
    },
    docente:function(){
        return Meteor.users.findOne({_id:this.idUs});
    },
    grupos:function(){
        return Grupos.findOne({$and:[
            {id_carrera:var_id_carreraDesignacion.get()},
            {_id:this.id_grupo}
        ]});
    }
}); 

