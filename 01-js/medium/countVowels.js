/*
  Implement a function `countVowels` that takes a string as an argument and returns the number of vowels in the string.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {

  str = str.toLowerCase();
  let vowels = ['a','e','i','o','u'];
  let count =0 ;
  for (let i = 0; i < str.length; i++) {
    let isVowel =  vowels.indexOf(str[i]);
    if(isVowel!=-1){
      count++;
    }
  }
  return count;
  
  
}

module.exports = countVowels;