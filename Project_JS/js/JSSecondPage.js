var WinWidth, WinHeight;
var numOfImages = 0;
var Mouse;
var points;
var MyImg = [];// pic who will creat
var Dir1 = [], Dir2 = [];// The directions of movement of the images
var ImgSize = [];// the pic size
var TheLeft = [], TheTop = [];//pics location
var objGame;

function Player(PName, PPoints, PLevel) {
    this.playerName = PName;
    this.playerPoints = PPoints;
    this.playerLevel = PLevel;
}



function Game(playerName, numElements, level, numPic) {
    this.gamePlayerName = playerName;
    this.gameNumElements = numElements;
    this.gameLevel = level;
    this.gameNumPic = numPic;
}



function putDetails() {
    // taking game det where the game page inloaud

    // objGame = JSON.parse(sessionStorage.Game);
    objGame = JSON.parse(sessionStorage.getItem('Game'));
    // objGame = JSON.parse(sessionStorage.getItem('playerDetails')).Game;

    //player name
    document.querySelector("#PlayerName").textContent = objGame.gamePlayerName;
    // how many elements
    var numElements = objGame.gameNumElements;
    // num pictuare
    var numPic = objGame.gameNumPic;
    if (numPic == -1) {
        // rand choosing img
        numPic = Math.floor(Math.random() * 8);
    }
    var TheElement = "../Images/elements/" + numPic + ".png";
    // rand choosing num of points
    var points = Math.floor(Math.random() * 100) + 10;

}

function addImg() {
    var elem = document.createElement("img");
    elem.setAttribute("src", "../ Images / the end.gif");
    document.querySelector("#finish").appendChild("elem");
}


function Init() {

    // fun for inited where the page is inlaoud
    WinWidth = window.innerWidth;
    WinHeight = window.innerHeight;


    //WinHeight = window.innerHeight + (document.querySelector("#PlayerName").height);
    points = 0;
    // objGame = JSON.parse(sessionStorage.Game);

    putDetails();
    document.querySelector("#PlayerName").textContent = objGame.gamePlayerName;
    document.querySelector("#Points").textContent = points;
    sizeA();
    //init the img of the elements
    var numPic = objGame.gameNumPic;
    if (numPic == -1) {
        // rand choosing img
        numPic = Math.floor(Math.random() * 8);
    }

    // clock pus for creating new element
    var inter = setInterval(function () {
        WinWidth = window.innerWidth;
        WinHeight = window.innerHeight;
        // create img
        numOfImages++;
        // MyImg[numOfImages] = document.querySelector("#gameArea").createElement("img");
        MyImg[numOfImages] = document.createElement("img");

        var TheElement = "../Images/elements/" + numPic + ".png";
       
        MyImg[numOfImages].src = TheElement;
        // adding the img to body
        document.body.appendChild(MyImg[numOfImages]);
        // random choosing the size of the pic between 30-99-bigger
        ImgSize[numOfImages] = Math.floor(Math.random() * 80) + 50;
        MyImg[numOfImages].style.width = ImgSize[numOfImages] + "px";
        MyImg[numOfImages].style.height = ImgSize[numOfImages] + "px";
        MyImg[numOfImages].style.position = "absolute";// with out SEDER and not catch a plase
        // choosing plase according to the wid and height of the screen
        TheLeft[numOfImages] = Math.floor(Math.random() * (WinWidth - ImgSize[numOfImages]));
        MyImg[numOfImages].style.left = TheLeft[numOfImages] + "px";
        //  MyImg[numOfImages].style.width = TheLeft[numOfImages] + "px";
        TheTop[numOfImages] = Math.floor(Math.random() * (WinHeight - ImgSize[numOfImages]));
        MyImg[numOfImages].style.top = TheTop[numOfImages] + "px";
        // adding class for the new img obj
        MyImg[numOfImages].classList.add("NewImages");
      
        Dir1[numOfImages] = Math.floor(Math.random() * 2);//0 or 1
        if (Dir1[numOfImages] == 0)
            Dir1[numOfImages] = -1;
        Dir2[numOfImages] = Math.floor(Math.random() * 2);//0 or 1
        if (Dir2[numOfImages] == 0)
            Dir2[numOfImages] = -1;
        //MyImg.onclick = function (e) {
        MyImg[numOfImages - 1].onclick = function (e) {
            //documante.body.removeChild(e.target);
            document.body.removeChild(e.target);
            points++;
            document.querySelector("#Points").textContent = points;

        }




        
        var numElements = objGame.gameNumElements;
        if (numOfImages >= numElements) {
            clearInterval(inter);// stopping the clock
            var TheImages = document.querySelectorAll("img");
            for (var i = 0; i < TheImages.length; i++) {
                TheImages[i].onclick = null;
                // to remove all pic from the game bord - body
                document.body.removeChild(TheImages[i]);
                document.querySelector("#finish").textContent = "Time’s up⏳";
            }
        }
    }, 500);
    

    var interMove = setInterval(function () {
        for (var i = 1; i < numOfImages; i++) {
            // use "parsentInt" to get int without "px"
            // r and l
            TheLeft[i] = parseInt(MyImg[i].style.left, 10);
            TheLeft[i] += 3 * Dir1[i];
            //TheLeft[i].style.left = TheLeft[i] + "px";
            MyImg[i].style.left = TheLeft[i] + "px";
            if ((TheLeft[i] <= 0) || (TheLeft[i] + ImgSize[i]+10 >= WinWidth+3))
                Dir1[i] = -Dir1[i];
            // d and u

            TheTop[i] = parseInt(MyImg[i].style.top, 10);
            TheTop[i] += 3 * Dir2[i];
            // TheTop[i].style.top = TheTop[i] + "px";
            MyImg[i].style.top = TheTop[i] + "px";
            if ((TheTop[i] <= 0) || (TheTop[i] + ImgSize[i] >= WinHeight+3))
                Dir2[i] = -Dir2[i];

        }
    }, 50);

}

function goChampions() {
    /*   var objGame = JSON.parse(sessionStorage.Game);*/
    //sending the player data to the champ page
    // create obj "player"
    //player name
    var playerName = document.querySelector("#PlayerName").textContent;
    // num points
    var points = document.querySelector("#Points").textContent;
    //level
    //var level = document.querySelector("#Level").textContent;
    var level = objGame.gameLevel;
    var objPlayer = new Player(playerName, points, level);
    sessionStorage.Player = JSON.stringify(objPlayer);

    window.location = "thirdPage.html";
}
function sizeA() {
    document.querySelector("footer").style.top = Window.innerHeight + "px";
}
function goToHomePage() {
    //window.location = "~/html/main.html";
    window.location = "main.html";
}




