//para guardar mi id de modulo
datos_modulo = new ReactiveVar();
//para guardar mi id de carrera selecionada
idCarrera = new ReactiveVar();
idGestion = new ReactiveVar();
var validar = new ReactiveVar();
var validarInicio = new ReactiveVar();
var validarFin = new ReactiveVar();
validarInicio.set(true);
validarFin.set(true);
idGestion.set(" ");
idCarrera.set(" ");
var items=[3,4,5,6];

Template.gestionModulos.onRendered(function(){
	$('.tabs').tabs();
})
Template.gestionModulos.events({
	'click #btn_guardarModulos':function(e){
		e.preventDefault();
		validar.set(true);
		var dato = [];
		//obteniendo toda la tabla
		var tabla = $('#t_registroModulos tbody tr');
		tabla.each(function(){
			var id = $(this).attr('class');

			var nombreModulo = $(this).find('input:text[name=txt_nombreModulo]').val();
			var nombreMateria = $(this).find('input:text[name=txt_nombreMateria]').val();
			if(nombreMateria==0){nombreMateria="sin dato";validar.set(false);}
			var sigla = $(this).find('input:text[name=txt_sigla]').val();
			if(sigla==0){sigla="sin dato";validar.set(false);}
			var fechaInicio = ($(this).find('[name=txt_fechaInicio]').val()).toString();
			if(fechaInicio==""){validar.set(false);}
			var fechaFin = ($(this).find('[name=txt_fechaFin]').val()).toString();
			if(fechaFin==""){validar.set(false);}
			//obteniendo el año
			//var	ano = $(this).find('select[name=sel_ano').val();
			var ano=$(this).find(':selected').data('ano');
			//para incrementar mis fechas 
		    var fechaInicioReal = new Date(fechaInicio);
		    fechaInicioReal.setDate(fechaInicioReal.getDate()+1);

		    var fechaFinReal = new Date(fechaFin);
		    fechaFinReal.setDate(fechaFinReal.getDate()+1);
	
			
			item={
				"id_gestion":[idGestion.get()],
				"id_carrera":idCarrera.get().id_carrera,
				"id_modulo":id,
				"nombreModulo":nombreModulo,
				"nombreMateria":nombreMateria,
				"sigla":sigla,
				"fechaInicio":fechaInicioReal,
				"fechaFin":fechaFinReal,
				"ano":ano
			}
			dato.push(item);
				
		});
		//console.log(dato);
		if(validar.get()&&validarInicio.get()&&validarFin.get()){
			Meteor.call('registrarModulo', dato, function(error,result){
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
					  title: 'Modulo Creado Correctamente',
					  showConfirmButton: false,
					  timer: 2000
					});
				}
					
			});
		}else{
			swal({
				type: 'info',
				title: 'Verifique los datos',
				showConfirmButton: false,
				timer: 4000
			  });
		}
		
	},
	'change #sel_gestion' :function(e){
		idGestion.set(e.target.value);
	},
	'click .btn_gestionModulo' :function(e){
		var dato={
			"id_carrera":this._id,
			"nombreCarrera":this.nombreCarrera,
			"numero_modulos":this.numero_modulos
		}
		idCarrera.set(dato);
		$(".contenidoModulos").css("display", "block");
		$(".opcionesModulo").slideUp(500);
		
	},
	'submit #formRegistrarModulo': function (e) {
		e.preventDefault();
		var gestion=[idGestion.get()];
		var modulo={
			"id_gestion":gestion,
			"id_carrera":idCarrera.get().id_carrera,
			"nombreModulo":e.target.txt_nombreModulo.value,
			"nombreMateria":e.target.txt_nombreMateria.value,
			"sigla":e.target.txt_sigla.value
		}

		Meteor.call('registrarModulo', modulo, function(error,result){
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
				  title: 'Modulo Creado Correctamente',
				  showConfirmButton: false,
				  timer: 2000
				});
            	$("#formRegistrarModulo")[0].reset();
            }
                
		});
	},
	'click .btn_editarModulo' :function(e){
		var dato={
			"id_modulo":this._id,
			"nombreModulo":this.nombreModulo,
			"nombreMateria":this.nombreMateria,
			"sigla":this.sigla
		}
		datos_modulo.set(dato);
	},
	'click #btn_borrarModulo':function(e){
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
	        Meteor.call('borrarModulo',this._id,function(error){
	        	if(error){
	        		swal(
			          '¡Error!',
			          'La carrera no se pudo eliminar',
			          'error'
			        )
	        	}else{
	        		swal(
				      '¡Eliminado!',
				      'La carrera fue eliminada.',
				      'success'
				    )
	        	}
	        });
	     
	      }
	    })    

	},//para mis busquedas por carrera
	
	'click #btn_cancelModulo' :function(e){
		templateAdministrar.set('informacion');
		$("#formRegistrarModulo")[0].reset();
	},
	'click #btn_volverAcarreras':function(){
		$(".contenidoModulos").css("display", "none");
		$(".opcionesModulo").slideDown(500);
	},
	'change .fechaInicio': function(t,e){
		var n_modulo=this;
		var fecha_inicio=$('.inicio'+n_modulo).val();
		var fecha_fin=$('.fin'+n_modulo).val();
		if(fecha_fin!=""){
			if(fecha_inicio>=fecha_fin){
				alert('Error la fecha inicio debe ser menor');
				$('.inicio'+n_modulo).css('border','2px solid red');
				$('.inicio'+n_modulo).focus();
				fecha_inicio=$('.inicio'+n_modulo).val("");
				validarInicio.set(false);
			}else{
				$('.inicio'+n_modulo).css('border','0px');
				$('.fin'+n_modulo).css('border','0px');
				validarInicio.set(true);
				validarFin.set(true);
			}	
		}
		
	},
	'change .fechaFin': function(t,e){
		var n_modulo=this;
		var fecha_inicio=$('.inicio'+n_modulo).val();
		var fecha_fin=$('.fin'+n_modulo).val();
		if(fecha_inicio!=""){
			if(fecha_fin<=fecha_inicio){
				alert('Error la fecha Fin debe ser mayor');
				$('.fin'+n_modulo).css('border','2px solid red');
				$('.fin'+n_modulo).focus();
				fecha_fin=$('.fin'+n_modulo).val("");
				validarFin.set(false);
			}else{
				$('.inicio'+n_modulo).css('border','0px');
				$('.fin'+n_modulo).css('border','0px');
				validarFin.set(true);
				validarInicio.set(true);
			}
		}
		
	}
});

