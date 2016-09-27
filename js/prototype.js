reApp.factory('prototypeFactory', function() {

	return {

		loadQuestions: function (questionsGroup) {

			var questions = [];

			switch (questionsGroup) {

				case 'interest':
					questions = [{
							title: '有趣的問題 1',
							tags: ['javascript', 'angularjs'],
							votes: 0,
							answers: 0,
							views: 3
						}, {
							title: '有趣的問題 2',
							tags: ['c#', 'java'],
							votes: 0,
							answers: 2,
							views: 4
						}];
					break;

				case 'hot':

					questions = [{
						title: '熱門的問題 1',
						tags: ['node.js', 'c#', 'sql'],
						votes: 2,
						answers: 121,
						views: 12345
					}, {
						title: '熱門的問題 2',
						tags: ['xcode', 'android', 'ionic', 'angular'],
						votes: 1234,
						answers: 20,
						views: 123412
					}];

					break;

				case 'month':

					questions = [{
						title: '本月熱門的問題 1',
						tags: ['javascript', 'html', 'css', 'angularjs', 'node.js', 'sails.js', 'ionic'],
						votes: 212,
						answers: 2102,
						views: 124124
					}, {
						title: '本月熱門的問題 2',
						tags: ['c#', '.net', 'c++'],
						votes: 21,
						answers: 123,
						views: 314
					}];

					break;

			}
			
			return questions;

		}

	}

})