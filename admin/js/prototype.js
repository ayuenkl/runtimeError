app.factory('adminPrototype', function ($rootScope, $http, $state, prototypeFactory) {

	return {

		doLogin: function () {
			$rootScope.isLoading = true;
			$http.get('https://randomuser.me/api')
			.then(function (response) {
				$rootScope.user = prototypeFactory.loadUser(response.data.results[0]);
				$rootScope.isLoggedIn = true;
				$rootScope.isLoading = false;
				$state.go('main.home');
			});

		}
	};
});