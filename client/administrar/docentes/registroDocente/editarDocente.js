var var_ciDocente =new ReactiveVar();
var_ciDocente.set(" ");

var var_elegidoDoc=new ReactiveVar();
datosEditarDocente=new ReactiveVar();
Template.editarDocente.onRendered(function(){
	$('.dropdown-trigger').dropdown();
})

Template.editarDocente.events({
	'input #txt_ci': function(e){
		e.preventDefault();
		var valor=$("#txt_ci").val();
		if(!valor==" "){
			var_ciDocente.set(valor);
		}else{
			var_ciDocente.set(" ");
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
	        Meteor.call('borrarDocente',this._id,function(error){
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
		var_elegidoDoc.set(this._id);
	},
	'click .btn_inactivo':function(e){
		var_elegidoDoc.set(this._id);
	},
	'click .btn_docenteOff':function(e){
		Meteor.call('docenteOff', var_elegidoDoc.get());
	},
	'click .btn_docenteOn':function(e){
		Meteor.call('docenteOn', var_elegidoDoc.get());
	},
	'click .btn_editarDocente':function(){
		var datos={
			"idUs":this._id,
			"username":this.username,
			"email":this.emails[0],
			"profile":{
				"copiaPass" :this.profile.copiaPass,
				"nombres" : this.profile.nombres,
				"apellidoP" :this.profile.apellidoP,
				"apellidoM" :this.profile.apellidoM,
				"telefono" :this.profile.telefono,
				"profesion" :this.profile.profesion
			}
		}
		datosEditarDocente.set(datos);
	}
});

Template.editarDocente.helpers({
	docentes:function(){
		if (var_ciDocente.get()==" ") {
			return Meteor.users.find({ 'roles.admin': {$in:['docente','docenteOff']}});
		}else{
			return Meteor.users.find( { $and: [ {username:{$regex:'^'+var_ciDocente.get()}}, { 'roles.admin': {$in:['docente','docenteOff']}} ] } );
		}
	},
	esDocente:function(){
		return Meteor.users.findOne( { $and: [ {_id:this._id}, { 'roles.admin': {$in:['docente']}} ] } );
	}
})