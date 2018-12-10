const puppeteer = require('puppeteer')
const xml2js = require('xml2js')
const proxyList = require('./proxy').proxyList
const fs = require('fs')
const Parser = require('../../config').parser



exports.parseFile = (item) => {

    const parser = new xml2js.Parser()
    let content = fs.readFileSync(`${item}`, 'utf8')


    parser.parseString(content, (err, result) => {
        //Для теста обрезаем массив чтобы парсить 12 сайтов вместо всех
        let arr = result.urlset.url.slice(10008, 10009)

        arr.forEach( async (item) => {

            try {
                let proxy = proxyList[Math.floor(Math.random()*proxyList.length)];
                console.log('--- rand proxy ---')
                console.log(proxy)
                console.log('--- rand proxy ---')
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

                var msg = new Parser({mixed: result})
                msg.save(function (err) {
                    console.log(err)
                });
                console.log(result)
                browser.close()

            } catch (err) {
                console.log(`--- ERROR ---: ${item.loc[0]}`)
                let error = `--- ERROR ---: ${item.loc[0]}`

                var msg = new Parser({text: err})
                msg.save(function (err) {
                    if (err) console.log(err)
                });
            }
        })

    })
}