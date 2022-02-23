function clone(item) {
    /*
    Deep clone objects
    From: https://frontbackend.com/javascript/what-is-the-the-fastest-way-to-deep-clone-an-object-in-javascript
    */
    if (!item) { return item; } // null, undefined values check

    var types = [ Number, String, Boolean ], 
        result;

    // normalizing primitives if someone did new String('aaa'), or new Number('444');
    types.forEach(function(type) {
        if (item instanceof type) {
            result = type( item );
        }
    });

    if (typeof result == "undefined") {
        if (Object.prototype.toString.call( item ) === "[object Array]") {
            result = [];
            item.forEach(function(child, index, array) { 
                result[index] = clone( child );
            });
        } else if (typeof item == "object") {
            // testing that this is DOM
            if (item.nodeType && typeof item.cloneNode == "function") {
                result = item.cloneNode( true );    
            } else if (!item.prototype) { // check that this is a literal
                if (item instanceof Date) {
                    result = new Date(item);
                } else {
                    // it is an object literal
                    result = {};
                    for (var i in item) {
                        result[i] = clone( item[i] );
                    }
                }
            } else {
                // depending what you would like here,
                // just keep the reference, or create new object
                if (false && item.constructor) {
                    // would not advice to do that, reason? Read below
                    result = new item.constructor();
                } else {
                    result = item;
                }
            }
        } else {
            result = item;
        }
    }

    return result;
}

function dec2Hex(val){
    //converts decimal to hexidecmal
    try {
        var strVal = "";
        if(val > 9){
            switch(val){
                case 10 : strVal = "A"; break;
                case 11 : strVal = "B"; break;
                case 12 : strVal = "C"; break;
                case 13 : strVal = "D"; break;
                case 14 : strVal = "E"; break;
                case 15 : strVal = "F"; break;
                case 16 : strVal = "G"; break;
                case -1 : strVal = "S"; break;
                case -2 : strVal = "R"; break;
            }
        }else{
            strVal = val.toString();
        }
        return strVal;
    } catch (error) {
        window.alert("jsTravellerSystemConfig.dec2Hex: "+error);
    }
}

function integer_to_roman(num) {
    //Copied from the inetrnet.  Exists on mulitple sites
    //https://www.w3resource.com/javascript-exercises/javascript-math-exercise-21.php
    if (typeof num !== 'number') 
    return false; 
    
    var digits = String(+num).split(""),
    key = ["","C","CC","CCC","CD","D","DC","DCC","DCCC","CM",
    "","X","XX","XXX","XL","L","LX","LXX","LXXX","XC",
    "","I","II","III","IV","V","VI","VII","VIII","IX"],
    roman_num = "",
    i = 3;
    while (i--)
    roman_num = (key[+digits.pop() + (i * 10)] || "") + roman_num;
    return Array(+digits.join("") + 1).join("M") + roman_num;
    }