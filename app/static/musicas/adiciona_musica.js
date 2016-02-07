'use strict';

angular.module('louvorShow.adicionaMusica',['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
          .when('/adiciona-musica', {
            templateUrl: '/angular/adiciona_musica.html',
            controller: 'AdicionaMusicaController'
          });
    }])
    .controller('AdicionaMusicaController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
        $scope.trataHtml = function(linha) {
            return $sce.trustAsHtml(linha);
        };
        $scope.musica = {
            "nome": null,
            "cantor": null,
            "estrofes": [
                {"indice": 1, versos: [{"cifra": null, "letra": null}]}
            ]
        };
        $scope.letra = [];
        $scope.estrofeAtual = 0;
        $scope.estadoGetMusica = "Carregar";
        $scope.conseguiuObterMusica = true;
        $scope.cifraUrl = 'http://www.cifraclub.com.br/davi-sacer/venha-o-teu-reino/';
        $scope.removeLinha = function(index) {
            $scope.letra.splice(index, 1);
        };
        $scope.parsearMusica = function() {
            $scope.estadoGetMusica = "Aguarde";
            $http.put('/api/adiciona-musica', {'url': $scope.cifraUrl}).then(
                function(response) {
                    $scope.letra = response.data;
                    $scope.estadoGetMusica = "Carregar";
                    $scope.conseguiuObterMusica = true;
                },
                function(data) {
                    $scope.estadoGetMusica = "Carregar";
                    $scope.conseguiuObterMusica = false;
                }
            );
        };

        function refazIndice() {
            angular.forEach($scope.musica.estrofes, function(estrofe, index) {
                estrofe.indice = index + 1;
            });
        }

        $scope.adicionaEstrofe = function() {
            $scope.musica.estrofes.push({"indice": $scope.musica.estrofes.length + 1, versos: [{"cifra": null, "letra": null}]});
        };
        $scope.removeEstrofe = function(index) {
            $scope.musica.estrofes.splice(index, 1);
            refazIndice();
        };
        $scope.moveEstrofe = function(direcao, index) {
            $scope.musica.estrofes.splice(index + direcao, 0, $scope.musica.estrofes.splice(index, 1)[0]);
            refazIndice();
        };
        $scope.defineEstrofeAtual = function(index) {
            if ($scope.estrofeAtual == index) {
                $scope.estrofeAtual = -1;
            }
            else {
                $scope.estrofeAtual = index;
            }
        };
        $scope.adicionaVerso = function(estrofeIndex) {
            $scope.musica.estrofes[estrofeIndex].versos.push({"cifra": null, "letra": null});
        };
        $scope.removeVerso = function(estrofeIndex, index) {
            $scope.musica.estrofes[estrofeIndex].versos.splice(index, 1);
        };
        $scope.defineVerso = function(linha, tipo, index) {
            if ($scope.estrofeAtual < 0) {
                return false;
            }
            var ultimoVerso = $scope.musica.estrofes[$scope.estrofeAtual].versos.length - 1;
            $scope.musica.estrofes[$scope.estrofeAtual].versos[ultimoVerso][tipo] = linha;
            $('#linhaCifra' + index).addClass(tipo);
        };
    }]);