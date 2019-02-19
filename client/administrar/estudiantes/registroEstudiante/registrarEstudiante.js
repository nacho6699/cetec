//re-password
datos_preEstudiante=new ReactiveVar();
preInscripcion = new ReactiveVar();
var aux1 = new ReactiveVar();
preInscripcion.set("imprimirInscripcion");
Template.registrarEstudiante.onRendered(function(e){
	//$('select').material_select();
	//para el date picker
	$("#mlogin").modal('hide');
	$('.datepicker').pickadate({
	selectMonths: true,//Creates a dropdown to control month
	selectYears: 10,//Creates a dropdown of 15 years to control year
	//The title label to use for the month nav buttons
	labelMonthNext: 'Next Month',
	labelMonthPrev: 'Last Month',
	//The title label to use for the dropdown selectors
	labelMonthSelect: 'Select Month',
	labelYearSelect: 'Select Year',
	//Months and weekdays
	monthsFull: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
	monthsShort: [ 'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic' ],
	weekdaysFull: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
	weekdaysShort: [ 'Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab' ],
	//Materialize modified
	weekdaysLetter: [ 'D', 'L', 'M', 'M', 'J', 'V', 'S' ],
	//Today and clear
	today: 'Hoy',
	clear: 'Limpiar',
	close: 'Cerrar',
	//The format to show on the `input` element
	format: 'dd/mm/yyyy'
	});
	$(".btn_printEstudiante").css("display", "none");

});
function generarPassword(longitud)
{
  var caracteres = "abcdefghijkmnpqrtuvwxyzABCDEFGHIJKLMNPQRTUVWXYZ2346789";
  var contraseña = "";
  for (i=0; i<longitud; i++) contraseña += caracteres.charAt(Math.floor(Math.random()*caracteres.length));
  return contraseña;
}
//registrar estudiante
Template.registrarEstudiante.events({
	'submit #formRegistrarEst': function(e){
		e.preventDefault();
		//alert(e.target.txt_ci.value+'--'+e.target.sel_carrera.value);
		var pass=generarPassword(6);
		var user = {
			"username" : e.target.txt_ci.value,
			"email" : e.target.txt_email.value,
			"password" : pass,
			"profile" : {
				"copiaPass" :pass,
				"id_carrera" : [e.target.sel_carrera.value],
				"apellidoP" :e.target.txt_Ap.value,
				"apellidoM" :e.target.txt_Am.value,
				"nombres" :e.target.txt_nombres.value, 
				"fechaNacimiento" : e.target.txt_fechaNacimiento.value,
				"departamento" : e.target.sel_departamento.value,
				"sexo" : e.target.sexo.value,
				"estadoCivil" : e.target.sel_estado.value,
				"direccion" : e.target.txt_direccion.value,
				"telefono" : e.target.txt_telefono.value,
				"celular" : e.target.txt_celular.value,
				"apellidoP_apoderado" : e.target.txt_ap_apoderado.value,
				"apellidoM_apoderado" : e.target.txt_am_apoderado.value,
				"nombres_apoderado" : e.target.txt_nom_apoderado.value,
				"direccion_apoderado" : e.target.txt_dir_apoderado.value,
				"telefono_apoderado" : e.target.txt_fono_apoderado.value,
				"celular_apoderado" : e.target.txt_cel_apoderado.value,
				"pais_egreso" : e.target.country.value,
				"departamento_egreso" : e.target.departamento.value,
				"colegio_egreso" : e.target.txt_colegio.value,
				"nro_diploma" : e.target.txt_nroDiploma.value,
				"gestion_egreso" : e.target.txt_gestion.value,
				"fecha_inscripcion": new Date(),
				"matriculado":false
			}
		};
		//console.log(user);
		Meteor.call('registrarEstudiante', user, function(error,result){
			if(error){
                alert(error.reason); 
                swal(
				  'Lo sentimos...',
				  'Error al registrar',
				  'error'
				)
			}
            if(result){
            	swal({
				  //position: 'top-end',
				  type: 'success',
				  title: 'Registrado correctamente',
				  showConfirmButton: false,
				  timer: 2000
				});
				datos_preEstudiante.set(Meteor.users.findOne({_id:result}));
				$(".btn_printEstudiante").css("display", "block");
				$("#formRegistrarEst")[0].reset();
            	//Meteor.loginWithPassword(user.username, user.password);
            }else{
				alert(error.reason); 
                swal(
				  'Lo sentimos...',
				  'Error al registrar',
				  'error'
				)
			}
                
		});
	},
	'click .btn_printEstudiante':function(){
		//datos_preEstudiante.set(Meteor.users.findOne({username:'111'}));
		var carrera=Carreras.findOne({_id:{$in:datos_preEstudiante.get().profile.id_carrera}});
		var doc = new jsPDF();
		doc.setFontSize(12);
		doc.setFontType('bold');
		doc.setFont('times');
		doc.setLineWidth(1);//grosor de linea
		doc.line(20, 20, 190, 20); // horizontal line
		doc.setTextColor(38, 38, 114);
		doc.text(65, 25, 'CENTRO DE ESTUDIOS TÉCNICO "CETEC');

		doc.setLineWidth(0.5);
		doc.line(20, 26, 190, 26);//(x1,y1,x2,y2)
		doc.text(60, 33, 'Pre inscripción Carrera de ');

		doc.text(110, 33, carrera.nombreCarrera);
		
		
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
		doc.text(60, 48, datos_preEstudiante.get().profile.apellidoP);
		doc.text(60, 54, datos_preEstudiante.get().profile.apellidoM);
		doc.text(45, 60, datos_preEstudiante.get().profile.nombres);
		doc.text(65, 66, datos_preEstudiante.get().username);
		doc.text(45, 72, datos_preEstudiante.get().emails[0].address);
		doc.text(50, 78, datos_preEstudiante.get().profile.celular);
		doc.text(50, 84, datos_preEstudiante.get().profile.direccion);
		
		doc.setFontType('bold');
		doc.setTextColor(0, 0, 0);
		doc.text(20, 100, 'DATOS DE APODERADO');
		//datos de apoderado
		doc.setDrawColor(7, 7, 7)
		doc.rect(20, 102, 170, 35);

		doc.text(21, 108, 'Apellido Paterno :');
		doc.text(21, 114, 'Apellido Materno :');
		doc.text(21, 120, 'Nombres :');
		doc.text(21, 126, 'Telf./Cel. :');
		doc.text(21, 132, 'Dirección :');

		doc.setFont('times');
		doc.setFontType('italic');
		doc.text(60, 108, datos_preEstudiante.get().profile.apellidoP_apoderado);
		doc.text(60, 114, datos_preEstudiante.get().profile.apellidoM_apoderado);
		doc.text(45, 120, datos_preEstudiante.get().profile.nombres_apoderado);
		doc.text(50, 126, datos_preEstudiante.get().profile.celular_apoderado);
		doc.text(50, 132, datos_preEstudiante.get().profile.direccion_apoderado);
		//datos de secundaria
		doc.setFontType('bold');
		doc.setTextColor(0, 0, 0);
		doc.text(20, 146, 'DATOS DE SECUNDARIA DE EGRESO');

		doc.setDrawColor(7, 7, 7);
		doc.rect(20, 148, 170, 35);

		doc.text(21, 154, 'País :');
		doc.text(21, 160, 'Departamento :');
		doc.text(21, 166, 'Colegio de egreso :');
		doc.text(21, 172, 'N° diploma. :');
		doc.text(21, 178, 'Gestión de egreso :');

		doc.setFont('times');
		doc.setFontType('italic');
		doc.text(38, 154, datos_preEstudiante.get().profile.pais_egreso);
		doc.text(50, 160, datos_preEstudiante.get().profile.departamento_egreso);
		doc.text(60, 166, datos_preEstudiante.get().profile.colegio_egreso);
		doc.text(50, 172, datos_preEstudiante.get().profile.nro_diploma);
		doc.text(60, 178, datos_preEstudiante.get().profile.gestion_egreso);

		doc.text(21, 189,'Fecha pre-inscripción:');
		doc.text(60, 189, moment(datos_preEstudiante.get().profile.fecha_inscripcion).format("YYYY-MM-DD HH:mm:ss"));

		//console.log(typeof(moment(datos_preEstudiante.get().profile.fecha_inscripcion).format("YYYY-MM-DD HH:mm:ss")));
		
		doc.save(datos_preEstudiante.get().username+'.pdf');
	}
});

Meteor.subscribe('publi_carreras');
Template.registrarEstudiante.helpers({
	carreras: function () {
		var gestion=Gestiones.findOne({}, {sort: {gestion: -1}});
		var aux = Carreras.findOne({id_gestion:gestion._id});
		//console.log(aux.numero_estudiantes);
		return Carreras.find({$and:[{id_gestion:gestion._id},{limite:{$lt:aux.numero_estudiantes}}]});
		//return Carreras.find({id_gestion:gestion._id});
	}
});

