const fs = require('fs')
const axios = require('axios')
const { PROD, PLATFORMS, LANGUAGES } = require('../config/constants')
const { getFullPath, logMessage } = require('../config/helper')
let processedLangs = 0

PLATFORMS.forEach(platform => {
  LANGUAGES.forEach(lang => {
    axios
      .get(
        `https://${
          PROD ? 'www' : 'dev'
          // extend the API to handle platform logic to support oyodir
        }.belvilla.com/api/v1/translations/${lang}`
      )
      .then(result => {
        const map = {}
        result.data.forEach(row => {
          map[row.code] = row.content
        })

        fs.writeFileSync(
          getFullPath(`translations/${platform}.${lang}.json`),
          JSON.stringify(map),
          'utf-8'
        )
        logMessage(`${platform}.${lang}.json - was created`)
        processedLangs += 1
        if (LANGUAGES.length === processedLangs) {
          process.exit()
        }
      })
  })
})