Meteor.subscribe('publi_modulos');
Meteor.subscribe('publi_carreras');
Meteor.subscribe('publi_materias');
Meteor.subscribe('publi_gestiones');
Template.gestionModulos.helpers({
	modulos: function () {
		return Modulos.find({id_carrera:idCarrera.get().id_carrera});
		//console.log(Carreras.find().fetch());
	},
	modulosActuales: function () {
		return Modulos.findOne({$and:[{id_carrera:idCarrera.get().id_carrera},{nombreModulo:this.toString()}]});
		//console.log(Modulos.findOne({$and:[{id_carrera:idCarrera.get().id_carrera},{nombreModulo:this.toString()}]}));
	},
	carreras: function () {
		return Carreras.find({id_gestion:idGestion.get()});
		//console.log(Carreras.find().fetch());
	},
	gestiones: function () {
		var fecha = new Date();
		var gestionActual = fecha.getFullYear();
		return Gestiones.find({gestion:{$gte:gestionActual}});
	},
	carreraElegida:function(){
		return idCarrera.get().nombreCarrera;
	},
	gestionElegida:function(){
		return Gestiones.findOne({_id:idGestion.get()});
	},
	cantidadModulos:function(){
		var item=[];
		for (var i = idCarrera.get().numero_modulos - 1; i >= 0; i--) {
			item[i]="Modulo"+(i+1);
		}
		return item;
	
	},
	verModulos:function(){
		return Modulos.findOne({id_carrera:idCarrera.get().id_carrera});
	}
});
Template.registerHelper('formatDate', function(date) {
  return moment(date).format('YYYY-MM-DD');
});

