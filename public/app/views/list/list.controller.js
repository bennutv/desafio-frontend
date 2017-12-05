app.controller("ListController", function($scope, $http, $timeout) {

  var vm = $scope;

  vm.babiesToShow = [];
  vm.loading = false;

  vm.listInit = function() {

    $http({
			method: 'GET',
			url: "/api/list"
		})
    .then(function(response) {
      console.log(response);
      vm.babies = response.data.data;

      for (var i = 0; i < vm.babies.length; i++) {
        vm.babies[i].favorite = false;
      }

      vm.loadNextBabies();
    });

    $(window).scroll(function() {

      if ($(window).scrollTop() >= $("body").height() - $("#view-element").height()) {
        vm.loadNextBabies();
      }
    })

  }

  vm.loadNextBabies = function() {

    if (vm.babies.length == 0) {
      return
    }

    $timeout(function () {
      vm.loading = true;
      vm.$apply();
    }, 10);

    $timeout(function() {
      vm.loading = false;
      var count = 4;

      if (vm.babies.length < count) {
        count = vm.babies.length;
      }

      for (var i = 0; i < count; i++) {
        vm.babiesToShow.push(vm.babies[0]);
        vm.babies.splice(0, 1);
      }
      $(window).scrollTop($(window).scrollTop() - 10);
    }, 1500);

  }

  vm.favoriteCard = function(aCardIndex) {
    if (vm.babiesToShow[aCardIndex]) {
      vm.babiesToShow[aCardIndex].favorite = !vm.babiesToShow[aCardIndex].favorite;
    }
  }

})
