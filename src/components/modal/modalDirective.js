/**
 * Modal directive
 */
const modal = [() => {
  return {
    restrict: 'EA',
    templateUrl: 'components/modal/modal.html',
    replace: true
  }
}];

export default modal;