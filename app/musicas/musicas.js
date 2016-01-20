'use strict';

angular.module('louvorShow.musicas', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
          .when('/musicas', {
            templateUrl: 'musicas/musicas.html',
            controller: 'ListaMusicasController'
          })
          .when('/musicas/:musicaId/:parte', {
            templateUrl: 'musicas/musica.html',
            controller: 'ExibeMusicaController'
          });
    }])

    .filter('filtraPagina', function() {
        return function(input, parte) {
            if (!input) {
                return false;
            }
            parte = +parte;
            //console.log(input);
            return input.slice(parte);
        }
    })

    .controller('ListaMusicasController', ['$scope', '$http', '$templateCache', function($scope, $http, $templateCache) {
        $http.get('musicas/musicas.json', {cache: false}).success(function(data) {
            $scope.musicas = data;
        });
    }])

    .controller('ExibeMusicaController', ['$scope', '$routeParams', '$http', '$sce', '$templateCache', function($scope, $routeParams, $http, $sce, $templateCache) {
        var musicaId = $routeParams.musicaId;
        var parte = parseInt($routeParams.parte);
        if (!parte) {
            parte = 0;
        }
        $scope.musicas = null;
        $scope.parte = parte;
        $scope.trataHtml = function(linha) {
            return $sce.trustAsHtml(linha);
        };
        var achaMusica = function() {
            for (var i = 0; i < $scope.musicas.length; i++) {
                var musica = $scope.musicas[i];
                if (musica.id == musicaId) {
                    $http.get('musicas/letras/' + musica.arquivoLetra + '.json', {cache: false}).success(function(letra) {
                        musica.letra = letra;
                        $scope.musica = musica;
                    });
                    break;
                }
            }
        };
        //if (!$scope.musica) {
        //    if (!$scope.musicas) {
                $http.get('musicas/musicas.json').success(function(listaMusicas) {
                    $scope.musicas = listaMusicas;
                    achaMusica();
                });
            //}
            //else {
            //    achaMusica();
            //}
        //}
        //else {
        //    $scope.musica.strofe = $sce.trustAsHtml($scope.musica.letra[parte]);
        //}
    }]);