var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var finalWords = [];
var wordFormed = "";
var boxSelected = [];
var GRID_SIZE = 5;
var dictionary = [];
var largestWordTillNow = "";
var valid_word_list;

function populateDictionary(word_list){
    valid_word_list = word_list;
    for(str in alphabets){
        var item = new Object();
        item[alphabets[str].toLowerCase()] = [];
        dictionary.push(item);
    }
    for(var i = 0; i < valid_word_list.length; i++){
        var currentAlpha = valid_word_list[i].charAt(0);
        var words = dictionary['\''+currentAlpha+'\''];
        if(words === undefined){
            words = [];
        }
        words.push(valid_word_list[i]);
        dictionary['\''+currentAlpha+'\''] = words;
    }
    //console.log(dictionary);
}

//check spelling
checkSpellingAndAddWord = () =>{
    if(wordFormed === ""){
        toast("No word Found. Select some letters!!");
    }else{
        console.log('Formed Word : '+wordFormed);
        if(isAlreadyFormed(wordFormed)){
            toast("Already covered :- \""+ wordFormed+"\"");
            console.log("Already covered :- \""+ wordFormed+"\"");
        }
        else if(isValidWord(wordFormed)){
            finalWords.push(wordFormed);
            addWord(wordFormed);
            updateLargestWord(wordFormed);
            toast("Valid Word :- \""+ wordFormed+"\"");
            console.log("Valid Word :- \""+ wordFormed+"\"");
        }else{
            toast("Invalid Word :- \""+ wordFormed+"\"");
            console.log("Invalid Word :- \""+ wordFormed+"\"");
        }
        reset();
    }
}
//logic to check the spelling
isValidWord = (word) =>{
    console.log(dictionary);
    var currentAlpha = word.toLowerCase().charAt(0);
    var words = dictionary['\''+currentAlpha+'\''];
    console.log('words '+words);
    for(var i = 0; i < words.length; i++){
        // compute score
        var element = words[i].toLowerCase();
        var nWord = word.toLowerCase();
        if(element === nWord){
            return true;
        }
    }
    return false;
}

updateLargestWord = (word) =>{
    console.log(largestWordTillNow);
    if(largestWordTillNow === "" || (largestWordTillNow !== word && largestWordTillNow.length < word.length)){
        largestWordTillNow = word;
    
        var words = document.getElementById("largestWord");
        var word = document.getElementsByClassName('largestWord');
     
        if(word[0] === undefined){
            word = document.createElement('span');
            word.innerHTML = wordFormed;
            word.className = 'largestWord';
            var span = document.createElement('span');
            span.innerHTML = '    ';
            words.appendChild(word);
            words.appendChild(span);
        }else{
            word[0].innerHTML = wordFormed;
        }
    }
}

isAlreadyFormed = (word) =>{
    for(var i = 0 ; i < finalWords.length ; i++){
        if(finalWords[i] === word) return true;
    }
    return false;
}
//notification on UI
toast = (Notification) => {
    document.getElementById("message").innerHTML = Notification;
    setInterval(function(){
        document.getElementById("message").innerHTML = "";
    },3000);
}
//adding the word to words found list
//add on UI
addWord = (wordFormed) => {
    var words = document.getElementById("words");
    var word = document.createElement('span');
    word.innerHTML = wordFormed;
    word.className = 'word';
    var span = document.createElement('span');
    span.innerHTML = '    ';
    words.appendChild(word);
    words.appendChild(span);
}
//reset the params
reset = () =>{
    console.log('reseting...');
    boxSelected.forEach(box =>{
        box.style.backgroundColor = "white";
        box.selected = false;
    });
    boxSelected = [];
    wordFormed = "";
}

