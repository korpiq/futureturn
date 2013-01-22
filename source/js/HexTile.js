function HexTile(bag)
{
    this.color = bag.color;
    this.location = bag;
    this.bag = bag;
}

HexTile.prototype =
{
    put: function (newLocation)
    {
        this.location.remove(this);
        this.location = newLocation;
        this.location.add(this);
    }
}
