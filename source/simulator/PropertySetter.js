function PropertySetter() {}

PropertySetter.prototype =
{
    extend: function(extension)
    {
        for(var key in extension)
        {
            this[key] = extension[key];
        }
        return this;
    },
    set: function(properties)
    {
        for(var key in properties)
        {
            if (! (key in this))
                throw "Set nonexisting property '" + key + "' of " + this.constructor.name;
            this[key] = properties[key];
        }
        return this;
    }
}
