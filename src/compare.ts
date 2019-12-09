import fs from "fs"
import path from "path"
import { sanitizeString } from "./utilities"

const keggDrugsJson = fs.readFileSync(path.resolve(__dirname, "temp", "kegg.json"))
const keggDrugs = JSON.parse(keggDrugsJson.toString())
const drugsNotInMeshStream = fs.createWriteStream(path.resolve(__dirname, "temp", "not_in_mesh_drugs.csv"))
const meshHashJson = fs.readFileSync(path.resolve(__dirname, "temp", "meshHash.json"))
const meshHash = JSON.parse(meshHashJson.toString())

// get drug names in csv ---> that's it


keggDrugs.forEach((drug) => {
    const drugNames = drug.name.text
    drugNames.forEach((drugName) => {
        const sanitizedDrugName = sanitizeString(drugName)

        if (!meshHash.hasOwnProperty(sanitizedDrugName)) {
            drugsNotInMeshStream.write(`${sanitizedDrugName}\n`)
        }
    })
})
