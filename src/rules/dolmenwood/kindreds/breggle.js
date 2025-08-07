/* eslint quotes: ["error", "double"] */

import { Dices, d100, d20, rollFromObject, rollFromTable } from "@/libs/dices"
import { CAPRICE, GAFFE, SURNAME, WOLDISH } from "@/rules/dolmenwood/languages"
import { GENDER_FEMALE, GENDER_MALE, GENDER_UNISEX, KINDRED_BREGGLE, KINDRED_HEIGHT_MEDIUM, KINDRED_TYPE_MORTAL, Kindred } from "."

import NAMES from "@/locales/dolmenwood/breggle_en-US"

const BACKGROUNDS = {
  1: "Alchemist’s assistant",
  2: "Angler",
  3: "Beekeeper",
  4: "Blacksmith",
  5: "Brewer",
  6: "Chandler",
  7: "Devil goat handler",
  8: "Gambler",
  9: "Grave digger",
  10: "Merchant",
  11: "Onion farmer",
  12: "Page",
  13: "Pig farmer",
  14: "Servant",
  15: "Smuggler",
  16: "Sorcerer’s assistant",
  17: "Standard-bearer",
  18: "Thatcher",
  19: "Turnip farmer",
  20: "Vagrant",
}

const TRAITS = [
  "Fur",
  "Gaze",
  "Horns",
]

const TRINKETS = {
  "01–02": "A bag of divination stones that always answer “Panic” to any question.",
  "03–04": "A bloodstained jester’s hat.",
  "05–06": "A bloody knife that cannot be cleaned.",
  "07–08": "A blue velvet jacket with a hidden pocket which moves when you’re not looking. Every time 'you want to retrieve something from the pocket, it takes a minute of searching to find it.",
  "09–10": "A book of poetry that consists primarily of bleating.",
  "11–12": "A bottle of noxious perfume. When sprayed, it can be smelt up to half a mile away.",
  "13–14": "A brass owl statue with eerie black eyes.",
  "15–16": "A broken fishing rod that still displays teeth marks from an enormous fish.",
  "17–18": "A circular ceramic amulet which displays the current moon phase.",
  "19–20": "A clay pot labelled “Frog Paste,” containing what appears to be frog paste.",
  "21–22": "A clump of writhing, black moss that you scraped off a looming monolith one lonely night.",
  "23–24": "A collection of papers with scrawled notes detailing your life story. The odd thing is 'that you found these notes on the corpse of a stranger, drowned in a ditch.",
  "25–26": "A curious mossling wind instrument carved out of a gourd. You can’t figure out which hole 'to blow in.",
  "27–28": "A diorama of two stuffed mice riding stuffed squir- rels, jousting.",
  "29–30": "A dried mushroom with a face.",
  "31–32": "A folio of pressed sprite-wings.",
  "33–34": "A gnarled root shaped like a mossling.",
  "35–36": "A letter warning that several unnamed but high ranked longhorns are secretly crookhorns in 'disguise.",
  "37–38": "A locket with a portrait of a fluffy cat wearing a crown with the inscription “For the 'love of King Pusskin.”",
  "39–40": "A long-nosed masquerade mask.",
  "41–42": "A moleskin wristband, anointed with exotic fairy perfume.",
  "43–44": "A mossling pipe that blows rainbow-coloured smoke rings.",
  "45–46": "A necklace of miscellaneous humanoid teeth.",
  "47–48": "A petrified turnip.",
  "49–50": "A pig heart that oozes ichor when squeezed.",
  "51–52": "A pouch which feels heavy (as if full of pebbles) even when empty.",
  "53–54": "A rusty scalpel that once belonged to Lord Malbleat.",
  "55–56": "A sack of tasty fried chicken legs.",
  "57–58": "A scale said to be from a breggle with a fishtail instead of legs.",
  "59–60": "A scroll containing a prophetic warning from an esteemed ancestor. Age has made it almost 'indecipherable.",
  "61–62": "A sheet of parchment with a charcoal sketch of your long lost love.",
  "63–64": "A short length of silver cord and a delicate hook, said to be able to catch fairy fish in 'puddles.",
  "65–66": "A shovel stained with the dirt of a thousand graves.",
  "67–68": "A stuffed vole dressed in a charming waistcoat.",
  "69–70": "A thigh-bone flute.",
  "71–72": "A tin whistle whose tones drive cats wild.",
  "73–74": "A tiny book of nonsense poetry, bound in purple leather.",
  "75–76": "A tiny painting of a four-horned goat.",
  "77–78": "A well-loved walking stick with a goat’s head handle.",
  "79–80": "A wooden Chapes (holy symbol of the Pluritine Church) studded with nails.",
  "81–82": "An empty notebook. Anything written in it disappears at sunrise.",
  "83–84": "An ornate pie pan, pilfered from a noble’s kitchen.",
  "85–86": "Black stone dice with white skulls for pips.",
  "87–88": "Expensive-looking (but worthless) jewellery, designed for breggle horns.",
  "89–90": "String from the bow of a legendary hunter.",
  "91–92": "The board pieces for fairy chess. You have no idea what the rules are (or even if it’s a 'real game).",
  "93–94": "The cured skin of a whole deer.",
  "95–96": "The horn of an ancestor, hung from a necklace.",
  "97–98": "The key to the prison cell you escaped from.",
  "99–00": "Your grandmother’s creepy glass eye. You sometimes feel her presence watching you.",
}

export class Breggle extends Kindred {
  constructor () {
    const kindred = {
      kind: KINDRED_BREGGLE,
      type: KINDRED_TYPE_MORTAL,
      gender: GENDER_UNISEX,
      genders: [GENDER_FEMALE, GENDER_MALE, GENDER_UNISEX],
      age: 15 + Dices.roll2D10,
      lifespan: 50 + Dices.roll2D20,
      height: 5.4 + Dices.roll2D6 / 10,
      heightType: KINDRED_HEIGHT_MEDIUM,
      weight: 120 + Dices.roll3D10 + Dices.roll3D10,
      languages: [CAPRICE, GAFFE, WOLDISH],
      background: rollFromTable(d20, BACKGROUNDS),
      trinket: rollFromTable(d100, TRINKETS),
      traits: TRAITS,
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
  Breggle,
}
