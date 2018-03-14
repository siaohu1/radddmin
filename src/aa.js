var str = '2018/03/12 22:44:57';
function reg(str) {
    return str.replace(/\//g, '-').split(' ')[0].replace(/\s/g, "");
}

console.log(reg(str));

var str1 = '2018/03/12 22:44:57'.replace(/\//g, '-').split(' ')[0].replace(/\s/g, "");
console.log(str1);
