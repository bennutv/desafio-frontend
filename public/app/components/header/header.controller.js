app.controller("HeaderController", function($rootScope, $scope) {

  var vm = $scope;
  vm.sidebarClosed = true;
  vm.isSearchActive = false;

  $rootScope.$on("currenCategoryChanged", function(evt, args) {
    vm.currentCategory = args.currentCategory;
    console.log(args);
  });

  $rootScope.$on("sidebarToggle", function(evt, args) {
    vm.sidebarClosed = args.status;
  });

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

  vm.headerInit = function() {};

  vm.categoryClicked = function(aIndex) {
    var element = $("#category-" + aIndex);
    var pos = element.position();

    vm.currentCategory = aIndex;

    $rootScope.$broadcast('currenCategoryChanged', {
      currentCategory: aIndex
    });

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

  vm.toggleSearch = function() {

    if (vm.isSearchActive) {
      vm.isSearchActive = false;
    } else {
      vm.isSearchActive = true;
    }

    console.log(vm.isSearchActive);
  }

  vm.toggleSidebar = function() {

    if (vm.sidebarClosed) {
      vm.sidebarClosed = true;
      $rootScope.$broadcast('openSidebar', {});
    } else {
      vm.sidebarClosed = false;
      $rootScope.$broadcast('closeSidebar', {});
    }

    console.log(vm.sidebarClosed);
  }

  vm.searchChanged = function() {
    $rootScope.$broadcast('searchInput', {
      value: vm.search
    });
  }

})
