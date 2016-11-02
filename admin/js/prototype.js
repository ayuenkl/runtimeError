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

		},

		loadWaitingModeration: function () {
			return [{
				time: '33 sec. ago',
				type: 'Q',
				content: 'Ruby Net; HTTP ensure get happens within a time'
			}, {
				time: '43 sec. ago',
				type: 'Q',
				content: 'What is the best approach to save realtime sensors data in JavaFX'
			}, {
				time: '1 min ago',
				type: 'Q',
				content: 'Get matched value from array in laravel'
			}, {
				time: '1 min ago',
				type: 'Q',
				content: 'Why duplicate my rows? sql'
			}, {
				time: '1 min ago',
				type: 'Q',
				content: 'what is the difference these statements in insertionSort?'
			}];
		}

	};
});