//re-password
Template.buscarEditarEstudiante.onRendered(function(e){
	$('.tabs').tabs();

});
var var_ciEstudiante = new ReactiveVar();
var_ciEstudiante.set(" ");
var var_elegidoEst = new ReactiveVar();
var_nuevaCarreraEstudiante = new ReactiveVar();
Template.buscarEditarEstudiante.events({
	'input #txt_ciEstudiante': function(e){
		e.preventDefault();
		var valor=$("#txt_ciEstudiante").val();
		if(!valor==" "){
			var_ciEstudiante.set(valor);
		}else{
			var_ciEstudiante.set(" ");
		}
	},
	'click .btn_eliminar': function(e){
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
	        Meteor.call('borrarEstudiante',this._id,function(error){
	        	if(error){
	        		swal(
			          '¡Error!',
			          'El usuario no se pudo eliminar',
			          'error'
			        )
	        	}else{
	        		swal(
				      '¡Eliminado!',
				      'El usuario fue eliminado.',
				      'success'
				    )
	        	}
	        });
	     
	      }
	    })   

	},
	'click .btn_activo':function(e){
		var_elegidoEst.set(this._id);
	},
	'click .btn_inactivo':function(e){
		var_elegidoEst.set(this._id);
	},
	'click .btn_estudentOff':function(e){
		Meteor.call('estudentOff', var_elegidoEst.get());
	},
	'click .btn_estudentOn':function(e){
		Meteor.call('estudentOn', var_elegidoEst.get());
	},
	'click .btn_estudianteElegido':function(){
		var datos={
			"idUs":this._id,
			"apellidoP":this.profile.apellidoP,
			"apellidoM":this.profile.apellidoM,
			"nombres":this.profile.nombres
		}
		var_nuevaCarreraEstudiante.set(datos);
	}


});

Meteor.subscribe('publi_carreras');
Template.buscarEditarEstudiante.helpers({
	estudiantes:function(){
		if (var_ciEstudiante.get()==" ") {
			return Meteor.users.find({ 'roles.admin': {$in:['inscritos','estudiante']}});
		}else{
			return Meteor.users.find( { $and: [ {username:{$regex:'^'+var_ciEstudiante.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ] } );
		}
	},
	esEstudiante:function(){
		return Meteor.users.findOne( { $and: [ {_id:this._id}, { 'roles.admin': {$in:['estudiante']}} ] } );
	},
})