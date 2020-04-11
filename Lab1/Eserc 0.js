"use strict mode"

let a = ["primo","secndo","terzo","quarto","a"]
let c;
for (b of a){
    c = "";
    if(b.length > 2){
        c = b.slice(0,2) + b.slice(-2);
    }    console.log(c);
    a[a.indexOf(b)] = c;
}
for(b of a){
    console.log(b);
}