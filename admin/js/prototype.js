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

		loadUser: function (user, userType) {

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

				if (userType == 'Backend') {
					_user.type = 'Backend'
					_user.level = genLevel();
				} else if (userType == 'Active') {
					_user.type = genType();
					if (_user.type == 'Backend') {
						_user.level = genLevel();
					}
				}

			return _user;
		},

		setPrivileges: function () {
			return [{
				reputation: 1,
				privilege: '可發問問題或回答答案',
				numOfPeople: 49836
			}, {
				reputation: 15,
				privilege: '可給讚',
				numOfPeople: 44513
			}, {
				reputation: 15,
				privilege: '舉報問題發佈',
				numOfPeople: 44513
			}, {
				reputation: 50,
				privilege: '給別人的發佈評語',
				numOfPeople: 16585,
			}, {
				reputation: 125,
				privilege: '可給不讚',
				numOfPeople: 6923
			}, {
				reputation: 1500,
				privilege: '創建標籤',
				numOfPeople: 3652
			}, {
				reputation: 2000,
				privilege: '修改別人的問題與答案',
				numOfPeople: 688
			}, {
				reputation: 2500,
				privilege: '創建同義的標籤',
				numOfPeople: 382
			}, {
				reputation: 3000,
				privilege: '關閉已離題或重複了的發佈',
				numOfPeople: 176
			}, {
				reputation: 10000,
				privilege: '可使用網站的調節發佈工具',
				numOfPeople: 27
			}, {
				reputation: 15000,
				privilege: '設定受保護問題',
				numOfPeople: 23
			}, {
				reputation: 20000,
				privilege: '修改、刪除、恢復任何發佈',
				numOfPeople: 5
			}];
		}

	};
});