function HexTileBag(name, number, totalNumberOfHexTileBags, tilesInBag, containerElement)
{
    this.name = name;
    this.number = number;
    this.color = this.decideColor(number, totalNumberOfHexTileBags);
    this.element = this.createElement(containerElement);
    this.tiles = [];
    this.amountElements = [];
    for(var i=0; i < tilesInBag; ++i)
    {
        this.createTile();
    }

    this.viewTileAmounts();
}

HexTileBag.prototype = {
    createTile: function()
    {
        var tile = new HexTile(this);
        this.add(tile);
        return tile;
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
        throw "Tried to remove tile from bag '" + this.name + "' that does not contain it";
    },
    add: function(tile)
    {
        if (!tile.color)
            throw "Tried to add something colorless into bag '" + this.name + "'";
        if (!this.tiles[tile.color])
            this.tiles[tile.color] = [];
        this.tiles[tile.color].push(tile);
        this.viewTileAmounts();
    },
    createElement: function (containerElement)
    {
        var element = document.createElement('div');
        element.style.position = 'fixed';
        element.style.left = ((this.number - 1) * 4) + 'em';
        element.style.width = '4em';
        element.style.height = '10em';
        element.style.backgroundColor = this.color;
        element.style.textAlign = 'center';
        element.style.verticalAlign = 'middle';
        element.style.color = 'lightgray';
        element.style.padding = '0';
        element.style.margin = '0';
        element.hexTileBag = this;
        element.onclick = function ()
        {
            getGame().setCurrentBag(this.hexTileBag);
            game.selected = this.hexTileBag;
        }
        var nameElement = document.createElement('div');
        nameElement.textContent = this.name;
        element.appendChild(nameElement);
        containerElement.appendChild(element);
        return element;
    },
    becomeCurrent: function ()
    {
        this.element.style.color = 'white';
    },
    becomeNonCurrent: function ()
    {
        this.element.style.color = 'lightgray';
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
        for(var color in this.tiles)
        {
            var amountElement = this.getAmountElement(color);
            amountElement.textContent = this.tiles[color].length;
        }
    },
    getAmountElement: function(color)
    {
        if (! this.amountElements[color])
        {
            this.amountElements[color] =
                this.createAmountElement(color)
        }
        return this.amountElements[color];
    },
    createTotalAmountElement: function()
    {
        var totalAmountElement = this.createAmountElement(this.color);
        totalAmountElement.style.fontWeight = 'bold';
        return totalAmountElement;
    },
    createAmountElement: function(backgroundColor, size)
    {
        var element = document.createElement('div');
        element.style.backgroundColor = backgroundColor;
        element.style.textAlign = 'center';
        element.style.verticalAlign = 'middle';
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
        throw "getTile from bag '" + this.name + "' without tiles";
    },
    hasTiles: function ()
    {
        for ( var color in this.tiles )
        {
            if (this.tiles[color].length)
            {
                return true;
            }
        }
        return false;
    }
};
