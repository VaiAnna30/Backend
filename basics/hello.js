const {sum,sub}=require('./maths');
const fs=module.require('fs');
console.log(sum(2,3));
console.log(sub(2,3));

fs.mkdirSync('newfolder/a',{recursive:true});
