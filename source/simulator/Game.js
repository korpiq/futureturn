function Game(properties)
{
    this.set(properties);
}

Game.prototype = new PropertySetter().extend(
{
    hexmap: {},
    tilebags: [],
    types: 0,

    start: function ()
    {
        this.setCurrentBag(this.tilebags[Math.floor(this.tilebags.length/2 + 0.5)]);
        this.hexmap.draw();
        var centerHex = this.hexmap.getCenterHex();
        var startTile = this.currentBag.createTile();
        startTile.put(centerHex);
        this.piece = new GamePiece(this, centerHex);
    },
    setCurrentBag: function (bag)
    {
        if (this.currentBag)
            this.currentBag.becomeNonCurrent();
        this.currentBag = bag;
        bag.becomeCurrent();
    },
    getCurrentBag: function ()
    {
        if (! this.currentBag.hasTiles())
        {
            this.chooseNextBag();
        }
        return this.currentBag;
    },
    chooseNextBag: function ()
    {
        var number = this.currentBag.number - 1;
        var bag;
        var totalBags = this.tilebags.length;
        for(var offset=1; offset < totalBags; ++offset)
        {
            if (offset <= number)
            {
                bag = this.tilebags[number - offset];
                if (bag.name !== 'river' && bag.hasTiles())
                {
                    this.setCurrentBag(bag);
                    break;
                }
            }
            else if (number + offset < totalBags)
            {
                bag = this.tilebags[number + offset];
                if (bag.name !== 'river' && bag.hasTiles())
                {
                    this.setCurrentBag(bag);
                    break;
                }
            }
            else
            {
                throw "No bag has any tiles left";
            }
        }
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
