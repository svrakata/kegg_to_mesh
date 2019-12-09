export const sanitizeString = (str) => {
    return str.toLowerCase().replace(/[^a-z0-9 ]/gmi, "").trim()
}
