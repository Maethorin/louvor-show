'use strict';

angular.module('louvorShow.musicas',['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
          .when('/musicas', {
            templateUrl: '/angular/musicas.html',
            controller: 'ListaMusicasController'
          })
          .when('/musicas/:musicaId', {
            templateUrl: '/angular/musica.html',
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
        $http.get('/json/musicas.json', {cache: false}).success(function(data) {
            $scope.musicas = data;
        });
    }])

    .controller('ExibeMusicaController', ['$scope', '$routeParams', '$http', '$sce', '$timeout', '$location', function($scope, $routeParams, $http, $sce, $timeout, $location) {
        var musicaId = $routeParams.musicaId;
        $scope.musicas = null;
        $scope.parte = 1;
        $scope.exibir = true;
        $scope.trataHtml = function(linha) {
            return $sce.trustAsHtml(linha);
        };
        var achaMusica = function() {
            for (var i = 0; i < $scope.musicas.length; i++) {
                var musica = $scope.musicas[i];
                if (musica.id == musicaId) {
                    $http.get('/json/' + musica.arquivoLetra + '.json', {cache: false}).success(function(letra) {
                        musica.letra = letra;
                        $scope.musica = musica;
                    });
                    break;
                }
            }
        };


        $http.get('/json/musicas.json').success(function(listaMusicas) {
            $scope.musicas = listaMusicas;
            achaMusica();
        });
        $scope.paginar = function(direcao) {
            $scope.exibir = false;
            $timeout(function() {
                $scope.parte += +direcao;
                $scope.exibir = true;
            }, 200);
        };
    }]);