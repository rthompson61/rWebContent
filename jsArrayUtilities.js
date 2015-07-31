/**
 * Set of Common array utilities in a stand alone JS file
 */

function ripper(into){
	//breaks string into a weighted array.  Weights are randomly assigned from the Fibonacci sequence
	try{
		var iAry = into.split(",");
		var outto = "";
		var fibAry = [1,1,2,3,5,8,13,21];
		var rndV = Math.floor(Math.random()*8);
		for(var i = 0; i < iAry.length; i++){
			rndV = Math.floor(Math.random()*8);
			
			outto = outto+"["+fibAry[rndV]+",\""+iAry[i]+"\"],";
		}
		return outto;
	}catch(err){
		return "Ripper: "+err.message;
	}
}


function totalBinaryArray(ary, cntr){
 try{
  //input is a multidimensional array where the [cntr] element of each subarray is an integer
  //[[n, "value"],[n, "value"]]
  if(cntr == null || isNaN(cntr) || cntr < 0 || cntr > ary.length){
	  var cntr = 0;
  }
  var tot = 0;
  for (a = 0; a< ary.length; a++){
   if( !isNaN(ary[a][cntr])){
    tot = tot + ary[a][cntr];
   }
  }
  return tot;
 }catch(err){
  return "totalBinaryArray  "+err;
 } 
 }

function selectFromWeightedArray(ary, cntr){
	 try{
	  //input is a multidimensional array where the [cntr] element of each subarray is an integer
	  //[[n,(,n,...) "value"],[n,(,n,...)"value"]] and the final element in the array is the value to be returned.
	  if(cntr == null || isNaN(cntr) || cntr < 0 || cntr > ary.length){
		  cntr = 0;
	  }
	  var rndVal = Math.floor(Math.random()*totalBinaryArray(ary, cntr))+1;
	  var oVal = rndVal;
	  if( isNaN(rndVal)){
		  rndVal = 0;
	  }
	  var oVal = rndVal;
	  for (a = 0; a< ary.length; a++){
	   if( !isNaN(ary[a][cntr])){
	    if(rndVal <= ary[a][cntr] ){
	     val = ary[a][ary[a].length-1];//+"::"+a+"::"+ary.length;
	     a = ary.length+111;
	    }else{
	     rndVal = rndVal - ary[a][cntr]; 
	    }
	   }
	  }
	  return val;
	 }catch(err){
	  return  "selectFromWeightedArray  "+err.message+ "| "+ary +" | "+cntr+" | "+oVal+" | "+rndVal;
	 } 
	 }
