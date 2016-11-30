angular.module('starter.controllers', ['ngCordovaOauth', 'ngStorage'])

.controller('ProfileCtrl', function ($scope,$state, $http, $localStorage, $location) {
	$scope.init = function () {
		if ($localStorage.hasOwnProperty("accessToken") === true) {
			$http.get("https://graph.facebook.com/v2.8/me", {
				params: {
					access_token: $localStorage.accessToken,
					fields: "name",
					format: "json"
				}
				
			}).then(function (result) {
				
				$scope.profileData = result.data;
				console.log(JSON.stringify(result.data));

			}, function (error) {
				alert("Unforchanetly we could not get your profile");
				console.log(error);
			});
		} else {
			alert("Not signed in");
			$location.path("/login");
		}
	};
	$scope.logout = function () {
		$localStorage.$reset();
		console.log($localStorage.accessToken);
		$state.go('login');
	};

})


.controller('LoginCtrl', function ($scope, $state, $cordovaOauth, $localStorage, $location) {

	$scope.LogIn = function () {
		$cordovaOauth.facebook("1764363167147020", ["email"]).then(function (result) {
			$localStorage.accessToken = result.access_token;
			console.log($localStorage.accessToken);
			$state.go('app.profile');
		}, function (error) {
			alert(error);
			console.log(error);
		});

	};

});