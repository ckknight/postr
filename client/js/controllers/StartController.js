define(function () {
	function StartController($scope, $upload) {
		$scope.name = "You are home!";

		$scope.takePhoto = function () {
			// TODO: move DOM stuff
			$(".camera-upload").click();
		};

		$scope.previewPhotoUrl = null;
		$scope.onUpload = function (element) {
			var file = element.files[0]; // TODO: handle file == null
			// TODO: move DOM stuff to a directive
			var reader = new FileReader();
			reader.onload = function (e) {
				$scope.$apply(function () {
					$scope.previewPhotoUrl = e.target.result;
				});
			};
			reader.readAsDataURL(file);

			// TODO: move file upload to a provider, maybe
			$scope.uploadProgress = 0;
			$scope.uploadResult = null;
			$scope.uploadError = null;

			function onUploadSuccess(result) {
				$scope.uploadResult = result;
			}

			function onUploadFailure(reason) {
				$scope.uploadError = reason;
			}

			function onUploadProgress() {
				$scope.uploadProgress = event.loaded / event.total
			}
			$upload.upload({
				url: "/api/upload-photo",
				method: "POST",
				data: {},
				headers: {},
				file: file
			}).then(onUploadSuccess, onUploadFailure, onUploadProgress)["finally"](function () {
				$scope.uploadProgress = null;
			});
		};
	}

	return ['$scope', '$upload', StartController];
});