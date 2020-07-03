import { Cthulhu7Sheet } from "./actor-sheet.js";
import { Cthulhu7ItemSheet } from "./item-sheet.js";
import Cthulhu7Actor from "./actor.js";

Hooks.once("init", async function() {
	console.log("Initializing Call of Cthulhu 7th Edition System");

	CONFIG.Actor.entityClass = Cthulhu7Actor;

	Actors.unregisterSheet("core", ActorSheet);
	Actors.registerSheet("cthulhu7", Cthulhu7Sheet, { makeDefault: true });

	Items.unregisterSheet("core", ItemSheet);
	Items.registerSheet("cthulhu7", Cthulhu7ItemSheet, { makeDefault: false });  
});
