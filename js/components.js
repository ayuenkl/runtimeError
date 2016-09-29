reApp.component('reNavbar', {

	templateUrl: '/templates/navbar.html',

	controller: function(APPNAME, $state) {

		var ctrl = this;

		ctrl.appName = APPNAME;

		ctrl.isCollapsed = false;

		ctrl.searchQA = function () {
			$state.go('searchResult', {searchString: ctrl.searchString});
		}

	}

});

