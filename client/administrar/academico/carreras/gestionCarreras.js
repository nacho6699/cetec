//para guardar mi id de carrera a editar
datos_carrera = new ReactiveVar();
var gestionSeleccionada = new ReactiveVar();
Template.gestionCarreras.events({
	'click .btn_gestionCarrera':function(){
		var dato={
			'id_gestion':this._id,
			'gestion':this.gestion
		}
		gestionSeleccionada.set(dato);
		$(".contenidoGestion").css("display", "block");
		$(".opcionesGestion").slideUp(500);
	},
	'submit #formRegistrarCarrera': function (e) {
		e.preventDefault();
		var gestion=[gestionSeleccionada.get().id_gestion];
		var carrera={
			"id_gestion":gestion,
			"nombreCarrera":e.target.txt_nombreCarrera.value,
			"numero_modulos":e.target.txt_cantidadModulos.value,
			"numero_estudiantes":e.target.txt_cantidadEstudiantes.value
		}
		Meteor.call('registrarCarrera', carrera, function(error,result){
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
					  timer: 4000
					});
			}else{
            	swal({
				  type: 'success',
				  title: 'Carrera Creada Correctamente',
				  showConfirmButton: false,
				  timer: 2000
				});
            	$("#formRegistrarCarrera")[0].reset();
            }
                
		});
	},
	'click #btn_borrarCarrera':function(e){
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
	        Meteor.call('borrarCarrera',this._id,function(error,result){
	        	if(error){
	        		swal(
			          '¡Error!',
			          'La Carrera se pudo eliminar',
			          'error'
			        )
	        	}else if(result){
					swal({
					  type: 'info',
					  title: 'Error '+result +" antes debe borrar los módulos",
					  showConfirmButton: false,
					  timer: 4000
					});
				}else{
	        		swal(
				      '¡Eliminado!',
				      'La Carrera fue eliminada.',
				      'success'
				    )
	        	}
	        });
	        
	      }
	    })    

	},//para obtener el id de mi gestion elegida
	
	'click #btn_editarCarrera' :function(e){
		var dato={
			"id_carrera":this._id,
			"nombreCarrera":this.nombreCarrera,
			"numeroModulos":this.numero_modulos,
			"numeroEstudiantes":this.numero_estudiantes
		}
		datos_carrera.set(dato);
	},
	'click #btn_cancelCarrera' :function(e){
		templateAdministrar.set('informacion');
		$("#formRegistrarCarrera")[0].reset();
	},
	'click #modalIrCrearModulos' :function(e){
		templateAdministrar.set('gestionModulos');
	},
	'click #btn_volverAgestiones':function(){
		$(".contenidoGestion").css("display", "none");
		$(".opcionesGestion").slideDown(500);
	}
});

Meteor.subscribe('publi_carreras');
Template.gestionCarreras.helpers({
	carreras: function () {
		return Carreras.find({id_gestion:gestionSeleccionada.get().id_gestion});
		//console.log(Carreras.find().fetch());
	},
	gestiones: function () {
		var fecha = new Date();
		var gestionActual = fecha.getFullYear();
		return Gestiones.find({gestion:{$gte:gestionActual}});
		//console.log(Carreras.find().fetch());
	},
	existeModulos:function(){
		return Modulos.findOne({id_carrera:this._id});
	},
	gestionElegida:function(){
		return gestionSeleccionada.get().gestion;
	}
});