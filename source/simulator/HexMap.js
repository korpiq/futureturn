
function HexMapSize(ns, nwse, nesw)
{
    if(ns) this.nwse = this.nesw = this.ns = ns;
    if(nwse) this.nwse = nwse;
    if(nesw) this.nesw = nesw;
}

HexMapSize.prototype =
{
    ns: 3,
    nwse: 3,
    nesw: 3,
    count: 0,

    getMinSide: function()
    {
        return this.nwse < this.nesw ? this.nwse : this.nesw;
    },
    getMaxSide: function()
    {
        return this.nwse > this.nesw ? this.nwse : this.nesw;
    },
    getHeight: function()
    {
        return this.nwse + this.nesw - 1;
    },
    getIndentForRow: function(row)
    {
        return (++row < this.nwse ? this.nwse - row : row - this.nwse);
    },
    getLengthForRow: function(row)
    {
        row1 = 1 + row;
        return this.ns +
            ( row1 < this.getMinSide() ? row
                : row1 < this.getMaxSide() ? this.getMinSide() - 1
                : this.getHeight() - row1
            );
    },
    getMiddleRow: function()
    {
        return Math.floor(this.getHeight() / 2);
    },
    getHexCount: function()
    {
        if (!this.count)
        {
            var row = this.getHeight();
            while(row--)
            {
                this.count += this.getLengthForRow(row);
            }
        }
        return this.count;
    },
    countHexesPerType: function (numberOfTypes)
    {
        return Math.ceil(this.getHexCount() / numberOfTypes);
    }
};

/**
 * @param args list of properties for new object
 */
function HexMap(args)
{
    this.displayContainer = document.body;
    if(args)
    {
        this.set(args);
    }
    this.clear();
}

HexMap.prototype = new PropertySetter().extend(
{
    displayContainer: document.body,
    size: new HexMapSize(3,3,3),
    hexCount: 0,
    directions: {
        north: [-1, -1],
        south: [1, 1],
        northeast: [-1, 0],
        northwest: [0, -1],
        southeast: [0, 1],
        southwest: [1, 0]
    },

    setSize: function(size)
    {
        this.setSizes(size, size, size);
    },
    setSizes: function(ns, nwse, nesw)
    {
        this.size = new HexMapSize(ns, nwse, nesw);
    },
    getCenterHex: function()
    {
        return this.hexes[Math.floor(this.hexes.length/2)];
    },
    draw: function()
    {
        this.clear();
        var height = this.size.getHeight();
        for(var y=0; y<height; ++y)
        {
            this.drawRow(y);
        }
    },
    drawRow: function(row)
    {
        var length = this.size.getLengthForRow(row);
        var middleRow = this.size.getMiddleRow();
        var left = row < middleRow ? this.size.getIndentForRow(row) : 0;
        var right = row > middleRow ? this.size.getIndentForRow(row) : 0;
        for(var x=0; x<length; ++x)
        {
            this.viewHexAt(this.newHex(x + left, x + right), x, row);
        }
    },
    newHex: function(x, y)
    {
        var hex = this.extend.call(
            document.createElement("div"),
            this.hexElementProperties
        );
        hex.className = "hex";
        hex.x = x;
        hex.y = y;
        hex.id = hex.getId(x,y);
        hex.image = this.newHexImage();
        hex.appendChild(hex.image);
        hex.appendChild(this.newHexText(x + ',' + y));
        this.hexes[this.hexes.length] = hex;
        return hex;
    },
    newHexImage: function()
    {
        var image = this.extend.call(
            new Image(),
            this.hexImageProperties
        );
        this.extend.call(
            image.style,
            this.hexImageStyleProperties
        );
        return image;
    },
    newHexText: function(text)
    {
        var t = document.createElement('div');
        t.textContent = text;
        t.style.paddingTop='0.3em';
        return t;
    },
    viewHexAt: function(hex, ns_edge_column, nwse_edge_row)
    {
        this.displayContainer.appendChild(hex);
        x = ns_edge_column + this.size.getIndentForRow(nwse_edge_row) / 2;
        hex.style.left = nwse_edge_row * hex.clientWidth;
        hex.style.top = x * hex.clientHeight;
    },
    clear: function()
    {
        var container = this.displayContainer;
        while(container.firstElementChild)
            container.removeChild(container.firstElementChild);
        this.hexes = [];
    },

    hexElementProperties: {
        onmouseover: function()
        {
            this.highlight();
        },
        onmouseout: function()
        {
            this.dehighlight();
        },
        highlight: function()
        {
            if(this.image.originalOpacity === undefined)
            {
                this.image.originalOpacity = this.image.style.opacity;
                this.image.style.opacity = 0.3;
            }
        },
        dehighlight: function()
        {
            if(this.image.originalOpacity !== undefined)
            {
                this.image.style.opacity = this.image.originalOpacity;
                delete(this.image.originalOpacity);
            }
        },
        onclick: function ()
        {
            if (game.selected instanceof GamePiece)
            {
                game.selected.put(this);
            }
            else
            {
                if (this.tile)
                {
                    this.tile.put(this.tile.bag);
                }
                else
                {
                    getGame().putTileFromCurrentBagTo(this);
                }
            }
            this.highlight();
        },
        add: function (tile)
        {
            if (this.tile)
            {
                throw "Adding tile to a hex map that already has one";
            }
            this.dehighlight();
            this.tile = tile;
            this.image.originalSrc = this.image.src;
            this.image.src = 'graphics/hex/' + tile.bag.name + '.svg';
        },
        remove: function (tile)
        {
            if (this.tile !== tile)
            {
                throw "Removing tile from map hex that does not have it";
            }
            this.tile = null;
            this.image.src = this.image.originalSrc;
        },
        getNeighbor: function(dx, dy)
        {
            var x = this.x + dx;
            var y = this.y + dy;
            return document.getElementById(this.getId(x,y));
        },
        getId: function(x,y)
        {
            return 'maphex' + x + ',' + y;
        },
        ondragover: function (event)
        {
            event.preventDefault();
        },
        ondrop: function (event)
        {
            var id = event.dataTransfer.getData('draggedId');
            var gamePieceElement = document.getElementById(id);
            var gamePiece = gamePieceElement.gamePiece;
            gamePiece.put(this);
        },
        style: {
            paddingTop: '0.3em'
        }
    },
    hexImageProperties: {
        src: 'graphics/hex/empty.svg'
    },
    hexImageStyleProperties: {
        position: 'absolute',
        width: '2.75em',
        left: '-0.4em',
        top: '-0.4em',
        opacity: 0.8,
        zIndex: -1
    }
});
