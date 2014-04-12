define(function () {
	function EventController($scope, $http) {
		$scope.generateIcalendarEvent = function () {
			var event = $scope.event;

			window.location = "/api/generate-ical.ics?" + $.param(JSON.parse(JSON.stringify(event)));
		}
	}

	return ['$scope', '$http', EventController];
});