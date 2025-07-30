<template>
  <div class="card bg-base-100 w-full h-full shadow-sm">
    <div class="card-body">
      <div class="card-title">{{ $t('Character Sheet') }}</div>
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

      <div class="debug w-full h-full">
        <iframe id="pdf" style="width: 100%; height: 100%;"></iframe>
      </div>
    </div>
  </div>
</template>

<script>
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib"

export default {
  name: "CharacterSheet",
  props: {
    // modelValue: { type: Object, required: true },
  },
  emits: ["update:modelValue"],
  data () {
    return {}
  },
  computed: {
    value: {
      get () {
        return this.modelValue
      },
      set (value) {
        this.emit("update:modelValue", value)
      },
    },
  },
  watch: {},
  created () {},
  beforeUnmount () {},
  mounted () {},
  methods: {
    async  createPdf () {
      const url = `${window.location.origin}/assets/sheets/Dolmenwood_Character_Sheet.pdf`
      const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

      const pdfDoc = await PDFDocument.load(existingPdfBytes)
      const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

      const pages = pdfDoc.getPages()
      const firstPage = pages[0]
      const { height } = firstPage.getSize()
      firstPage.drawText("This text was added with JavaScript!", {
        x: 5,
        y: height / 2 + 300,
        size: 50,
        font: helveticaFont,
        color: rgb(0.95, 0.1, 0.1),
        rotate: degrees(-45),
      })

      const form = pdfDoc.getForm()
      const fields = form.getFields()
      fields.forEach(field => {
        const type = field.constructor.name
        const name = field.getName()
        console.log(`${type}: ${name}`)
      })

      const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true })
      document.getElementById("pdf").src = pdfDataUri
    },
    // async  createPdf () {
    //   const pdfDoc = await PDFDocument.create()
    //   const timesRomanFont = await pdfDoc.embedFont(StandardFonts.TimesRoman)

    //   const page = pdfDoc.addPage()
    //   const { width, height } = page.getSize()
    //   const fontSize = 30
    //   page.drawText("Creating PDFs in JavaScript is awesome!", {
    //     x: 50,
    //     y: height - 4 * fontSize,
    //     size: fontSize,
    //     font: timesRomanFont,
    //     color: rgb(0, 0.53, 0.71),
    //   })

    //   // const pdfBytes = await pdfDoc.save()
    //   // document.getElementById("pdf").src = pdfBytes
    //   const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true })
    //   document.getElementById("pdf").src = pdfDataUri
    // },
  },
}
</script>
