function GameBuilder(mapContainer, bagsContainer)
{
    this.mapContainer = mapContainer;
    this.bagsContainer = bagsContainer;
}

GameBuilder.prototype = new PropertySetter().extend(
{
    types: 0,
    players: 0,
    sides: 0,
    equator: 0,
    riverBagNumber: 0,
    mixRivers2terrainBags: 0,
    mixTiles2neighborBags: 0,

    build: function ()
    {
        var hexmapSize = this.createHexMapSize(
            this.equator,
            this.sides
        );
        var hexmap = this.createHexMap(this.mapContainer, hexmapSize);
        tilebags = this.createTileBags(this.types, hexmapSize.countHexesPerType(this.types));

        this.game = new Game(
            hexmap,
            tilebags,
            this.setInput,
            this.getIntInput
        );
        this.game.set({
            types: this.types
        });

        this.mixTilesBetweenBags();
        this.game.start();
        return this.game;
    },

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
    createTileBags: function (numberOfTypes, hexesPerType)
    {
        var tilebags = [];
        
        for(var i=0; i < numberOfTypes; ++i)
        {
            var name = rules.tileTypes[i] ? rules.tileTypes[i].name : i;
            tilebags.push(new HexTileBag(
                name,
                i+1,
                numberOfTypes,
                hexesPerType,
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
        var tilebags = this.game.tilebags;
        var riverbag = tilebags[this.riverBagNumber];
        for(var i = this.riverBagNumber + 1; i < tilebags.length; ++i)
        {
            var countToMove = Math.min(
                this.rivers2terrainBags,
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
            var countToMove = this.mixTiles2neighborBags;
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
        var countToMove = this.mixTiles2neighborBags;
        while(countToMove--)
        {
            tilebags[0].getTile().put(this.tilesForBags[this.riverBagNumber]);
        }
    },
    isRiver: function (bagNumber)
    {
        return bagNumber == this.riverBagNumber;
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
});
