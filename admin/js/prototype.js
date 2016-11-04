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
		},

		loadModerationHistory: function () {
			return [{
				time: '16-08-01 05:09',
				type: 'Q',
				content: 'Binary Data in MySQL',
				handledBy: 'Anthony',
				action: 'passed'
			}, {
				time: '16-08-01 04:59',
				type: 'Q',
				content: 'Filling a DataSet or DataTable from a LINQ query result set',
				handledBy: 'Roy',
				action: 'edited'
			}, {
				time: '16-08-01 00:59',
				type: 'Q',
				content: 'Difference betwwen Math.Floor() and Math.Truncate()',
				handledBy: 'Anthony',
				action: 'deleted'
			}, {
				time: '16-08-01 00:42',
				type: 'Q',
				content: 'Determine a User\'s Timezone',
				handledBy: 'Anthony',
				action: 'passed'
			}, {
				time: '16-08-01 00:30',
				type: 'Q',
				content: 'How can relative time be calculated in C#?',
				handledBy: 'Roy',
				action: 'passed'
			}];
		},

		loadUser: function (user, backEndOnly) {

				function genType() {
					var t = Math.round(Math.random() + 1)
					switch (t) {
						case 1:
							return 'Normal';
							break;
						case 2:
							return 'Backend';
					}
				}

				function genLevel() {
					return Math.round(Math.random() * 2 + 1);
				}

				var _user = {};

				_user.userBox = {
					avatar: user.picture.thumbnail,
					username: user.login.username,
					reputation: prototypeFactory.getReputation(),
					numOfBadges: prototypeFactory.getNumOfBadges()
				};
				_user.name = {
					first: user.name.first,
					last: user.name.last					
				}

				if (backEndOnly) {
					_user.type = 'Backend'
					_user.level = genLevel();
				} else {
					_user.type = genType();
					if (_user.type == 'Backend') {
						_user.level = genLevel();
					}
				}

			return _user;
		}

	};
});