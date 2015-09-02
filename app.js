angular.module('WikipediaViewer', ['ngMaterial'])
.controller('AppCtrl', ['$scope','$http',function($scope,$http) {
  this.Tiles = (function() {
    var tiles = [];
	$http.get('http://www.freecodecamp.com/news/hot').success(function(data){
		data.forEach(function(item){
			tiles.push({
			title: item.headline,
			});
		});
	});
	
    return tiles;
  })();
  


}]);