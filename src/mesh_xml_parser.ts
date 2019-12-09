// read and pars the xml --- dom
// read the kegg list
// cycle through and check whats missing in mesh so it can be manually looked for in mesh
// find a way to optimize this:
// write the hash somewhere to avoid recalculating

import fs from "fs"
import path from "path"
import flow from "xml-flow"
import { sanitizeString } from "./utilities"

const meshXmlParser = () => {
    const meshXMLFileName = "desc2020.xml"
    const meshXMLFilePath = path.resolve(__dirname, "temp", meshXMLFileName)
    const hashFolderPath = path.resolve(__dirname, "mesh_hash")
    const hashFileName = "mesh_hash.json"

    fs.mkdirSync(hashFolderPath, { recursive: true })

    const meshReadStream = fs.createReadStream(meshXMLFilePath)
    const hashWriteStream = fs.createWriteStream(`${hashFolderPath}/${hashFileName}`)

    const xmlStream = flow(meshReadStream)
    const meshHash = {}

    hashWriteStream.write("{")

    // gets the name of each descriptor (aka heading)
    xmlStream.on("tag:descriptorrecord", (record) => {
        const { descriptorname, conceptlist, descriptorui } = record
        const name = sanitizeString(descriptorname)
        let terms = []
        // hashWriteStream.write(`"${name}":"${descriptorui}"`)
        // hashWriteStream.write(",")

        if (!meshHash[ name ]) {
            meshHash[ name ] = descriptorui
        }

        if (Array.isArray(conceptlist)) {
            terms = conceptlist.reduce((list, current) => list.concat(current.termlist), [])
        } else {
            terms = Array.from(conceptlist.termlist)
        }

        terms.forEach((term) => {
            const key = sanitizeString(term.string)
            if (!meshHash[ key ]) {
                meshHash[ key ] = descriptorui
            }

            // hashWriteStream.write(`"${sanitizeString(term.string)}":"${descriptorui}"`)
            // hashWriteStream.write(",")
        })
    })

    xmlStream.on("end", () => {
        fs.writeFileSync(path.resolve(__dirname, "temp", "meshHash.json"), JSON.stringify(meshHash))
    })

    xmlStream.on("error", (err) => {
        console.error(err)
    })
}

export default meshXmlParser