//check adjecency
isAdjecent = (selectedBox) =>{
    var currentNumber = selectedBox.number;
    if(boxSelected.length == 0){
        console.log('It is the first letter');
        return true;
    }
    var foundAdjecent = false;
    for(var i = 0 ; i < boxSelected.length ; i++){
        var boxNumber = boxSelected[i].number;
        console.log('currentNumber '+currentNumber + ' | boxNumber '+ boxNumber);
        //check for all 8 directions
        //up
        if(currentNumber - GRID_SIZE == boxNumber){
            foundAdjecent = true;
            break;
        }
        //down
        else if(currentNumber + GRID_SIZE == boxNumber){
            foundAdjecent = true;
            break;
        }
        //left
        else if(currentNumber - 1 == boxNumber){
            foundAdjecent = true;
            break;
        }
        //right
        else if(currentNumber + 1 == boxNumber){
            foundAdjecent = true;
            break;
        }
        //diagonal left up
        else if(currentNumber - GRID_SIZE - 1 == boxNumber){
            foundAdjecent = true;
            break;
        }
        //diagonal left down
        else if(currentNumber + GRID_SIZE - 1 == boxNumber){
            foundAdjecent = true;
            break;
        }
        //diagonal right up
        else if(currentNumber - GRID_SIZE + 1 == boxNumber){
            foundAdjecent = true;
            break;
        }
        //diagonal right down
        else if(currentNumber + GRID_SIZE + 1 == boxNumber){
            foundAdjecent = true;
            break;
        }
    }
    return foundAdjecent;
}
//shuffle the list of Alphabets
function shuffle(s) {
    var arr = s.split('');           // Convert String to array
    
    arr.sort(function() {
      return 0.5 - Math.random();
    });  
    s = arr.join('');                // Convert Array to string
    return s;                        // Return shuffled string
}

//click event for each box
letterSelected = (box) =>{
    
    //if that letter is not yet selected,
    ////if it is not selected, it should be adjecent to any of the previously selected box
    if(!box.selected){
        if(isAdjecent(box)){
            wordFormed += box.innerHTML;
            box.style.backgroundColor = "orange";
            box.selected = true;
            boxSelected.push(box);
            console.log("Selected Letter : "+box.innerHTML);
        }else{
            console.log("Selected Letter is not Adjecent");
            toast('Current letter is not connected to selected letters.');
            reset();
        }

    }else{
        console.log("Already Selected Letter : "+box.innerHTML);
    }
}

//grid logic
grid = () =>{
    //updating grid size as per input
    GRID_SIZE = 5 * Math.floor(GRID_SIZE/5);
    //updating characters to fill all boxes
    var lettersCount = GRID_SIZE * GRID_SIZE;
    for(var i = 27; i < lettersCount ;){
        alphabets += alphabets;
        i += 26; //26 letters we have
    }
    //grid formation logic
    var container = document.createElement("div");
    container.className = "container";
    var shuffledString = shuffle(alphabets);
    var k = 0;
    for (var i=0; i < GRID_SIZE; i++) {
        var row = document.createElement("div");
        row.className = "row";
        row.id = "row" + i;
        for (var j=0; j < GRID_SIZE; j++) {
            var box = document.createElement("div");
            box.className = "box";
            box.id = "box" + j;
            box.number = k;
            box.style.width = (100/GRID_SIZE)+'%';
            box.setAttribute('selected', 'false');
            box.innerHTML = shuffledString[k];
            box.setAttribute('onclick','letterSelected(this)');
            row.appendChild(box);
            k++;
        }
        container.appendChild(row);
    }
    var main = document.getElementById('gameContainer');
    main.appendChild(container);
}

alert('This is a simple word finding game. \n\n How to Play? \n 1. Select word using tiles.\n 2. click "Add Word". if the word is correct, it will be shown in "Words Found" Section.\n 3. Hit "Clear Selection" to clear all tile selections. \n\n Refresh the page to play it with different combinations.\n HAVE FUN!!');
var size = prompt('Enter Grid Size (N should be multiple of 5 and less than 20)');
if(isNaN(parseInt(size))) {
    alert('Enter a valid Number as Grid Size. Refresh the window and try again!')
}else{
    GRID_SIZE = size;
    window.onload = grid();
    populateDictionary(english_word_list);
}



