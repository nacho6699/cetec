Meteor.subscribe('publi_gestiones');
Meteor.subscribe('publi_carreras');
Meteor.subscribe('publi_modulos');
Meteor.subscribe('publi_materias');
Meteor.subscribe('publi_designaciones');
Meteor.subscribe('publi_matriculados');
Meteor.subscribe('publi_notas');
var notasPrint = new ReactiveVar();
var carreraPrint = new ReactiveVar();
var moduloPrint = new ReactiveVar();
var grupoPrint = new ReactiveVar();
var_primerP= new ReactiveVar();
var_primerP.set(0);
var_segundoP=new ReactiveVar();
var_segundoP.set(0);
Template.planillaNotas.onRendered(function(){
	$(".contenidoPlanilla").css("display", "none");
})

Template.planillaNotas.helpers({
	gestionActual:function(){
		return varGestionSelecionado.get().gestion;
	},
	matriculados:function(){
		var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		return Matriculas.find({$and:[{id_modulos:varDesigGrupo.get().id_modulos},{id_grupo:varDesigGrupo.get().id_grupo},{id_gestion:varGestionSelecionado.get().id_gestion}]});
	},
	estudiantes:function(){
		var modulo=Modulos.find({_id:this.id_modulos}).fetch();
		//console.log(modulo);
		return Meteor.users.find({_id:this.idUs});
	},//para mostrar mis datos en la planilla
	modulos:function(){
		moduloPrint.set(Modulos.findOne({_id:varDesigGrupo.get().id_modulos}));
		return Modulos.find({_id:varDesigGrupo.get().id_modulos});
	},
	carrera:function(){
		carreraPrint.set(Carreras.findOne({_id:this.id_carrera}));
		return Carreras.findOne({_id:this.id_carrera});
	},
	materia:function(){
		return Materias.findOne({_id:this.id_materia});
	},
	grupo:function(){
		grupoPrint.set(Grupos.findOne({_id:varDesigGrupo.get().id_grupo}));
		return Grupos.findOne({_id:varDesigGrupo.get().id_grupo});
	},
	id_modulo:function(){
		return varDesigGrupo.get().id_modulos;
	},
	id_grupo:function(){
		return varDesigGrupo.get().id_grupo;
	},
	id_gestion:function(){
		return varGestionSelecionado.get().id_gestion;
	},
	notas:function(){
		
		return Notas.findOne({$and:[{idUs:this._id},{id_modulo:varDesigGrupo.get().id_modulos},{id_gestion:varGestionSelecionado.get().id_gestion}]});
	}
})

