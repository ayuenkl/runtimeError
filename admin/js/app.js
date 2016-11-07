var app = angular.module('HackgaAdmin', ['ngAnimate', 'ngTouch', 'ui.router', 'ui.bootstrap', 'uiSwitch']);

app.config(function ($stateProvider, $urlRouterProvider) {

	var sp = $stateProvider;

	sp.state({
		name: 'login',
		url: '/login',
		templateUrl: './templates/login.html',
		controller: function (adminPrototype) {
			var ctrl = this;

			ctrl.doLogin = function () {
				adminPrototype.doLogin();
			}
		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name: 'main',
		url: '/main',
		abstract: true,
		templateUrl: './templates/main.html',
		controller: function ($rootScope, $state) {
			var ctrl = this;
			if (!$rootScope.isLoggedIn) {
				$state.go('login');
			}
			ctrl.menuItems = [{
				menu: 'Home',
				menuId: 'home',
				state: 'main.home'
			}, {
				menu: 'Moderation',
				menuId: 'moderation',
				state: 'main.moderation.waiting'
			}, {
				menu: 'Users',
				menuId: 'users',
				state: 'main.users.list'
			}];
		},
		controllerAs: 'ctrl'
	})

	sp.state({
		name: 'main.home',
		url: '/home',
		templateUrl: './templates/home.html',
	});

	sp.state({
		name: 'main.moderation',
		abstract: true,
		url: '/moderation',
		templateUrl: './templates/moderation.html'
	});

	sp.state({
		name: 'main.moderation.waiting',
		url: '/waiting',
		templateUrl: './templates/waitingModeration.html',
		controller: function (adminPrototype) {
			var ctrl = this;
			ctrl.records = adminPrototype.loadWaitingModeration();
		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name: 'main.moderation.history',
		url: '/history',
		templateUrl: './templates/moderationHistory.html',
		controller: function (adminPrototype) {

			var ctrl = this;

			ctrl.history = adminPrototype.loadModerationHistory();

			ctrl.dateFrom = new Date();
			ctrl.dateTo = new Date();

			ctrl.popup1 = {
				opened: false
			};

			ctrl.popup2 = {
				opened: false
			};

			ctrl.open1 = function () {
				ctrl.popup1.opened = true;
			};

			ctrl.open2 = function () {
				ctrl.popup2.opened = true;
			};
		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name: 'main.users',
		url: '/users',
		abstract: true,
		template: '<ui-view></ui-view>'
	});

	sp.state({
		name: 'main.users.list',
		url: '/list',
		templateUrl: './templates/usersList.html',
		controller: function ($scope, $http, adminPrototype, $rootScope, $state) {

			var ctrl = this;

			ctrl.loadUsers = function (backEndOnly) {
				$rootScope.isLoading = true;
				ctrl.users = [];
				$http.get('https://api.randomuser.me/?results=6')
				.then(function (response) {
					for (var i = 0; i < response.data.results.length; i++) {
						ctrl.users.push(adminPrototype.loadUser(response.data.results[i], backEndOnly));
					}
				})
				.finally(function () {
					$rootScope.isLoading = false;
				});
			};

			$scope.$watch('ctrl.listOption', function (newValue, oldValue) {
				if (newValue == 'Backend') {
					ctrl.loadUsers(true);
				} else {
					ctrl.loadUsers(false);
				}
			});

			ctrl.findUsers = function () {
				if (ctrl.listOption == 'Backend') {
					ctrl.loadUsers(true);
				} else {
					ctrl.loadUsers(false);
				}
			};

			ctrl.userDetails = function (uid, userType, userLevel) {
				console.log('going to details: type = ', userType, ' level = ', userLevel);
				$rootScope.userType = userType;
				$rootScope.userLevel = userLevel;
				$state.go('main.users.details', {uid: uid});
			}

		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name: 'main.users.details',
		url: '/details/{uid}',
		templateUrl: './templates/usersDetails.html',
		controller: function ($rootScope, prototypeFactory) {

			var ctrl = this;

			$rootScope.isLoading = true
			prototypeFactory.genUsers(1)
			.then(function (response) {
				ctrl.user = prototypeFactory.loadUser(response.data.results[0]);
			})
			.finally(function () {
				$rootScope.isLoading = false;
			});

			if ($rootScope.userType == 'Backend') {
				ctrl.isBackendUser = true;
				ctrl.previlegeLevel = $rootScope.userLevel;
			} else {
				ctrl.previlegeLevel = 1;
			}

		},
		controllerAs: 'ctrl'
	})

	$urlRouterProvider.otherwise('/main/home');

});

app.run(function ($rootScope) {

	$rootScope.mainContentClass = 'hg-main-content';

	$rootScope.$on('$stateChangeStart', function (event, toState) {
		$rootScope.isLoading = true;
	});

	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParam, fromState, fromParam) {
		$rootScope.activeSideMenu = toState.name.split('.')[1];
		$rootScope.currState = toState.name;
		$rootScope.isLoading = false;
	});

})