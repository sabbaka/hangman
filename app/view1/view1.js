'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {
	var test = 'hangman';
	
	var tries = 5;
	
	$scope.letters = [];
	
	$scope.wrong_letters = [];
	
	$scope.test = [];
	
	$scope.counter = 0;
	
	$scope.sendLetter = function() {
		if($scope.letter) {
			if(!isGessed($scope.letter) && !isMissed($scope.letter)) {
				if(isCorrectLetter($scope.letter)) {
					$scope.letters.push($scope.letter[0]);
					$scope.letter = '';
					showLetters($scope.letters);	
					$scope.counter++;					
				}
				else {
					$scope.wrong_letters.push($scope.letter);
					$scope.letter = '';					
					$scope.counter++;
				}
			}
			else {
				$scope.letter = '';
			}
		}
		if($scope.counter > tries) {
			alert('You loose');
		}
	};
	
	console.log(test[test.length - 1]);
	
	function init() {
		$scope.test.push(test[0]);
		$scope.letters.push(test[0]);
		for(var i = 1; i < test.length-1; i++) {
				$scope.test.push('_');
		}	
		$scope.test.push(test[test.length - 1]);			
		$scope.letters.push(test[test.length - 1]);
	}
	
	function isCorrectLetter(letter) {
		if(test.indexOf(letter) != -1) {
			return true;
		}
		else {
			return false;
		}		
	}
	
	function isGessed(letter) {
		if($scope.letters.indexOf(letter) != -1) {
			return true;
		}
		else {
			return false;
		}
	}
	
	function isMissed(letter) {
		if($scope.wrong_letters.indexOf(letter) != -1) {
			return true;
		}
		else {
			return false;
		}
	}
	
	function showLetters(letters) {
		$scope.test = [];
		$scope.test.push(test[0]);
		
		for(var i = 1; i < test.length-1; i++) {
			if(isGessed(test[i])) {
				$scope.test.push(test[i]);
			}
			else{
				$scope.test.push('_');
			}				
		}
		
		$scope.test.push(test[test.length - 1]);	
			
			console.log($scope.test.toString().replace(/,/g, ''));
		if($scope.test.toString().replace(/,/g, '') == test) {
			alert('You won.');
		}		
	}
	
	init();
	

	
}]);