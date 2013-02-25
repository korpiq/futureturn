function TileBagSetBuilder(properties)
{
    this.set(properties);
}

TileBagSetBuilder.prototype = new PropertySetter().extend(
{
    bagsContainer: document.body,
    types: 0,
    hexesPerType: 0,
    riverBagNumber: 0,
    mixRivers2terrainBags: 0,
    mixTiles2neighborBags: 0,
    mixEnds: true,

    build: function (properties)
    {
        this.set(properties);
        this.removeAnyExistingBagElements();
        this.tilebags = this.createTileBags();
        this.mixTilesBetweenBags();
        return this.tilebags;
    },

    createTileBags: function ()
    {
        var tilebags = [];

        for(var i=0; i < this.types; ++i)
        {
            var name = rules.tileTypes[i] ? rules.tileTypes[i].name : i;
            tilebags.push(new HexTileBag(
                name,
                i+1,
                this.types,
                this.hexesPerType,
                this.bagsContainer
            ));
        }
        return tilebags;
    },

    mixTilesBetweenBags: function ()
    {
        this.tilesForBags = this.getListOfEmptyPilesForEachTilebag();
        this.mixNonRiverTilesToNeighborBags();
        this.mixRiverTilesToTerrainBags();
        this.addSeaTilesToRiverBag();
        this.putTilesFromPilesToBags();
    },
    mixRiverTilesToTerrainBags: function ()
    {
        var riverBag = this.tilebags[this.riverBagNumber];
        for(var i = this.riverBagNumber + 1; i < this.tilebags.length; ++i)
        {
            var countToMove = Math.min(
                this.mixRivers2terrainBags,
                riverBag.getTotalNumberOfTiles()
            );
            this.move(countToMove, riverBag, this.tilesForBags[i]);
        }
    },
    mixNonRiverTilesToNeighborBags: function ()
    {
        var bagsBelow = this.tilebags.length - (this.mixEnds ? 0 : 1);
        for(var i = 0; i < bagsBelow; i = next)
        {
            var next = i + (this.isRiver(i+1) ? 2 : 1);
            var target = next % this.tilebags.length;
            var countToMove = this.mixTiles2neighborBags;
            this.move(countToMove, this.tilebags[i], this.tilesForBags[target]);
            this.move(countToMove, this.tilebags[target], this.tilesForBags[i]);
        }
    },
    addSeaTilesToRiverBag: function ()
    {
        var seaBag = this.tilebags[this.riverBagNumber - 1];
        var riverPile = this.tilesForBags[this.riverBagNumber];
        var countToMove = this.mixTiles2neighborBags;
        if (seaBag && riverPile)
            this.move(countToMove, seaBag, riverPile);
    },
    isRiver: function (bagNumber)
    {
        return bagNumber == this.riverBagNumber;
    },
    putTilesFromPilesToBags: function ()
    {
        for(var i = 0; i < this.tilesForBags.length; ++i)
        {
            this.tilesForBags[i].putAll(this.tilebags[i]);
        }
    },
    getListOfEmptyPilesForEachTilebag: function ()
    {
        var piles = [];
        while(piles.length < this.tilebags.length)
        {
            piles.push(new HexTilePile(this.tilebags[piles.length].name));
        }
        return piles;
    },
    removeAnyExistingBagElements: function ()
    {
        while(this.bagsContainer.firstElementChild)
        {
            this.bagsContainer.firstElementChild.remove();
        }
    },
    move: function (n, from, to)
    {
        while(n--)
        {
            from.getTile().put(to);
        }
    }
});
