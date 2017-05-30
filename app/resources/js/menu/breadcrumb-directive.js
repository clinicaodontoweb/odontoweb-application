app.directive('breadcrumb', ['$location', '$window', function ($location, $window) {
  return {
    restrict: 'E',
    templateUrl: 'partials/directives/breadcrumb.html',
    link: function(scope, element, attrs) {
		scope.paths = _.filter($location.path().split('/'), function(path){ return path != ''; });

		scope.back = function () {
	    	$window.history.back();
		};
    }
  };
}]);