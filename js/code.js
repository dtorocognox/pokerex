var app = angular.module("pokerex", ["ngRoute"]);

var id;
var datos;

app.controller('controladorLista', function ($scope, $http) {
    $scope.pokemons = [];
    $http.get("package.json")
        .success(function (data) {
            console.log("Cargado API Pokémon");
            datos = $scope.pokemons = data;
        })
    .error(function (err) {
        console.log(err);
        });
    $scope.click = function(valor){
        id = valor;
    }
});

app.controller("FichaTecnica",function ($scope) {
    if(id){
        $scope.pokemons = datos[parseInt(id)-1];
        console.log($scope.pokemons.evolution.length);
    }
});

app.config(function($routeProvider){
    $routeProvider
        .when("/",{
            templateUrl: "lista.html"
        }).when("/lista",{
        templateUrl: "lista.html"
    })
        .when("/ficha",{
            templateUrl: "ficha.html"
        });
});

