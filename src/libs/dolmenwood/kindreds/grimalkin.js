import { Dices, d100, d20, rollFromObject, rollFromTable } from "@/libs/dices"
import { FIRST_NAME, MEWL, SURNAME, WOLDISH } from "@/libs/dolmenwood/languages"
import { GENDER_FEMALE, GENDER_MALE, GENDER_UNISEX, KINDRED_GRIMALKIN, KINDRED_HEIGHT_SMALL, KINDRED_TYPE_FEY, Kindred } from "."

import NAMES from "@/locales/grimalkin_en-US"

const BACKGROUNDS = {
  1: "Alchemist’s aide",
  2: "Angler",
  3: "Barber",
  4: "Card-sharp",
  5: "Catnip brewer",
  6: "Clothier",
  7: "Duellist",
  8: "Highway robber",
  9: "Knifemaker",
  10: "Libertine",
  11: "Mariner",
  12: "Pheasant poacher",
  13: "Rat hunter",
  14: "Spy",
  15: "Stage magician",
  16: "Swindler",
  17: "Thespian",
  18: "Trapper / furrier",
  19: "Vole farmer",
  20: "Weasel tamer",
}

const TRINKETS = {
  "01–02": "A bicorne hat that is a foot deeper on the inside than it appears.",
  "03–04": "A book of long-forgotten laws, written in Old Woldish.",
  "05–06": "A brass thimble that turns water into milk.",
  "07–08": "A breggle tongue, still moist.",
  "09–10": "A cherry tart pilfered from the kitchen of a fairy noble.",
  "11–12": "A cloak fashioned from a hundred voles.",
  "13–14": "A copper coin that always lands on the same side when deliberately flipped.",
  "15–16": "A crimson feather from an enormous bird.",
  "17–18": "A dead crow that never rots.",
  "19–20": "A deck of playing cards that shuffles itself when left unattended.",
  "21–22": "A dried heart the size of an acorn.",
  "23–24": "A hairball coughed up by a famous grimalkin.",
  "25–26": "A handkerchief stained with the kiss of Queen Abyssinia.",
  "27–28": "A heart-shaped locket. Each time it’s opened, it contains a portrait of a different cat.",
  "29–30": "A human eye that dilates just before it rains.",
  "31–32": "A hundred-year-old note offering a favour in return for services rendered to a witch. Her descendants might be obligated to fulfil it.",
  "33–34": "A leaf from the tallest tree in Dolmenwood.",
  "35–36": "A letter begging you to aid a miller’s youngest child.",
  "37–38": "A live cockroach tied to a thin gold string. If the cockroach is removed or killed, a new one appears in its place when the sun rises.",
  "39–40": "A lucky tortoise shell.",
  "41–42": "A lute that is always out of tune in the morning and in tune in the evening.",
  "43–44": "A luxurious, gold-embroidered cushion.",
  "45–46": "A mouse skull on a string. (Allegedly, a mouse from the moon.)",
  "47–48": "A mushroom stolen from the head of a mossling.",
  "49–50": "A nightingale’s song, trapped in a locket.",
  "51–52": "A pair of boots that will never go out of fashion.",
  "53–54": "A pair of dice that, when rolled together, always total to nine.",
  "55–56": "A pink bow that cannot turn invisible under any circumstances.",
  "57–58": "A pocket watch that always tells you the correct time an hour ago.",
  "59–60": "A porcelain teacup with a salamander painted on the side. Warm liquids it holds never cool down.",
  "61–62": "A rabbit’s foot that sporadically twitches.",
  "63–64": "A rat king in a sack. Each rat inside claims to be the “King of All Rats.”",
  "65–66": "A realistic mask of a human child.",
  "67–68": "A scroll depicting your royal lineage. Of dubious authenticity.",
  "69–70": "A set of keys on a golden ring, purloined from a noble.",
  "71–72": "A severed head of a sprite, dried and preserved.",
  "73–74": "A sewing needle, sized for a giant. (Treat as a dagger.)",
  "75–76": "A shard of cold iron, trapped in a glass sphere.",
  "77–78": "A single cat whisker, given to you as a sign of commitment.",
  "79–80": "A singular pipe, taken from a woodgrue’s pan flute.",
  "81–82": "A small vial containing a legendarily potent strain of catnip.",
  "83–84": "A tiny bell that makes no sound.",
  "85–86": "A trained, but not particularly smart, weasel.",
  "87–88": "A whistle that only dogs can’t hear.",
  "89–90": "A wolf’s paw that bleeds when the wolf is thinking of you.",
  "91–92": "A wooden door the shape and size of a mouse.",
  "93–94": "An eyepatch, stained with old blood.",
  "95–96": "An ogre’s toenail, tough as steel. Its owner still lives.",
  "97–98": "Eyeglasses haunted by benign ghosts. Wearing the glasses allows you to see them.",
  "99–00": "One of a pair of bracelets made from braided mouse tails.",
}

export class Grimalkin extends Kindred {
  constructor () {
    const kindred = {
      kind: KINDRED_GRIMALKIN,
      type: KINDRED_TYPE_FEY,
      gender: GENDER_UNISEX,
      genders: [GENDER_FEMALE, GENDER_MALE, GENDER_UNISEX],
      age: 50 + Dices.roll3D6,
      lifespan: 300 + Dices.roll2D100,
      height: 3 + Dices.roll2D6 / 10,
      heightType: KINDRED_HEIGHT_SMALL,
      weight: 60 + Dices.roll2D10,
      languages: [MEWL, WOLDISH],
      background: rollFromTable(d20, BACKGROUNDS),
      trinket: rollFromTable(d100, TRINKETS),
    }

    super(kindred)
  }

  rollName () {
    return {
      name: `$names.${KINDRED_GRIMALKIN}.${FIRST_NAME}.${rollFromObject(NAMES[FIRST_NAME])}`,
      surname: `$names.${KINDRED_GRIMALKIN}.${SURNAME}.${rollFromObject(NAMES[SURNAME])}`,
    }
  }
}

export default {
  NAMES,
  Grimalkin,
}
