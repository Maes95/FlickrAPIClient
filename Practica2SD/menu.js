(function() {
    //setHeader();
    $('.date-picker-input').bootstrapMaterialDatePicker({
      weekStart: 0,
      time: false
    });
    $('.menu-form').keypress(function(e) {
      if (e.which == 13) {
        getImages();
      }
    });
})();

var query_type = "none";

function menuFunc(e) {

		$('#boton-enviar').removeClass('menos-altura');
		$('#boton-enviar').show(300);
    $('.menu-form').hide(300);
    $('#map').hide(300);
    switch (e.id) {
        case 'fecha-captura-button':
            query_type = '#fecha-captura-form';
            $('#fecha-captura-form').show(300);
            break;
        case 'localizacion-button':
            query_type = '#localizacion-form';
            $('#map').show(300);
            console.log("animacion");
            setTimeout(function() { reloadMap(); }, 610);
						$('#boton-enviar').addClass('menos-altura');
            break;
        case 'titulo-button':
            query_type = '#titulo-form';
            $('#titulo-form').show(300);
            break;
				case 'etiquetas-button':
            query_type = '#etiquetas-form';
            $('#etiquetas-form').show(300);
            break;
        case 'fecha-subida-button':
            query_type = '#fecha-subida-form';
            $('#fecha-subida-form').show(300);
            break;
        case 'views-button':
            query_type = '#views-form';
            $('#views-form').show(300);
            break;
        default:
    }

}
