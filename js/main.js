$(document).ready(function()
	{
		$('#btn-calc').click(function()
		{
			setTimeout(function()
			{
				var FX1 = 'x = ' + $('#x_res').val();
				var f = 'f(x) = log(x+1)*x*x';
				draw(FX1,  f);	
			}, 500);
			
		});
		
}); 

var draw = function(FX1, fx)
 {
     try
      	{
	      functionPlot(
	      {
	        target: '#plot',
	        yDomain: [-1, 10000],
	        xDomain: [0, 100],
	        width: 800,
  			height: 800,
  			grid: true,
	        data: [
	        {
	          fn: math.eval(fx),
	        },
	        {
	          fn: math.eval(FX1),
	        }
			]
	      });
	    }
	    catch (err)
	    {
	      console.log(err);
	      alert(err);
	    }
 };
