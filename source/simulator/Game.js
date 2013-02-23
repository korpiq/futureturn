function Game(hexmap, bagsContainer, setInput, getIntInput)
{
    this.hexmap = hexmap;
    this.bagsContainer = bagsContainer;
    this.setInput = setInput;
    this.getIntInput = getIntInput;

    this.tilebags = [];
}

Game.prototype =
{
    drawMapFromInput: function ()
    {
        var sides = this.getIntInput("sides");
        var equator = this.getIntInput("equator");

        this.hexmap.setSizes(equator, sides, sides);
        this.hexmap.draw();
    },
    createTileBags: function ()
    {
        this.removeTileBags();
        var count = this.getIntInput('types');
        var hexesPerType = this.hexmap.size.countHexesPerType(count);

        for(var i=0; i < count; ++i)
        {
            var name = rules.tileTypes[i] ? rules.tileTypes[i].name : i;
            this.tilebags.push(new HexTileBag(name, i+1, count, hexesPerType, this.bagsContainer));
        }
        this.setCurrentBag(this.tilebags[Math.floor(count/2 + 0.5)]);
        // decide starting type later currentBag.getTile().put(hexmap.getCenterHex());
    },
    setCurrentBag: function (bag)
    {
        if (this.currentBag)
            this.currentBag.becomeNonCurrent();
        this.currentBag = bag;
        bag.becomeCurrent();
    },
    putTileFromCurrentBagTo: function (target)
    {
        this.currentBag.getTile().put(target);
    },
    removeTileBags: function ()
    {
        while(this.tilebags.length)
        {
            var removeBag = this.tilebags.shift();
            this.bagsContainer.removeChild(removeBag.element);
        }
    },
    clear: function ()
    {
        if (this.hexes)
            this.hexes.clear();
        this.removeTileBags();
    }
}
