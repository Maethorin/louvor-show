'use strict';

angular.module('louvorShow.musicas', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
          .when('/musicas', {
            templateUrl: 'musicas/musicas.html',
            controller: 'ListaMusicasController'
          })
          .when('/musicas/:musicaId', {
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

    .controller('ExibeMusicaController', ['$scope', '$routeParams', '$http', '$sce', '$timeout', '$location', function($scope, $routeParams, $http, $sce, $timeout, $location) {
        var musicaId = $routeParams.musicaId;
        //var parte = 1;// parseInt($routeParams.parte);
        //if (!parte) {
        //    parte = 0;
        //}
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
                    $http.get('musicas/letras/' + musica.arquivoLetra + '.json', {cache: false}).success(function(letra) {
                        musica.letra = letra;
                        musica.zas = "buh";
                        $scope.musica = musica;
                    });
                    break;
                }
            }
        };
        $http.get('musicas/musicas.json').success(function(listaMusicas) {
            $scope.musicas = listaMusicas;
            achaMusica();
        });
        //$scope.paginar = function(direcao) {
        //    $scope.exibir = false;
        //    $timeout(function() {
        //        $scope.parte += +direcao;
        //        $scope.exibir = true;
        //        //$location.path("/musicas/" + musicaId + "/" + $scope.parte);
        //    }, 200);
        //};
        $scope.obterParte = function() {
            return $scope.musica.letra[$scope.musica.sequencia[$scope.parte - 1]]
        };
        $scope.$watch('parte', function() {
            $scope.exibir = false;
            $timeout(function() {
                //$scope.parte += +direcao;
                $scope.exibir = true;
                //$location.path("/musicas/" + musicaId + "/" + $scope.parte);
            }, 100);
        });
    }]);