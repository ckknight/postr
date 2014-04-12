define(function () {
	function StartController($scope) {
		$scope.name = "You are home!";

		$scope.takePhoto = function () {
			// TODO: move DOM stuff
			$(".camera-upload").click();
		};

		$scope.previewPhotoUrl = null;
		$scope.onUpload = function (element) {
			var reader = new FileReader();
			reader.onload = function (e) {
				$scope.$apply(function () {
					$scope.previewPhotoUrl = e.target.result;
				});
			};
			reader.readAsDataURL(element.files[0]);
		};
	}

	return ['$scope', StartController];
});