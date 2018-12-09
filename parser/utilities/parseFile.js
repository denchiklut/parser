const puppeteer = require('puppeteer')
const xml2js = require('xml2js')
const fs = require('fs')

exports.parseFile = (item) => {

    const parser = new xml2js.Parser()
    let content = fs.readFileSync(`${item}`, 'utf8')


    parser.parseString(content, (err, result) => {

        let arr = result.urlset.url.slice(17005, 17006)

        arr.forEach( async (item) => {

            try {
                const browser = await puppeteer.launch()
                const page = await browser.newPage()
                await page.setUserAgent('Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)');

                await page.goto(item.loc[0])

                const result = await page.evaluate(() => {
                    return {
                        site: document.location.href,
                        title: document.title,
                        description: document.head.querySelector("[name~=description][content]").content,
                        keywords: document.head.querySelector("[name~=keywords][content]").content}
                })

                console.log(result)
                browser.close()

            } catch (err) {
                console.log(`ERROR: ${item.loc[0]}`)
            }
        })

    })
}