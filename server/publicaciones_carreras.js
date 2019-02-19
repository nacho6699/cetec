Meteor.publish('publi_gestiones', function(){
	return Gestiones.find();
});
Meteor.publish('publi_carreras', function(){
	return Carreras.find();
});
Meteor.publish('publi_modulos', function(){
	return Modulos.find();
});
Meteor.publish('publi_grupos', function(){
	return Grupos.find();
});
Meteor.publish('publi_materias', function(){
	return Materias.find();
});
Meteor.publish('publi_matriculados', function(){
	return Matriculas.find();
});
Meteor.methods({
	registrarGestion: function(dato){
		var ver=Gestiones.findOne({gestion:parseInt(dato.gestion)});
		if(ver){
			return "La gestion ya existe!!!";
		}else {
			Gestiones.insert(dato);
		}
		
	},
	editarGestion: function(dato){
		Gestiones.update({_id:dato.id_gestion},{$set:{gestion:dato.gestion}});
	},
	borrarGestion: function(dato){
		var carreras=Carreras.findOne({id_gestion:dato});
		if(carreras){
			return "Existen Carreras vinculadas!!!";
		}else {
			Gestiones.remove({_id:dato});
		}
		
	},
	registrarCarrera: function(dato){
		var carrera=Carreras.findOne({$and:[{nombreCarrera:dato.nombreCarrera},{id_gestion:dato.id_gestion}]});
		if(carrera){
			return "la carrera ya existe!!!";
		}else {
			Carreras.insert(dato);
		}
		
		//console.log(id);
	},
	editarCarrera: function(dato){
		Carreras.update({_id:dato.id_carrera},
			{$set:
				{
				nombreCarrera:dato.nombreCarrera,
				numero_modulos:dato.numeroModulos,
				numero_estudiantes:dato.numeroEstudiantes
				}
			});
	},
	borrarCarrera: function(dato){
		var modulos=Modulos.findOne({id_carrera:dato});
		if(modulos){
			return "Existen Modulos vinculados!!!";
		}else {
			Carreras.remove({_id:dato});
		}
		
	},
	registrarGrupo: function(dato){
		var grupoRepetido= Grupos.findOne({$and:[{nombreGrupo:dato.nombreGrupo},{turno:dato.turno},{id_carrera:dato.id_carrera}]});
		if(grupoRepetido){
			return 'el grupo ya existe!!!';
		}else{
			Grupos.insert(dato);
		}
		
	},
	borrarGrupo: function(dato){

		Grupos.remove({_id:dato});
	},
	editarGrupo: function(dato){
		Grupos.update({_id:dato.id_grupo},
			{$set:{nombreGrupo:dato.nombreGrupo,turno:dato.turno, horaInicio:dato.horaInicio, horaFin:dato.horaFin}})
	},
	registrarModulo: function(dato){
			  var materiaRepetida;
			  var gestion = Gestiones.findOne({}, {sort: {gestion: -1}})
			  
			for(let value of dato){
				//verificando si el usuario ya existe
				var ver=Modulos.findOne({$and:[{id_carrera:value.id_carrera},{nombreModulo:value.nombreModulo}]});
				if(ver){
					Modulos.update({id_carrera:value.id_carrera,nombreModulo:value.nombreModulo},{$set:{
						nombreModulo:value.nombreModulo,
						nombreMateria:value.nombreMateria,
						sigla:value.sigla,
						fechaInicio:value.fechaInicio,
						fechaFin:value.fechaFin,
						ano:value.ano
					}});
					Designaciones.update({id_modulos:value.id_modulo,id_gestion:gestion._id},{$set:{
						empiesa:value.fechaInicio,
						finaliza:value.fechaFin
					}});
				}else {
					materiaRepetida= Modulos.findOne({$and:[{id_carrera:value.id_carrera},{nombreMateria:value.nombreMateria}]});
					if(materiaRepetida){
						return 'Nombre de materia repetida!!!';
					}else{
						Modulos.insert(value);
					}
				}
				
			}

	},
	borrarModulo: function(dato){
		Modulos.remove({_id:dato});
	},
	editarModulo: function(dato){
		Modulos.update({_id:dato.id_modulo},{$set:{
			id_carrera:dato.id_carrera,
			nombreModulo:dato.nombreModulo,
			nombreMateria:dato.nombreMateria,
			sigla:dato.sigla
		}})
	},
	registrarMateria: function(dato){
		Materias.insert(dato);
		//console.log(id);
	},
	registrarMatricula: function(dato){
		var usuario;
		var gestion = Gestiones.findOne({}, {sort: {gestion: -1}})
		for(let value of dato ){
			usuario = Matriculas.findOne({$and:[
				{idUs:value.idUs},
				{id_gestion:gestion._id},
				{id_carrera:value.id_carrera}
			]});
		}

		if(usuario){
			return 'el usuario ya esta matriculado';
		}else{
			for(let value of dato ){
				Matriculas.insert(value);
			    Roles.addUsersToRoles(value.idUs,['estudiante'],'admin');
			}
		}
	},
	borrarMatricula: function(dato){
		Matriculas.remove({idUs:dato});
	},
	editarMatricula: function(dato){
		//Modulos.update({_id:dato.id_modulo},{$set:{nombreModulo:dato.nombreModulo}})
		Matriculas.update({idUs:dato.idUs},{$set:{id_gestion:dato.id_gestion,id_grupo:dato.id_grupo}},{multi: true});
	},
	mantenerCarreras: function(dato){
		//Modulos.update({id_gestion:'ym9XPBgbomg8RjSvF'},{$addToSet:{id_gestion:'jjajajajjaj'}});
		Carreras.update({id_gestion:dato.gestionElegida},{$addToSet:{id_gestion:dato.gestionActual}},{multi: true});
		Carreras.update({id_gestion:dato.gestionElegida},{$set:{limite:0}},{multi: true});
	}
});