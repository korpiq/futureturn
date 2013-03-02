function GamePiece(game, hex)
{
    this.game = game;
    this.element = new Image();
    this.extend.call(this.element, this.elementProperties);
    this.extend.call(this.element.style, this.elementStyleProperties);
    this.element.gamePiece = this;
    hex.parentElement.appendChild(this.element);
    this.put(hex);
}

GamePiece.prototype = new PropertySetter().extend(
{
    put: function(hex)
    {
        this.hex = hex;
        this.element.style.top =
            hex.offsetTop + hex.parentElement.offsetTop +
            (hex.offsetHeight - this.element.offsetHeight) / 2;
        this.element.style.left =
            hex.offsetLeft + hex.parentElement.offsetLeft +
            (hex.offsetWidth - this.element.offsetWidth) / 2;

        if (! hex.tile)
        {
            this.game.getCurrentBag().getTile().put(hex);
        }
        this.game.setCurrentBag(hex.tile.bag);
        var directions = this.game.hexmap.directions;
        for(var direction in directions)
        {
            var d = directions[direction];
            var neighbor = hex.getNeighbor(d[0], d[1]);
            if (neighbor && ! neighbor.tile)
            {
                this.game.getCurrentBag().getTile().put(neighbor);
            }
        }
    },

    elementProperties:
    {
        draggable: true,
        ondragstart: function (event)
        {
            event.dataTransfer.setData('draggedId', event.target.id);
        },
        onclick: function (event)
        {
            game.selected = this.gamePiece;
        },
        src: 'graphics/human.svg',
        id: 'game_piece0'
    },
    elementStyleProperties:
    {
        zIndex: 1,
        width: '1em',
        position: 'fixed'
    }
});
