function HexTileBag(number, totalNumberOfHexTileBags, tilesInBag)
{
    this.number = number;
    this.color = this.decideColor(number, totalNumberOfHexTileBags);
    this.element = this.createElement();
    this.tileCount = tilesInBag;
    this.tiles = [];
    for(var i=0; i < tilesInBag; ++i)
    {
        this.createTile();
    }
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
                return this.tiles[tile.color] =
                    this.tiles[tile.color].slice(0,i).concat(
                        this.tiles[tile.color].slice(i+1)
                    );
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
        console.log(this.tiles);
    },
    createElement: function ()
    {
        var element = document.createElement('span');
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
    }
};
