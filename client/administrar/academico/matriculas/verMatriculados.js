//para buscar por ci
var_ciMatriculado = new ReactiveVar();
var_ciMatriculado.set(" ");
//para buscar por gestiones
var_carrera = new ReactiveVar();
//para mi id de usuario matriculado 
var_id_matriculado= new ReactiveVar();
//para enviar datos a editar
varEstudianteEditar = ReactiveVar();
//para ver si esta o no matriculado
var var_id_estudiante = ReactiveVar();
Template.verMatriculados.onRendered(function(){
	$(".infoMatricula").css("display", "none");
})

Template.verMatriculados.events({
		
	'input #txt_ciMatriculado': function(e){
		e.preventDefault();
		var valor=$("#txt_ciMatriculado").val();
		if(!valor==" "){
			var_ciMatriculado.set(valor);
			var_id_estudiante.set(
				Meteor.users.findOne({
					$or:[
						{$and: [ {username:{$regex:'^'+var_ciMatriculado.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ]},
						{$and: [ {'profile.nombres':{$regex:'^'+var_ciMatriculado.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ]},
						{$and: [ {'profile.apellidoP':{$regex:'^'+var_ciMatriculado.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ]},
						{$and: [ {'profile.apellidoM':{$regex:'^'+var_ciMatriculado.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ]}
					]
				   })
			);
			$(".infoMatricula").slideDown(500);	
		}else{
			var_ciMatriculado.set(" ");
			$(".infoMatricula").slideUp(500);	
		}
	},
	'click #btn_borrarMatricula':function(e){
		e.preventDefault();
	    swal({
	      title: '¿Estas seguro?',
	      text: "¡No podrás revertir esto!",
	      type: 'warning',
	      showCancelButton: true,
	      confirmButtonColor: '#00695c',
	      cancelButtonColor: '#d33',
	      confirmButtonText: 'Sí, ¡eliminarlo!',
	      cancelButtonText:'Cancelar'
	    }).then((result) => {
	      if (result.value) {
	        Meteor.call('borrarMatricula',var_id_estudiante.get()._id,function(error){
	        	if(error){
	        		swal(
			          '¡Error!',
			          'La matricula no se pudo eliminar',
			          'error'
			        )
	        	}else{
	        		swal(
				      '¡Eliminado!',
				      'La matricula fue eliminada.',
				      'success'
					);
					var datoMatricular={
						"idUs":var_id_estudiante.get()._id,
						"matriculado":false
					};
					Meteor.call('editarDocenteAlmatricular',datoMatricular);
					Meteor.call('borrarKardex',var_id_estudiante.get()._id);
	        	}
	        });
	     
	      }
	    })    

	},/*
	'click #btn_verMatricula': function(){
		var dato={
			'id_usuario':this._id,
			'id_carrera':this.profile.id_carrera
		}
		var_id_matriculado.set(dato);
	},*/
//para mis busquedas por carrera en tiempo real-------
	'change .sel_carreraMatri' :function(e){
		var_carrera.set(e.target.value);
	},//para envio de actualizacion 
	'click .btn_editarMatricula':function(e){
		var datos={
			"idUs":var_id_estudiante.get()._id,
			"id_carrera":var_id_estudiante.get().profile.id_carrera,
			"nombres":var_id_estudiante.get().profile.nombres,
			"apellidoP":var_id_estudiante.get().profile.apellidoP,
			"apellidoM":var_id_estudiante.get().profile.apellidoM
		}
		varEstudianteEditar.set(datos);
		//console.log(varEstudianteEditar.get());
	}
});

Meteor.subscribe('publi_estudiantes');
Meteor.subscribe('publi_gestiones');
Meteor.subscribe('publi_matriculados');
Meteor.subscribe('publi_modulos');
//mi super variable de gestion
//superGestion = new ReactiveVar();

Template.verMatriculados.helpers({
	estudiante:function(){
		return Meteor.users.findOne({
			$or:[
				{$and: [ {username:{$regex:'^'+var_ciMatriculado.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ]},
				{$and: [ {'profile.nombres':{$regex:'^'+var_ciMatriculado.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ]},
				{$and: [ {'profile.apellidoP':{$regex:'^'+var_ciMatriculado.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ]},
				{$and: [ {'profile.apellidoM':{$regex:'^'+var_ciMatriculado.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ]}
			]
		   });
		   //console.log(var_id_estudiante.get()); 
		//return var_id_estudiante.get();
		  
		//return Meteor.users.findOne({$and:[{_id:this.idUs},{username:{$regex:'^'+var_ciMatriculado.get()}}]});
	},
	estudiantesMatriculados:function(){
		var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Meteor.users.find({
			$and:[{"profile.id_carrera":var_carrera.get()},{"profile.matriculado":true}]
		});
	},
	carreras:function(){
		var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Carreras.find({id_gestion:gestion._id});
	},
	modulos:function(){
		//return Modulos.find({_id:this.toString()});
		return Modulos.find({_id:this.id_modulos});
	},
	//para ver los modulos del usuario elegido------y mas detalles del matriculado
	matriculas2:function(){
		var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Matriculas.find({$and:[{id_gestion:gestion._id},{idUs:var_id_estudiante.get()._id}]});
	},
	estudianteSelectcionado:function(){
		return Meteor.users.findOne({_id:var_id_estudiante.get()._id});
	},
	carreraEstudiante:function(){
		return Carreras.findOne({_id:var_id_estudiante.get().profile.id_carrera});
	},
	grupos:function(){
		return Grupos.findOne({_id:this.id_grupo});
	},
	esMatriculado:function(){
		var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Matriculas.findOne({$and:[{idUs:var_id_estudiante.get()._id},{id_gestion:gestion._id}]});
	},
	carrerasMatriculadas:function(){
		var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Carreras.findOne({$and:[
			{id_gestion:gestion._id},
			{_id:this.id_carrera}
		]});
	},
});