Template.planillaNotas.events({
	'click .btn_guardar':function(e){
		e.preventDefault();
		var dato = [];

		var docente=Meteor.user(); 
		var owner=docente._id;

		var aprobado=false;
		//obteniendo toda la tabla
		var tabla = $('.t_calificar tbody tr');
		tabla.each(function(){
			var id = $(this).attr('class');
			var id_modulo=$(this).data('id_modulo');
			var id_grupo=$(this).data('id_grupo');
			var id_gestion=$(this).data('id_gestion');
			var	primerP = parseInt($(this).find('.txt_primerP').val());
			if (isNaN(primerP)) {primerP=0;}
			var	segundoP = parseInt($(this).find('.txt_segundoP').val());
			if (isNaN(segundoP)) {segundoP=0;}
			var promP = (primerP+segundoP)/2;
			var asistencia = parseInt($(this).find('.txt_asistencia').val());
			if (isNaN(asistencia)) {asistencia=0;}
			var evaluacionC = parseInt($(this).find('.txt_evaluacionC').val());
			if (isNaN(evaluacionC)) {evaluacionC=0;}
			var examenF_e = parseInt($(this).find('.txt_escrito').val());
			if (isNaN(examenF_e)) {examenF_e=0;}
			var examenF_p = parseInt($(this).find('.txt_practico').val());
			if (isNaN(examenF_p)) {examenF_p=0;}
			var total = (promP+asistencia+evaluacionC+examenF_e+examenF_p);
			var segundaI = parseInt($(this).find('.txt_segundaI').val());
			if (isNaN(segundaI)) {segundaI=0;}
			
			if(total>=51||segundaI>=51){
				aprobado=true;
			}else{
				aprobado=false;
			}

			item={
				"idUs":id,
				"owner":owner,
				"id_modulo":id_modulo,
				"id_grupo":id_grupo,
				"id_gestion":id_gestion,
				"primerP":primerP,
				"segundoP":segundoP,
				"promP":promP,
				"asistencia":asistencia,
				//"trabajosP":trabajosP,
				"evaluacionC":evaluacionC,
				"examenF_e":examenF_e,
				"examenF_p":examenF_p,
				"total":total,
				"segundaInstancia":segundaI,
				"aprobado":aprobado
			}
			dato.push(item);		
		});
		Meteor.call('registrarNotas', dato, function(error,result){
			if(error){
                alert(error.reason); 
                swal(
				  'Lo sentimos',
				  'Error al registrar',
				  'error'
				)
			}else{
            	swal({
				  type: 'success',
				  title: 'Se guardo Correctamente',
				  showConfirmButton: false,
				  timer: 2000
				});
            	//$("#formRegistrarModulo")[0].reset();
            }
                
		});
		/*console.log(dato);
		for(let value of dato){
			console.log(value);
		}*/
	},
	'change .txt_primerP': function(t,e){
		
		var idUs=this._id;
		var nota1=parseInt($('input[name=primer'+idUs+']').val());
		var_primerP.set(nota1);
		$('input[name=promP'+idUs+']').val((var_primerP.get()+var_segundoP.get())/2);
		//para validar

		if (isNaN(nota1)){
			$('input[name=primer'+idUs+']').css("border", "2px solid red");
			alert ("Error: la nota no es un número válido");
		}else{
			
			if($('input[name=primer'+idUs+']').val()>30){
				alert('nota no permitida, es sobre 30');
				$('input[name=primer'+idUs+']').val(0);
			}else{
				$('input[name=primer'+idUs+']').css("border", "0");
			}
		}
		
	},
	'change .txt_segundoP': function(t,e){

		var idUs=this._id;
		var nota2=parseInt($('input[name=segundo'+idUs+']').val());
		var_segundoP.set(nota2);
		$('input[name=promP'+idUs+']').val((var_primerP.get()+var_segundoP.get())/2);

		if (isNaN(nota2)){
			$('input[name=segundo'+idUs+']').css("border", "2px solid red");
			alert ("Error: la nota no es un número válido");
		}else{
			
			if($('input[name=segundo'+idUs+']').val()>30){
				alert('nota no permitida, es sobre 30');
				$('input[name=segundo'+idUs+']').val(0);
			}else{
				$('input[name=segundo'+idUs+']').css("border", "0");
			}
		}
		
	},
	'change .txt_asistencia': function(t,e){

		var idUs=this._id;
		var nota3=parseInt($('input[name=asistencia'+idUs+']').val());
		if (isNaN(nota3)){
			$('input[name=asistencia'+idUs+']').css("border", "2px solid red");
			alert ("Error: la nota no es un número válido");
		}else{
			
			if($('input[name=asistencia'+idUs+']').val()>15){
				alert('nota no permitida, es sobre 15');
				$('input[name=asistencia'+idUs+']').val(0);
			}else{
				$('input[name=asistencia'+idUs+']').css("border", "0");
			}
		}
		
	},
	'change .txt_evaluacionC': function(t,e){
		
		var idUs=this._id;
		var nota4=parseInt($('input[name=evaluacionC'+idUs+']').val());
		if (isNaN(nota4)){
			$('input[name=evaluacionC'+idUs+']').css("border", "2px solid red");
			alert ("Error: la nota no es un número válido");
		}else{
			
			if($('input[name=evaluacionC'+idUs+']').val()>15){
				alert('nota no permitida, es sobre 15');
				$('input[name=evaluacionC'+idUs+']').val(0);
			}else{
				$('input[name=evaluacionC'+idUs+']').css("border", "0");
			}
		}
		
	},
	'change .txt_escrito': function(t,e){

		var idUs=this._id;
		var nota5=parseInt($('input[name=examenF_e'+idUs+']').val());
		if (isNaN(nota5)){
			$('input[name=examenF_e'+idUs+']').css("border", "2px solid red");
			alert ("Error: la nota no es un número válido");
		}else{
			
			if($('input[name=examenF_e'+idUs+']').val()>20){
				alert('nota no permitida, es sobre 20');
				$('input[name=examenF_e'+idUs+']').val(0);
			}else{
				$('input[name=examenF_e'+idUs+']').css("border", "0");
			}
		}
		
	},
	'change .txt_practico': function(t,e){

		var idUs=this._id;
		var nota6=parseInt($('input[name=examenF_p'+idUs+']').val());
		if (isNaN(nota6)){
			$('input[name=examenF_p'+idUs+']').css("border", "2px solid red");
			alert ("Error: la nota no es un número válido");
		}else{
			
			if($('input[name=examenF_p'+idUs+']').val()>20){
				alert('nota no permitida, es sobre 20');
				$('input[name=examenF_p'+idUs+']').val(0);
			}else{
				$('input[name=examenF_p'+idUs+']').css("border", "0");
			}
		}
		
	},
	'change .txt_segundaI': function(t,e){

		var idUs=this._id;
		var nota7=parseInt($('input[name=segundaI'+idUs+']').val());
		if (isNaN(nota7)){
			$('input[name=segundaI'+idUs+']').css("border", "2px solid red");
			alert ("Error: la nota no es un número válido");
		}else{
			
			if($('input[name=segundaI'+idUs+']').val()>51){
				alert('nota no permitida, es sobre 51');
				$('input[name=segundaI'+idUs+']').val(0);
			}else{
				$('input[name=segundaI'+idUs+']').css("border", "0");
			}
		}
		
	},
	'click #btn_volverNotas':function(){
		$(".contenidoPlanilla").css("display", "none");
		$('.contenidoNotas').slideDown().show();
	},
	//para imorimir mis notas
	'click .btn_imprimirNotas':function(e){
		e.preventDefault();
		var user=Meteor.user(); 
		var idUs=user._id;
		notasPrint.set(Notas.find({$and:[
			{owner:idUs},
			{id_gestion:varGestionSelecionado.get().id_gestion},
			{id_modulo:varDesigGrupo.get().id_modulos},
			{id_grupo:varDesigGrupo.get().id_grupo}
		]}).fetch());
		console.log(notasPrint.get());

		var doc = new jsPDF();
		doc.setFontSize(12);
		doc.setFontType('bold');
        doc.setFont('times');
        doc.setDrawColor(12, 88, 191)
		doc.setLineWidth(1);//grosor de linea
		doc.line(20, 20, 190, 20); // horizontal line
		doc.setTextColor(38, 38, 114);
		doc.text(65, 25, 'CENTRO DE ESTUDIOS TÉCNICO "CETEC');

		doc.setLineWidth(0.5);
		doc.line(20, 26, 190, 26);//(x1,y1,x2,y2)
		doc.text(80, 33, 'Planilla de calificaciones '+varGestionSelecionado.get().gestion);

		//datos del estudiante
		//doc.setDrawColor(7, 7, 7)
		//doc.rect(20, 42, 160, 35);
		doc.setLineWidth(0.3);
		doc.line(20, 79, 190, 79);

		doc.text(21, 48, 'Docente : ');
		doc.text(21, 54, 'Cédula de Identidad :');
		doc.text(21, 60, 'Carrera :');
		doc.text(21, 66, 'Módulo :');
		doc.text(21, 72, 'Grupo :');
		doc.text(70, 72, 'Turno :');
		doc.text(21, 78, 'Fecha Impresión :');
		

		doc.setFont('times');
		doc.setFontType('italic');
		doc.text(50, 48, user.profile.apellidoP+' '+user.profile.apellidoM+', '+user.profile.nombres);
		doc.text(65, 54, user.username);
		doc.text(45, 60, carreraPrint.get().nombreCarrera);
		doc.text(40, 66, moduloPrint.get().nombreModulo);
		doc.text(40, 72, grupoPrint.get().nombreGrupo);
		doc.text(85, 72, grupoPrint.get().turno);


		doc.setTextColor(0, 0, 0);
		doc.text(21, 90, 'N°');
		doc.text(30, 90, 'C.I:');
		doc.text(50, 90, 'Estudiante');
		doc.text(90, 90, 'Parciales');
		doc.text(120, 90, 'Asistencia');
		doc.text(150, 90, 'Eval.C.');
		doc.text(170, 90, 'Final');
		doc.text(185, 90, 'S.I');

		doc.setLineWidth(0.5);
		doc.line(20, 92, 190, 92);
		doc.setDrawColor(150,150,150);

		doc.setFontSize(9);
		var con=97;
		var Numero=1;
		var estudiante;
		for(let value of notasPrint.get()){
			estudiante=Meteor.users.findOne({_id:value.idUs});
			doc.text(21, con, Numero.toString());
			doc.text(30, con,estudiante.username);
			doc.text(50, con,estudiante.profile.apellidoP+' '+estudiante.profile.apellidoM+', '+estudiante.profile.nombres);
			doc.text(100, con, value.promP.toString());
			doc.text(125, con, value.asistencia.toString());
			doc.text(155, con, value.evaluacionC.toString());
			doc.text(175, con, value.total.toString());
			doc.text(188, con, value.segundaInstancia.toString());

			doc.setLineWidth(0.1);
			doc.line(20, con+2, 190, con+2);

			Numero++;
			con+=7;
		}
		
		
		doc.text(55, 78, moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));

		//doc.output('dataurlnewwindow'); 
		doc.save('Notas_'+varGestionSelecionado.get().gestion+'.pdf'); 
	}
	
})
