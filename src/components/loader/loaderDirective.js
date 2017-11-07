/**
 * Loader directive
 */
const loader = [() => {
  return {
    restrict: 'EA',
    templateUrl: 'components/loader/loader.html',
    link: ($scope, element, attrs) => {}
  }
}];

export default loader;