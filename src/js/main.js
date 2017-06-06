require("./lib/social"); //Do not delete

var chooseCounty = document.getElementById('select-county');
var chooseActivity = document.getElementById('select-activity');

var county_flag = 1, activity_flag = 1, min_flag = 1;

function check_dropdowns() {

  if ((chooseCounty.value != "california") && (chooseActivity.value != "allactivities")) {
    console.log("changed both");
    var results = potData.filter(function (entry) {
      return entry.County.replace(/ /g,'').toLowerCase().replace('(','').replace(')','') === chooseCounty.value;
    });
    var html_str = "";
    var entry = results[0];
    if (chooseActivity.value == "medical") {
      if (entry["MED-DISP"] == 1){
        html_str += "<div class='med-disp'>There <span class='answer yes'>are</span> medical dispensaries open in your town.</div>";
      } else {
        html_str += "<div class='med-disp'>There are <span class='answer no'>no</span> medical dispensaries open in your town.</div>";
      }
    } else if (chooseActivity.value == "outdoors") {
      if (entry["REC-OG"] == 1){
        html_str += "<div class='rec-og'>You <span class='answer yes'>can</span> start a recreational pot garden outdoors.</div>";
      } else {
        html_str += "<div class='rec-og'>You can <span class='answer no'>not</span> start a recreational pot garden outdoors.</div>";
      }
    } else {
      if (entry["REC-DISP"] == 1){
        html_str += "<div class='rec-disp'>You <span class='answer yes'>will</span> have recreational stores to go to come Jan. 1, 2018.</div>";
      } else {
        html_str += "<div class='rec-disp'>You will <span class='answer no'>not</span> have recreational stores to go to come Jan. 1, 2018.</div>";
      }
    }
    console.log(html_str);
    document.getElementById("result").innerHTML = html_str;console.log(html_str);
  } else if (chooseCounty.value != "california") {
    console.log("changed the county");
    var results = potData.filter(function (entry) {
      return entry.County.replace(/ /g,'').toLowerCase().replace('(','').replace(')','') === chooseCounty.value;
    });
    var html_str = "";
    var entry = results[0];
    console.log(entry);
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
    console.log(html_str);
    document.getElementById("result").innerHTML = html_str;
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
        html_str = "<div>There are no recreational stores to go to come Jan. 1, 2018 in California.</div>";
      }
    } else {
      if (chooseActivity.value == "medical") {
        html_str = "<div><div>There are medical dispensaries open in the following counties:</div>";
      } else if (chooseActivity.value == "outdoors") {
        html_str = "<div><div>You are allowed to start a recreational pot garden in the following counties:</div>";
      } else {
        html_str = "<div><div>There are recreational stores to go to come Jan. 1, 2018 in the following counties:</div>";
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
  check_dropdowns();
});
chooseActivity.addEventListener('change', function(d) {
  check_dropdowns();
});
