function GamePiece(hex)
{
    this.element = document.getElementById('game_piece');
    this.extend.call(this.element, this.elementProperties);
    this.extend.call(this.element.style, this.elementStyleProperties);
    this.element.gamePiece = this;
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
    },
    move: function(directionName)
    {
        
    },

    elementProperties:
    {
        draggable: true,
        ondragstart: function (event)
        {
            event.dataTransfer.setData('draggedId', event.target.id);
        }
    },
    elementStyleProperties:
    {
        zIndex: 1,
        width: '1em',
        position: 'fixed'
    }
});
