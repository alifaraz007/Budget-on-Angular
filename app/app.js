var app = angular.module('myApp', ['ngAnimate']);
app.controller('myCtrl', ['$scope', '$http', function($scope, $http){
    $scope.Math = window.Math;
    //data type  (income/expense)
    $scope.data=['inc', 'exp'];
    //data for income
    $scope.income = [{
        newEntry: "",
        resAmount: ""
    }]
    //data for expense
    $scope.expense = [{
        newEntry: "",
        resAmount: ""
    }]
    var gt = 0;
    var income=0;
    var expense=0;
    $scope.budget=0;
    $scope.totalInc=0;
    $scope.totalExp=0;
    $scope.expPerc=0;
    
    var a,b;
    // data passing for update in UI by clicking add 
    $scope.update= function(){
       if($scope.selectType == 'inc'){
           $scope.income.push({
               newEntry: $scope.entry,
               resAmount: $scope.amount,
               available: true
               
           })
       }else if($scope.selectType == 'exp'){
           $scope.expense.push({
               newEntry: $scope.entry,
               resAmount: $scope.amount,
               available: true
           })
       };
        $scope.amtUpdate();
        $scope.entry="";
        $scope.amount="";
    };
    //total budget update in UI*100/
    $scope.totalBudget = function(amount, incData, expData){
        $scope.budget = amount;
        $scope.totalInc = incData;
        $scope.totalExp = expData;
        $scope.expPerc = Math.round(expData*100/incData)
    }
    //updating amount
    $scope.amtUpdate = function(){
        if($scope.selectType == 'inc'){
            gt = gt + $scope.amount;
            income += $scope.amount;
        }else if($scope.selectType == 'exp'){
            gt = gt - $scope.amount;
            expense += $scope.amount
        }
        $scope.totalBudget(gt, income, expense);
    }   
    //removing data by clicking
    $scope.removeInc = function(data){
        var remove = $scope.income.indexOf(data);
        $scope.income.splice(remove, 1);
        gt = gt - data.resAmount;
        income = income - data.resAmount;
        $scope.totalBudget(gt, income, expense);
    }
    $scope.removeExp = function(data){
        var remove = $scope.expense.indexOf(data);
        $scope.expense.splice(remove, 1);
        gt = gt + data.resAmount;
        expense = expense - data.resAmount;
        $scope.totalBudget(gt, income, expense);
    }
    
}]);