import Papa from "papaparse";
import moment from "moment";
import CryptoJS from "crypto-js";

export async function xlsxDataHandle(setValue) {
  var datePosition = moment().utc().local().dayOfYear();
  await Papa.parse(
    "https://docs.google.com/spreadsheets/d/e/2PACX-1vRcjHvJtHQqpUVd0FhYmrsZoLXSJUl6zQvh3_UkAuxLOJIQHWIKIJ1U-ZyIAap9z3XoQD3MWqfaIT31/pub?output=csv",
    {
      download: true,
      header: true,
      complete: (results) => {
       setValue(results.data[datePosition - 1]);
        //setValue(results.data[78]);
        console.log(results.data[datePosition - 1]);
        
      },
    }
  );
}

export function UTCExpireTime() {
  const currentDate = new Date();
  const utcMidnight = new Date(
    Date.UTC(
      currentDate.getUTCFullYear(),
      currentDate.getUTCMonth(),
      currentDate.getUTCDate() + 1,
      0,
      0,
      0
    )
  );

  return utcMidnight;
}

export function UTCNoExpireTime() {
  const expirationDate = new Date();
  expirationDate.setFullYear(expirationDate.getFullYear() + 10);
  return expirationDate;
}

export function HintGenarator(data) {
    //genarate hint 1
    var Hint1Array = [];
    var Hint2to4Array = [];
    var Hint5Array = [];

    if (data["Type A"] !== "") {
        Hint1Array.push(data["Type A"])       
    } 
    if (data["Type B"] !== "") {
        Hint1Array.push(data["Type B"])
    } 
    if (data["Type C"] !== "") {
        Hint1Array.push(data["Type C"])
    }
    //console.log(Hint1Array.length);
    
   //genarate hint 2 to 4
   var splitOT =  data["Original Title"].split(/\s+/);
   var splitBF =  data["Translation"].split(/\s+/);
   //console.log(splitOT,splitBF);
   
   //get first letter
   var firstofLetterOT = data["Original Title"].charAt(0).toLowerCase();
   var firstofLetterBF = data["Translation"].charAt(0).toLowerCase();
   if(firstofLetterOT !== firstofLetterBF && splitOT[0].toLowerCase() !== splitBF[0].toLowerCase())
    {
        Hint2to4Array.push("The first letter is '" + firstofLetterOT.toUpperCase() + "'");        
    }

   //get last letter
   var lastLetterOT = splitOT[splitOT.length-1].charAt(splitOT[splitOT.length-1].length-1).toLowerCase();
   var lastLetterBF = splitBF[splitBF.length-1].charAt(splitBF[splitBF.length-1].length-1).toLowerCase();

   if(lastLetterOT !== lastLetterBF && splitOT[0].toLowerCase() !== splitBF[0].toLowerCase() && splitOT[splitOT.length-1].toLowerCase() !== splitBF[splitBF.length-1].toLowerCase())
    {
        Hint2to4Array.push("The last letter is '" + lastLetterOT.toUpperCase() + "'");        
    }
  
    //first letter of second word
    if(splitOT.length >= 2)
    {
         var secondWordOT = splitOT[1].toLowerCase();
         var secondWordBF = splitBF[1].toLowerCase();
         var firstletterSecWordOT = secondWordOT.charAt(0).toLowerCase();

         if(secondWordOT !== secondWordBF)
         {
            Hint2to4Array.push("The second word begins with '" + firstletterSecWordOT.toUpperCase() + "'");        
         }
    }

    //get additonal media type 
    if(Hint1Array.length === 2)
    {
        Hint2to4Array.push("It's also a " + Hint1Array[1]);            
    }
    else if(Hint1Array.length === 3)
    {
        Hint2to4Array.push("It's also a " + Hint1Array[2]);      
    }

    //get era 
    if (data["Era"] !== "") {  
        Hint2to4Array.push("Popular in the " + data["Era"]);
    } 

    //mid gener hint arrayy
    if (data["Mid-Genre A"] !== "") {
        Hint2to4Array.push(data["Mid-Genre A"])       
    } 
    if (data["Mid-Genre B"] !== "") {
        Hint2to4Array.push(data["Mid-Genre B"])
    } 
    if (data["Mid-Genre C"] !== "") {
        Hint2to4Array.push(data["Mid-Genre C"])
    }

    //small word hint
    const duplicatedWords = findDuplicatedValues(splitOT, splitBF);
    //console.log(duplicatedWords);
    const WordArray = removeValuesFromArray(splitOT, duplicatedWords);
   //console.log(WordArray);
    var smallWord = null;
    
    WordArray.forEach(element => {
    if(element.length <= 4 && smallWord === null && splitOT.length > 1)
        {
            Hint2to4Array.push("Contains the word '" + element.toUpperCase() + "'")   
            smallWord = element      
        }
   });
   
   //hint 5
   if(data["Low-Genre"] !== ""){
    Hint5Array.push(data["Low-Genre"])     
   }
   else
   {
    Hint5Array.push(0)   
   }
    
   //larger word genarate
   var largeWord = null;  
   WordArray.forEach(element => {
    if(element.length >= 5 && largeWord === null && splitOT.length > 1) 
    {       
        Hint5Array.push("Contains the word '" + element.toUpperCase() + "'");  
        largeWord = element      
    }
    else if(largeWord === null )
     {
         Hint5Array.push(0)   
     }
   });

   //no of words genarate  
   if(splitOT.length === 1)
   {   
    Hint5Array.push(splitOT.length +  " word");
   }
   else if((splitOT.length - splitBF.length) > 2)
   {
    Hint5Array.push(splitOT.length +  " words");
   }
   else
   {
    Hint5Array.push(0)   
   }

   const finalHints2to4 = pickRandomValuesFromArray(Hint2to4Array, 3);
   var finalHint5 = removeValuesFromArray(Hint5Array,[0])
   const randomIndex5 = getRandomIndex(finalHint5);
   
  //  console.log(Hint1Array,"Hint 1");
  //  console.log(Hint2to4Array,"Hint 2 to 4");
  //  console.log(Hint5Array,"Hint 5 ");
  //  console.log(finalHints2to4,"Hint 2 to 4 Filtered"); 
  //  console.log(finalHint5[randomIndex5],"Hint 5 Filtered");
   
 
   return {Hint1: Hint1Array[0], Hint2: finalHints2to4[0] , Hint3: finalHints2to4[1] , Hint4: finalHints2to4[2] , Hint5: finalHint5[randomIndex5]}  
}

