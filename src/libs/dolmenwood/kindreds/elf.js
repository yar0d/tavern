import { Dices, d100, d20, rollFromObject, rollFromTable } from "../../dices"
import { CAPRICE, ELF_NAME_COURTLY, ELF_NAME_RUSTIC, GAFFE, WOLDISH } from "@/libs/dolmenwood/languages"
import { KINDRED_ELF, KINDRED_HEIGHT_MEDIUM, KINDRED_TYPE_FEY, Kindred } from "."

import NAMES from "@/locales/elf_en-US"

const BACKGROUNDS = {
  1: "Chronicler",
  2: "Coiffeur",
  3: "Confectioner",
  4: "Courtier",
  5: "Dream thief",
  6: "Elk hunter",
  7: "Explorer",
  8: "Frost sculptor",
  9: "Harpist",
  10: "Highway robber",
  11: "Librarian",
  12: "Mountebank",
  13: "Nut forager",
  14: "Peacock trainer",
  15: "Poet",
  16: "Swordsmith",
  17: "Tailor",
  18: "Thespian",
  19: "Unicorn handler",
  20: "Vintner",
}

const TRINKETS = {
  "01–02": "A bag of caterpillars whose flesh have hallucinogenic properties.",
  "03–04": "A bag of sticky sweets that never get any smaller when sucked on.",
  "05–06": "A ball of silvery twine that is invisible in moonlight.",
  "07–08": "A ball of yarn, gifted to you by a grateful grimalkin.",
  "09–10": "A black rose that never wilts.",
  "11–12": "A block of chocolate made with cocoa harvested from a mossling.",
  "13–14": "A book of amateur poetry. You suspect the author to be a powerful Fairy noble.",
  "15–16": "A crown woven from holly and poison ivy.",
  "17–18": "A daisy that glows in moonlight.",
  "19–20": "A fancy hat topped with elk antlers.",
  "21–22": "A fragment of glowing crystal that you found in a dream.",
  "23–24": "A fragment of horn from an evil unicorn.",
  "25–26": "A glass bottle that annihilates any liquid poured into it.",
  "27–28": "A glass jar containing the tiny, frozen form of your only sister.",
  "29–30": "A glass slipper, stained with blood.",
  "31–32": "A harp that, if left unattended, plays mood-inappropriate music with the skill of an enthusiastic amateur.",
  "33–34": "A Chapes (holy symbol of the Pluritine Church), given to you by a dying friar decades ago.",
  "35–36": "A key fashioned from ice. It melts in the warmth, and reforms in cold weather.",
  "37–38": "A lantern that burns with a cold, blue flame when lit.",
  "39–40": "A letter promising your imminent demise, written in High Elfish. Delivered over a hundred years ago.",
  "41–42": "A mortal’s heart, freely given.",
  "43–44": "A mote of sunlight, trapped in a scintillating crystal.",
  "45–46": "A necklace composed of honeybees.",
  "47–48": "A nightmare, sealed inside a bottle.",
  "49–50": "A pan flute stolen from a woodgrue. A single pipe is missing.",
  "51–52": "A peacock feather whose eye intermittently blinks.",
  "53–54": "A pleasant dream, distilled into a liquor.",
  "55–56": "A receipt for a loan of four rare and expensive tomes from a Fairy library. You no longer have any of these books.",
  "57–58": "A scabbard taken from the fallen body of a great knight.",
  "59–60": "A sealed scroll. Allegedly contains one of the Goblin King’s myriad names, never spoken.",
  "61–62": "A seemingly ordinary acorn. Screams when its cap is removed.",
  "63–64": "A set of horseshoes, designed for a centaur.",
  "65–66": "A silver spoon that drips honey on command.",
  "67–68": "A single crow feather, taken from the cloak of the Queen of Blackbirds.",
  "69–70": "A skeletal finger that scrapes and scratches at dusk. If provided with a means of making marks (e.g. dipped in ink or blood, a surface that can be scratched), it writes macabre prophecies.",
  "71–72": "A small bell shaped like a breggle’s eye. Faint bleating accompanies its ringing.",
  "73–74": "A spider that slowly weaves webs in the shape of clothing.",
  "75–76": "A spyglass that always shows a view of a sea at night.",
  "77–78": "A thimble that is always magically full of sweet liqueur.",
  "79–80": "A white-and-gold parasol that creates darkness directly underneath it.",
  "81–82": "A wolf pelt cloak. The wolf’s head is still attached and occasionally salivates.",
  "83–84": "An ancient bronze mask depicting a bearded face.",
  "85–86": "An empty wine bottle. When held over a liquid, it draws it inside until full.",
  "87–88": "An hourglass which constantly flows in one direc- tion. It cannot be inverted.",
  "89–90": "An icicle that never melts.",
  "91–92": "Bronze chimes that tinkle in the presence of both ghosts and strong breezes.",
  "93–94": "Sculpting tools, preternaturally cold to the touch.",
  "95–96": "Six vials of blood, each drawn from a different Kindred.",
  "97–98": "Star charts that match no sky seen from Dolmen- wood.",
  "99–00": "The severed tail of a fairy horse.",
}

export class Elf extends Kindred {
  constructor () {
    const kindred = {
      kind: KINDRED_ELF,
      type: KINDRED_TYPE_FEY,
      gender: ELF_NAME_RUSTIC,
      genders: [ELF_NAME_COURTLY, ELF_NAME_RUSTIC],
      age: Dices.rollD100 * 10,
      lifespan: Infinity, // Immortal
      height: 5 + Dices.roll2D6 / 10,
      heightType: KINDRED_HEIGHT_MEDIUM,
      weight: 120 + Dices.roll3D10,
      languages: [CAPRICE, GAFFE, WOLDISH],
      background: rollFromTable(d20, BACKGROUNDS),
      trinket: rollFromTable(d100, TRINKETS),
    }

    super(kindred)
  }

  rollName () {
    return {
      name: `$names.${KINDRED_ELF}.${this.gender}.${rollFromObject(NAMES[this.gender])}`,
      surname: null,
    }
  }
}

export default {
  NAMES,
  Elf,
}
