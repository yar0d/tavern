import { Dices, d100, d20, rollFromObject, rollFromTable } from "../dices"
import { MULCH, SURNAME, WOLDISH } from "../languages"
import { GENDER_FEMALE, GENDER_MALE, GENDER_UNISEX, KINDRED_HEIGHT_SMALL, KINDRED_MOSSLING, KINDRED_TYPE_MORTAL, Kindred } from "."

import NAMES from "@/locales/mossling_en-US"

const BACKGROUNDS = {
  1: "Bark tailor",
  2: "Boar hunter",
  3: "Cheesemaker",
  4: "Compost raker",
  5: "Fungologist",
  6: "Fungus farmer",
  7: "Gambler",
  8: "Horn blower",
  9: "Moss brewer",
  10: "Moss farmer",
  11: "Night forager",
  12: "Oracle’s apprentice",
  13: "Pipe maker",
  14: "Sausage maker",
  15: "Squirrel trainer",
  16: "Swineherd",
  17: "Tavernkeep",
  18: "Vagrant",
  19: "Worm farmer",
  20: "Yeast farmer",
}

const TRINKETS = {
  "01–02": "A bag of stone marbles. Each has a name and rolls towards whoever speaks it.",
  "03–04": "A block of cheese infected with hallucinogenic fungus.",
  "05–06": "A bloodstained hat that once belonged to a redcap.",
  "07–08": "A book alleging crimes by each of the 100 saints of Dolmenwood. Found on the body of a murdered man.",
  "09–10": "A bottle of yeast-froth shampoo, essential for maintaining the lustre of mossy manes.",
  "11–12": "A bouquet of honeysuckle that drips real honey. The honey attracts wasps.",
  "13–14": "A brass cowbell. When struck, nearby milk and cheese products jump half a foot towards it.",
  "15–16": "A broad-brimmed hat covered in shimmering moss.",
  "17–18": "A bronze idol to a two-headed mushroom god.",
  "19–20": "A chunk of volcanic rock, warm to the touch. A single Old Woldish rune has been carved into it.",
  "21–22": "A clay figurine of a pot-bellied giant with a single eye.",
  "23–24": "A cluster of fungus consisting of a dozen different kinds of mushrooms living in symbiosis.",
  "25–26": "A collection of small rocks, all chipped from different gravestones.",
  "27–28": "A cooking pot that adds mushrooms to every dish cooked inside it.",
  "29–30": "A flower pressed inside a dead man’s journal.",
  "31–32": "A hunting horn fashioned from a great boar tusk.",
  "33–34": "A jar of blue cheese massage oil.",
  "35–36": "A jar of green jelly with the label “Don’t Eat Me.”",
  "37–38": "A large egg, entrusted to you by a panicked woodgrue.",
  "39–40": "A large gooseberry that appears to have a creature growing inside it.",
  "41–42": "A large, pink sausage. Tries to crawl away if left unattended.",
  "43–44": "A leaf that changes with the seasons, dying by winter only to rejuvenate in spring.",
  "45–46": "A mossy rock. When placed on the ground for at least a minute and then lifted, bugs scurry out from underneath it.",
  "47–48": "A mould-riddled tapestry depicting the hunt for a swine of mythic size.",
  "49–50": "A puffball with dozens of tiny mouths which burp in unison at dawn.",
  "51–52": "A puffball-skin pouch filled with jelly.",
  "53–54": "A sack of half-empty ale bottles.",
  "55–56": "A sealed bottle of spirits, brewed from the composted remains of one of your ancestors.",
  "57–58": "A shepherd’s crook that induces fear in farm animals when brandished.",
  "59–60": "A single hair from the head of an elven lady; a token of her affection.",
  "61–62": "A small beetle you found on the road. You have since received a letter from an angry grimalkin charging you with its theft.",
  "63–64": "A small effigy of a breggle made from dried mushroom flesh.",
  "65–66": "A small pouch of magic nuts. When a nut is broken open, it emits a pearl of wisdom.",
  "67–68": "A small snake with a “Return to” note attached. The owner’s name is smudged out.",
  "69–70": "A small, hollow toadstool with a tiny wooden door.",
  "71–72": "A snail shell that grows a new snail at dawn if the old one is removed or killed.",
  "73–74": "A squirrel-sized collar and leash.",
  "75–76": "A story book about the charming exploits of the rat-people of the moon.",
  "77–78": "A unique pipeweed mix of your own invention. A bit too combustible.",
  "79–80": "A watering can that constantly trickles water from its spout.",
  "81–82": "A waterskin of yellow slime that drips upwards when unstoppered.",
  "83–84": "A wheel of cheese that never loses momentum once it starts rolling.",
  "85–86": "A wooden carving of yourself that ages as you do.",
  "87–88": "A wooden peg leg that you found and converted into an incubator for rare fungi.",
  "89–90": "A worm whose squirming slowly spells out threatening prophecies.",
  "91–92": "An adorable red-and-white button mushroom. Whispers to you when no one else is listening.",
  "93–94": "An incomplete, and possibly inaccurate, map of all the inns in Dolmenwood.",
  "95–96": "An onion shaped like a baby.",
  "97–98": "Blueprints for a marvellous mechanical mouse organ clock.",
  "99–00": "Dozens of different kinds of bark, stitched together like a book.",
}

export class Mossling extends Kindred {
  constructor () {
    const kindred = {
      kind: KINDRED_MOSSLING,
      type: KINDRED_TYPE_MORTAL,
      gender: GENDER_UNISEX,
      genders: [GENDER_FEMALE, GENDER_MALE, GENDER_UNISEX],
      age: 30 + Dices.roll3D6,
      lifespan: 200 + Dices.roll2D8 + Dices.roll3D8,
      height: 3.6 + Dices.roll2D6 / 10,
      heightType: KINDRED_HEIGHT_SMALL,
      weight: 150 + Dices.roll2D20,
      languages: [MULCH, WOLDISH],
      background: rollFromTable(d20, BACKGROUNDS),
      trinket: rollFromTable(d100, TRINKETS),
    }

    super(kindred)
  }

  rollName () {
    return {
      name: `$names.${KINDRED_MOSSLING}.${this.gender}.${rollFromObject(NAMES[this.gender])}`,
      surname: `$names.${KINDRED_MOSSLING}.${SURNAME}.${rollFromObject(NAMES[SURNAME])}`,
    }
  }
}

export default {
  NAMES,
  Mossling,
}