function findDuplicatedValues(arr1, arr2) {
    const duplicatedValues = arr1.filter((item) => arr2.includes(item)); 
    return duplicatedValues;
}
  
function removeValuesFromArray(arr, valuesToRemove) {
    const resultArray = arr.filter((item) => !valuesToRemove.includes(item)); 
    return resultArray;
  }

function getRandomIndex(array) {
    const randomIndex = Math.floor(Math.random() * array.length);
    return randomIndex;
  }

function pickRandomValuesFromArray(array, count) {
    if (count > array.length) {
      console.log('pickRandomValuesFromArray - Count exceeds the length of the array');
    }
    const copiedArray = [...array];

    for (let i = copiedArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
    }
  
    const randomValues = copiedArray.slice(0, count);
  
    return randomValues;
  }

export function EncryptOT(value) {
  var ciphertext = CryptoJS.AES.encrypt(value, 'U2FsdGVkX1+0T86NGIVRCVyj2DSd3kFCvNFZDfPmDnY=').toString();
  return ciphertext;
  }

export function DecryptOT(value) {
  var bytes  = CryptoJS.AES.decrypt(value, 'U2FsdGVkX1+0T86NGIVRCVyj2DSd3kFCvNFZDfPmDnY=');
  var originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
  }

  export function AccuracyCheck(OriginalTitle , submitedTitle) {
  const cleanAnswer = submitedTitle.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanCorrectAnswer = OriginalTitle.toLowerCase().replace(/[^a-z0-9]/g, '');

  const similarity = calculateSimilarity(cleanAnswer, cleanCorrectAnswer);
  
  if (
    similarity >= 90 || 
    (cleanAnswer.startsWith('the') && cleanCorrectAnswer.includes(cleanAnswer))
  ) {
    return true;
  }

  if (cleanAnswer.length === cleanCorrectAnswer.length - 1) {
    for (let i = 0; i < cleanCorrectAnswer.length; i++) {
      const partialAnswer = cleanCorrectAnswer.slice(0, i) + cleanCorrectAnswer.slice(i + 1);
      if (cleanAnswer === partialAnswer) {
        return true;
      }
    }
  }

  return false;
  } 

  function levenshteinDistance(str1, str2) {
    const m = str1.length;
    const n = str2.length;
    const dp = Array.from(Array(m + 1), () => Array(n + 1).fill(0));
  
    for (let i = 1; i <= m; i++) {
      dp[i][0] = i;
    }
  
    for (let j = 1; j <= n; j++) {
      dp[0][j] = j;
    }
  
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = str1[i - 1] === str2[j - 1] ? 0 : 1;
        dp[i][j] = Math.min(
          dp[i - 1][j] + 1,
          dp[i][j - 1] + 1,
          dp[i - 1][j - 1] + cost
        );
      }
    }
  
    return dp[m][n];
  }
  
  function calculateSimilarity(str1, str2) {
    const distance = levenshteinDistance(str1.toLowerCase(), str2.toLowerCase());
    const maxLength = Math.max(str1.length, str2.length);
    const similarity = 1 - distance / maxLength;
    return similarity * 100; // Convert to percentage
  }


