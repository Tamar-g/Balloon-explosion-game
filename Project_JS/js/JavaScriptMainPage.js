var numPic = -1;
var selName;// select box
var playerName;



function Game(playerName, numElements, level, numPic) {
    this.gamePlayerName = playerName;
    this.gameNumElements = numElements;
    this.gameLevel = level;
    this.gameNumPic = numPic;
}


function Champion(CName, CPoints) {
    this.championName = CName;
    this.championPoints = CPoints;
}


function DuplicateNames(currentName) {
    // checking if there are dup names in select box
    var duplicate = false;
    // all the obj elements
    var theOption = document.querySelectorAll("#selectName>option");
   // var theOptions = document.querySelectorAll("select>option");
    for (var i = 0; i < theOption.length; i++) {
        if (theOption[i].text == currentName) {
            duplicate = true;
        }
    }
    return duplicate;
}


function putNames() {
    selName = document.querySelector("#selectName");
    // runing on 3 levels
    for (var level = 1; level <= 3; level++) {
        var key = "Level" + level;// or 1 or 2 or 3
        var Champions = JSON.parse(localStorage.getItem(key));
        if (Champions != null) {
            for (var i = 0; i < Champions.length; i++) {
                // if there are double names
                //Duplicate = DuplicateNames(Champions[i].championsName);
                Duplicate = DuplicateNames(Champions[i].championName);
                // if there are no dup name we need to add it to the names list
                if (Duplicate == false) {
                    var theOption = document.createElement("option");
                    theOption.textContent = Champions[i].championName;
                    selName.appendChild(theOption);

                }
            }
            // if there are values in the select attribut we cant show the text box
            document.querySelector("#PlayerName").style.display = "none"
        }
    }
}

function showText() {
    // click on "another"
    // to show the text box
    document.querySelector("#PlayerName").style.display = "inline";
    // to undo the choosing the select box
    selName.selectedIndex = 0;
}

function HideText() {
    // where choosing the select box we hide the text box
    document.querySelector("#PlayerName").style.display = "none";
}

function RemoveImages() {
    // where clicking on rand pic
    // the value of the img get 1 when its rand option
    numPic = 1;
    var ArrImg = document.querySelectorAll(".imgElements");
    var parentImg = document.querySelector("#ParentImages");
    for (var i = 0; i < ArrImg.length; i++) {
        parentImg.removeChild(ArrImg[i]);
    }
}

function CreateImages() {
    // when user want to choose the element(img)
    // creating img to choosing
    var parentImg = document.querySelector("#ParentImages");
    var ArrImg = [];
    for (var i = 0; i < 8; i++) {
        ArrImg[i] = document.createElement("img");
        parentImg.appendChild(ArrImg[i]);
        ArrImg[i].src = "../Images/elements/" + i + ".png";
        ArrImg[i].setAttribute("class", "imgElements");
        ArrImg[i].onclick = function (e) {
            chooseImg(e.target);
        }
    }
    ArrImg[0].style.border = "5px dotted #000000"// defualt border for the first img
    numPic = 0;// saving number img that have the border
}


function chooseImg(obj) {
    // putting a border around the choosing img
    var ArrImg = document.querySelectorAll(".imgElements");
    for (var i = 0; i < ArrImg.length; i++) {
        if (ArrImg[i] == obj) {
            ArrImg[i].style.border = "5px dotted #000000";
            numPic = i;// saving num img that user choosed
        }
        else {
            // to delete the previose border
            ArrImg[i].style.border = "none";
        }
    }
}

function goNext() {
    // to go to the game page
    // sending details
    // the player name:
    selName = document.querySelector("#selectName");
    if (selName.selectedIndex == 0) {
        // if wasnt choosing name
        // we need to take a name from the text box
        playerName = document.querySelector("#PlayerName").value;
    }
    else {
        // we will take a name from the list
        playerName = selName.options[selName.selectedIndex].textContent;
    }

    // num of elements
    var numElements = document.querySelector("#NumElements").value;
    // the level
    var level = document.querySelector("#level").value;

    //game obj
    var objGame = new Game(playerName, numElements, level, numPic);
    // saving to sending to the game page
    sessionStorage.Game = JSON.stringify(objGame);
    // going to the game page
    window.location = "secondPage.html";
}