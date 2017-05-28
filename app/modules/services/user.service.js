(function(){
	
'use strict';
  angular
    .module('newPCSApp.services')
    .service('UserService', UserService);

  UserService.$inject = [];

  /* @ngInject */
  function UserService() {

	// alert(this.language);
	if(this.language == "" || this.language == undefined)
		this.language = "en";

	this.getUsers = getUsers;

    // users for mockup
    var users = [{
      id: 1,
      employeeId: 'ZKL713775',
      name: 'Taro Yamada',
      role: 'manager'
    }, {
      id: 2,
      employeeId: 'ZKL740742',
      name: 'Ayano Smith',
      role: 'operator'
    }];

    this.getMockupUser = getMockupUser;
    this.getUsers = getUsers;

    // get mockup user
    function getMockupUser(id) {
      var result = {};
      for (var i = 0, l = users.length; i < l; i++) {
        if(users[i].id !== id) { continue; }
        result = users[i];
      }
      return result;
    }

    function getUsers() {
      return users;
    }
  }
})();