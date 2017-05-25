require("./lib/social"); //Do not delete

// searchbar code
$("#searchbar").bind("input propertychange", function () {
  var filter = $(this).val().toLowerCase().replace(/ /g,'');
  var class_match = 0;

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
    } else {
      $(this).removeClass("active");
    }
    class_match = 0;

  });

});

var chooseCounty = document.getElementById('select-county');
chooseCounty.addEventListener('change', function(d) {
  console.log(chooseCounty.value)
  if (chooseCounty.value == "california") {
    $(".pot-element").filter(function() {
      $(this).addClass("active");
    });
  } else {
    $(".pot-element").filter(function() {
      var classes = this.className.toLowerCase();
      console.log(classes);
      if (classes.indexOf(chooseCounty.value.toLowerCase()) != -1) {
        $(this).addClass("active");
      } else {
        $(this).removeClass("active");
      }
    });
  }

});
