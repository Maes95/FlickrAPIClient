$(function(){

  url_a= "https://www.flickr.com/people/141769805@N07/";
  url_b = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
  url_c = "https://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=907dea022b0dfc2ec993df236bc0fe6c&user_id=141769805%40N07&format=json&nojsoncallback=1";

  $.getJSON(url_c,
  {
    tags: "jquery",
    tagmode: "any",
    format: "json"
  },
  function(data) {
    $.each(data.photos.photo, function(i,photo){
      $("<img />").attr("src", "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_m.jpg").appendTo("#images");
    console.log("https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_m.jpg");
    });
  });
});

// { "photos": { "page": 1, "pages": 1, "perpage": 100, "total": 10,
//     "photo": [
//       { "id": "25800953334", "owner": "141769805@N07", "secret": "da3d15f70a", "server": "1470", "farm": 2, "title": "pio", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
//       { "id": "25803032903", "owner": "141769805@N07", "secret": "560b2ed4e5", "server": "1486", "farm": 2, "title": "perezoso", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
//       { "id": "26405790165", "owner": "141769805@N07", "secret": "a807ea2c6c", "server": "1595", "farm": 2, "title": "lince2", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
//       { "id": "26313454142", "owner": "141769805@N07", "secret": "a0982a49a5", "server": "1604", "farm": 2, "title": "lince", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
//       { "id": "26379881536", "owner": "141769805@N07", "secret": "88b1a93160", "server": "1689", "farm": 2, "title": "falsa", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
//       { "id": "25800953504", "owner": "141769805@N07", "secret": "3ccb4cc308", "server": "1553", "farm": 2, "title": "enoki", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
//       { "id": "26313454222", "owner": "141769805@N07", "secret": "5cc08c08c3", "server": "1445", "farm": 2, "title": "encina", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
//       { "id": "26313454232", "owner": "141769805@N07", "secret": "eefe0097bf", "server": "1462", "farm": 2, "title": "elefante", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
//       { "id": "25803032953", "owner": "141769805@N07", "secret": "6828484c78", "server": "1652", "farm": 2, "title": "aguila", "ispublic": 1, "isfriend": 0, "isfamily": 0 },
//       { "id": "25803033033", "owner": "141769805@N07", "secret": "f2137bf1c4", "server": "1463", "farm": 2, "title": 18, "ispublic": 1, "isfriend": 0, "isfamily": 0 }
//     ] }, "stat": "ok" }
