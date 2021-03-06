var app = angular.module('reApp', ['ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.tinymce', 'ngTouch', 'ngAnimate', 'ayUtils']);

app.constant('APPNAME', 'Hackga');

app.config(function($stateProvider, $urlRouterProvider) {

	var sp = $stateProvider;

	sp.state({
		name: 'home',
		url: '/home',
		abstract: true,
		templateUrl: '/templates/home.html',
		controller: function (APPNAME) {
			var ctrl = this;
			ctrl.appName = APPNAME;
		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name: 'home.questions',
		url: '/{qType}',
		views: {
			'homeNav': {
				templateUrl: '/templates/homeNav.html',
				controller: function ($stateParams) {
					var ctrl = this;
					ctrl.questionTitle = '問題列表';
					switch ($stateParams.qType) {
						case 'interest':
							ctrl.activeTab = 0;
							break;
						case 'hot':
							ctrl.activeTab = 1;
							break;
						case 'latest':
							ctrl.activeTab = 3;
							break;
						default:
							ctrl.activeTab = 0;
					}
					ctrl.interest = 'home.questions({qType: "interest"})';
					ctrl.hot = 'home.questions({qType: "hot"})';
					ctrl.latest = 'home.questions({qType: "latest"})';
				},
				controllerAs: 'ctrl'
			},
			'homeQuestList': {
				templateUrl: '/templates/questionsList.html',
				controller: function ($timeout, prototypeFactory, $rootScope, $stateParams) {

					var ctrl = this;
					$rootScope.isLoading = true;
					ctrl.questoins = [];

					$timeout(function () {
						ctrl.questions = prototypeFactory.loadQuestions($stateParams.qType);
						$rootScope.isLoading = false;
					}, 1000);
				},
				controllerAs: 'ctrl'
			}
		}

	});

	sp.state({
		name: 'questions',
		url: '/questions',
		abstract: true,
		templateUrl: '/templates/questions.html',
		controller: function (prototypeFactory) {
			var ctrl = this;
			ctrl.tag = prototypeFactory.getTabInfo();
		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name: 'questions.tag',
		url: '/{tag}/{qType}',
		views: {
			'homeNav': {
				templateUrl: '/templates/homeNav.html',
				controller: function ($stateParams) {
					var ctrl = this;
					ctrl.questionTitle = '此標籤的問題';
					switch ($stateParams.qType) {
						case 'interest':
							ctrl.activeTab = 0;
							break;
						case 'month':
							ctrl.activeTab = 1;
							break;
						case 'latest':
							ctrl.activeTab = 3;
							break;
						default:
							ctrl.activeTab = 0;
					}
					ctrl.interest = 'questions.tag({tag: "javascript", qType: "interest"})';
					ctrl.hot = 'questions.tag({tag: "javascript", qType: "hot"})';
					ctrl.latest = 'questions.tag({tag: "javascript", qType: "latest"})';
				},
				controllerAs: 'ctrl'
			},
			'tagQuestList': {
				templateUrl: '/templates/questionsList.html',
				controller: function ($timeout, prototypeFactory, $rootScope, $stateParams) {

					var ctrl = this;
					$rootScope.isLoading = true;
					ctrl.questoins = [];

					$timeout(function () {
						ctrl.questions = prototypeFactory.loadQuestions($stateParams.qType);
						$rootScope.isLoading = false;
					}, 1000);
				},
				controllerAs: 'ctrl'
			}
		}

	});

sp.state({
		name: 'question',
		url: '/question/{qid}',
		templateUrl: '/templates/question.html',
		resolve: {
			// get mockup data
			Title: function ($q, $timeout, $rootScope) {
				var p = $q.defer();
				$timeout(function () {
					var pageTitle = '在 href-transitioning 下， $stateChangeSuccess 不能被觸發。';
					$rootScope.customPageTitle = pageTitle;
					p.resolve(pageTitle);
				}, 1000);
				return p.promise;
			}
		},
		controller: function (prototypeFactory, $rootScope) {

			var ctrl = this;
			$rootScope.isLoading = true;

			// for mockup purpose, randomly generate user info
			ctrl.users = [];
			// $http.get('https://api.randomuser.me/?results=6')
			prototypeFactory.genUsers(6)
			.then(function (response) {
				for (var i = 0; i < response.data.results.length; i++) {
					ctrl.users.push(prototypeFactory.loadUser(response.data.results[i]));
				}
			})
			.finally(function () {
				$rootScope.otherUsers = ctrl.users;
				$rootScope.isLoading = false;
			});

			ctrl.tinymceOptions = {
				setup: function (editor) {
					editor.on("focus", function () {
						ctrl.showAnswerTips = true;
					});
					editor.on("blur", function () {
						ctrl.showAnswerTips = false;
					});
				},
				height: 200
			};

			ctrl.submitAnswer = function () {
				var d = new Date();
				ctrl.answerTime = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
				ctrl.isAnswered = true;
			}			

		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name:'searchResult',
		url: '/search/{searchString}',
		templateUrl: '/templates/searchResult.html',
		resolve: {
			searchResult: function ($stateParams, $q, $timeout, $rootScope, prototypeFactory) {
				// simulate a search
				//$rootScope.customPageTitle = $stateParams.searchString;
				$rootScope.customPageTitle = 'angularjs submit without pressing button';
				var p = $q.defer();
				$timeout(function () {
					p.resolve(prototypeFactory.loadSearchResult());
				}, 1000);
				return p.promise;
			}
		},
		controller: function (searchResult, $rootScope) {
			var ctrl = this;
			//ctrl.searchString = $stateParams.searchString;
			ctrl.searchString = 'angularjs submit without pressing button';
			ctrl.searchResult = searchResult;
		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name: 'authUser',
		abstract: true,
		templateUrl: '/templates/authUser.html'
	})

	sp.state({
		name: 'authUser.login',
		url: '/login',
		views: {
			authNav: {
				templateUrl: '/templates/authUserNav.html'
			},
			authMain: {
				templateUrl: '/templates/login.html',
				controller: function (prototypeFactory, $state) {
					var ctrl = this;
					ctrl.activeTab = 0;
					if (ctrl.isForgotPassword) {
						delete ctrl.isForgotPassowrd;
					}

					ctrl.userLogin = function () {
						$state.go('doLogin');
					}
				},
				controllerAs: 'ctrl'
			}
		}
	});

	sp.state({
		name: 'doLogin',
		resolve: {
			loggedIn: function (prototypeFactory) {
				return prototypeFactory.login();
			},
			user: function (prototypeFactory) {
				return prototypeFactory.genUsers(1);
			}
		},
		controller: function (loggedIn, user, $rootScope, $state, prototypeFactory) {
			if (loggedIn) {
				$rootScope.isLoggedIn = true;
				$rootScope.user = prototypeFactory.loadUser(user.data.results[0]);
				$state.go($rootScope.prevState, $rootScope.prevParam);
			}
		}
	});

	sp.state({
		name: 'authUser.signUp',
		url: '/signUp',
		views: {
			authNav: {
				templateUrl: '/templates/authUserNav.html',
				controller: function () {
					var ctrl = this;
					ctrl.activeTab = 1;
				},
				controllrAs: 'ctrl'
			},
			authMain: {
				templateUrl: '/templates/signUp.html',
				controller: function (prototypeFactory) {
					var ctrl = this;
					ctrl.userSignUp = function () {
						prototypeFactory.userSignUp();
					}
				},
				controllerAs: 'ctrl'
			}
		}
	});

	sp.state({
		name: 'userSignedUp',
		url: '/signedUp',
		templateUrl: '/templates/signedUp.html'
	});

	sp.state({
		name: 'askQuestion',
		url: '/askquestion',
		templateUrl: 'templates/askQuestion.html',
		controller: function ($rootScope, $state, prototypeFactory) {
			var ctrl = this;
			ctrl.stage = 1;
			if (!$rootScope.isLoggedIn) {
				$state.go('authUser.login');
			}
			ctrl.tinymceOptions = {
				setup: function (editor) {
					editor.on("focus", function () {
						ctrl.showDetailsTips = true;
					});
					editor.on("blur", function () {
						ctrl.showDetailsTips = false;
					});
				},
				height: 200
			};
			ctrl.tagSet = prototypeFactory.setTagSet();
		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name: 'user',
		url: '/user/{uid}',
		templateUrl: '/templates/userProfile.html',
		controller: function ($rootScope, utilFactory, $state, $stateParams, prototypeFactory) {

			var ctrl = this;

			if ($stateParams.uid == 0) {
				if (angular.isUndefined($rootScope.user)) {
					$state.go('doLogin')
				}
				ctrl.user = $rootScope.user;
				setUser(true)
			} else {
				if (angular.isUndefined($rootScope.otherUsers)) {
					prototypeFactory.genUsers(1)
					.then(function (response) {
						ctrl.user = prototypeFactory.loadUser(response.data.results[0]);
						setUser(false);
					})
					.finally(function () {
						$rootScope.isLoading = false;
					})
				} else {
					ctrl.user = $rootScope.otherUsers[$stateParams.uid - 1];
					setUser(false);
				}
			}

			function setUser(isLoginUser) {
				ctrl.isLoginUser = isLoginUser;
				if (angular.isUndefined(ctrl.user) || angular.isUndefined(ctrl.user.avatarLarge) || !ctrl.user.avatarLarge) {
					ctrl.editPicture = true;
				}
				ctrl.updatePicture = function () {
					if (ctrl.user.avatarLarge) {
						ctrl.editPicture = false;
					}
				}
				if (!ctrl.user.selfDesc) {
					ctrl.editSelfDesc = true;
				}
				if (!ctrl.user.city) {
					ctrl.editCity = true;
				}
				ctrl.tinymceOptions = {
					height: 200
				}
				ctrl.numArray = function (number) {
					return utilFactory.numArray(number);
				}
				if (ctrl.user.numOfBadges.gold) {
					ctrl.nextBadgeType = 'gold';
					ctrl.nextBadgeName = '金章 ' + (ctrl.user.numOfBadges.gold + 1) + ' 號';
				} else if (ctrl.user.numOfBadges.silver) {
					ctrl.nextBadgeType = 'silver';
					ctrl.nextBadgeName = '銀章 ' + (ctrl.user.numOfBadges.silver + 1) + ' 號';
				} else {
					ctrl.nextBadgeType = 'bronze';
					ctrl.nextBadgeName = '銅章 ' + (ctrl.user.numOfBadges.bronze + 1) + ' 號';
				}
			}

			ctrl.logout = function () {

				$rootScope.isLoggedIn = false;
				delete $rootScope.user;
				$state.go('authUser.login');
			};
		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name: 'tags',
		url: '/tags/{tag}',
		templateUrl: '/templates/tags.html',
		controller: function (prototypeFactory) {
			var ctrl = this;
			ctrl.tags = prototypeFactory.loadTags();
		},
		controllerAs: 'ctrl'
	});

	sp.state({
		name: 'aboutUs',
		url: '/aboutUs',
		template: 'About Us -- To be implemented ...'
	});

	sp.state({
		name: 'tour',
		url: '/tour',
		template: 'Tour -- To be implemented ...'
	});

	sp.state({
		name: 'help',
		url: '/help',
		template: 'Help -- To be implemented ...'
	});

	sp.state({
		name: 'contactUs',
		url: '/contactUs',
		template: 'Contact us -- To be implemented ...'
	});

	sp.state({
		name: 'feedback',
		url: '/feedback',
		template: 'Feedback -- To be implemented ...'
	});

	$urlRouterProvider.otherwise('/home/interest');

});

app.run(function ($rootScope, SEOFactory, NavFactory, APPNAME) {

	$rootScope.$on('$stateChangeStart', function (event, toState) {

		$rootScope.isLoading = true;
		
	});

	$rootScope.$on('$stateChangeSuccess', function (event, toState, toParam, fromState, fromParam) {

		if ((fromState.name != 'authUser.login') && (fromState.name != 'authUser.signUp') && (fromState.name != 'doLogin')) {
			$rootScope.prevState = fromState;
			$rootScope.prevParam = fromParam;
		}
		SEOFactory.setPageTitle(toState);
		NavFactory.setNavTab(toState);

		$rootScope.isLoading = false;

	});

	$rootScope.pageTitle = APPNAME;
	$rootScope.customPageTitle = '';
	$rootScope.isLoading = false;

});

