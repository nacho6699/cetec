
Template.gestionGrupos.onRendered(function(){
	$('.timepicker').pickatime({
    default: 'now', // Set default time: 'now', '1:30AM', '16:30'
    fromnow: 0,       // set default time to * milliseconds from now (using with default = 'now')
    twelvehour: false, // Use AM/PM or 24-hour format
    donetext: 'OK', // text for done-button
    cleartext: 'Clear', // text for clear-button
    canceltext: 'Cancel', // Text for cancel-button
    autoclose: false, // automatic close timepicker
    ampmclickable: true, // make AM PM clickable
    aftershow: function(){} //Function for after opening timepicker
  });
	$('.tabs').tabs();
});
//para guardar mi id de modulo
datos_grupo = new ReactiveVar();
//para mostrar las carreras de una gestion elegida
idGestionGrupo=new ReactiveVar();
var carreraElegidaG = new ReactiveVar();
Template.gestionGrupos.events({
	'change #sel_gestionG' :function(e){
		idGestionGrupo.set(e.target.value);
	},
	'click .btn_gestionGrupos':function(e){
		var datos={
			"id_carrera":this._id,
			"nombreCarrera":this.nombreCarrera
		}
		carreraElegidaG.set(datos);
		$(".contenidoGrupo").css("display", "block");
		$(".opcionesGrupo").slideUp(500);
		//alert(carreraElegidaG.get());
	},
	'submit #formRegistrarGrupo': function (e) {
		e.preventDefault();
		var grupo={
			"id_carrera":carreraElegidaG.get().id_carrera,
			//"id_modulo":e.target.sel_moduloG.value,
			"nombreGrupo":e.target.txt_nombreGrupo.value,
			"turno":e.target.sel_turno.value,
			"horaInicio":e.target.txt_horaInicio.value,
			"horaFin":e.target.txt_horaFin.value
		}
		if(grupo.horaInicio>=grupo.horaFin){
			swal({
				type: 'info',
				title: 'Verifique la hora',
				showConfirmButton: false,
				timer: 2000
			  });
		}else{
			Meteor.call('registrarGrupo', grupo, function(error,result){
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
					  title: 'Grupo Creado Correctamente',
					  showConfirmButton: false,
					  timer: 2000
					});
					$("#formRegistrarGrupo")[0].reset();
				}
					
			});
		}
		
	},
	'click .btn_editarGrupo' :function(e){
		var dato={
			"id_grupo":this._id,
			"nombreGrupo":this.nombreGrupo,
			"horaInicio":this.horaInicio,
			"horaFin":this.horaFin
		}
		datos_grupo.set(dato);

	},
	'click #btn_borrarGrupo':function(e){
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
	        Meteor.call('borrarGrupo',this._id,function(error){
	        	if(error){
	        		swal(
			          '¡Error!',
			          'El grupo no se pudo eliminar',
			          'error'
			        )
	        	}else{
	        		swal(
				      '¡Eliminado!',
				      'El grupo fue eliminado.',
				      'success'
				    )
	        	}
	        });
	     
	      }
	    })    

	},
	
	'click #btn_volverAcarrerasGrupo':function(){
		$(".contenidoGrupo").css("display", "none");
		$(".opcionesGrupo").slideDown(500);
	}
});

Meteor.subscribe('publi_grupos');
Meteor.subscribe('publi_carreras');
Meteor.subscribe('publi_modulos');
Meteor.subscribe('publi_gestiones');
Template.gestionGrupos.helpers({
	gestiones:function(){
		var fecha = new Date();
		var gestionActual = fecha.getFullYear();
		return Gestiones.find({gestion:{$gte:gestionActual}});
	},
	grupos: function () {
		return Grupos.find({id_carrera:carreraElegidaG.get().id_carrera});
		//console.log(Carreras.find().fetch());
	},
	carreras: function () {
		return Carreras.find({id_gestion:idGestionGrupo.get()});
	},
	carreraElegida:function(){
		return carreraElegidaG.get().nombreCarrera;
	}
});