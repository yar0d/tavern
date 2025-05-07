import en_US from "./common_en-US"
import fr_FR from "./common_fr-FR"
import backgrounds_en_US from "./backgrounds_en-US"
import backgrounds_fr_FR from "./backgrounds_fr-FR"
import trinkets_en_US from "./trinkets_en-US"
import trinkets_fr_FR from "./trinkets_fr-FR"
import breggle_en_US from "./breggle_en-US"
import breggle_fr_FR from "./breggle_fr-FR"
import elf_en_US from "./elf_en-US"
import elf_fr_FR from "./elf_fr-FR"
import grimalkin_en_US from "./grimalkin_en-US"
import grimalkin_fr_FR from "./grimalkin_fr-FR"
import human_en_US from "./human_en-US"
import human_fr_FR from "./human_fr-FR"
import mossling_en_US from "./mossling_en-US"
import mossling_fr_FR from "./mossling_fr-FR"
import woodgrue_en_US from "./woodgrue_en-US"
import woodgrue_fr_FR from "./woodgrue_fr-FR"
import { KINDRED_BREGGLE, KINDRED_ELF, KINDRED_GRIMALKIN, KINDRED_HUMAN, KINDRED_MOSSLING, KINDRED_WOODGRUE } from "@/libs/kindreds"

export default {
  "en-US": {
    ...en_US,
    ...backgrounds_en_US,
    ...trinkets_en_US,
    $names: {
      [KINDRED_BREGGLE]: { ...breggle_en_US },
      [KINDRED_ELF]: { ...elf_en_US },
      [KINDRED_GRIMALKIN]: { ...grimalkin_en_US },
      [KINDRED_HUMAN]: { ...human_en_US },
      [KINDRED_MOSSLING]: { ...mossling_en_US },
      [KINDRED_WOODGRUE]: { ...woodgrue_en_US },
    },
  },
  "fr-FR": {
    ...fr_FR,
    ...backgrounds_fr_FR,
    ...trinkets_fr_FR,
    $names: {
      [KINDRED_BREGGLE]: { ...breggle_fr_FR },
      [KINDRED_ELF]: { ...elf_fr_FR },
      [KINDRED_GRIMALKIN]: { ...grimalkin_fr_FR },
      [KINDRED_HUMAN]: { ...human_fr_FR },
      [KINDRED_MOSSLING]: { ...mossling_fr_FR },
      [KINDRED_WOODGRUE]: { ...woodgrue_fr_FR },
    },
  },
}
