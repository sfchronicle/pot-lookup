require("./lib/social"); //Do not delete

var chooseCounty = document.getElementById('select-county');
var chooseActivity = document.getElementById('select-activity');

// // function to find minimum
// Array.prototype.min = function() {
//   return Math.min.apply(null, this);
// };

// searchbar code
// $("#searchbar").bind("input propertychange", function () {
//
//   chooseCounty.selectedIndex = 0;
//   chooseActivity.selectedIndex = 0;
//
//   var filter = $(this).val().toLowerCase().replace(/ /g,'');
//   var class_match = 0;
//   var res_count = 0;
//
//   $(".pot-element").filter(function() {
//
//     var classes = this.className.split(" ");
//     for (var i=0; i< classes.length; i++) {
//
//       var current_class = classes[i].toLowerCase();
//         if ( current_class.match(filter)) {
//           class_match = class_match + 1;
//         }
//     }
//     if (class_match > 0) {
//       $(this).addClass("active");
//       res_count += 1;
//     } else {
//       $(this).removeClass("active");
//     }
//     class_match = 0;
//
//   });
//   if (res_count > 0) {
//     document.getElementById('noresults').classList.add("hide");
//   } else {
//     document.getElementById('noresults').classList.remove("hide");
//   }
//
// });

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
        html_str += "<div class='med-disp'><i class='fa fa-check-square-o' aria-hidden='true'></i>There <span class='answer yes'>are</span> medical dispensaries open in your town.</div>";
      } else {
        html_str += "<div class='med-disp'><i class='fa fa-times' aria-hidden='true'></i>There are <span class='answer no'>no</span> medical dispensaries open in your town.</div>";
      }
    } else if (chooseActivity.value == "outdoors") {
      if (entry["REC-OG"] == 1){
        html_str += "<div class='rec-og'><i class='fa fa-check-square-o' aria-hidden='true'></i>You <span class='answer yes'>can</span> start a recreational pot garden outdoors.</div>";
      } else {
        html_str += "<div class='rec-og'><i class='fa fa-times' aria-hidden='true'></i>You can <span class='answer no'>not</span> start a recreational pot garden outdoors.</div>";
      }
    } else {
      if (entry["REC-DISP"] == 1){
        html_str += "<div class='rec-disp'><i class='fa fa-check-square-o' aria-hidden='true'></i>You <span class='answer yes'>will</span> have recreational stores to go to come Jan. 1, 2018.</div>";
      } else {
        html_str += "<div class='rec-disp'><i class='fa fa-times' aria-hidden='true'></i>You will <span class='answer no'>not</span> have recreational stores to go to come Jan. 1, 2018.</div>";
      }
    }
    document.getElementById("result").innerHTML = html_str;

  } else if (chooseCounty.value != "california") {
    console.log("changed the county");
    var results = potData.filter(function (entry) {
      return entry.County.replace(/ /g,'').toLowerCase().replace('(','').replace(')','') === chooseCounty.value;
    });
    var html_str = "";
    var entry = results[0];
    console.log(entry);
    if (entry["MED-DISP"] == 1){
      html_str += "<div class='med-disp'><i class='fa fa-check-square-o' aria-hidden='true'></i>There <span class='answer yes'>are</span> medical dispensaries open in your town.</div>";
    } else {
      html_str += "<div class='med-disp'><i class='fa fa-times' aria-hidden='true'></i>There are <span class='answer no'>no</span> medical dispensaries open in your town.</div>";
    }
    if (entry["REC-OG"] == 1){
      html_str += "<div class='rec-og'><i class='fa fa-check-square-o' aria-hidden='true'></i>You <span class='answer yes'>can</span> start a recreational pot garden outdoors.</div>";
    } else {
      html_str += "<div class='rec-og'><i class='fa fa-times' aria-hidden='true'></i>You can <span class='answer no'>not</span> start a recreational pot garden outdoors.</div>";
    }
    if (entry["REC-DISP"] == 1){
      html_str += "<div class='rec-disp'><i class='fa fa-check-square-o' aria-hidden='true'></i>You <span class='answer yes'>will</span> have recreational stores to go to come Jan. 1, 2018.</div>";
    } else {
      html_str += "<div class='rec-disp'><i class='fa fa-times' aria-hidden='true'></i>You will <span class='answer no'>not</span> have recreational stores to go to come Jan. 1, 2018.</div>";
    }
    html_str+= "<div class='update'>Last updated: "+entry['updated']+"</div>";
    document.getElementById("result").innerHTML = html_str;
  } else {
    console.log("changed the activity");
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
        html_str = "<div>There are medical dispensaries open in the following counties: ";
      } else if (chooseActivity.value == "outdoors") {
        html_str = "<div>You are allowed to start a recreational pot garden in the following counties: ";
      } else {
        html_str = "<div>There are recreational stores to go to come Jan. 1, 2018 in the following counties: ";
      }
      results.forEach(function(result) {
        html_str += result.County+ ", ";
      });
    }
    html_str += "</div>"
    document.getElementById("result").innerHTML = html_str;
  }

  //
  //
  //
  //
  // document.getElementById('searchbar').value = "";
  // var count = 0;
  //
  // $(".pot-element").filter(function() {
  //   var classes = this.className.toLowerCase();
  //   // check county
  //   if (chooseCounty.value != "california"){
  //     county_flag = (classes.indexOf(chooseCounty.value.toLowerCase())>0)
  //   } else {
  //     county_flag = 1;
  //   }
  //   // check county
  //   if (chooseActivity.value != "allactivities"){
  //     activity_flag = (classes.indexOf(chooseActivity.value.toLowerCase())>0)
  //   } else {
  //     activity_flag = 1;
  //   }
  //
  //   // see if the restaurant satisfies all conditions set by user
  //   min_flag = [county_flag, activity_flag].min();
  //
  //   // show it if yes
  //   if (min_flag == 1){
  //     $(this).addClass("active");
  //     count += 1;
  //   } else {
  //     $(this).removeClass("active");
  //   }
  //
  // });
  //
  // if (count > 0) {
  //   document.getElementById('noresults').classList.add("hide");
  // } else {
  //   document.getElementById('noresults').classList.remove("hide");
  // }
}

chooseCounty.addEventListener('change', function(d) {
  check_dropdowns();
});
chooseActivity.addEventListener('change', function(d) {
  check_dropdowns();
});
