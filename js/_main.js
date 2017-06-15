      // var weather_data
$(document).ready(function() {
  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  var d = new Date();
  // $("li:nth-child(1)").text(weekday[d.getDay()]);
  $("ul").children().each(function(index) {
    $(this).append("<p>" + weekday[calc(d.getDay() + index)] + "</p>");
  });

  function calc(num) {
    if(num > 6) {
      num = num - 7
    }
    return num
  }

  $("#active").parent().children().on("click", function() {
    $(this).attr("id", "active")
    $(this).siblings("#active").attr("id", "")
    $(".subCon").children(".main").empty()
    $(".subCon").children(".main").append("<h4>" + $(this).children().first().text() + "</h4>")
  })


  setTimeout(set, 100)
  var temp = ""
  setTimeout(function() {
    temp = weather_data.forecast.forecastday[0].day.avgtemp_c + $(".small").text();
    console.log(temp)
    if ($(".big").text() != temp) {
      console.log("false")
      setTimeout(set, 100)

    }
  }, 200)
});

function set() {
  $(".placeName").text(weather_data.location.name)
  $('.big').empty()
  $(".big").append(weather_data.forecast.forecastday[0].day.avgtemp_c + "<b class=small>&#8451</b>")
  $('.subCon').children("ul").children('li').each(function(index) {
    $(this).append("<p>maximum: " + weather_data.forecast.forecastday[index].day.maxtemp_c + "<span class=subConSmall>&#8451</span></p>")
    $(this).append("<p>minimum: " + weather_data.forecast.forecastday[index].day.mintemp_c + "<span class=subConSmall>&#8451</span></p>")
    $(this).append("<p>humidity: " + weather_data.forecast.forecastday[index].day.avghumidity + "<span class=percentage>%</span></p>")
  });
}
