Meteor.subscribe('publi_docentes');
Meteor.subscribe('publi_carreras');
Meteor.subscribe('publi_grupos');
Meteor.subscribe('publi_modulos');
Meteor.subscribe('publi_designaciones');
var var_ciDocenteKardex=new ReactiveVar();
var var_datosKardex=new ReactiveVar();

Template.kardexDocente.onRendered(function(){
	$(".kardexDocente").css('display','none');
})

Template.kardexDocente.events({
	
	'input #txt_ciDocente': function(e){
		e.preventDefault();
		var valor=$("#txt_ciDocente").val();
		if(!valor==" "){
			var_ciDocenteKardex.set(valor);
		}else{
			var_ciDocenteKardex.set(" ");
		}
	},

	'click #btn_seleccionarDoc':function(e){
		e.preventDefault();
		var datos={
			"idUs":this._id,
			"nombres":this.profile.nombres,
			"apellidoP":this.profile.apellidoP,
			"apellidoM":this.profile.apellidoM,
			"correo":this.emails[0].address,
			"ci":this.username,
			"profesion":this.profile.profesion,
			"telefono":this.profile.telefono,
			"contracena":this.profile.copiaPass
		}
		var_datosKardex.set(datos);
		//console.log(var_datosKardex.get());
		$(".buscarDocente").slideUp(500);
		$(".kardexDocente").css('display','block');
	},
	'click #btn_volver':function(){
		$(".buscarDocente").slideDown(500);
		$(".kardexDocente").slideUp(500);
	},
	'click .btn_kardexDocente':function(e){
		e.preventDefault();

        var doc = new jsPDF();
		doc.setFontSize(12);
		doc.setFontType('bold');
        doc.setFont('times');
        doc.setDrawColor(245, 117, 10)
		doc.setLineWidth(1);//grosor de linea
		doc.line(20, 20, 190, 20); // horizontal line
		doc.setTextColor(38, 38, 114);
		doc.text(65, 25, 'CENTRO DE ESTUDIOS TÉCNICO "CETEC');

		doc.setLineWidth(0.5);
		doc.line(20, 26, 190, 26);//(x1,y1,x2,y2)
		doc.text(90, 33, 'Historial Academico');

		
		
		doc.setFontType('bold');
		doc.setTextColor(0, 0, 0);
		doc.text(20, 40, 'DATOS DE DOCENTE');
		//datos del estudiante
		doc.setDrawColor(7, 7, 7)
		doc.rect(20, 42, 170, 50);

		doc.text(21, 48, 'Apellido Paterno :');
		doc.text(21, 54, 'Apellido Materno :');
		doc.text(21, 60, 'Nombres :');
		doc.text(21, 66, 'Cédula de Identidad :');
		doc.text(21, 72, 'Correo :');
		doc.text(21, 78, 'Telf/Cel :');
		doc.text(21, 84, 'Profesión :');

		doc.setFont('times');
		doc.setFontType('italic');
		doc.text(60, 48, var_datosKardex.get().apellidoP);
		doc.text(60, 54, var_datosKardex.get().apellidoM);
		doc.text(60, 60, var_datosKardex.get().nombres);
		doc.text(70, 66, var_datosKardex.get().ci);
		doc.text(60, 72, var_datosKardex.get().correo);
		doc.text(60, 78, var_datosKardex.get().telefono);
		doc.text(60, 84, var_datosKardex.get().profesion);

		
		doc.text(21, 90, moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));

		doc.text(21,100 , "DESIGNACIONES");

		doc.text(21, 110, "Carrera");
		doc.text(60, 110, "Modulo");
		doc.text(80, 110, "Materia");
		doc.text(110, 110, "Grupo");
		doc.text(125, 110, "Turno");
		doc.text(150, 110, "Fecha Designación");

		doc.setLineWidth(0.3);
		doc.line(20, 114, 190, 114);
	
		var designaciones=Designaciones.find({idUs:var_datosKardex.get().idUs}).fetch();
		var modulos;
		var carreras;
		var grupo;
		var con=120;
		var con2=120;

		for(let value of designaciones){
		
			modulos=Modulos.findOne({_id:value.id_modulos});
			carreras=Carreras.findOne({_id:modulos.id_carrera});
			grupo=Grupos.findOne({_id:value.id_grupo});
			if(modulos!="undefined"){
				doc.text(21, con, carreras.nombreCarrera);
				doc.text(60, con, modulos.nombreModulo);
				doc.text(80, con, modulos.nombreMateria);
				doc.text(110, con, grupo.nombreGrupo)
				doc.text(125, con, grupo.turno);
				doc.text(150, con, moment(value.fechaCreacion).format("YYYY-MM-DD HH:mm:ss").toString());

				doc.setLineWidth(0.1);
				doc.line(20, con+2, 190, con2+2);
			}

			con=con+6;
			con2=con2+6;
		}

		//console.log(typeof(moment(datos_preEstudiante.get().profile.fecha_inscripcion).format("YYYY-MM-DD HH:mm:ss")));
		
		doc.save('reporte.pdf');  

	}
});

Template.kardexDocente.helpers({
	docentes:function(){
		return Meteor.users.find({$or:[
			{ $and: [ {username:{$regex:'^'+var_ciDocenteKardex.get()}}, { 'roles.admin': {$in:['docente']}} ] },
			{ $and: [ {'profile.nombres':{$regex:'^'+var_ciDocenteKardex.get()}}, { 'roles.admin': {$in:['docente']}} ] },
			{ $and: [ {'profile.apellidoP':{$regex:'^'+var_ciDocenteKardex.get()}}, { 'roles.admin': {$in:['docente']}} ] },
			{ $and: [ {'profile.apellidoM':{$regex:'^'+var_ciDocenteKardex.get()}}, { 'roles.admin': {$in:['docente']}} ] }
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
	
		return  Modulos.find({id_carrera:var_id_carreraD.get()});
	},
	docenteSelect:function(){
		return var_datosKardex.get();
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
	},
	avatar (){ 
		user=Meteor.users.findOne({_id:var_datosKardex.get().idUs}); 
	 	return user.profile.avatar;
	},
	designaciones:function(){

		var gestion=Gestiones.findOne({}, {sort: {gestion: -1}})  
		return Designaciones.find({
			$and:[
				{idUs:var_datosKardex.get().idUs},
				{id_gestion:gestion._id}
			]
		});
	},
	modulosAsignados:function(){
		return Modulos.find({_id:this.id_modulos});
	},
	carrerasAsignadas:function(){
		return Carreras.findOne({_id:this.id_carrera});
	}
})