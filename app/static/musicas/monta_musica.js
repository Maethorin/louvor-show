'use strict';

angular.module('louvorShow.montaMusica',['ngRoute'])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider
          .when('/monta-musica', {
            templateUrl: '/angular/monta_musica.html',
            controller: 'MontaMusicaController'
          });
    }])
    .controller('MontaMusicaController', ['$scope', '$http', '$sce', function($scope, $http, $sce) {
        $scope.trataHtml = function(linha) {
            return $sce.trustAsHtml(linha);
        };
        $scope.letra = [];
        $scope.parsearMusica = function() {
            $http.put('/api/monta-musica', {'url': $scope.cifraUrl}).success(function(data) {
                $scope.letra = data;
            });
        };
    }]);