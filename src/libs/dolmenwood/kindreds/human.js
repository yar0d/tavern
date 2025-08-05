import { Dices, d100, rollFromObject, rollFromTable } from "@/libs/dices"
import { SURNAME, WOLDISH } from "@/libs/dolmenwood/languages"
import { GENDER_FEMALE, GENDER_MALE, GENDER_UNISEX, KINDRED_HEIGHT_MEDIUM, KINDRED_HUMAN, KINDRED_TYPE_MORTAL, Kindred } from "."

import NAMES from "@/locales/human_en-US"

const BACKGROUNDS = {
  "01": "Actor",
  "02–05": "Angler",
  "06": "Animal trainer",
  "07": "Apothecary",
  "08–10": "Baker",
  "11": "Barber",
  "12": "Beekeeper",
  "13–15": "Beggar",
  "16–18": "Blacksmith",
  "19": "Bookbinder",
  "20–21": "Brewer",
  "22–24": "Butcher",
  "25–28": "Carpenter",
  "29": "Cartographer",
  "30–32": "Cattle farmer",
  "33": "Chandler",
  "34": "Cheesemaker",
  "35": "Cobbler",
  "36": "Cooper",
  "37": "Dockhand",
  "38": "Fortune-teller",
  "39": "Fur trapper",
  "40–41": "Gambler",
  "42": "Glassblower",
  "43": "Grave digger",
  "44–45": "Hog farmer",
  "46–49": "Hunter",
  "50": "Jester",
  "51": "Jeweller",
  "52": "Leather worker",
  "53": "Locksmith",
  "54": "Merchant",
  "55–56": "Miner",
  "57–58": "Outlaw",
  "59–60": "Pedlar",
  "61": "Pilgrim",
  "62–63": "Poacher",
  "64": "Potter",
  "65": "Roper",
  "66": "Sailor",
  "67": "Scribe",
  "68–71": "Servant",
  "72–73": "Sheep farmer",
  "74": "Shipwright",
  "75": "Smuggler",
  "76": "Stable hand",
  "77": "Stonemason",
  "78": "Swindler",
  "79": "Tailor",
  "80": "Tax collector",
  "81": "Thatcher",
  "82–84": "Turnip farmer",
  "85": "Unicorn hunter",
  "86–87": "Vagrant",
  "88": "Wainwright",
  "89–90": "Wayfarer",
  "91–92": "Weaver",
  "93–95": "Wheat farmer",
  "96": "Wizard’s assistant",
  "97–00": "Woodcutter",
}

const TRINKETS = {
  "01–02": "A black stone which always points towards the sun.",
  "03–04": "A blood sausage, allegedly made of wyrm’s blood.",
  "05–06": "A blood-stained handkerchief that won’t wash clean.",
  "07–08": "A bone statuette of a mermaid with prodigiously hairy armpits.",
  "09–10": "A bright red egg that was given to you by a sprite.",
  "11–12": "A clay effigy that whispers to you in your sleep.",
  "13–14": "A cracked marble that falls in slow motion.",
  "15–16": "A deck of cards illustrated with blindfolded kings, queens, knaves, etc.",
  "17–18": "A drinking horn carved with cavorting nymphs.",
  "19–20": "A dubious fake moustache made of rat fur.",
  "21–22": "A fine set of silver cutlery and a floral china tea-set, all packed in a wicker hamper.",
  "23–24": "A foot-long, spicy sausage.",
  "25–26": "A gauntlet of wyrm scales.",
  "27–28": "A goatskin pouch full of giblets.",
  "29–30": "A head-sized glass sphere with a neck opening.",
  "31–32": "A hunk of ancient, mouldy cheese.",
  "33–34": "A jar that breeds flies, even when tightly sealed.",
  "35–36": "A jaunty cap (with a feather stuck in it) which jumps up whenever anyone says your name.",
  "37–38": "A lavender scented cushion embroidered with black roses and thorns.",
  "39–40": "A lock of hair from the first person you killed.",
  "41–42": "A long kilt of woven moss.",
  "43–44": "A love letter you are penning in silver ink to your fairy betrothed. (To be placed within a ring of toadstools for delivery.)",
  "45–46": "A miniature brass gnome. (Appears on your pillow looking at you each morning.)",
  "47–48": "A napkin and cutlery that you stole from a fancy inn.",
  "49–50": "A note from your mother admonishing you to return home as soon as able.",
  "51–52": "A pair of stripy woollen socks that keep your feet as warm and dry as if you were wearing fine boots.",
  "53–54": "A pebble that glows faintly in the dark.",
  "55–56": "A piece of the moon that fell to earth. (Or is it a hunk of desiccated cheese?)",
  "57–58": "A porcelain teapot painted with a scene of owls devouring humans.",
  "59–60": "A raven’s feather quill that writes without ink.",
  "61–62": "A silver belt woven from the mane of a kelpie.",
  "63–64": "A silver mirror that always reflects the sky.",
  "65–66": "A silver ring that shrinks or expands to fit whatever finger it is placed upon.",
  "67–68": "A tiny fish in a jar of water. At night, it comes to the surface and whispers the names of everyone within 5′.",
  "69–70": "A tiny wicker effigy that you stole from a witch’s hut.",
  "71–72": "A unicorn statuette carved out of mushroom-wood.",
  "73–74": "A wanted poster for yourself.",
  "75–76": "A well-thumbed and annotated book of psalms.",
  "77–78": "An ash wand stained with the blood of a troll.",
  "79–80": "An enormous Green Man brass belt buckle.",
  "81–82": "An ornate lantern you found in a bog.",
  "83–84": "Sixteen silver pieces, greased with slippery magical oil that cannot be washed off.",
  "85–86": "The broken tip of a unicorn’s horn.",
  "87–88": "The fairy sword that slew your father.",
  "89–90": "The mummified hand of a bog body.",
  "91–92": "The scintillating, silvery feather of a witch owl.",
  "93–94": "The skeleton of an especially large toad, in pieces.",
  "95–96": "The skull of a Drune, stolen from a forbidden crypt.",
  "97–98": "The wobbly, pink severed hand of a gelatinous ape, still fresh and sweet.",
  "99–00": "Your grandfather’s beard, rolled up in a hessian cloth.",
}

export class Human extends Kindred {
  constructor () {
    const kindred = {
      kind: KINDRED_HUMAN,
      type: KINDRED_TYPE_MORTAL,
      gender: GENDER_UNISEX,
      genders: [GENDER_FEMALE, GENDER_MALE, GENDER_UNISEX],
      age: 15 + Dices.roll2D10,
      lifespan: 50 + Dices.roll2D20,
      height: 0,
      heightType: KINDRED_HEIGHT_MEDIUM,
      weight: 120 + Dices.roll3D10 + Dices.roll3D10,
      languages: [WOLDISH],
      background: rollFromTable(d100, BACKGROUNDS),
      trinket: rollFromTable(d100, TRINKETS),
    }

    switch (kindred.gender) {
      case [GENDER_MALE]:
        kindred.height = 5.4 + Dices.roll2D6 / 10
        break
      case [GENDER_FEMALE]:
        kindred.height = 5 + Dices.roll2D6 / 10
        break
      default:
        kindred.height = 5.2 + Dices.roll2D6 / 10
        break
    }

    super(kindred)
  }

  rollName () {
    return {
      name: `$names.${KINDRED_HUMAN}.${this.gender}.${rollFromObject(NAMES[this.gender])}`,
      surname: `$names.${KINDRED_HUMAN}.${SURNAME}.${rollFromObject(NAMES[SURNAME])}`,
    }
  }
}

export default {
  NAMES,
  Human,
}
