var var_ciAdm=ReactiveVar();
var_ciAdm.set(" ");
datos_rol= new ReactiveVar();

datosEditarAdmin=new ReactiveVar();
Template.editarAdministradores.events({
	'input #txt_ci': function(e){
		e.preventDefault();
		var valor=$("#txt_ci").val();
		if(!valor==" "){
			var_ciAdm.set(valor);
		}else{
			var_ciAdm.set(" ");
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
	        Meteor.call('borrarAdministrador',this._id,function(error){
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
	'click .btn_editarRol':function(){
		datos_rol.set(this._id);
	},
	'click .btn_editarAdmin':function(){
		var datos={
			"idUs":this._id,
			"username":this.username,
			"email":this.emails[0],
			"profile":{
				"nombres" : this.profile.nombres,
				"apellidoP" :this.profile.apellidoP,
				"apellidoM" :this.profile.apellidoM,
				"telefono" :this.profile.telefono
			}
		}
		datosEditarAdmin.set(datos);

	}
});


Template.editarAdministradores.helpers({
	administradores:function(){
		if (var_ciAdm.get()==" ") {
			return Meteor.users.find({ 'roles.admin': {$in:['administrador','adm_academico','secretaria','sinRol']}});
		}else{
			return Meteor.users.find( { $and: [ {username:{$regex:'^'+var_ciAdm.get()}}, { 'roles.admin': {$in:['administrador','adm_academico','secretaria']}} ] } );
		}
	}
})