//old logic to check accuracy
// export function AccuracyCheck(OriginalTitle , submitedTitle) {

//   const cleanActualTitle = OriginalTitle.replace(/[^\w\s]/g, '').toLowerCase();
//   const cleanSubmittedTitle = submitedTitle.replace(/[^\w\s]/g, '').toLowerCase();

//   const actualWithoutThe = cleanActualTitle.startsWith('the ') ? cleanActualTitle.substring(4) : cleanActualTitle;
//   const submittedWithoutThe = cleanSubmittedTitle.startsWith('the ') ? cleanSubmittedTitle.substring(4) : cleanSubmittedTitle;

//   const similarity = calculateSimilarity(actualWithoutThe, submittedWithoutThe);

//   return similarity >= 0.9;
// } 

// function calculateSimilarity(str1, str2) {
//   const len1 = str1.length;
//   const len2 = str2.length;
//   const matrix = Array.from({ length: len1 + 1 }, () => Array(len2 + 1).fill(0));

//   for (let i = 0; i <= len1; i++) {
//     for (let j = 0; j <= len2; j++) {
//       if (i === 0) {
//         matrix[i][j] = j;
//       } else if (j === 0) {
//         matrix[i][j] = i;
//       } else if (str1[i - 1] === str2[j - 1]) {
//         matrix[i][j] = matrix[i - 1][j - 1];
//       } else {
//         matrix[i][j] = 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
//       }
//     }
//   }

//   const maxLen = Math.max(len1, len2);
//   const similarity = 1 - matrix[len1][len2] / maxLen;

//   return similarity;
// }

export function GenarateCopyText(isWin , guessArray)
{ 
  var datePosition = moment().utc().local().dayOfYear();
  var attempt = 0;
  var incorrectGuesses = 0;
  var skips = 0;

  guessArray.filter(element => element !== null && element !== undefined)
  .forEach(element => {
    if(element.Guess !== null)
    {
      attempt++;
    }
    if(element.Guess === "SKIPPED" )
    {
      skips++;
    }   
    if(element.Result === false && element.Guess !== "SKIPPED")
    {
      incorrectGuesses++;
    } 
  });

  const pluralize = (count, singular, plural) => {
    return count === 1 ? `${count} ${singular}` : `${count} ${plural}`;
  };

  const Emojitext = guessArray.map((index) => {
    return (
      index === null
        ? "⬜"
        : index.Guess === "SKIPPED"
        ? "⬛"
        : index.Result
        ? "🟩"
        : "🟥"
    );
  }).join('');

  

  if(isWin)
  {
    return ({ 
      textAccessible :
      
      `Daily Befuddle #${datePosition}
      
Guessed correctly on the ${attempt === 1 ? '1st' : attempt === 2 ? '2nd': attempt === 3 ? '3rd' : `${attempt}th`} attempt with ` +
      `${pluralize(incorrectGuesses, 'incorrect guess', 'incorrect guesses')} and ` +
      `${pluralize(skips, 'skip', 'skips')}
      
https://befuddle.gg`,

  textEmoji : 
  `Daily Befuddle #${datePosition}
      
 `+(isWin ? "✔️" : "❌") + Emojitext +`
        
https://befuddle.gg`,

 

});

  }
  else 
  {
    return ({
      textAccessible :
      `Daily Befuddle #${datePosition}
      
Failed to guess after 5 attempts with `  +
      `${pluralize(incorrectGuesses, 'incorrect guess', 'incorrect guesses')} and ` +
      `${pluralize(skips, 'skip', 'skips')}
      
https://befuddle.gg`,

  textEmoji : 
  `Daily Befuddle #${datePosition}
      
 `+(isWin ? "✔️" : "❌") + Emojitext +`
        
https://befuddle.gg`,
    });
  }

  
}