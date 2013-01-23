futureturn development plan
===========================

* source of this document is in plan.md
* multimarkdown command is used to produce plan.html from the source

parallel development iterations
-------------------------------

Different aspects of the game development described below will probably be
done in parallel, so that each serves as input or guidance for the other.

rule development
----------------

Once we have a rough simulator, or soon as it seems the simulator might benefit
from such, we should start formulating game concepts and actual items such as
individual rules and cards into a precise description, preferably machine readable.

### Why

* Machine readability + minimal form and expression
    * -> Coherence
        * -> Ease of understanding
            * + many other aspects, what?
                * -> playability
* Machine readability
    * -> autotestability
        * + understanding of autotesting
            * -> better understanding of rules
                * -> better rules
                    * -> better game (one can hope)
        * probably too much of a burden, but still maybe of some help

### YAML

YAML is my current favorite for this, as it is natural enough
(minimum syntactic noise) for expressing ideas on a somewhat high level,
and the schema of such an ad hoc document can be deduced thereof.

simulator
---------

A tool for trying out the rules without producing physical objects.

### done

* fix map to diamond shape so that it better resembles map of a planet surface,
    with considerably more width than height, but still have single-hex poles.

### TODO

* add ability to move tiles between bags so we can have mixed contents
    * manually by dragging and dropping (ad-hoc)
    * programmatically by specifying amounts to move between sets of bags
    * by rules (once and if machine readable)
* view counts of tiles of different colors separately in each bag
* units for players
* move player units on map
* draw map according to hard-coded rules as player units move
* draw map according to specified rules as player units move
* optional remote sync between game instances so we can test while we chat
* separate players
* card decks to draw from
* card effects changing the game
* save game history for later analysis
* replay game history for later analysis
* rewind/fast forward game history

card development
----------------

We'll have at least a tech tree (of technical/scientific/social advancements).

* game goals are advancement cards describing a game end (winning) condition.

We'll probably have also

* unit property cards that enabling techs allow to build onto unit type boards
* opportunity cards drawn from deck(s) to player hands and played
    * on unit property cards to modify their properties or behavior (culture)
    * as one-time actions to change the outcome of specific game situations (spy)

Opportunity cards would represent

* revelations on the planet
    * when you move onto a tile marked as a revelation point
        * these should be somewhat frequent to motivate exploration
    * drawn from separate revelation deck(s)
* the resourcefulness of your people
    * you might be able to draw as many cards per turn as you have unit types
        * here unit types represent different ways of thinking in your civilization
    * game developments might add sets to the cards in your personal deck

Cards of different types and for alternative rulesets should be specified
in their own YAML files.

They should have properties described so that we can analyse
or even try them out in the simulator somehow.

balance
-------

The main game should be against the board.

The board should react to players' units, especially production/extraction of
resources, by adverse effects such as pollution, eventually leading to
catastrophes and environmental change.

The beginning main goal is to survive threat of the crumbling environment by
building another generation ship to return to space.
Other goals such as an environmental balance
may prove easier to reach during some games.

We should develop a good balance here

* from the beginning with only a few units with few or no special properties
* as the civilications develop, the challenges should get worse
