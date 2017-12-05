app.controller("HeaderController", function($scope) {

  var vm = $scope;

  vm.categories = [
    {
      name: "INÍCIO"
    },
    {
      name: "GRÁVIDAS"
    },
    {
      name: "PEDIATRIA"
    },
    {
      name: "ALIMENTAÇÃO"
    },
    {
      name: "GRÁVIDAS"
    },
    {
      name: "PEDIATRIA"
    },
    {
      name: "ALIMENTAÇÃO"
    }
  ];

  vm.currentCategory = 0;

  vm.headerInit = function() {}

  vm.categoryClicked = function(aIndex) {
    var element = $("#category-" + aIndex);
    var pos = element.position();
    
    vm.currentCategory = aIndex;

    if ($(window).width() < (pos.left + (element.width() * 1.5))) {
      $(".subheader").animate({
        scrollLeft: $(".subheader").scrollLeft() + element.width() + 10
      });

      return;
    }

    if (pos.left < 0) {
      $(".subheader").animate({
        scrollLeft: $(".subheader").scrollLeft() - element.width() - 10
      });

      return;
    }

  }

})
