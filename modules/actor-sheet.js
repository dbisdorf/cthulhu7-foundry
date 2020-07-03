export class Cthulhu7Sheet extends ActorSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["cthulhu7", "sheet", "actor"],
            width: 950,
            height: 650,
            tabs: [{ navSelector: ".sheet-tabs", contentSelector: ".sheet-body", initial: "skills" }]
        });
    }

    /** @override */
    get template() {
        const path = "systems/cthulhu7/templates";
        return `${path}/${this.actor.data.type}-sheet.html`;
    }

    /** @override */
    async getData() {
        const data = super.getData();
        const actorData = data.actor;
        const weapons = [];
        const spells = [];
        for (let i of data.items) {
            if (i.type == 'weapon') {
                weapons.push(i);
            } else if (i.type == 'spell') {
                spells.push(i);
            }
        }
        actorData.weapons = weapons;
        actorData.spells = spells;
        return data;
    }


    /** @override */
    activateListeners(html) {
        super.activateListeners(html);

        html.find('.rollable').on('click', this._onRollable.bind(this));

        html.find('.recover-button').on('click', this._onRecover.bind(this));

        html.find('.item-create').on('click', this._onItemCreate.bind(this));
        html.find('.item-edit').on('click', this._onItemEdit.bind(this));
        html.find('.item-delete').on('click', this._onItemDelete.bind(this));
    }

    async _onRollable(event) {
        event.preventDefault();

        const target = event.currentTarget;
        const clickData = target.dataset;
        const actorData = this.actor.data.data;

        let result = 'Failure';
        let die = new Die(100);
        die.roll();
        if (die.total <= clickData.target / 5) {
            result = 'Success vs. Extreme difficulty';            
        } else if (die.total <= clickData.target / 2) {
            result = 'Success vs. Hard difficulty';
        } else if (die.total <= clickData.target) {
            result = 'Success vs. Normal difficulty';
        } else if (die.total > 99) {
            result = 'Fumble';
        }

        let template = 'systems/cthulhu7/templates/chat-roll.html';
        let chatData = {
            user: game.user._id,
            speaker: ChatMessage.getSpeaker({ actor: this.actor }),
            sound: CONFIG.sounds.dice
        };
        let templateData = {
            label: clickData.label,
            roll: die.total,
            result: result
        };
        renderTemplate(template, templateData).then(content => {
            chatData.content = content;
            ChatMessage.create(chatData);
        });

    }

    async _onRecover(event) {
        event.preventDefault();
        const actorData = this.actor.data.data;
        const updates = {};
        for (const resource of Object.keys(actorData.resources)) {
            updates['resources.' + resource + '.now'] = actorData.resources[resource]['max'];
        }
        console.log(updates);
        await this.actor.update({data: updates});
    }

    async _onItemCreate(event) {
        event.preventDefault();

        const target = event.currentTarget;
        const clickData = target.dataset;
        const itemData = {
            name: clickData.itemType,
            type: clickData.itemType,
            data: {}
        };
        return this.actor.createOwnedItem(itemData);
    }

    async _onItemEdit(event) {
        event.preventDefault();
        const row = event.currentTarget.closest(".item-row");
        const weapon = this.actor.getOwnedItem(row.dataset.itemId);
        weapon.sheet.render(true);    
    }

    async _onItemDelete(event) {
        event.preventDefault();
        const row = event.currentTarget.closest(".item-row");
        this.actor.deleteOwnedItem(row.dataset.itemId);
    }

}