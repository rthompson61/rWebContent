/**
 * set of utilities to build HTML controls on the fly
 */

function singleSelect(selectorAry)
/**
 * selectAry is a string Array, first value is the name of the singleSelect control, succeeding values become selections
 */
{
try{
	var ss = "<select name=\""+selectorAry[0]+"\">";
	for(var i = 1; i < selectorAry.length; i++){
		ss = ss + "<option value=\""+selectorAry[i]+"\">"+selectorAry[i]+"</option>";
	}
	ss=ss+"</select>";
	return ss;
}catch(err){
	return "Error: jsBuildHTMLControls.singleSelect" + err;
}
}

function singleSelectOnChange(selectorAry)
/**
 * selectAry is a string Array, first value is the name of the singleSelect control,
 * second value is the name of the onClick function, succeeding values become selections
 */
{
try{
	var ss = "<select id=\""+selectorAry[0]+"\" onchange=\""+selectorAry[1]+"()\">";
	for(var i = 2; i < selectorAry.length; i++){
		ss = ss + "<option value=\""+selectorAry[i]+"\">"+selectorAry[i]+"</option>";
	}
	ss=ss+"</select>";
	return ss;
}catch(err){
	return "Error: jsBuildHTMLControls.singleSelect" + err;
}
}

function singleSelectOnChangeObj(selectorObj, blankObj)
/**
 * selectobj is a object.  see definition
 * blank obj is a has just enough data to reset the control
 */
{
try{
	var ss= selectorObj.label+":";
	if(selectorObj.hidden ==1){ss= "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";}
	
	ss = ss+"&nbsp;&nbsp;<select id=\""+selectorObj.name+"\";" ;
	if(selectorObj.onchange != ""){
		ss = ss +  " onchange=\""+selectorObj.onchange+"()\"";
	}
	ss = ss + " style=\"visibility:";
	if(selectorObj.hidden ==0){
		ss=ss+"visible;\""
	}else{
		ss=ss+"hidden;\""
	}
	if(selectorObj.multiple > 0){
		ss = ss+  " multiple";
	}
	ss = ss +">";
	if(blankObj !== undefined){
		ss = ss + buildOption(blankObj);
	}
	for(var i = 0; i < selectorObj.options.length; i++){
		if(selectorObj.options[i].hasOwnProperty('label')){
			ss = ss + "<optgroup label=\""+selectorObj.options[i].label+"\">";
			for(var n = 0; n < selectorObj.options[i].options.length; n++){
				ss = ss + buildOption(selectorObj.options[i].options[n]);
			}
			ss = ss + "</optgroup>";
		}else{
			ss = ss + buildOption(selectorObj.options[i]);
		}
	}
	ss=ss+"</select>";
	return ss;
}catch(err){
	return "Error: jsBuildHTMLControls.singleSelectOnChangeObj" + err;
}
}

function buildOption(optObj){
	/*
	 * optionObject 
	 */
	try{
		var o = "<option value=\""+optObj.value+"\"";
		if(optObj.disabled> 0){o = o + " disabled";}
		if(optObj.selected> 0){o = o + " selected";}
		o = o + ">"+optObj.name+"</option>";
		return o;
	}catch(err){
		return "Error: jsBuildHTMLControls.buildOption" + err;
	}
}

function updateSelectorToValue(doc, id, params){
	/*
	 * Sets selected option 
	 */
	try{
		var optValue = params[0];
		var optAry = doc.getElementById(id).options;
//		window.alert("jsBuildHTMLControls.updateSelectorToValue -1: "+id+"-"+params[0]+">"+optAry.length);
		for(var i = 1; i< params.length; i++){
			if(params[1].indexOf("inner")==0){
				params[1] =params[1].slice(6);
			}
			optValue = optValue+"-"+params[i];
//			window.alert("jsBuildHTMLControls.updateSelectorToValue 0: "+id+"-"+params[i]);
		}
		for(var i = 1; i< optAry.length; i++){
			if(params.length == 1){
//				window.alert("jsBuildHTMLControls.updateSelectorToValue 1: "+id+"-Value"+doc.getElementById(id).options[0].value+" Selected"+doc.getElementById(id).options[0].selected);
				doc.getElementById(id).options[0].selected = true;
				i = optAry.length;
			}
			if(i < optAry.length && optAry[i].value == optValue){
//				window.alert("jsBuildHTMLControls.updateSelectorToValue 2: "+id+"-"+doc.getElementById(id).options[i]+optAry[i].value+" & "+optValue);
				doc.getElementById(id).options[i].selected = true;
				i = optAry.length;
			}else{
//				window.alert("jsBuildHTMLControls.updateSelectorToValue 3: "+id+"-"+optAry[i].value+" & "+optValue);
			}
			
		}
		return 1;
	}catch(err){
		window.alert("Error: jsBuildHTMLControls.updateSelectorToValue: Option Id: "+id+" - " + err);
	}
}
