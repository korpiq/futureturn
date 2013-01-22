function HexTileBag(number, totalNumberOfHexTileBags, tilesInBag)
{
    this.number = number;
    this.color = this.decideColor(number, totalNumberOfHexTileBags);
    this.element = this.createElement();
    this.tiles = [];
    for(var i=0; i < tilesInBag; ++i)
    {
        this.createTile();
    }

    this.viewTileAmounts();
}

HexTileBag.prototype = {
    createTile: function()
    {
        this.add(new HexTile(this));
    },
    remove: function(tile)
    {
        if (this.tiles[tile.color])
        {
            var i = this.tiles[tile.color].indexOf(tile);
            if (i !== undefined)
            {
                var tile = this.tiles[tile.color] =
                    this.tiles[tile.color].slice(0,i).concat(
                        this.tiles[tile.color].slice(i+1)
                    );
                this.viewTileAmounts();
                return tile;
            }
        }
        throw "Tried to remove tile from bag that does not contain it";
    },
    add: function(tile)
    {
        if (!tile.color)
            throw "Tried to add something colorless into bag";
        if (!this.tiles[tile.color])
            this.tiles[tile.color] = [];
        this.tiles[tile.color].push(tile);
        this.viewTileAmounts();
    },
    createElement: function ()
    {
        var element = document.createElement('div');
        element.style.position = 'fixed';
        element.style.left = (this.number * 1.2) + 'em';
        element.style.backgroundColor = this.color;
        element.style.textAlign = 'center';
        element.style.verticalAlign = 'middle';
        element.style.color = 'lightgray';
        element.style.fontSize = '2em';
        element.style.padding = '0.2em';
        element.style.margin = '0.2em';
        element.hexTileBag = this;
        element.onclick = function ()
        {
            currentHexTileBag.element.style.color = 'lightgray';
            currentHexTileBag = this.hexTileBag;
            this.style.color = 'white';
        }
        element.textContent = this.number;
        document.body.appendChild(element);
        return element;
    },
    decideColor: function(number, totalNumberOfHexTileBags)
    {
        var fraction = number / totalNumberOfHexTileBags;
        var red = 0, green = 0, blue = 0;
        var weight;
        if (fraction < 0.5)
        {
            weight = fraction*fraction*fraction * 6;
            var value = Math.round(155 * weight);
            green = value + 100;
            blue = 255 - value;
        }
        else if(fraction === 1)
        {
            red = green = blue = 180;
        }
        else
        {
            weight = (fraction-0.5) * 2;
            red = Math.round(255 * weight);
            green = 255 - red;
        }
        return "rgb(" + red + "," + green + "," + blue + ")";
    },
    viewTileAmounts: function()
    {
        if (! this.totalAmountElement)
        {
            this.totalAmountElement = this.createTotalAmountElement();
        }
        this.totalAmountElement.textContent = this.getTotalNumberOfTiles();
    },
    createTotalAmountElement: function()
    {
        var element = document.createElement('div');
        element.style.backgroundColor = this.color;
        element.style.textAlign = 'center';
        element.style.verticalAlign = 'middle';
        element.style.color = 'white';
        element.style.fontSize = '0.5em';
        element.style.padding = '0.1em';
        element.style.margin = '0.1em';
        element.textContent = '0';
        this.element.appendChild(element);
        return element;
    },
    getTotalNumberOfTiles: function()
    {
        var total = 0;
        for ( var color in this.tiles )
        {
            total += this.tiles[color].length;
        }
        return total;
    },
    getTile: function()
    {
        var total = this.getTotalNumberOfTiles();
        var it = Math.floor(Math.random()*total);
        for ( var color in this.tiles )
        {
            var length = this.tiles[color].length;
            if (it >= length)
            {
                it -= length;
            }
            else
            {
                return this.tiles[color][it];
            }
        }
        throw "getTile from bag without tiles";
    }
};
