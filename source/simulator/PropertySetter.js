function PropertySetter() {}

PropertySetter.prototype =
{
    extend: function(target)
    {
        for(var key in this)
        {
            if (! (key in target))
                target[key] = this[key];
        }
        target.parent = this;
        return target;
    },
    set: function(properties)
    {
        for(var key in properties)
        {
            if (! (key in this))
                throw "Set nonexisting property '" + key + "'";
            this[key] = properties[key];
        }
        return this;
    }
}
