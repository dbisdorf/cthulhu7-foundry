export class Cthulhu7ItemSheet extends ItemSheet {

    /** @override */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            classes: ["cthulhu7", "sheet", "item"],
            width: 450,
            height: 300,
            submitOnChange: false,
        });
    }

    /** @override */
    get template() {
    const path = "systems/cthulhu7/templates";
    return `${path}/${this.item.data.type}-sheet.html`;
    }

}
