'use strict';

describe('myApp.musicas module', function() {

  beforeEach(module('myApp.musicas'));

  describe('musicas controller', function(){

    it('should ....', inject(function($controller) {
      //spec body
      var musicasCtrl = $controller('MusicasController');
      expect(musicasCtrl).toBeDefined();
    }));

  });
});