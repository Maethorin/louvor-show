'use strict';

angular.module('louvorShow.adicionaMusica', ['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/editor-musica/:musicaId?', {
                templateUrl: '/angular/editor_musica.html',
                controller: 'AdicionaMusicaController'
            });
    }])
    .controller('AdicionaMusicaController', ['$scope', '$http', '$sce', '$routeParams', function($scope, $http, $sce, $routeParams) {
        $scope.trataHtml = function(linha) {
            return $sce.trustAsHtml(linha);
        };
        var musicaId = $routeParams.musicaId;
        if (musicaId) {
            $http.get('/api/editor-musica/' + musicaId, {cache: false}).success(function(musica) {
                $scope.musica = musica;
                console.log(musica);
            });
        }
        else {
            $scope.musica = {
                "id": null,
                "nome": null,
                "cifraUrl": null,
                "cantor": null,
                "sequencia": "1",
                "estrofes": [
                    {"indice": 1, versos: [{"cifra": null, "letra": null}]}
                ]
            };
        }
        $scope.letra = [];
        $scope.estrofeAtual = 0;
        $scope.estadoGetMusica = "Carregar";
        $scope.conseguiuObterMusica = true;
        $scope.removeLinha = function(index) {
            $scope.letra.splice(index, 1);
        };

        $scope.parsearMusica = function() {
            $scope.estadoGetMusica = "Aguarde";
            $http.put('/api/letra-musica', {'url': $scope.musica.cifraUrl}).then(
                function(response) {
                    $scope.musica.nome = response.data.nome;
                    $scope.musica.cantor = response.data.cantor;
                    $scope.letra = response.data.letra;
                    $scope.estadoGetMusica = "Carregar";
                    $scope.conseguiuObterMusica = true;
                },
                function(data) {
                    $scope.estadoGetMusica = "Carregar";
                    $scope.conseguiuObterMusica = false;
                }
            );
        };

        $scope.gravarMusica = function() {
            var metodo = $scope.musica.id ? 'put' : 'post';
            $http[metodo]('/api/editor-musica', $scope.musica).then(
                function(response) {
                    alert("FOI");
                },
                function(data) {
                    alert("NADAADADADD");
                }
            );
        };

        function refazIndice() {
            angular.forEach($scope.musica.estrofes, function(estrofe, index) {
                estrofe.indice = index + 1;
            });
        }

        $scope.adicionaSequencia = function(indice) {
            $scope.musica.sequencia += '-' + indice;
        };
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