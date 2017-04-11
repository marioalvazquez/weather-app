$(document).ready(function(){
  $(".date").text(new Date().toDateString())
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(function(position){
      var crds = position.coords;
      var lat = crds.latitude;
      var lon = crds.longitude;
      console.log("lat: " + lat + "\n lon: " + lon);
      $.ajax({
        url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=AIzaSyCraklwPHfcXSXbAobA4j5wjC-UGlWVaiU`
      }).done(function(data){
        console.log(data);
        $(".city").text(data.results[0]['formatted_address'])
      }).fail(function(data){
        console.log(data);
      });

      //Weather
      $.ajax({
        url: `https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=28201f8518be8384a0fbf65ed0d28a68`
      }).done(function(data){
        console.log(data);
        var temp = data.main.temp;
        temp = temp - 273.15;
        let iCode = data.weather[0]['id'];
        var icon = `owf-${iCode}-d`;
        var hour = new Date();
        if (hour.getHours() >= 19) {
          icon = `owf-${iCode}-n`;
        }

        $(".temp-icon i").addClass(icon);
        $(".temp").text(`${temp}`);
        $(".temp-text").text(data.weather[0]['description']);
        console.log(temp);
      }).fail(function(data){
        console.log("Weather", data);
      })
    });
  }
  else{
    alert("Enable geolocation services to continue");
  }
});

function toFarenheit(num) {
  return num * 9 / 5 + 32;
}

function toCelcius(num) {
  return ((num - 32) * 5)/9;
}

$('#converter').on('click', () => {
  var temp = parseInt($('.temp').text());
  console.log(temp);
  if($('#converter').is(':checked'))
  {
    $('.temp-scale').text("F");
    $('.temp').text(toFarenheit(temp));
  }
  else{
    $('.temp-scale').text("C");
    $('.temp').text(toCelcius(temp));
  }
});
