angular
    .module('Labs')
    .controller('Lab4Controller', ['$scope', 'SqrtMethod',Lab4Controller]);

function Lab4Controller($scope)
{
	$scope.n;
	var a = -1.5;
	var b = 1.5;
	var bmina = b - a;
	var bplusa = b + a;
	var minbmina = -b-a;
	
	
	var FxIntegral = '(sin(x)*('+ bmina + ') + ' + bplusa + ')/2';
	
	var XInvert =  '(2*x-'+bplusa + ')/('+ bmina +')';
	
	var T = ['1','x'];
	var TForIntegral = ['1','sin(x)'];
	var TInvert = ['1', XInvert];
	
	
	var getMatrixCForXI = function(k, a, b) 
	{
		var matrix = [];
		for (var i = 0; i < k; i++) {
			var row = [];
			for(var j = 0; j < k ; j++) {
				var sell = Math.pow(b, i+j+1) - Math.pow(a,i+j+1);
				sell /= (i+j+1);
				row.push(sell);
			}
			matrix.push(row);
		}
		return matrix;
	}
	
	var getFunction = function()
	{
		return 'log(cos(x), 2)';
	}
	
	
	var getFunctionForTIntegral = function()
	{
		
		return 'log(cos(' + FxIntegral +' ), 2)';
	}
	
	var getFunctionXIWithMain = function(i)
	{
		return '(x^' + i + ')*' + getFunction();
	}
	
	var getFunctionTIWithMainForIntegral = function(i)
	{
		return '('+ getTkForIntegral(i) +')*(' + getFunctionForTIntegral() + ')';
	}
	
	var getFunctionXI = function(i)
	{
		return '(x^' + i + ')';
	}
	
	var getFreeCoefForXI = function(k, a, b) 
	{
		var intervals = 100;
		var freeCoef = [];
		for (var i = 0; i < k; i++) {
			var fx = 'f(x)=' + getFunctionXIWithMain(i);
			fx = math.eval(fx);
			var sell = calculateIntegral(fx, a, b, intervals);
			freeCoef.push(sell);
		}
		return freeCoef;
	}
	
	var getFreeCoefForT = function(k, a, b) 
	{
		var intervals = 100;
		var freeCoef = [];
		for (var i = 0; i < k; i++) {
			var fx = 'f(x)=' + getFunctionTIWithMainForIntegral(i);
			fx = math.eval(fx);
			var sell = calculateIntegral(fx, a, b, intervals);
			freeCoef.push(sell);
		}
		return freeCoef;
	}
	
	var calculateIntegral = function(f, a, b, n) 
	{
		var sum = 0;
		var h = (b - a) / n;
		for (var i = 0; i < n;i ++) {
			sum += (f(a + i*h) + f(a+(i+1)*h))*(h/2);
		}
		//sum = Math.abs(sum);
		return sum;
	}
	
	$scope.process = function()
	{
		if($scope.n == undefined || $scope.n <= 0)
		{
			$scope.invalid_input = true;
			return;
		}		
		
		generateXI($scope.n);
		generateTI($scope.n);
		$scope.processed = true;
		
	}
	
	var generateXI = function(k) {
		var matrix = getMatrixCForXI(k, a, b);
		var free = getFreeCoefForXI(k, a, b);
		var sqrt = SqrtMethod();
		sqrt.init(matrix, free);
		var ans = sqrt.getAns();
		var cond = sqrt.getCond();
		
		
		var f = '' + ans[0];
		for (var i = 1;i<k;i++) {
			f += ' + ' + getFunctionXI(i) + '*' + ans[i];
		}
		var delta = calculateDeltaXI(f, getFunction(), a, b);
		
		var f = 'f(x) = ' + f;
		
		$scope.func1 = f;
		$scope.cond = cond;
		$scope.deltaXI = delta;		
	}
	
	var calculateDeltaXI = function(f1, f2, a, b) {
		var f = 'f(x)=('+ f1 + ' - ' + f2 + ' ) ^2 ';
		var fx = math.eval(f);
		var intervals = 100;
		var delta = calculateIntegral(fx, a, b, intervals);
		delta = math.sqrt(delta);
		return delta;
	}
	
	var getTk = function(k) 
	{
		if (T.length > k) {
			return T[k];
		}
		else {
			var element = '((2*x)*' + getTk(k-1) + ' - ' + getTk(k-2) + ')';
			T.push(element);
			return element;
		}
	}
	
	var getTkInvert = function(k) 
	{
		if (TInvert.length > k) {
			return TInvert[k];
		}
		else {
			var element = '((2*'+XInvert + ')*' + getTkInvert(k-1) + ' - ' + getTkInvert(k-2)+')';
			TInvert.push(element);
			return element;
		}
	}
	
	var getTkForIntegral = function(k) 
	{
		if (TForIntegral.length > k) {
			return TForIntegral[k];
		}
		else {
			var element = '((2*sin(x))*' + getTkForIntegral(k-1) + ' - ' + getTkForIntegral(k-2) + ')';
			TForIntegral.push(element);
			return element;
		}
	}
	
	var getNormForT = function(k) 
	{
		var res = 0;
		if (k == 0) {
			res = math.pi;
		}
		else {
			res = math.pi/2;
		}
		//res = math.sqrt(res);
		return res;		
	}
	
	var generateTI = function(k) {
		
		var free = getFreeCoefForT(k, -math.pi/2, math.pi/2);



		var f = '(' + free[0]/getNormForT(0) + ')*' +getTkInvert(0);
		for (var i = 1;i<k;i++) {
			f += ' + (' + free[i]/getNormForT(i) + ')*'+getTkInvert(i);
		}
		
		var f = 'f(x) = ' + f;
		
		$scope.func2 = f;
		//calculate deltaTN

		var sumFree = 0;

		for (var i = 0;i<k;i++) {
			sumFree += (free[i]*free[i])/(getNormForT(i));
		}
		var intervals = 100;
		var ff = 'f(x) = ' + getFunctionForTIntegral() + ' * ' + getFunctionForTIntegral();
		ff = math.eval(ff);

		var FIntegral = calculateIntegral(ff,-math.pi/2, math.pi/2,intervals);

		FIntegral = Math.abs(FIntegral);
		$scope.deltaTN = Math.abs(FIntegral - sumFree);
		$scope.deltaTN = Math.sqrt($scope.deltaTN);
	}
	
}
