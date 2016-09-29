var reApp = angular.module('reApp', ['ui.router', 'ui.bootstrap', 'ngTouch', 'ngAnimate', 'ayUtils']);

reApp.constant('APPNAME', 'Runtime Error');

reApp.config(function($stateProvider, $urlRouterProvider) {

	var sp = $stateProvider;

	sp.state({
		name: 'home',
		abstract: true,
		template: '<home />'
	});

	sp.state({
		name: 'home.interest',
		url: '/interest',
		views: {
			'homeNav': {
				template: '<home-nav questions-group="interest" />'
			},
			'homeQuestList': {
				template: '<questions-list questions-group="interest" />'
			}
		}

	});

	sp.state({
		name: 'home.hot',
		url: '/hot',
		views: {
			'homeNav': {
				template: '<home-nav questions-group="hot" />'
			},
			'homeQuestList': {
				template: '<questions-list questions-group="hot" />'
			}
		}
	});

	sp.state({
		name: 'home.month',
		url: '/month',
		views: {
			'homeNav': {
				template: '<home-nav questions-group="month" />'
			},
			'homeQuestList': {
				template: '<questions-list questions-group="month" />'
			}
		}
	});

	sp.state({
		name: 'question',
		url: '/question/{qid}',
		template: '<question detail="{{$resolve.detail}}" />',
		resolve: {
			// get mockup data
			detail: function ($q, $timeout) {
				var p = $q.defer();
				$timeout(function () {
					p.resolve('在 href-transitioning 下， $stateChangeSuccess 不能被觸發。');
				}, 1000);
				return p.promise;
			}
		},
		controller: function (detail) {
			var ctrl = this;
			ctrl.detail = 'test';
			console.log('detail is ', ctrl.detail);
		},
		controllerAs: 'ctrl'
	});

	$urlRouterProvider.otherwise('/interest');

});

reApp.run(function ($rootScope, SEOFactory) {

	$rootScope.$on('$stateChangeStart', function (event, toState) {
		$rootScope.isLoading = true;
		console.log('on start');
	});

	$rootScope.$on('$stateChangeSuccess', function (event, toState) {

		SEOFactory.setPageTitle(toState);

		$rootScope.isLoading = false;

		console.log('on success');

	});

	$rootScope.pageTitle = 'Runtime Error';

});

