varIdCarrera = new ReactiveVar();
varIdCarrera.set(" ");
Template.gestionMaterias.events({
	'submit #formRegistrarMateria': function (e) {
		e.preventDefault();
		var materia={
			"id_carrera":e.target.sel_carrera.value,
			"nombreMateria":e.target.txt_nombreMateria.value,
			"sigla":e.target.txt_sigla.value
		}
		
		Meteor.call('registrarMateria', materia, function(error){
			if(error){
                alert(error.reason); 
                swal(
				  'Lo sentimos',
				  'Error al registrar',
				  'error'
				)
			}
            else{
            	swal({
				  type: 'success',
				  title: 'Materia Creada Correctamente',
				  showConfirmButton: false,
				  timer: 2000
				});
            	$("#formRegistrarMateria")[0].reset();
            }
                
		});
	},//para mis busquedas por carrera
	'change #select_carrera' :function(e){
		varIdCarrera.set(e.target.value);
	}
});
Meteor.subscribe('publi_carreras');
Template.gestionMaterias.helpers({
	carreras: function () {
		return Carreras.find();
		//console.log(Carreras.find().fetch());
	}
});

//para las busquedas
Meteor.subscribe('publi_materias');
Template.gestionMaterias.helpers({
	result_materias:function(){
		//return Materias.find({id_carrera:{$regex:varIdCarrera.get()}});
		return Materias.find({id_carrera:varIdCarrera.get()});
	}
});

