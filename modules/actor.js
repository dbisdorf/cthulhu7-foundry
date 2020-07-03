export default class Cthulhu7Actor extends Actor {
    prepareData() {
        super.prepareData();

        const actorData = this.data;
        const data = actorData.data;

        data.resources.mp.max = Math.floor(data.characteristics.pow.rating / 5);
        data.resources.hp.max = Math.floor((data.characteristics.siz.rating + data.characteristics.con.rating) / 10);
        data.resources.san.max = data.characteristics.pow.rating;

        let strplussiz = data.characteristics.str.rating + data.characteristics.siz.rating;
        if (strplussiz <= 64) {
            data.dmg = "-2";
            data.build = -2;
        } else if (strplussiz <= 84) {
            data.dmg = "-1";
            data.build = -1;
        } else if (strplussiz <= 124) {
            data.dmg = "0";
            data.build = 0;
        } else if (strplussiz < 164) {
            data.dmg = "+1d4";
            data.build = 1;
        } else {
            data.dmg = "+1d6";
            data.build = 2;
        }

        data.skills.dodge.base = Math.floor(data.characteristics.dex.rating / 2);
        if (data.skills.dodge.rating < data.skills.dodge.base) {
            data.skills.dodge.rating = data.skills.dodge.base;
        }

        data.skills.language0.base = data.characteristics.edu.rating;
        if (data.skills.language0.rating < data.skills.language0.base) {
            data.skills.language0.rating = data.skills.language0.base;
        }
    }      
}
  