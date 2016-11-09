var app = angular.module("pokerex", ["ngRoute"]);

var id;
var datos;

app.controller('controladorLista', function ($scope, $http) {
    $scope.pokemons = [];
    $scope.opciones= ["id", "name"];
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
        $scope.evolutions = [];
        if($scope.pokemons.evolution.length>0){
            var temp;
            for(i=0; i<=$scope.pokemons.evolution.length-1; i++){
                if($scope.pokemons.name == $scope.pokemons.evolution[i]){
                    temp = i+1;
                }
            }
            for(i=temp; i<$scope.pokemons.evolution.length; i++){
                $scope.evolutions.push($scope.pokemons.evolution[i]);
            }
        }
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

