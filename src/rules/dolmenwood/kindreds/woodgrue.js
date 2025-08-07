import { Dices, d100, d20, rollFromObject, rollFromTable } from "@/libs/dices"
import { SURNAME, SYLVAN, WOLDISH } from "@/rules/dolmenwood/languages"

import NAMES from "@/locales/dolmenwood/woodgrue_en-US"
import { GENDER_FEMALE, GENDER_MALE, GENDER_UNISEX, KINDRED_HEIGHT_SMALL, KINDRED_TYPE_DEMI_FEY, KINDRED_WOODGRUE, Kindred } from "."

const BACKGROUNDS = {
  1: "Circus performer",
  2: "Convicted arsonist",
  3: "Court jester",
  4: "Crow hunter",
  5: "Dung collector",
  6: "Egg thief",
  7: "Errant piper",
  8: "Firework maker",
  9: "Fungus trader",
  10: "Juggler",
  11: "Maggot farmer",
  12: "Mead brewer",
  13: "Moth trapper",
  14: "Mushroom forager",
  15: "Pedlar",
  16: "Pipe carver",
  17: "Ragpicker",
  18: "Tent maker",
  19: "Tomb robber",
  20: "Wizard’s servant",
}

const TRINKETS = {
  "01–02": "A bag of delicious boiled sweets.",
  "03–04": "A basket of snakes, intended for juggling.",
  "05–06": "A battered hat with a stuffed swan’s head stitched proudly at the summit.",
  "07–08": "A bone whistle. When blown at night, it sends nearby bats and night birds into a frenzy.",
  "09–10": "A bottle containing dirty water from the Baths of Astralon.",
  "11–12": "A bottle of ink that always seems to spill everywhere when opened.",
  "13–14": "A bronze statuette of a chimera made up of a dozen different animals. The person who gave it to you insists it depicts a real creature.",
  "15–16": "A burial shroud seemingly imprinted with a face. The face becomes more distinguishable every day.",
  "17–18": "A ceramic plate that emits a simple tune when scratched.",
  "19–20": "A collection of fungi, loaned to you by a mossling.",
  "21–22": "A dead crow in a bag. Before you killed it, you were pretty sure it was spying on you.",
  "23–24": "A fake moustache. When worn, you appear to have a full beard.",
  "25–26": "A forbidden treatise claiming grimalkins and woodgrues share the same ancestors.",
  "27–28": "A glass case with a giant moth pinned inside.",
  "29–30": "A harp shaped like a duck. Playing it attracts the attention of nearby waterfowl.",
  "31–32": "A harp string, sharp and tinged with blood.",
  "33–34": "A hooded cloak made from thousands of moth wings stitched together.",
  "35–36": "A mead tankard that is perpetually sticky.",
  "37–38": "A misshapen ocarina. Each note sounds eerily similar to a baby’s cries.",
  "39–40": "A mossling pipe you found in a pile of compost. Its smoke makes people nostalgic.",
  "41–42": "A note promising that a “Mr Fox” will come to your aid in your hour of greatest need.",
  "43–44": "A pair of matching eyeballs. Whenever possible, they rotate to stare at you.",
  "45–46": "A pair of small, bronze cymbals.",
  "47–48": "A personalised invitation to “THE FEAST.” No further details are provided.",
  "49–50": "A pocketbook of bad jokes. Emits the occasional snicker.",
  "51–52": "A poster for your parent’s last, ill-fated circus performance.",
  "53–54": "A quill made from a stirge-owl feather.",
  "55–56": "A rope woven from a mix of human and breggle hair.",
  "57–58": "A stack of angry letters, all accusing you of arson.",
  "59–60": "A strange disk that produces the sound of flatulence whenever a weight is placed atop it.",
  "61–62": "A tent that slowly raises itself when you loudly sing it a jaunty song.",
  "63–64": "A vial of guano. Your last reminder of a deceased loved one.",
  "65–66": "A wooden sceptre topped with a jester’s head. When struck, the head tells an ill-considered joke.",
  "67–68": "An advice book that ultimately suggests a liberal application of fire as the solution to every problem.",
  "69–70": "An ancient coin, stolen from a grave. Far colder to the touch than it should be.",
  "71–72": "An empty pan flute case, its contents stolen.",
  "73–74": "An enormous firework with a tag that reads “Untested.”",
  "75–76": "An extravagant wig, stolen from the head of an elf noble.",
  "77–78": "An ordinary-looking metal bucket. When filled with water, leeches appear inside.",
  "79–80": "An ornate flute, said to be handed down by your ancestors since before they left Fairy.",
  "81–82": "An unhatched egg that sweats blood.",
  "83–84": "Faded parchment that lists the names of everyone you’ve ever wronged. It updates itself periodically.",
  "85–86": "Light from a fireworks display, caught in a shard of glass.",
  "87–88": "Lyrics to a half-written song about rodents visiting from the moon.",
  "89–90": "Small vials of syrups, each labelled with the type of mood they’re supposed to cure.",
  "91–92": "The corpse of a mouse, dressed in tiny clothes.",
  "93–94": "The crest of an unknown longhorn noble house, found on a dead breggle.",
  "95–96": "The squirming pieces for maggot chess.",
  "97–98": "Woollen ear warmers, knitted by your grandmother.",
  "99–00": "Your uncle’s famed recipe for moth cakes.",
}

export class Woodgrue extends Kindred {
  constructor () {
    const kindred = {
      kind: KINDRED_WOODGRUE,
      type: KINDRED_TYPE_DEMI_FEY,
      gender: GENDER_UNISEX,
      genders: [GENDER_FEMALE, GENDER_MALE, GENDER_UNISEX],
      age: 50 + Dices.roll3D6,
      lifespan: 300 + Dices.roll2D100,
      height: 3 + Dices.roll2D6 / 10,
      heightType: KINDRED_HEIGHT_SMALL,
      weight: 60 + Dices.roll2D10,
      languages: [SYLVAN, WOLDISH],
      background: rollFromTable(d20, BACKGROUNDS),
      trinket: rollFromTable(d100, TRINKETS),
    }

    super(kindred)
  }

  rollName () {
    return {
      name: rollFromObject(NAMES[this.gender]),
      surname: rollFromObject(NAMES[SURNAME]),
    }
  }
}

export default {
  NAMES,
  Woodgrue,
}
