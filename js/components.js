reApp.component('reNavbar', {

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

	}

});

reApp.component('navUserBox', {

	templateUrl: '/templates/navUserBox.html'
	
})