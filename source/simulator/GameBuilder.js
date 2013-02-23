function GameBuilder(mapContainer, bagsContainer, setInput, getIntInput)
{
    this.setInput = setInput;
    this.getIntIntput = getIntInput;
    var hexmapSize = this.createHexMapSize(
        getIntInput("equator"),
        getIntInput("sides")
    );

    this.game = new Game(
        this.createHexMap(mapContainer, hexmapSize),
        bagsContainer,
        setInput,
        getIntInput
    );
}

GameBuilder.prototype =
{
    createHexMapSize: function(equator, sides)
    {
        return new HexMapSize(equator, sides, sides);
    },
    createHexMap: function (mapContainer, size)
    {
        return new HexMap({
            displayContainer: mapContainer,
            size: size
        });
    },
    build: function ()
    {
        this.riverTileBagId = getIntInput('river_id') - 1;
        this.game.createTileBags();
        this.mixTilesBetweenBags();
        this.game.drawMapFromInput();
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
        var riverbag = tilebags[this.riverTileBagId];
        for(var i = this.riverTileBagId + 1; i < tilebags.length; ++i)
        {
            var countToMove = Math.min(
                getIntInput('rivers2terrain_bags'),
                riverbag.getTotalNumberOfTiles()
            );
            while(countToMove--)
            {
                riverbag.getTile().put(this.tilesForBags[i]);
            }
        }
    },
    mixNonRiverTilesToNeighborBags: function ()
    {
        var tilebags = this.game.tilebags;
        var bagsBelow = tilebags.length;
        for(var i = 0; i < bagsBelow; i = next)
        {
            var next = i + (this.isRiver(i+1) ? 2 : 1);
            var target = next % tilebags.length;
            var countToMove = getIntInput('tiles2neighbor_bags');
            while(countToMove--)
            {
                tilebags[i].getTile().put(this.tilesForBags[target]);
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
            tilebags[0].getTile().put(this.tilesForBags[this.riverTileBagId]);
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
