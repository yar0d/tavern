<template>
  <div class="card bg-base-100 w-full h-full shadow-sm">
    <div class="card-body">
      <div class="card-title">{{ value?.name }} — $t('Character Sheet') }}</div>
      <div class="card-actions justify-end">
        <button class="btn btn-square btn-sm">
          <svg xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="bg-base-100 w-full h-full">
        <iframe id="pdf" style="width: 100%; height: 100%;"></iframe>
      </div>
    </div>
    ##{{ fields ? Object.keys(fields) : 'null' }}##
  </div>
</template>

<script>
import { PDFDocument } from "pdf-lib"

export default {
  name: "CharacterSheet",
  props: {
    value: { type: Object, default: () => {} },
  },
  emits: ["update:modelValue"],
  data () {
    return {
      fields: {}, // PDF inputs
    }
  },
  watch: {},
  created () {},
  beforeUnmount () {},
  mounted () {
    this.createPdf()
  },
  methods: {
    async  createPdf () {
      const url = `${window.location.origin}/assets/sheets/Dolmenwood_Character_Sheet.pdf`
      const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

      const pdfDoc = await PDFDocument.load(existingPdfBytes)

      // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
      // const pages = pdfDoc.getPages()
      // const firstPage = pages[0]
      // const { height } = firstPage.getSize()
      // firstPage.drawText("This text was added with JavaScript!", {
      //   x: 5,
      //   y: height / 2 + 300,
      //   size: 50,
      //   font: helveticaFont,
      //   color: rgb(0.95, 0.1, 0.1),
      //   rotate: degrees(-45),
      // })

      const form = pdfDoc.getForm()
      const fields = form.getFields()
      fields.forEach(field => {
        const type = field.constructor.name
        const name = field.getName()
        this.fields[name] = field
        console.log(`${type}: ${name}`)
      })

      // Fill in all inputs
      if (this.value?.name) {
        // this.form.getTextField("Name")?.setText(this.value.name)
        console.log('## settings name:', this.value.name)
        this.fields["Name"]?.setText(this.value.name)
      }
      /*
[Log] PDFTextField2: Name (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Kindred & Class (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Background (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Alignment (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Affiliation (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Moon Sign (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Strength (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Strength Modifier (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Intelligence (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Intelligence Modifier (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Wisdom (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Wisdom Modifier (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Dexterity (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Dexterity Modifier (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Constitution (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Constitution Modifier (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Charisma (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Charisma Modifier (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Max Hit Points (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Hit Points (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Doom (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Ray (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Hold (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Blast (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Spell (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Magic Resistance (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Armour Class (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Attack (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Speed (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Exploring (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Overland (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Kindred & Class Traits 1 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Kindred & Class Traits 2 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Listen (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Search (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Survival (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Extra Skill 1 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Extra Skill 2 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Extra Skill 3 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Extra Skill 4 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Extra Skill 5 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Extra Skill 6 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Languages 1 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Languages 2 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Level (CharacterSheet.vue, line 54)
[Log] PDFTextField2: XP (CharacterSheet.vue, line 54)
[Log] PDFTextField2: XP For Next Level (CharacterSheet.vue, line 54)
[Log] PDFTextField2: XP Modifier (CharacterSheet.vue, line 54)
[Log] PDFCheckBox2: Weight Encumbrance (CharacterSheet.vue, line 54)
[Log] PDFCheckBox2: Slot Encumbrance (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Tiny Items (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item 1 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item Weight 1 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item 2 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item Weight 2 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item 3 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item Weight 3 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item 4 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item Weight 4 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item 5 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item Weight 5 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item 6 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item Weight 6 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item 7 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item Weight 7 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item 8 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item Weight 8 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item 9 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item Weight 9 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item 10 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Equipped Item Weight 10 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item 1 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item Weight 1 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item 2 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item Weight 2 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item 3 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item Weight 3 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item 4 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item Weight 4 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item 5 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item Weight 5 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item 6 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item Weight 6 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item 7 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item Weight 7 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item 8 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item Weight 8 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item 9 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item Weight 9 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item 10 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item Weight 10 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item 11 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item Weight 11 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item 12 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item Weight 12 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item 13 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item Weight 13 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item 14 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item Weight 14 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item 15 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item Weight 15 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item 16 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Stowed Item Weight 16 (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Total Weight (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Copper Pieces (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Silver Pieces (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Gold Pieces (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Pellucidium Pieces (CharacterSheet.vue, line 54)
[Log] PDFTextField2: Other Notes (CharacterSheet.vue, line 54)        */

      const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true })
      document.getElementById("pdf").src = pdfDataUri
    },
  },
}
</script>
