angular
    .module('Labs', [])
    .controller('Lab5Controller', ['$scope', Lab5Controller]);

function Lab5Controller($scope)
{
	$scope.n;
	var aMIN = 0;
	var bMAX = 10;
	
	var Fx = 'log(x+1)*x*x';
	
	var getFunction = function()
	{
		return math.eval('f(x) = log(x+1)*x*x');
	}
	
	var getMax = function() 
	{
		return 12;
	}
	
	var calculateIntegral = function(f, a, b, n) 
	{
		var sum = 0;
		var h = (b - a) / n;
		sum += f(a) + f(b);
		for (var i = 1; i <= n-1; i++) {
			if (i % 2 == 0) {
				sum += 2*f(a+i*h);
			}
			else {
				sum += 4*f(a+i*h);
			}
		}
		return sum;
	}
	
	$scope.process = function()
	{
		if($scope.n == undefined || $scope.n <= 0 || $scope.n > 1000000)
		{
			$scope.invalid_input = true;
			return;
		}		
		
		if($scope.eps == undefined || $scope.eps <= 0 || $scope.eps > 1000000)
		{
			$scope.invalid_input = true;
			return;
		}		
		
		$scope.x_res = binarySearch($scope.n, $scope.eps);
		
		$scope.processed = true;
	}
	
	var calculateN = function(a,b, eps) 
	{
		var h4 = (eps*180)/(getMax()*(b-a));
		var h = Math.sqrt(Math.sqrt(h4));
		
		var N = Math.round((b-a) / h);
		if (N % 2 == 1) {
			N += 1;
		}
		return N;
	}
	
	var binarySearch = function(value, eps)
	{
		var left = aMIN;
		var right = bMAX;
		var curIntegral = 0
		
		while (Math.abs(curIntegral - value) > eps/2) 
		{
			var curB = (right + left)/2;
			var curN = calculateN(aMIN, curB, eps/2);
			curIntegral = calculateIntegral(getFunction(), aMIN, curB, curN);
			if (curIntegral > value) {
				right = (right + left)/2;
			}
			else if (curIntegral < value) {
				left = (right + left)/2;
			}
		}
		return (right + left)/2;
	}
	
}
