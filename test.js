function aa(){
	var num = 10;
	var sayAlert = function(){console.log(num);};
	num++;
	console.log('num : ' + num);
//	sayAlert();
	return sayAlert();
}
console.log('======================');
if(typeof aa == 'function') {
	aa();
} else {
	console.log('f');
}
console.log('======================');