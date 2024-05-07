

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



function Champion(CName, CPoints) {
    this.championName = CName;
    this.championPoints = CPoints;
}
