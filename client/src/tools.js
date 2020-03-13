
export function formatAmount(num) {
    var p = parseFloat(num).toFixed(2).split(".");
    return "$" + p[0].split("").reverse().reduce(function(acc, num, i, orig) {
        return  num=="-" ? acc : num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}

export function logOut() {
    localStorage.clear()
   window.location.href = '/'
}
  
  
