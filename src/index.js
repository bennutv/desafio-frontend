import 'font-awesome-webpack';
import 'bootstrap/dist/css/bootstrap.min.css';
import './main.scss';
import * as bennuList from './bennu.json';
import loader from './components/loader/loaderDirective';
import 'angular';

/**
 * Define app module
 */
angular.module('bennuApp', []);

/**
 * Main application controller
 */
const mainCtrl = ['$scope', '$http', '$timeout', ($scope, $http, $timeout) => {

  $scope.list = bennuList.data;
  $scope.limit = 4;
  $scope.limitIncrement = 2;
  $scope.isLoading = false;

  $scope.postsFilter = '';
  $scope.formVisible = false;

  /**
   * Load more posts based on limitIncrement variable
   */
  $scope.$on('getMorePosts', () => {
    if (!$scope.isLoading && $scope.limit < bennuList.data.length) {
      $scope.isLoading = true;
      $scope.$digest();
      $timeout(() => {
        $scope.limit += $scope.limitIncrement;
        $scope.isLoading = false;
      }, 1500);
    }
  });

  /**
   * Show or hide search form
   */
  $scope.toggleSearchForm = (ev) => {
    $scope.formVisible = !$scope.formVisible;
    if (!$scope.formVisible) {
      $scope.postsFilter = '';
    }
    ev.preventDefault();
  };

  /**
   * Whether to show or not a "post not found message"
   */
  $scope.postNotFound = () => {
    var postFound = false;
    var regex = new RegExp($scope.postsFilter, 'gi');
    for (var i = 0; i < $scope.limit; i++) {
      if (regex.test($scope.list[i].titulo)) {
        postFound = true;
        break;
      }
    }
    return !postFound;
  }

}];

/**
 * Document scroll actions
 */
const body = ['$document', '$window', ($document, $window) => {
  return {
    restrict: 'E',
    link: ($scope, element, attrs) => {
      const header = document.querySelector('.top-header');

      // Apply shadow on Header if user is scrolling down
      $document.on('scroll', () => {
        if (element[0].scrollTop > 0) {
          angular.element(header)
            .addClass('shadow');
        }
        else {
          angular.element(header)
            .removeClass('shadow');
        }
      })

      $document.on('mousewheel', (ev) => {
        // User is scrolling down and hasn't more content or
        // content height is smaller than screen
        if (ev.wheelDeltaY < 0 &&
          element[0].scrollHeight <= $window.innerHeight ||
          element[0].scrollHeight == $window.innerHeight + $window.pageYOffset) {
          $scope.$broadcast('getMorePosts');
        }
      })
    }
  }
  }];

/**
 * Moving menu according to anchor position
 */
const nav = ['$window', ($window) => {
  return {
    restrict: 'E',
    link: ($scope, element, attrs) => {

      const listWrap = document.querySelector('nav ul');
      const anchors = angular.element(document.querySelectorAll('nav ul a'));

      let lastMargin = 0;

      anchors.on('click', (ev) => {
        ev.preventDefault();
        if (angular.element(ev.target)
          .hasClass('active')) {
          return;
        }
        anchors.removeClass('active')
        angular.element(ev.target)
          .addClass('active');
        if (listWrap.scrollWidth > document.body.scrollWidth) {
          let index = ev.target.parentNode.getAttribute('data-index');
          if (index > 0) {
            let target = document.querySelector('nav li[data-index="' + (index - 1) + '"] a');
            let marginScroll = target.offsetLeft - 10;
            let lastValue = parseInt(window.getComputedStyle(listWrap, null)
              .getPropertyValue('margin-left'));
            listWrap.style.marginLeft = lastValue + (-1 * marginScroll) + 'px'
          }
        }
      });
    }
  }
}];

angular.module('bennuApp')
  // Define Main Controller
  .controller('MainCtrl', mainCtrl)
  // Define body directive
  .directive('body', body)
  // Define nav directive
  .directive('nav', nav)
  // Define loader directive
  .directive('loader', loader);