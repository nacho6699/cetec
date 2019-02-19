//para buscar por ci
var_ci = new ReactiveVar();
var carrera_elegida_estudiante = new ReactiveVar();
var id_grupoElegido = new ReactiveVar();
var_ci.set(" ");
//para guardar estudiante seleccionado
varEstudiante = ReactiveVar();
Template.gestionMatriculas.onRendered(function(){
	$(".matricularEstudiante").hide();
	$('.tabs').tabs();

})
Template.gestionMatriculas.events({
	//extra para matricular por grupos
	'click .btn_matricular':function(e){
		e.preventDefault();
		var dato = [];

		var datosKardex1; 
		var modulosKardex1=[];
		//obteniendo toda la tabla
		var ultimaGestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		var tabla = $('.t_modulosMa tbody tr');
		tabla.each(function(){
			var id_modulo = $(this).attr('class');
			var	mod_elegido =$(this).find('input:checkbox[name=chek_modulo1]:checked').val();
			var	id_grupo =$(this).find('select[name=sel_grupoMa]').val();
			var turno=$(this).find(':selected').data('turno');
			var inicioFin=Modulos.findOne({_id:id_modulo});
			
			if (!(typeof mod_elegido === "undefined")){
				modulosKardex1.push(mod_elegido);
				item={
					"idUs":varEstudiante.get().idUs,
					"id_carrera":carrera_elegida_estudiante.get(),
					"id_modulos":mod_elegido,
					"id_grupo":id_grupo,
					"id_gestion":ultimaGestion._id,
					"inicio":inicioFin.fechaFin,
					"fin":inicioFin.fechaInicio
				}
				dato.push(item);
			}		
		});
		datosKardex1={
			"idUs":varEstudiante.get().idUs,
			"id_gestion":ultimaGestion._id,
			"id_carrera":carrera_elegida_estudiante.get(),
			"id_modulos":modulosKardex1
		}
		if(dato.length===0){
			swal({
				type: 'info',
				title: 'Debe seleccionar porlomenos un módulo',
				showConfirmButton: false,
				timer: 2000
			  });
		}else{
		Meteor.call('registrarMatricula',dato, function(error,result){
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
				  timer: 2000
				});
			}else{
            	swal({
				  type: 'success',
				  title: 'Matriculado Correctamente',
				  showConfirmButton: false,
				  timer: 2000
				});
				//$("#formRegistrarModulo")[0].reset();
				var datoMatricular={
					"idUs":varEstudiante.get().idUs,
					"matriculado":true
				};
				Meteor.call('editarDocenteAlmatricular',datoMatricular);
				Meteor.call('registrarKardexEstudiante',datosKardex1);
            }
                
		});
	}
	},
	'submit #formMatricular': function (e,template) {
		e.preventDefault();
		//obteniendo checked
		var selected = template.findAll( "input[type=checkbox]:checked");
   		var array = _.map(selected, function(item) {
     		return item.defaultValue;
  		 });
   		//obteniendo la ultima gestion
   		var gestionUltimo = Gestiones.findOne({}, {sort: {gestion: -1}});
		   //var gestionUltimo=Gestiones.findOne();
		var dato=[];
		var datosKardex; 
		var modulosKardex=[];
		var fechas; 
		  array.forEach(element => {
			fechas=Modulos.findOne({_id:element}); 
			var matricula={
				"idUs":varEstudiante.get().idUs,
				"id_carrera":carrera_elegida_estudiante.get(),
				"id_modulos":element,
				"id_grupo":e.target.sel_grupoM.value,
				"id_gestion":gestionUltimo._id,
				"inicio":fechas.fechaInicio,
				"fin":fechas.fechaFin
			}
			dato.push(matricula);
			modulosKardex.push(element);
		  });
		datosKardex={
			"idUs":varEstudiante.get().idUs,
			"id_gestion":gestionUltimo._id,
			"id_carrera":carrera_elegida_estudiante.get(),
			"id_modulos":modulosKardex
		}
		
		Meteor.call('registrarMatricula',dato, function(error,result){
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
				  timer: 2000
				});
			}else{
            	swal({
				  type: 'success',
				  title: 'Matriculado Correctamente',
				  showConfirmButton: false,
				  timer: 2000
				});
				//$("#formRegistrarModulo")[0].reset();
				var datoMatricular={
					"idUs":varEstudiante.get().idUs,
					"matriculado":true
				};
				Meteor.call('editarDocenteAlmatricular',datoMatricular);
				Meteor.call('registrarKardexEstudiante',datosKardex);
            }
                
		});
		
	},	
	'input #txt_ci': function(e){
		e.preventDefault();
		var valor=$("#txt_ci").val();
		if(!valor==" "){
			var_ci.set(valor);
		}else{
			var_ci.set(" ");
		}
	},
	'click #btn_seleccionar':function(e){
		var datos={
			"idUs":this._id,
			"ci":this.username,
			"id_carrera":carrera_elegida_estudiante.get(),
			"nombres":this.profile.nombres,
			"apellidoP":this.profile.apellidoP,
			"apellidoM":this.profile.apellidoM,
			"contracena":this.profile.copiaPass
		}
		varEstudiante.set(datos);
		$("#buscarEstudiante").slideUp(500);
		$(".matricularEstudiante").slideDown(1000);

	},
	'click #btn_cancelMatricular' :function(e){
		templateAdministrar.set('informacion');
	},
	'click #btn_volverBuscar':function(){
		$("#buscarEstudiante").slideDown(500);
		$(".matricularEstudiante").slideUp(1000);
	},
	'click .btn_imprimirMatricula' :function(){
		var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		console.log(typeof(gestion.gestion));
		var carrera = Carreras.findOne({_id:varEstudiante.get().id_carrera});
		var doc = new jsPDF();
		doc.setFontSize(12);
		doc.setFontType('bold');
		doc.setFont('times');

		doc.setTextColor(0, 0, 0);
		doc.text(65, 25, 'CENTRO DE ESTUDIOS TÉCNICO "CETEC"');

		doc.setLineWidth(0.5);
		doc.line(65, 26, 152, 26);//(x1,y1,x2,y2)
		doc.text(90, 33, 'Boleta de Matriculación');
		
		
		doc.setFont('times');
		doc.setFontType('italic');
		doc.text(20, 40, 'DETALLE');
		//datos del estudiante
		doc.setDrawColor(210, 210, 210)
		doc.rect(20, 42, 170, 50);

		doc.text(21, 48, 'GESTIÓN :');
		doc.text(21, 54, 'CI :');
		doc.text(21, 60, 'APELLIDO PATERNO :');
		doc.text(21, 66, 'APELLIDO MATERNO :');
		doc.text(21, 72, 'NOMBRES :');
		doc.text(21, 78, 'CARRERA :');
		doc.text(21, 84, 'FECHA MATRICULACIÓN :');
		doc.text(21, 90, 'CLAVE :');

		doc.text(45, 48, gestion.gestion.toString());
		doc.text(30, 54, varEstudiante.get().ci);
		doc.text(65, 60, varEstudiante.get().apellidoP);
		doc.text(65, 66, varEstudiante.get().apellidoM);
		doc.text(45, 72, varEstudiante.get().nombres);
		doc.text(50, 78, carrera.nombreCarrera);
		doc.text(75, 84, moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
		doc.text(50, 90, varEstudiante.get().contracena);

		doc.text(35, 110, 'DIRECTOR(A)');
		doc.text(130, 110, 'SECRETARIA');

		doc.save(varEstudiante.get().ci+'.pdf');
	},
	'change .sel_carreraEstudiante':function(e){
		carrera_elegida_estudiante.set(e.target.value);
		if(carrera_elegida_estudiante.get()==""){
			document.getElementById('btn_seleccionar').disabled=true;
		}else{
			document.getElementById('btn_seleccionar').disabled=false;
		}
	},
	'change #sel_grupoM':function(e){
		e.preventDefault();
		id_grupoElegido.set(e.target.value);
	}
});

