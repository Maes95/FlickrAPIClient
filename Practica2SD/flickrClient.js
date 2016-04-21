// Funcion que recoge los valores de la búsqueda (Se activa en el botón "Filtrar" del menu)

$(function(){getPhotos();});

var filtros = {
  tags: undefined,
  text: undefined,
  min_taken_date: undefined,
  max_taken_date: undefined,
  min_upload_date: undefined,
  max_upload_date: undefined,
  format: "json"
};

var numImagenes = 0;

function getImages() {
  // Query type indica el tipo de busqueda (Fecha de captura, tamaño, titulo ...) para poder acceder al valor de su formulario
  var input = query_type + " :input";
  var value = $(input).val();
  // En funcion del tipo de consulta, rellenaremos o no ciertos campos
  switch (query_type) {

    // BUSQUEDA POR FECHA DE CAPTURA
    case '#fecha-captura-form':
      var inputs = $(query_type).find("input");
      filtros.min_taken_date = inputs[0].value;
      filtros.max_taken_date = inputs[1].value;
      console.log("min-taken-date " + filtros.min_taken_date);
      console.log("max-taken-date " + filtros.max_taken_date);
      break;

    // BUSQUEDA POR TAMAÑO
    /*case '#tamanyo-form':
      // En el caso del tamaño, tendremos que recoger 2 parámetros
      var inputs = $(query_type).find("input");
      var width  = inputs[0].value;
      var height = inputs[1].value;
      console.log("Anchura " + width);
      console.log("Altura " + height);
      break;*/

    // BUSQUEDA POR TITULO
    case '#titulo-form':
      filtros.text = value;
      console.log("Titulo " + filtros.text);
      break;

    // BUSQUEDA POR ETIQUETAS
    case '#etiquetas-form':
      filtros.tags = value;
      console.log("Etiquetas " + filtros.tags);
      break;

    // BUSQUEDA POR FECHA DE SUBIDA
    case '#fecha-subida-form':
      var inputs = $(query_type).find("input");
      filtros.min_upload_date = inputs[0].value;
      filtros.max_upload_date = inputs[1].value;
      console.log("min-upload-date " + filtros.min_upload_date);
      console.log("max-upload-date " + filtros.max_upload_date);
      break;

    default:
      console.error("ERROR: Búsqueda no valida");
  }

  // Borramos el resultado anterior
  $(".grid__item").remove();
  $("img").remove();

  // Cargamos nuestros filtros (los no usados toman el valor undefined)



  // Cargamos los filtros en la petición
  getPhotos(filtros);
  checkFilters();
}

function getImagesAndHideForm (){
  $(".form-control-wrapper.menu-form").hide(300);
  $("#boton-enviar").hide(300);
  getImages();
  $("input").each(function() {resetForm($(this));});
}

// Funcion que carga las fotos

function getPhotos(filtros) {
  console.log(filtros);
  numImagenes = 0;

  url = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=" + api_key + "&user_id=" + user_id + "&format=json&nojsoncallback=1";

  $.getJSON(url, filtros,
    function(data) {
      console.log(data);
      console.log(url);
      $.each(data.photos.photo, function(i, photo) {
        numImagenes++;

        var msg = photo.title.substr(0, 1).toUpperCase() + photo.title.substr(1);

        var url_img = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server + "/" + photo.id + "_" + photo.secret + "_h.jpg";

        var size = "800 x 800";

        var html = getHtml(url_img, size, msg);

        $(".grid").append(html);

      });
      // Una vez cargadas todas las fotos, se añaden animaciones
      // Funcion del archivo library/js/animations.js
      setAnimation();
    });
}

// Funcion para obtener el HTML que se inyectará

function getHtml(url_img, size, msg) {
  var html = '<div class="grid__item" data-size="';
  html += size;
  html += '">';
  html += '<a href="';
  html += url_img;
  html += '" class="img-wrap image"><img src="';
  html += url_img;
  html += '" alt="img04" />';
  html += '<div class="description description--grid">';
  html += msg;
  html += '</div>';
  html += '</a>';
  html += '</div>';
  return html;
}

function checkFilters() {

  if (filtros.min_taken_date === undefined && filtros.max_taken_date === undefined){
    $('#fechaCapturaTag').removeClass("display-inline-tag");
  }
  else {
    var s = getFormattedtDate("taken");
    $("#fechaCapturaTagText").text(s[0]  + " | " + s[1]);
    $('#fechaCapturaTag').addClass("display-inline-tag");
  }

  if (filtros.text === undefined){
    $('#tituloTag').removeClass("display-inline-tag");
  }
  else{
    $("#tituloTagText").text(filtros.text);
    $('#tituloTag').addClass("display-inline-tag");
  }

  if (filtros.tags === undefined){
    $('#etiquetasTag').removeClass("display-inline-tag");
  }
  else{
    $("#etiquetasTagText").text(filtros.tags);
    $('#etiquetasTag').addClass("display-inline-tag");
  }

  /*if (!filtro_favoritas)
    $('#favoritasTag').removeClass("display-inline-tag");
  else
    $('#favoritasTag').addClass("display-inline-tag");*/

  if (filtros.min_upload_date === undefined && filtros.max_upload_date === undefined){
    $('#fechaSubidaTag').removeClass("display-inline-tag");
  }
  else{
    var s = getFormattedtDate("upload");
    $("#fechaSubidaTagText").text(s[0] + " | " + s[1]);
    $('#fechaSubidaTag').addClass("display-inline-tag");
  }
}

function tagToFalse(tag){
  switch(tag){
    case 'filtro_fecha_captura':
      filtros.min_taken_date = undefined;
      filtros.max_taken_date = undefined;
      break;
    case 'filtro_titulo':
      filtros.text = undefined;
      break;
    case 'filtro_etiquetas':
      filtros.tags = undefined;
      break;
    /*case 'filtro_favoritas':


      break;*/
    case 'filtro_fecha_subida':
      filtros.min_upload_date = undefined;
      filtros.max_upload_date = undefined;
      break;
  }
  query_type = "none";
  getImages();
}

function resetForm (form){
  $(form).val("");
}

function getFormattedtDate(t){
  var s = [];
  switch(t){
    case "taken":
      if (filtros.min_taken_date === ""){
        s[0] = "Desde siempre";
      } else{
        s[0] = filtros.min_taken_date;
      }
      if (filtros.max_taken_date === ""){
        s[1] = "Hasta ahora";
      } else{
        s[1] = filtros.max_taken_date;
      }
      break;
    case "upload":
      if (filtros.min_upload_date === ""){
        s[0] = "Desde siempre";
      } else{
        s[0] = filtros.min_upload_date;
      }
      if (filtros.max_upload_date === ""){
        s[1] = "Hasta ahora";
      } else{
        s[1] = filtros.max_upload_date;
      }
      break;
  }
  return s;
}
