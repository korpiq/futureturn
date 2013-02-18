function HexTilePile(name)
{
    this.tiles = [];
    this.name = name;
}

HexTilePile.prototype = {
    add: function(tile)
    {
        this.tiles.push(tile);
    },
    remove: function(tile)
    {
        var i = this.tiles.indexOf(tile);
        if (i >= 0)
        {
            return this.tiles.splice(i, 1);
        }
        throw "Tried to remove missing tile '" + tile + "' from pile '" + this.name + "'";
    },
    putAll: function(bag)
    {
        while(this.tiles.length)
        {
            this.tiles[0].put(bag);
        }
    }
}
