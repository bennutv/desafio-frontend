app.controller("SidebarController", function($rootScope, $scope) {

  var vm = $scope;
  vm.isClosed = true;

  $rootScope.$on("currenCategoryChanged", function(evt, args) {
    vm.currentCategory = args.currentCategory;
  });

  $rootScope.$on("openSidebar", function(evt, args) {
    vm.openSidebar();
  });

  $rootScope.$on("closeSidebar", function(evt, args) {
    vm.closeSidebar();
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

  vm.categoryClicked = function(aIndex) {
    console.log("fsadasd");
    vm.currentCategory = aIndex;

    $rootScope.$broadcast('currenCategoryChanged', {
      currentCategory: aIndex
    });

    vm.closeSidebar();

  }

  vm.closeSidebar = function() {
    vm.isClosed = true;

    $rootScope.$broadcast('sidebarToggle', {
      status: true
    });
  }

  vm.openSidebar = function() {
    vm.isClosed = false;

    $rootScope.$broadcast('sidebarToggle', {
      status: false
    });
  }

})
