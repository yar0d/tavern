import { Character as CharacterDolmenwood, register as registerDolmenwood } from "./dolmenwood/character"
import { Character as CharacterOse, register as registerOse } from "./ose/character"
import cc1 from "./ose/cc/cc-1"
import cc2 from "./ose/cc/cc-2"
import cc3 from "./ose/cc/cc-3"
import cc4 from "./ose/cc/cc-4"
import cc5 from "./ose/cc/cc-5"

export const RULESET_OSE = "Old School Essentials"
export const RULESET_DOLMENWOOD = "Dolmenwood"

export const RULESETS = {
  [RULESET_OSE]: {
    character: CharacterOse,
    extensions: [cc1, cc2, cc3, cc4, cc5],
    srd: "https://oldschoolessentials.necroticgnome.com/srd/",
  },
  [RULESET_DOLMENWOOD]: {
    character: CharacterDolmenwood,
    extensions: [],
    srd: "https://www.dolmenwood.necroticgnome.com/rules/",
  },
}

export function register (app) {
  registerDolmenwood(app)
  registerOse(app)
}
