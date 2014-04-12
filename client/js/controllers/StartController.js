define(function () {
	function StartController($scope, $http) {
		$scope.name = "You are home!";

		$scope.takePhoto = function () {
			// TODO: move DOM stuff
			$(".camera-upload").click();
		};

		function downsizeImage(src) {
			var img = document.createElement("img");
			img.src = src;
			var canvas = document.createElement('canvas');
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0);

			var MAX_WIDTH = 800;
			var MAX_HEIGHT = 600;
			var width = img.width;
			var height = img.height;

			if (width > height) {
				if (width > MAX_WIDTH) {
					height *= MAX_WIDTH / width;
					width = MAX_WIDTH;
				}
			} else {
				if (height > MAX_HEIGHT) {
					width *= MAX_HEIGHT / height;
					height = MAX_HEIGHT;
				}
			}
			canvas.width = Math.round(width);
			canvas.height = Math.round(height);
			var ctx = canvas.getContext("2d");
			ctx.drawImage(img, 0, 0, width, height);

			var JPEG_QUALITY = 0.8;
			return canvas.toDataURL("image/jpeg", JPEG_QUALITY);
		}

		$scope.previewPhotoUrl = null;
		$scope.onUpload = function (element) {
			var file = element.files[0]; // TODO: handle file == null
			// TODO: move DOM stuff to a directive
			var reader = new FileReader();
			reader.onload = function (e) {
				$scope.$apply(function () {
					$scope.previewPhotoUrl = e.target.result;
				});
				var downsizedPhotoUrl = downsizeImage(e.target.result);

				$http({
					url: "/api/upload-photo",
					method: "POST",
					data: $.param({
						image: downsizedPhotoUrl
					}),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
					}
				}).then(onUploadSuccess, onUploadFailure, onUploadProgress)["finally"](function () {
					$scope.uploadProgress = null;
				});
				/*
				$upload.upload({
					url: "/api/upload-photo",
					method: "POST",
					data: {},
					headers: {},
					file: file
				}).then(onUploadSuccess, onUploadFailure, onUploadProgress)["finally"](function () {
					$scope.uploadProgress = null;
				});
*/
			};
			reader.readAsDataURL(file);

			// TODO: move file upload to a provider, maybe
			$scope.uploadProgress = 0;
			$scope.uploadError = null;

			function onUploadSuccess(result) {
				$scope.event = result;
			}

			function onUploadFailure(reason) {
				$scope.uploadError = reason;
			}

			function onUploadProgress() {
				$scope.uploadProgress = event.loaded / event.total
			}
		};
	}

	return ['$scope', '$http', StartController];
});