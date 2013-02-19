function GameBuilder(mapContainer, bagsContainer, setInput, getIntInput)
{
    this.setInput = setInput;
    this.getIntIntput = getIntInput;
    this.game = new Game(mapContainer, bagsContainer, setInput, getIntInput);
}

GameBuilder.prototype =
{
    build: function ()
    {
        this.game.drawMapFromInput(); // counts hexesPerType
        this.riverTilebagId = getIntInput('river_id') - 1;
        this.game.createTileBags();
        this.mixTilesBetweenBags();
        return this.game;
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
        var tilebags = this.game.tilebags;
        for(var i = this.riverTilebagId + 1; i < tilebags.length; ++i)
        {
            var countToMove = getIntInput('rivers2terrain_bags');
            while(countToMove--)
                tilebags[riverTilebagId].getTile().put(this.tilesForBags[i]);
        }
    },
    mixNonRiverTilesToNeighborBags: function ()
    {
        var tilebags = this.game.tilebags;
        // FIXME: move from sea to river but from lowlands to sea?
        // FIXME: do not move from sea to mountain?
        for(var i = 0; i < tilebags.length; i = next)
        {
            var next = i + (this.isRiver(i+1) ? 2 : 1);
            var countToMove = getIntInput('tiles2neighbor_bags');
            var target = next % tilebags.length;
            while(countToMove--)
            {
                // from current bag to next
                tilebags[i].getTile().put(this.tilesForBags[target]);
                // from next bag to current
                tilebags[target].getTile().put(this.tilesForBags[i]);
            }
        }
    },
    addSeaTilesToRiverBag: function ()
    {
        var tilebags = this.game.tilebags;
        var countToMove = getIntInput('tiles2neighbor_bags');
        while(countToMove--)
        {
            tilebags[0].getTile().put(this.tilesForBags[this.riverTilebagId]);
        }
    },
    isRiver: function (bagNumber)
    {
        return bagNumber == this.riverTileBagId;
    },
    putTilesFromPilesToBags: function ()
    {
        var tilebags = this.game.tilebags;
        for(var i = 0; i < this.tilesForBags.length; ++i)
        {
            this.tilesForBags[i].putAll(tilebags[i]);
        }
    },
    getListOfEmptyPilesForEachTilebag: function ()
    {
        var tilebags = this.game.tilebags;
        var piles = [];
        while(piles.length < tilebags.length)
        {
            piles.push(new HexTilePile(tilebags[piles.length].name));
        }
        return piles;
    }
}
