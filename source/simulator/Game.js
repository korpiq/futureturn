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
