var temp = ""
var weather_data
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
    $(this).append("<p> " + weekday[calc(d.getDay() + index)] + "</p>");
    $(this).val(calc(index))
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
    $(".subCon").children(".main").append("<h2>" + $(this).children().first().text() + "</h2>")
    $(".subCon").children('.main').append(data($(this).val()))
    prognose()
  })


  setTimeout(set, 100)

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
  $(".subCon").children(".main").append("<h2>" + $("#active").children().first().text() + "</h2>")
  $(".subCon").children('.main').append(data($(".subCon").children("ul").children().first().val()))
  prognose()
}

function data(day) {
  console.log(day)
  var humidity = "<li class=humidity> average humidity: " + weather_data.forecast.forecastday[day].day.avghumidity + "%</li>"

  var temperature = "<li class=temperature> <ul>"
  temperature += "<li>lowest temperature: " + weather_data.forecast.forecastday[day].day.mintemp_c + "<span class=subConSmall>&#8451</span></li>"
  temperature += "<li>maximum temperature: " + weather_data.forecast.forecastday[day].day.avgtemp_c + "<span class=subConSmall>&#8451</span></li>"
  temperature += "<li>minimum temperature: " + weather_data.forecast.forecastday[day].day.maxtemp_c + "<span class=subConSmall>&#8451</span></li>"
  temperature += "</ul></li>"

  var condition = "<div><img src="+ weather_data.forecast.forecastday[day].day.condition.icon +">"
  condition += "<br>" + weather_data.forecast.forecastday[day].day.condition.text + "</div>"

  var prognose = "<div class=prognoseContainer><div id=tempprognose></div>"
  prognose += "<div id=feelslikeprognose></div>"
  prognose += "<div id=humidPrognose></div></div>"

  var temp = "<ul>"
  temp += humidity
  temp += temperature
  temp += condition
  temp += prognose
  temp += "</ul>"

  return temp
}

function prognose() {
  var day = $('#active').val()
  console.log(day)
  var hourPrognose = []
  for (var i = 0; i < weather_data.forecast.forecastday[day].hour.length; i++) {
    var temporary = []
    temporary.push(weather_data.forecast.forecastday[day].hour[i].temp_c)
    temporary.push(weather_data.forecast.forecastday[day].hour[i].feelslike_c)
    temporary.push(weather_data.forecast.forecastday[day].hour[i].humidity)

    hourPrognose.push(temporary)
  }
  var hTemp = []
  var feelTemp = []
  var hourHumid = []
  var t = []
  var k = []
  var z = []
  var g = []
  for (var i = 0; i < hourPrognose.length; i++) {
    hTemp.push(hourPrognose[i][0])
  }

  for (var i = 0; i < hourPrognose.length; i++) {
    feelTemp.push(hourPrognose[i][1])
  }

  for (var i = 0; i < hourPrognose.length; i++) {
    hourHumid.push(hourPrognose[i][2])
  }
  for (var i = 0; i < hourPrognose.length; i++) {
    t.push(i)
  }
  for (var i = 0; i < hourPrognose.length; i++) {
    var y = {"time": t[i],"temperature": hTemp[i]}
    k.push(y)
  }
  for (var i = 0; i < hourPrognose.length; i++) {
    var y = {"time": t[i],"feels like": feelTemp[i]}
    z.push(y)
  }
  for (var i = 0; i < hourPrognose.length; i++) {
    var y = {"time": t[i],"humidity": hourHumid[i]}
    g.push(y)
  }

  MG.data_graphic({
    title: "hour prognose",
    data: k,
    target: "#tempprognose",
    x_accessor: "time",
    y_accessor: "temperature"
  });

  MG.data_graphic({
    title: "feels like prognose",
    data: z,
    target: "#feelslikeprognose",
    x_accessor: "time",
    y_accessor: "feels like"
  });

  MG.data_graphic({
    title: "humidity prognose",
    data: g,
    target: "#humidPrognose",
    x_accessor: "time",
    y_accessor: "humidity"
  });
}
