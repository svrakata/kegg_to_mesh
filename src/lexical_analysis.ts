import fs from "fs"
import path from "path"


// read

const textFileName = "not_in_mesh_drugs.txt"
const tempFolderPath = path.resolve(__dirname, "temp")
const text = fs.readFileSync(`${tempFolderPath}/${textFileName}`)
const writeCSVStream = fs.createWriteStream(`${tempFolderPath}/not_in_mesh_drugs.csv`)

const wordAccurances: any = {}
const drugs = text.toString().split(",")

const x = "cherry bark extract"

const getWordParts = (phrase: string, minPhraseSize: number): string[] => {
    return [ "" ]
}

drugs.forEach((drug) => {
    const words = drug.split(" ")
    let phrase = ""
    for (let i = 0; i < words.length; i++) {
        if (phrase !== "") {
            phrase += ` ${words[ i ]}`
        } else {
            phrase += `${words[ i ]}`
        }

        if (wordAccurances.hasOwnProperty(phrase)) {
            wordAccurances[ phrase ] = wordAccurances[ phrase ] + 1
        } else {
            wordAccurances[ phrase ] = 1
        }
    }
})

writeCSVStream.write(`"name", "occurances"\n`)

Object.entries(wordAccurances).forEach((value: any[]) => {
    const [ key, val ] = value
    writeCSVStream.write(`${key}, ${val}\n`)
})


// const sortedWordAccurances = Object
//     .keys(wordAccurances)
//     .map((key) => ({ name: key, count: wordAccurances[ key ] }))
//     .sort((a, b) => b.count - a.count)
