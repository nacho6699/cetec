Meteor.subscribe('publi_carreras');
Template.modalNuevaCarrera.events({
	//para agregarle una nueva carrera
	'submit #formNuevaCarrera': function(e){
        e.preventDefault();
        var datos={
            "idUs":var_nuevaCarreraEstudiante.get().idUs,
            "id_carrera":e.target.sel_nuevaCarrera.value
		};
       
		Meteor.call('registrarNuevaCarreraAestudiante',datos, function(error,result){

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
				  timer: 3000
				});
			}else{
            	swal({
				  type: 'success',
				  title: 'Carrera de estudiante resistrado',
				  showConfirmButton: false,
				  timer: 2000
				});
                //$("#formRegistrarGestion")[0].reset();
                $("#nuevaCarrera").modal('hide');
            }
                
		});
    
     
	}

});

Template.modalNuevaCarrera.helpers({
	carreras: function () {
		//para mostrar modulos de la ultima gestion
		var gestion = Gestiones.findOne({}, {sort: {gestion: -1}});
		// consulta mostrar modulos de la carrera del estudiante y la ultima gestion
		return Carreras.find({id_gestion:gestion._id});
    },
    datosEstudiante:function(){
        return var_nuevaCarreraEstudiante.get();
    }
})