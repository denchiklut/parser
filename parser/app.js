const puppeteer = require('puppeteer')
const gunzip = require('gunzip-file')
const parseFile = require('./utilities/parseFile').parseFile
const xml2js = require('xml2js')
const https = require('https')
const fs = require('fs')

const parserFn = async (io) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    const parser = new xml2js.Parser()

    await page.goto('https://www.cian.ru/sitemap.xml')
    const src = await page.evaluate(() => document.getElementById('collapsible0').innerText)


    parser.parseString(src, (err, result) => {

        result.sitemapindex.sitemap.forEach((item) => {

            let dir = './parser/urls'
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir)
            }

            let fname = item.loc[0].split('/').reverse()[0]
            let file = fs.createWriteStream(`${dir}/${fname}`)

            https.get(item.loc[0], function(response) {
                response.pipe(file)
            })

            file.on("finish", () => {
                let newName = fname.split('.')
                newName.slice(-1)
                io.emit('app', {data: `${newName[0]}.${newName[1]}`});

                gunzip(`${dir}/${fname}`, `${dir}/${newName[0]}.${newName[1]}`, () => {
                    fs.unlinkSync(`${dir}/${fname}`)
                    parseFile(`${dir}/${newName[0]}.${newName[1]}`, io)
                })
            })

        })
    })

    browser.close()
}

module.exports = parserFn
