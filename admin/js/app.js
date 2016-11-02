var app = angular.module('HackgaAdmin', ['ngAnimate', 'ngTouch', 'ui.bootstrap', 'ui.router']);

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
				state: 'main.moderation'
			}];
			ctrl.activeState = 'main.home';
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
		url: '/moderation',
		template: 'To be implemented..'
	})

	$urlRouterProvider.otherwise('/main/home');

});

app.run(function ($rootScope) {

	$rootScope.mainContentClass = 'hg-main-content';

	$rootScope.$on('$stateChangeStart', function (event, toState) {
		$rootScope.isLoading = true;
	});

	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParam, fromState, fromParam) {
		$rootScope.isLoading = false;
	});

})