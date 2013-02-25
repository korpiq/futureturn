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
        var hexmapSize = new HexMapSize(this.equator, this.sides, this.sides);
        var hexesPerType = hexmapSize.countHexesPerType(this.types);

        this.game = new Game({
            hexmap: this.createHexMap(hexmapSize),
            tilebags: this.createTileBags(hexesPerType),
            types: this.types
        });

        this.game.start();
        return this.game;
    },

    createHexMap: function (size)
    {
        return new HexMap({
            displayContainer: this.mapContainer,
            size: size
        });
    },
    createTileBags: function (hexesPerType)
    {
        var bagsBuilder = new TileBagSetBuilder({
            bagsContainer: this.bagsContainer,
            types: this.types,
            hexesPerType: hexesPerType,
            riverBagNumber: this.riverBagNumber,
            mixRivers2terrainBags: this.mixRivers2terrainBags,
            mixTiles2neighborBags: this.mixTiles2neighborBags
        });
        return bagsBuilder.build();
    }
});