//Meteor.subscribe('publi_estudiantes');
Meteor.subscribe('publi_modulos');
Meteor.subscribe('publi_carreras');
Meteor.subscribe('publi_grupos');
Meteor.subscribe('publi_gestiones');
Meteor.subscribe('publi_designaciones');
//mi super variable de gestion
//superGestion = new ReactiveVar();

Template.gestionMatriculas.helpers({
	 ready: function(){
  		return FlowRouter.subsReady("getEstudiantes");
  	},
	estudiantes:function(){
		//buscar usuarios que su username empiece con lo buscado
		//return Meteor.users.find({username:{$regex:'^'+var_ci.get()}});
		//mostrar usuarios que su username empiesen con lo buscado y que tengan el rol inscritos
		return Meteor.users.find({
			 $or:[
				 {$and: [ {username:{$regex:'^'+var_ci.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ]},
				 {$and: [ {'profile.nombres':{$regex:'^'+var_ci.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ]},
				 {$and: [ {'profile.apellidoP':{$regex:'^'+var_ci.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ]},
				 {$and: [ {'profile.apellidoM':{$regex:'^'+var_ci.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ]}
			 ]
			});
		//return Meteor.users.find({ 'roles.admin': {$in:['inscritos']}});

	},
	docentes:function(){
		return Meteor.users.findOne({$and:[{_id:this.idUs} ,{ 'roles.admin': {$in:['docente']}}]});
	},
	carreraEstudiante:function(){
		return Carreras.findOne({_id:varEstudiante.get().id_carrera});
	},
	modulos: function () {
		var arrayModulos=[];
		var result=Notas.find({$and:[{idUs:varEstudiante.get().idUs},{aprobado:true}]}).fetch();
		for(let value of result ){
			arrayModulos.push(value.id_modulo);
		}
		//para mostrar modulos de la ultima gestion
		//para ver si ya tiene notas
		var verNotas = Notas.findOne({idUs:varEstudiante.get().idUs});
		if(verNotas){
			return Modulos.find({$and:[{id_carrera:varEstudiante.get().id_carrera},{_id:{$nin:arrayModulos}}]});
		}else{
			return Modulos.find({$and:[{id_carrera:varEstudiante.get().id_carrera},{_id:{$nin:arrayModulos}},{ano:'1'}]});
		}
		// consulta mostrar modulos de la carrera del estudiante y la ultima gestion
		//return Modulos.find({$and:[{id_carrera:varEstudiante.get().id_carrera},{_id:{$nin:arrayModulos}}]});
	},
	grupos: function () {
		return Grupos.find({id_carrera:varEstudiante.get().id_carrera});
	},
	estudianteSelect:function(){
		return varEstudiante.get();
	},
	gestionActual:function(){
		return Gestiones.findOne({}, {sort: {gestion: -1}});
	},
	designaciones:function(){
		var gestion=Gestiones.findOne({}, {sort: {gestion: -1}})
		return Designaciones.find({$and:[
			{id_modulos:this._id},
			{id_gestion:gestion._id},
			{id_grupo:id_grupoElegido.get()}
		]});
	},//para mostar el grupos del docente
	grupoDocente: function () {
		return Grupos.findOne({_id:this.id_grupo});
	},
	estaMatriculado:function(){
		var gestion=Gestiones.findOne({}, {sort: {gestion: -1}});
		return Matriculas.findOne({$and:[
			{idUs:varEstudiante.get().idUs},
			{id_gestion:gestion._id},
			{id_carrera:varEstudiante.get().id_carrera}
		]});
	},
	carrerasDeEstudiante:function(){
		var gestion=Gestiones.findOne({}, {sort: {gestion: -1}})
		return Carreras.find({$and:[
			{id_gestion:gestion._id},
			{_id:this.toString()}
		]});
	}
});
