app.component('reNavbar', {

	templateUrl: '/templates/navbar.html',

	controller: function(APPNAME, $state) {

		var ctrl = this;

		ctrl.appName = APPNAME;

		ctrl.isCollapsed = false;
		ctrl.active = 0;

		ctrl.searchQA = function () {
			ctrl.isCollapsed = false;
			$state.go('searchResult', {searchString: ctrl.searchString});
			ctrl.searchString = '';
		}

		ctrl.toggleCollapse = function () {
			ctrl.isCollapsed = !ctrl.isCollapsed;
		}

	}

});

app.component('navUserBox', {

	templateUrl: '/templates/navUserBox.html'
	
});

app.component('userBox', {

	templateUrl: '/templates/userBox.html',

	bindings: {
		qaType: '@',
		qaTime: '@',
		user: '<'
	}

});