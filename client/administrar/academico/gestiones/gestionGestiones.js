
//para guardar mi id de modulo
datos_gestion = new ReactiveVar();
Template.gestionGestiones.events({
	'submit #formRegistrarGestion': function (e) {

		e.preventDefault();
		var gestion={
			"gestion":e.target.txt_gestion.value
		};

		Meteor.call('desMatricular',false);

		Meteor.call('registrarGestion', gestion, function(error,result){

			if(error){
                alert(error.reason); 
                swal(
				  'Lo sentimos',
				  'Error al registrar',
				  'error'
				)
			}else if(result){
				swal({
				  type: 'info',
				  title: 'Error '+result,
				  showConfirmButton: false,
				  timer: 3000
				});
			}else{
            	swal({
				  type: 'success',
				  title: 'Gestion Creada Correctamente',
				  showConfirmButton: false,
				  timer: 2000
				});
            	//$("#formRegistrarGestion")[0].reset();
            }
                
		});
	},
	'click .btn_editarGestion' :function(e){
		var dato={
			"id_gestion":this._id,
			"gestion":this.gestion
		}
		datos_gestion.set(dato);
	},
	'click #btn_borrarGestion':function(e){
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
	        Meteor.call('borrarGestion',this._id,function(error,result){
	        	if(error){
	        		swal(
			          '¡Error!',
			          'La Gestionno se pudo eliminar',
			          'error'
			        )
	        	}else if(result){
					swal({
					  type: 'info',
					  title: 'Error '+result +" antes debe borrar las carreras",
					  showConfirmButton: false,
					  timer: 4000
					});
				}else{
	        		swal(
				      '¡Eliminado!',
				      'La Gestion fue eliminada.',
				      'success'
				    )
	        	}
	        });
	     
	      }
	    })    

	},
	'click #btn_cancelGestion' :function(e){
		templateAdministrar.set('informacion');
		$("#formRegistrarCarrera")[0].reset();
	},
	'change .txt_gestion':function(){
		var gestion= Gestiones.findOne({}, {sort: {gestion: -1}});
		var fecha=new Date();
		var ano = fecha.getFullYear();
		if($('.txt_gestion').val()<ano||$('.txt_gestion').val()==gestion.gestion){
			swal({
				type: 'info',
				title: 'La gestion no es valida ',
				showConfirmButton: false,
				timer: 4000
			});
			$('.txt_gestion').val(ano+1);
			document.getElementById('btn_crearGestion').disabled=true;
		}else{
			document.getElementById('btn_crearGestion').disabled=false;
		}
		
	}
});


Meteor.subscribe('publi_gestiones');
Meteor.subscribe('publi_carreras');
//mi super variable de gestion
//Gestiones.findOne({}, {sort: {gestion: -1}});
Template.gestionGestiones.helpers({
	gestiones: function () {
		return Gestiones.find();
		//console.log(Carreras.find().fetch());
	},
	existeCarreras:function(){
		return Carreras.findOne({id_gestion:this._id});
	},
	cantidadGestiones:function(){
		var cantidad = Gestiones.find().count();
		if(cantidad<=1){
			return false;
		}else{
			return true;
		}
	},
	ano:function(){
		var gestion = Gestiones.findOne();
		var fecha = new Date();
		var ano = fecha.getFullYear();
		if (gestion){
			return ano+1;
		}else{
			return ano;
		}
	}
});

