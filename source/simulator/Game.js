function Game(properties)
{
    this.set(properties);
}

Game.prototype = new PropertySetter().extend(
{
    hexmap: {},
    tilebags: {},
    types: 0,

    start: function ()
    {
        this.setCurrentBag(this.tilebags[Math.floor(this.tilebags.length/2 + 0.5)]);
        this.hexmap.draw();
        var centerHex = this.hexmap.getCenterHex();
        var startTile = this.currentBag.createTile();
        startTile.put(centerHex);
        this.piece = new GamePiece(centerHex);
        var directions = this.hexmap.directions;
        for(var direction in this.hexmap.directions)
        {
            var d = directions[direction];
            var neighbor = centerHex.getNeighbor(d[0], d[1]);
            this.currentBag.getTile().put(neighbor);
        }
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
            this.tilebags.shift().element.remove();
        }
    },
    clear: function ()
    {
        if (this.hexes)
            this.hexes.clear();
        this.removeTileBags();
    }
});
