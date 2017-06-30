require("./lib/social"); //Do not delete

var chooseCounty = document.getElementById('select-county');
var chooseActivity = document.getElementById('select-activity');

var county_flag = 1, activity_flag = 1, min_flag = 1;

function check_dropdowns() {

  // we are picking a city
  if (chooseCounty.value != "california") {
    var results = potData.filter(function (entry) {
      return entry.County.replace(/ /g,'').toLowerCase().replace('(','').replace(')','') === chooseCounty.value;
    });
    var html_str = "";
    var entry = results[0];
    if (entry["MED-DISP"] == 1){
      html_str += "<div class='med-disp'>There <span class='answer yes'>are</span> medical dispensaries open in your town.</div>";
    } else {
      html_str += "<div class='med-disp'>There are <span class='answer no'>no</span> medical dispensaries open in your town.</div>";
    }
    if (entry["REC-OG"] == 1){
      html_str += "<div class='rec-og'>You <span class='answer yes'>can</span> start a recreational pot garden outdoors.</div>";
    } else {
      html_str += "<div class='rec-og'>You can <span class='answer no'>not</span> start a recreational pot garden outdoors.</div>";
    }
    if (entry["REC-DISP"] == 1){
      html_str += "<div class='rec-disp'>You <span class='answer yes'>will</span> have recreational stores to go to come Jan. 1, 2018.</div>";
    } else {
      html_str += "<div class='rec-disp'>You will <span class='answer no'>not</span> have recreational stores to go to come Jan. 1, 2018.</div>";
    }
    html_str += "<div class='update'>Last updated: "+entry["updated"]+"</div>"
    document.getElementById("result").innerHTML = html_str;

  // we are picking an activity
  } else if (chooseActivity.value != "allactivities") {
    var html_str = "";
    if (chooseActivity.value == "medical") {
      results = potData.filter(function (entry) {
        return entry["MED-DISP"] === 1;
      });
    } else if (chooseActivity.value == "outdoors") {
      var results = potData.filter(function (entry) {
        return entry["REC-OG"] === 1;
      });
    } else if (chooseActivity.value == "recreational") {
      var results = potData.filter(function (entry) {
        return entry["REC-DISP"] === 1;
      });
    }
    if (results.length == 0) {
      if (chooseActivity.value == "medical") {
        html_str = "<div>There are no medical dispensaries open in any towns in California.</div>";
      } else if (chooseActivity.value == "outdoors") {
        html_str = "<div>You are not allowed to start a recreational pot garden anywhere outdoors in California.</div>";
      } else {
        html_str = "<div>There are no licensed recreational stores to go to come Jan. 1, 2018 in the Bay Area.</div>";
      }
    } else {
      if (chooseActivity.value == "medical") {
        html_str = "<div><div class='list-hed'>There are medical dispensaries open in the following cities and counties:</div>";
      } else if (chooseActivity.value == "outdoors") {
        html_str = "<div><div class='list-hed'>You are allowed to start a recreational pot garden in the following cities and counties:</div>";
      } else {
        html_str = "<div><div class='list-hed'>There are licensed recreational stores in the following cities and counties:</div>";
      }
      if (results.length > 1){
        results.forEach(function(result,rIDX) {
          if (rIDX == results.length-1) {
            html_str += "and <span class='county-result'>"+result.County+ "</span>.";
          } else {
            html_str += "<span class='county-result'>"+result.County+ "</span>, ";
          }
        });
      } else {
        html_str += "<span class='county-result'>"+results[0].County+ "</span>.";
      }
    }
    html_str += "</div>"
    document.getElementById("result").innerHTML = html_str;
  } else {
    document.getElementById("result").innerHTML = "";
  }
}

chooseCounty.addEventListener('change', function(d) {
  chooseActivity.value = "allactivities";
  check_dropdowns();
  pymChild.sendHeight();
});
chooseActivity.addEventListener('change', function(d) {
  chooseCounty.value = "california";
  check_dropdowns();
  pymChild.sendHeight();
});

var activeBox = 0;
var showButton = document.getElementById("showall");
var hideButton = document.getElementById("hideall");
showButton.addEventListener("click",function(d) {
  if (activeBox == 0){
    document.getElementById("biglist").classList.remove("hide");
    activeBox = 1;
    hideButton.classList.remove("hide");
    showButton.classList.add("hide");
  } else {
    document.getElementById("biglist").classList.add("hide");
    activeBox = 0;
    hideButton.classList.add("hide");
    showButton.classList.remove("hide");
  }
  pymChild.sendHeight();
});
hideButton.addEventListener("click",function(d) {
  if (activeBox == 0){
    document.getElementById("biglist").classList.remove("hide");
    activeBox = 1;
    hideButton.classList.remove("hide");
    showButton.classList.add("hide");
  } else {
    document.getElementById("biglist").classList.add("hide");
    activeBox = 0;
    hideButton.classList.add("hide");
    showButton.classList.remove("hide");
  }
  pymChild.sendHeight();
});

document.getElementById("clearcity").addEventListener("click",function(d) {
  chooseCounty.value = "california";
  check_dropdowns();
  pymChild.sendHeight();
});

document.getElementById("clearactivity").addEventListener("click",function(d) {
  chooseActivity.value = "allactivities";
  check_dropdowns();
  pymChild.sendHeight();
});
