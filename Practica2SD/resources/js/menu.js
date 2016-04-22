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
            setTimeout(function() { reloadMap(); }, 500);
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
        default:
    }

}


function setHeader(){

var my_header = '<div id="row-menu" class="row">'
  +'<div id="fila-menu" class="col-md-6">'
    +'<ul class="ca-menu col-md-12">'
      +'<div class="col-md-2 col-menu-button">'
        +'<a id="fecha-captura-button" onmousedown="menuFunc(this)">'
          +'<li class="menu-item">'
            +'<span class="ca-icon"><i class="fa fa-camera fa-2x option-button"></i></span>'
            +'<div class="ca-content">'
              +'<h2 class="ca-main">Fecha Captura</h2>'
            +'</div>'
        +'  </li>'
        +'</a>'
      +'</div>'

      +'<div class="col-md-2 col-menu-button">'
        +'<a id="tamanyo-button" onmousedown="menuFunc(this)">'
          +'<li class="menu-item">'
            +'<span class="ca-icon"><i class="fa fa-arrows-alt fa-2x option-button"></i></span>'
            +'<div class="ca-content">'
              +'<h2 class="ca-main">Tamaño</h2>'
            +'</div>'
          +'</li>'
        +'</a>'
      +'</div>'

      +'<div class="col-md-2 col-menu-button">'
        +'<a id="titulo-button" onmousedown="menuFunc(this)">'
          +'<li class="menu-item">'
            +'<span class="ca-icon"><i class="fa fa-font fa-2x option-button"></i></span>'
            +'<div class="ca-content">'
              +'<h2 class="ca-main">Título</h2>'
            +'</div>'
          +'</li>'
        +'</a>'
      +'</div>'

      +'<div class="col-md-2 col-menu-button">'
        +'<a id="etiquetas-button" onmousedown="menuFunc(this)">'
          +'<li class="menu-item">'
            +'<span class="ca-icon"><i class="fa fa-tags fa-2x option-button"></i></span>'
            +'<div class="ca-content">'
              +'<h2 class="ca-main">Etiquetas</h2>'
            +'</div>'
          +'</li>'
        +'</a>'
      +'</div>'

      +'<div class="col-md-2 col-menu-button">'
        +'<a href="#">'
          +'<li class="menu-item">'
            +'<span class="ca-icon"><i class="fa fa-star fa-2x option-button"></i></span>'
            +'<div class="ca-content">'
              +'<h2 class="ca-main">Favoritas</h2>'
            +'</div>'
          +'</li>'
        +'</a>'
      +'</div>'

      +'<div class="col-md-2 col-menu-button">'
        +'<a id="fecha-subida-button" onmousedown="menuFunc(this)">'
          +'<li class="menu-item">'
            +'<span class="ca-icon"><i class="fa fa-cloud-upload fa-2x option-button"></i></span>'
            +'<div class="ca-content">'
              +'<h2 class="ca-main">Fecha Subida</h2>'
            +'</div>'
          +'</li>'
        +'</a>'
      +'</div>'
    +'</ul>'
  +'</div>'

  +'<div class="col-md-6 col-xs-12 vertical-center search-fields">'

    +'<div id="fecha-captura-form" class="form-control-wrapper menu-form">'
      +'<div class="form-group">'
        +'<div class="col-md-6">'
          +'<input data-dtp="dtp_u3Hqo" id="date-captura" class="form-control date-picker-input" type="text">'
          +'<label for="date-captura" class="control-label">Fecha mínima de captura</label><span class="material-input"></span>'
        +'</div>'
        +'<div class="col-md-6">'
          +'<input data-dtp="dtp_u3Hqo" id="date-captura" class="form-control date-picker-input" type="text">'
          +'<label for="date-captura" class="control-label">Fecha máxima de captura</label><span class="material-input"></span>'
        +'</div>'
      +'</div>'
    +'</div>'

    +'<div id="tamanyo-form" class="form-control-wrapper menu-form">'
      +'<div class="form-group">'
        +'<div class="col-md-6">'
          +'<input type="number" class="form-control" id="photo-width" placeholder="px">'
          +'<label for="photo-width">Anchura</label>'
        +'</div>'
        +'<div class="col-md-6">'
          +'<input type="number" class="form-control" id="photo-height" placeholder="px">'
          +'<label for="photo-height">Altura</label>'
        +'</div>'
      +'</div>'
    +'</div>'

    +'<div id="titulo-form" class="form-control-wrapper menu-form">'
      +'<div class="form-group">'
        +'<input type="text" class="form-control" id="titulo-text" placeholder="">'
        +'<label for="titulo-text">Palabras en el título</label>'
      +'</div>'
    +'</div>'

    +'<div id="etiquetas-form" class="form-control-wrapper menu-form">'
      +'<div class="form-group">'
        +'<input type="text" class="form-control" id="etiquetas-text" placeholder="">'
        +'<label for="etiquetas-text">Etiquetas (separar por comas)</label>'
      +'</div>'
    +'</div>'

    +'<div id="fecha-subida-form" class="form-control-wrapper menu-form">'
      +'<div class="form-group">'
        +'<div class="col-md-6">'
          +'<input data-dtp="dtp_u3Hqo" id="date-subida" class="form-control date-picker-input" type="text">'
          +'<label for="date-subida" class="control-label">Fecha mínima de subida</label><span class="material-input"></span>'
        +'</div>'
        +'<div class="col-md-6">'
          +'<input data-dtp="dtp_u3Hqo" id="date-subida" class="form-control date-picker-input" type="text">'
          +'<label for="date-subida" class="control-label">Fecha máxima de subida</label><span class="material-input"></span>'
        +'</div>'
      +'</div>'
    +'</div>'
    +'<button id="boton-enviar" onClick="getImages()" class="btn btn-info">Enviar</button>'
  +'</div>'
+'</div>';

	$("header").append(my_header);
}
