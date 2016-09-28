reApp.component('reNavbar', {

	templateUrl: '/templates/navbar.html',

	controller: function(APPNAME) {

		var ctrl = this;

		ctrl.appName = APPNAME;

		ctrl.isCollapsed = false;
	}

});

reApp.component('home', {

	templateUrl: '/templates/home.html'

});

reApp.component('homeNav', {

	templateUrl: '/templates/homeNav.html',

	bindings: {
		questionsGroup: '@'
	},

	controller: function () {
		var ctrl = this;

		var tabNames = ['interest', 'hot', 'month'];

		if (!angular.isString(ctrl.questionsGroup)) { 
			ctrl.questionsGroup = 'interest'
		}

		ctrl.activeTab = tabNames.findIndex(function (tabName) {
			return tabName == ctrl.questionsGroup
		});

		if (ctrl.activeTab < 0) {
			ctrl.activeTab = 0
		}

	}

});

reApp.component('questionsList', {

	templateUrl: '/templates/questionsList.html',

	bindings: {
		questionsGroup: '@'
	},

	controller: function ($timeout, prototypeFactory) {

		var ctrl = this;
		ctrl.isLoading = true;
		ctrl.questions = [];

		if (!angular.isString(ctrl.questionsGroup)) {
			ctrl.questionsGroup = 'interest';
		}

		$timeout(function () {

			ctrl.questions = prototypeFactory.loadQuestions(ctrl.questionsGroup);
			ctrl.isLoading = false;

		}, 1000);

	}

});

reApp.component('question', {

	templateUrl: '/templates/question.html',

	bindings: {
		qid: '@'
	},

	controller: function ($http, $q) {

		var ctrl = this;
		ctrl.isLoading = true;
		ctrl.question = {};

		ctrl.users = [];

		$http.get('http://api.randomuser.me/?results=6')
		.then(function (response) {
			for (var i = 0; i < response.data.results.length; i++) {
				ctrl.users.push({
					username: response.data.results[i].name.first,
					avatar: response.data.results[i].picture.thumbnail
				});
			}
		})
		.finally(function () {
			ctrl.isLoading = false;
		})

	}
});
