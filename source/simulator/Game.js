function Game(mapContainer, bagsContainer, setInput, getIntInput)
{
    this.mapContainer = mapContainer;
    this.bagsContainer = bagsContainer;
    this.setInput = setInput;
    this.getIntInput = getIntInput;

    this.tilebags = [];
    this.hexmap = new HexMap({
        displayContainer: this.mapContainer
    });
}

Game.prototype =
{
    setPlayers: function (players)
    {
        this.players = parseInt(players);
        this.setSides(6 + this.players);
    },
    setSides: function (value)
    {
        this.setInput("sides", value);
        this.updateEquator();
    },
    updateEquator: function ()
    {
        var sideOddity = this.getIntInput("sides") % 2;
        var multiplier = this.getIntInput("equator_multiplier");
        this.setInput("equator", 2 + multiplier * sideOddity);

        this.drawMapFromInput();
    },
    drawMapFromInput: function ()
    {
      var sides = this.getIntInput("sides");
      var equator = this.getIntInput("equator");

      this.hexmap.setSizes(equator, sides, sides);
      this.hexmap.draw();

      report();
      updateMixes();
    },
    createTileBags: function ()
    {
        while(this.tilebags.length)
        {
            var removeBag = this.tilebags.shift();
            this.bagsContainer.removeChild(removeBag.element);
        }
        var count = parseInt(document.getElementById('types').value);

        for(var i=0; i < count; ++i)
        {
            var name = rules.tileTypes[i] ? rules.tileTypes[i].name : i;
            this.tilebags.push(new HexTileBag(name, i+1, count, hexesPerType, this.bagsContainer));
        }
        currentHexTileBag = this.tilebags[Math.floor(count/2 + 0.5)];
        currentHexTileBag.element.click();
        // decide starting type later currentHexTileBag.getTile().put(hexmap.getCenterHex());
        mixTilesBetweenBags();
    }
}
