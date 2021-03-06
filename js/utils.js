angular.module('ayUtils', [])

.filter('shortNumber', function () {

	return function (number, digits) {

		if (!angular.isNumber(number)) { return number; }

		var suffixes = ['K', 'M', 'G', 'T', 'P', 'E'];

		var exp = Math.floor(Math.log(number) / Math.log(1000));

		if (exp < 1) { return number; }

		return (number / Math.pow(1000, exp)).toFixed(digits) + suffixes[exp - 1];
	};

})

.factory('utilFactory', function () {
	return {

		numArray: function (number) {
			var a = [];
			for (i = 0; i < number; i++) {
				a.push(i + 1);
			}
			return a;
		}

	}
})