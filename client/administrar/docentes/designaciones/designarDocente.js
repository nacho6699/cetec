var_ciDocente = new ReactiveVar();
var_ciDocente.set(" ");
//variable para capturar la seleccion de carrera
var_id_carreraD=new ReactiveVar();
//para los datos al seleccionar docente
varDocente = new ReactiveVar(); 
datos_designacion = new ReactiveVar();
//para cambiar mi icono
var ver=true;

Template.designarDocente.onRendered(function(){
	$(".designarDocente").hide();
	$(".registrar_cancelar").css("display", "none");
	$('.tabs').tabs();
})
Template.designarDocente.events({
	'click .btn_designar':function(e){
		e.preventDefault();
		var dato = [];
		//obteniendo toda la tabla
		var ultimaGestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		var tabla = $('.t_modulos tbody tr');
		tabla.each(function(){
			var id_modulo = $(this).attr('class');
			var	mod_elegido =$(this).find('input:checkbox[name=chek_modulo]:checked').val();
			var	id_grupo =$(this).find('select[name=sel_grupoD]').val();
			var turno=$(this).find(':selected').data('turno');
			var inicioFin=Modulos.findOne({_id:id_modulo});
			//console.log(finaliza);
			if (!(typeof mod_elegido === "undefined")){
				item={
					"idUs":varDocente.get().idUs,
					"id_gestion":ultimaGestion._id,
					"id_modulos":mod_elegido,
					"id_grupo":id_grupo,
					"turno":turno,
					"finaliza":inicioFin.fechaFin,
					"empiesa":inicioFin.fechaInicio

				}
				dato.push(item);
			}		
		});

		Meteor.call('registrarDesignacion', dato, function(error,result){
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
				  title: result,
				  showConfirmButton: false,
				  timer: 3000
				});
			}else{
            	swal({
				  type: 'success',
				  title: 'Designacion Correcta!!!',
				  showConfirmButton: false,
				  timer: 2000
				});
            	$("#formDesignarDocente")[0].reset();
            }
                
		});
	},
	'click #btn_borrarDesignacion':function(e){
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
	        Meteor.call('borrarDesignacion',this._id,function(error){
	        	if(error){
	        		swal(
			          '¡Error!',
			          'Nose pudo borrar vuelva a intentarlo',
			          'error'
			        )
	        	}else{
	        		swal(
				      '¡Eliminado!',
				      'Ladesignación Fue Borrada',
				      'success'
				    )
	        	}
	        });
	     
	      }
	    })    

	},	
	'input #txt_ciDocente': function(e){
		e.preventDefault();
		var valor=$("#txt_ciDocente").val();
		if(!valor==" "){
			var_ciDocente.set(valor);
		}else{
			var_ciDocente.set(" ");
		}
	},
	'change #sel_carreraD' :function(e){
		e.preventDefault();
		var_id_carreraD.set(e.target.value);
		$(".registrar_cancelar").css("display", "block");

	},
	'click #btn_seleccionar':function(e){
		e.preventDefault();
		var datos={
			"idUs":this._id,
			"nombres":this.profile.nombres,
			"apellidoP":this.profile.apellidoP,
			"apellidoM":this.profile.apellidoM
		}
		varDocente.set(datos);
		$(".buscarDocente").slideUp(500);
		$(".designarDocente").slideDown(500);
	},
	'click #btn_volverDesignar':function(){
		$(".designarDocente").css("display", "none");
		$(".buscarDocente").slideDown(500);
	},
	'click .btn_editarDesignacion' :function(e){
		datos_designacion.set(this._id);
	},
	'click #btn_subir':function(){
		$('.contenido_designar').slideToggle(500);
		if(ver){
			$('.icono_subir').text('arrow_drop_down');
			ver=false;
		}else{
			$('.icono_subir').text('arrow_drop_up');
			ver=true;
		}
		
	}
});

Meteor.subscribe('publi_docentes');
Meteor.subscribe('publi_carreras');
Meteor.subscribe('publi_grupos');
Meteor.subscribe('publi_modulos');
Meteor.subscribe('publi_designaciones');

Template.designarDocente.helpers({
	docentes:function(){
		return Meteor.users.find({$or:[
			{ $and: [ {username:{$regex:'^'+var_ciDocente.get()}}, { 'roles.admin': {$in:['docente']}} ] },
			{ $and: [ {'profile.nombres':{$regex:'^'+var_ciDocente.get()}}, { 'roles.admin': {$in:['docente']}} ] },
			{ $and: [ {'profile.apellidoP':{$regex:'^'+var_ciDocente.get()}}, { 'roles.admin': {$in:['docente']}} ] },
			{ $and: [ {'profile.apellidoM':{$regex:'^'+var_ciDocente.get()}}, { 'roles.admin': {$in:['docente']}} ] }
		]});
		//return Meteor.users.find({ 'roles.admin': {$in:['inscritos']}});
	},
	carreras:function(){
		var ultimaGestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Carreras.find({id_gestion:ultimaGestion._id});
	},
	grupos:function(){
		return Grupos.find({id_carrera:var_id_carreraD.get()});
	},
	modulos:function(){
		var idGestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		//var arrayModulos=[];
		/*var result=Designaciones.find({$and:[{id_gestion:idGestion._id},{idUs:varDocente.get().idUs}]}).fetch();
		for(let value of result ){
			arrayModulos.push(value.id_modulos);
		}
		return  Modulos.find({$and:[{id_carrera:var_id_carreraD.get()},{_id:{$nin:arrayModulos}}]});*/
		return  Modulos.find({id_carrera:var_id_carreraD.get()});
	},
	docenteSelect:function(){
		return varDocente.get();
	},
	gestionActual:function(){
		return Gestiones.findOne({}, {sort: {gestion: -1}});
	},
	designaciones:function(){
		var idGestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Designaciones.find({$and:[{id_gestion:idGestion._id},{idUs:varDocente.get().idUs}]});
	},
	grupoDesignado:function(){
		return Grupos.findOne({_id:this.id_grupo});
	},
	modulosAsignados:function(){
		return Modulos.find({_id:this.id_modulos});
	},
	carrerasDesignadas:function(){
		return Carreras.findOne({_id:this.id_carrera});
	}
})	