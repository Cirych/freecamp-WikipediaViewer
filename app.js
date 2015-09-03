(function () {
  'use strict';
  angular
      .module('WikipediaViewer', ['ngMaterial'])
      .controller('AppCtrl', AppCtrl);
  function AppCtrl ($http, $log, $q) {
    var self = this;
    self.querySearch   = querySearch;
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange   = searchTextChange;
	self.randomGet   = randomGet;
	self.result = [];
	self.params_s = {action:'query',generator:'search',format:'json',callback:'JSON_CALLBACK'};
	self.params_f = {action:'query',generator:'search',format:'json',prop:'pageimages|extracts',pilimit:'max',exintro:true,explaintext:true,exsentences:1,exlimit:'max',callback:'JSON_CALLBACK'};
	self.params_r = {action:'query',generator:'random',grnnamespace:0,grnlimit:10,prop:'pageimages|extracts',pilimit:'max',exintro:true,explaintext:true,exsentences:1,exlimit:'max',format:'json',callback:'JSON_CALLBACK'};
	self.req = {
			method:'jsonp',
			url:'http://en.wikipedia.org/w/api.php',
			params:self.params_s
		};
 
    function querySearch(query,params) {
		var deferred = $q.defer();
		self.req.params = params||self.params_s;
		self.req.params.gsrsearch = query;
		var wikiDataString = 'http://en.wikipedia.org/w/api.php?action=query&list=search&srsearch='+ query +'&format=json&callback=JSON_CALLBACK';
		$http(self.req).then(function(response) {deferred.resolve(response.data.query.pages);});
		return deferred.promise;
    };
    function searchTextChange(text) {
      //$log.info('Text changed to ' + text);
    };
    function selectedItemChange(item) {
      //$log.info('Item changed to ' + JSON.stringify(item));
	  if(item) querySearch(item.title,self.params_f).then(function(messages) {self.result = messages});
    };
	function randomGet() {
		querySearch(null,self.params_r).then(function(messages) {self.result = messages});
    };
  };
})();