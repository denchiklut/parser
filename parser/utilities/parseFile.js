const puppeteer = require('puppeteer')
const xml2js = require('xml2js')
const proxyList = require('./proxy').proxyList
const fs = require('fs')
const PageData = require('../../config').pageData
const ErrorData = require('../../config').errorData

exports.parseFile = (item, io) => {

    const parser = new xml2js.Parser()
    let content = fs.readFileSync(`${item}`, 'utf8')

    parser.parseString(content, (err, result) => {
        //Для теста обрезаем массив чтобы парсить 12 сайтов вместо всех
        let arr = result.urlset.url.slice(180, 181)

        io.emit('app', {data: {title: `${item}`, count: `${result.urlset.url.length}`}});

        arr.forEach( async (item) => {

            try {
                let proxyUrl = proxyList[Math.floor(Math.random()*proxyList.length)];
                const browser = await puppeteer.launch({
                    args: [`--proxy-server=${proxyUrl}`],
                })
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

                console.log(`--- SUCCESS ---: ${item.loc[0]}`)
                let log = `--- SUCCESS ---: ${item.loc[0]}`
                io.emit('app-url', {data: log});
                
                // console.log(result)
                let msg = new PageData({pageData: result})
                msg.save(function (err) {
                    if (err) console.log(err)
                });
                browser.close()

            } catch (err) {

                console.log(`---  ERROR ---: ${item.loc[0]}`)
                let error =`---  ERROR ---: ${item.loc[0]}`
                io.emit('app-url', {data: error});

                let msg = new ErrorData({text: err})
                msg.save(function (err) {
                    if (err) console.log(err)
                });
            }
        })
    })
}