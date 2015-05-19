function doClick(e) {

	getBooking($.booking.value, function(items){
		Ti.API.info(items);
		var data = [i];
		for (var i=0;i<items.length;i++) {
			    data.push({
					descripcion: items.item(i).getElementsByTagName("descripcion").item(0).textContent,
					estado_requerido: items.item(i).getElementsByTagName("estado_requerido").item(0).textContent,
					estado_tramitado: items.item(i).getElementsByTagName("estado_tramitado").item(0).textContent
			});
		}
			
			var a = Ti.UI.createAlertDialog();
	 		a.message=JSON.stringify(data[i].descripcion);
	 		a.title='Información';
	 		a.show();
	 		
	 		
	});
}

function getBooking(busqueda, callback){
	var xhr = Titanium.Network.createHTTPClient();
	var data = [];
	// Si el servicio web no responde en 10 segundos nos dará error de Timeout.
	xhr.setTimeout(10000);
	var url =  "http://svtiweb.svti.cl:7001/wsmovil/sve_ws_cexpo.asmx/wsm_consulta_reserva?res_numero="+busqueda;
	// Hacemos el GET al servicio web.
	xhr.open("GET",url);
 
	xhr.onload = function() {
		//Los datos se devuelve, inicia analisis
		var doc = this.responseXML.documentElement;
		//Comienza a recorrer el arreglo
		var items = doc.getElementsByTagName("Item_consulta_reserva");
		callback(items);
		
	};
	//Gestiona en caso de error
	xhr.onerror = function(e){
		var a = Ti.UI.createAlertDialog();
	 	a.message='Error en conexión';
	 	a.title='Atencion';
	 	a.show();
	 	callback('-1');
	};
	
	xhr.send();
}

$.index.open();
