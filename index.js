var alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var finalWords = [];
var wordFormed = "";
var boxSelected = [];
var GRID_SIZE = 5;
//check spelling
checkSpellingAndAddWord = () =>{
    console.log('Formed Word : '+wordFormed);
    if(wordFormed === ""){
        toast("No word Found. Select some letters!!");
    }else{
        if(isValidWord(wordFormed)){
            finalWords.push(wordFormed);
            addWord(wordFormed);
            toast("Valid Word :- \""+ wordFormed+"\"");
        }else{
            toast("Invalid Word :- \""+ wordFormed+"\"");
        }
        reset();
    }
}
//logic to check the spelling
isValidWord = (word) =>{
    return true;
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
    boxSelected.forEach(elem =>{
        elem.style.backgroundColor = "white";
    });
    boxSelected = [];
    wordFormed = "";
}

//check adjecency
isAdjecent = (selectedBox) =>{
    var currentNumber = selectedBox.number;
    if(boxSelected.length == 0){
        //console.log('It is the first letter');
        return true;
    }
    var foundAdjecent = false;
    for(var i = 0 ; i < boxSelected.length ; i++){
        var boxNumber = boxSelected[i].number;
        //console.log('currentNumber '+currentNumber + ' | boxNumber '+ boxNumber);
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
            //console.log("Selected Letter : "+box.innerHTML);
        }else{
            //console.log("Selected Letter is not Adjecent");
            toast('Current letter is not connected to selected letters.');
            reset();
        }

    }else{
       // console.log("Already Selected Letter : "+box.innerHTML);
    }
}

//grid logic
grid = () =>{
    
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


window.onload = grid();


