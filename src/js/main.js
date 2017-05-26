require("./lib/social"); //Do not delete

var chooseCounty = document.getElementById('select-county');
var chooseActivity = document.getElementById('select-activity');

// function to find minimum
Array.prototype.min = function() {
  return Math.min.apply(null, this);
};

// searchbar code
$("#searchbar").bind("input propertychange", function () {

  chooseCounty.selectedIndex = 0;
  chooseActivity.selectedIndex = 0;

  var filter = $(this).val().toLowerCase().replace(/ /g,'');
  var class_match = 0;
  var res_count = 0;

  $(".pot-element").filter(function() {

    var classes = this.className.split(" ");
    for (var i=0; i< classes.length; i++) {

      var current_class = classes[i].toLowerCase();
        if ( current_class.match(filter)) {
          class_match = class_match + 1;
        }
    }
    if (class_match > 0) {
      $(this).addClass("active");
      res_count += 1;
    } else {
      $(this).removeClass("active");
    }
    class_match = 0;

  });
  if (res_count > 0) {
    document.getElementById('noresults').classList.add("hide");
  } else {
    document.getElementById('noresults').classList.remove("hide");
  }

});

var county_flag = 1, activity_flag = 1, min_flag = 1;

function check_dropdowns() {

  document.getElementById('searchbar').value = "";
  var count = 0;

  $(".pot-element").filter(function() {
    var classes = this.className.toLowerCase();
    // check county
    if (chooseCounty.value != "california"){
      county_flag = (classes.indexOf(chooseCounty.value.toLowerCase())>0)
    } else {
      county_flag = 1;
    }
    // check county
    if (chooseActivity.value != "allactivities"){
      activity_flag = (classes.indexOf(chooseActivity.value.toLowerCase())>0)
    } else {
      activity_flag = 1;
    }

    // see if the restaurant satisfies all conditions set by user
    min_flag = [county_flag, activity_flag].min();

    // show it if yes
    if (min_flag == 1){
      $(this).addClass("active");
      count += 1;
    } else {
      $(this).removeClass("active");
    }

  });

  if (count > 0) {
    document.getElementById('noresults').classList.add("hide");
  } else {
    document.getElementById('noresults').classList.remove("hide");
  }
}

chooseCounty.addEventListener('change', function(d) {
  check_dropdowns();
});
chooseActivity.addEventListener('change', function(d) {
  check_dropdowns();
});
