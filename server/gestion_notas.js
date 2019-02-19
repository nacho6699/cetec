Meteor.publish('publi_notas', function(){
	return Notas.find();
});

Meteor.methods({
	registrarNotas: function(dato){
		for(let value of dato){
			//verificando si el usuario ya existe
			var ver=Notas.findOne({$and:[{idUs:value.idUs},{id_modulo:value.id_modulo},{id_gestion:value.id_gestion}]});
			if(ver){
				Notas.update({idUs:value.idUs,id_modulo:value.id_modulo,id_gestion:value.id_gestion},{$set:{
					primerP:value.primerP,
					segundoP:value.segundoP,
					promP:value.promP,
					asistencia:value.asistencia,
					evaluacionC:value.evaluacionC,
					examenF_e:value.examenF_e,
					examenF_p:value.examenF_p,
					total:value.total,
					segundaInstancia:value.segundaInstancia,
					aprobado:value.aprobado
				}});
			}else {
				Notas.insert(value);
			}
			
		}
	}
});