var app = angular.module('HackgaAdmin', ['ngAnimate', 'ngTouch', 'ui.router']);

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
				state: 'main.home'
			}, {
				menu: 'Moderation',
				state: 'main.moderation.waiting'
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
		//template: 'testing',
		controller: function (adminPrototype) {
			var ctrl = this;
			ctrl.records = adminPrototype.loadWaitingModeration();
		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name: 'main.moderation.history',
		url: '/history',
		template: 'Moderation History... contruting...'
	})

	$urlRouterProvider.otherwise('/main/home');

});

app.run(function ($rootScope) {

	$rootScope.mainContentClass = 'hg-main-content';

	$rootScope.$on('$stateChangeStart', function (event, toState) {
		$rootScope.isLoading = true;
	});

	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParam, fromState, fromParam) {
		$rootScope.currState = toState.name;
		console.log('Curr State is ', $rootScope.currState);
		$rootScope.isLoading = false;
	});

})