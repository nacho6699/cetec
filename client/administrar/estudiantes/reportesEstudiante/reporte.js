//re-password
Meteor.subscribe('publi_gestiones');
Meteor.subscribe('publi_carreras');
Meteor.subscribe('publi_modulos');
Meteor.subscribe('publi_materias');
Template.reporte.onRendered(function(e){

});
var var_ciEstudiante = new ReactiveVar();
var gestionSeleccionada = new ReactiveVar();
var carreraSeleccionada = new ReactiveVar();
Template.reporte.events({
	'input #txt_ciEstudianteR': function(e){
		e.preventDefault();
		var valor=$("#txt_ciEstudianteR").val();
		if(!valor==" "){
			var_ciEstudiante.set(valor);
		}else{
			var_ciEstudiante.set(" ");
        }
	},
	'change #sel_gestionGraduados' :function(e){
		e.preventDefault();
		gestionSeleccionada.set(e.target.value);
		//alert(gestionSeleccionada.get());
	},
	'change #sel_carrerasGraduados' :function(e){
		e.preventDefault();
		carreraSeleccionada.set(e.target.value);
		alert(carreraSeleccionada.get());
	},
	'click .btn_historial':function(e){
		var suCarrera=Carreras.findOne({_id:this.profile.id_carrera[0]});
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
		doc.text(60, 33, 'Historial Academico'+suCarrera.nombreCarrera);

		
		
		doc.setFontType('bold');
		doc.setTextColor(0, 0, 0);
		doc.text(20, 40, 'DATOS DE ESTUDIANTE');
		//datos del estudiante
		doc.setDrawColor(7, 7, 7)
		doc.rect(20, 42, 170, 50);

		doc.text(21, 48, 'Apellido Paterno :');
		doc.text(21, 54, 'Apellido Materno :');
		doc.text(21, 60, 'Nombres :');
		doc.text(21, 66, 'Cédula de Identidad :');
		doc.text(21, 72, 'Correo :');
		doc.text(21, 78, 'Telf/Cel :');
		doc.text(21, 84, 'Dirección :');

		doc.setFont('times');
		doc.setFontType('italic');
		doc.text(60, 48, this.profile.apellidoP);
		doc.text(60, 54, this.profile.apellidoM);
		doc.text(60, 60, this.profile.nombres);
		doc.text(60, 66, this.username);
		doc.text(60, 72, this.emails[0].address);
		doc.text(60, 78, this.profile.telefono);
		doc.text(60, 84, this.profile.direccion);

		//extra
		var kardexEstudiante=new ReactiveVar();
		var id_carrera=this.profile.id_carrera[0];
		var idUs=this._id;
		var kardex=KardexEstudiante.find({$and:[
			{idUs:idUs},
			{id_carrera:id_carrera}
		]}).fetch();
		kardexEstudiante.set(kardex);

		var modulos;
		var gestion;
		var notasEstudiante;
		var literal;
		var conG=110;
		var conM;
		var con1=116;
		
		for(let value of kardexEstudiante.get()){
			gestion=Gestiones.findOne({_id:value.id_gestion});
			doc.text(21, conG, gestion.gestion.toString());
			doc.setLineWidth(0.5);
			doc.line(20, conG+2, 180, conG+2);
			conM=conG+6;
			for(let value2 of value.id_modulos){
				
				modulos=Modulos.findOne({_id:value2});
				notasEstudiante=Notas.findOne({$and:[{id_modulo:modulos._id},{id_gestion:gestion._id},{idUs:this._id}]});
				
				doc.text(21, conM, modulos.nombreModulo);
				doc.text(70, conM, modulos.nombreMateria);
				//console.log(notasEstudiante.total);
				if(notasEstudiante==undefined){
					doc.text(130, conM, "0");
					doc.setLineWidth(0.1);
					doc.line(20, con1+2, 180, con1+2);
					con1=con1+6;
				}else{
					if(notasEstudiante.total>notasEstudiante.segundaInstancia){
						doc.text(130, conM, notasEstudiante.total.toString());
						doc.setLineWidth(0.1);
						doc.line(20, con1+2, 180, con1+2);
						con1=con1+6;
					}else{
						doc.text(130, conM, notasEstudiante.segundaInstancia.toString());
						doc.setLineWidth(0.1);
						doc.line(20, con1+2, 180, con1+2);
						con1=con1+6;
					}
					
					if(notasEstudiante.total>50){
						literal="Aprobado";
						
						doc.text(150, conM, literal);
					}else{
						literal="Reprobado";
						doc.setTextColor(255, 0, 0);
						doc.text(150, conM, literal);
						doc.setTextColor(0, 0, 0);
					}
					
				}
				

				conM=conM+6;
			}
			conG=conM+6;
		}

		//extra
		
		doc.text(20, 100, moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));

		//console.log(typeof(moment(datos_preEstudiante.get().profile.fecha_inscripcion).format("YYYY-MM-DD HH:mm:ss")));
		
		doc.save('reporte.pdf');  
	}
});

Template.reporte.helpers({
	estudiantes:function(){
		return Meteor.users.find({
            $or:[
                {$and: [ {username:{$regex:'^'+var_ciEstudiante.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ]},
                {$and: [ {'profile.nombres':{$regex:'^'+var_ciEstudiante.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ]},
                {$and: [ {'profile.apellidoP':{$regex:'^'+var_ciEstudiante.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ]},
                {$and: [ {'profile.apellidoM':{$regex:'^'+var_ciEstudiante.get()}}, { 'roles.admin': {$in:['inscritos','estudiante']}} ]}
            ]
           });
	},
	gestiones:function(){
		return Gestiones.find();
	},
	carreras:function(){
		return Carreras.find({id_gestion:gestionSeleccionada.get()});
	}
})