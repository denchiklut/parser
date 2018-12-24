const puppeteer = require('puppeteer')
const xml2js = require('xml2js')
const fs = require('fs')
const https = require('https');
const PageData = require('../../config').pageData
const ErrorData = require('../../config').errorData
const LogData = require('../../config').logData
const LogFileData = require('../../config').logFileData

exports.parseFile = (rootDir, item, io) => {

    const parser = new xml2js.Parser()
    let content = fs.readFileSync(`${item}`, 'utf8')

    parser.parseString(content, (err, result) => {
        //Для теста обрезаем массив чтобы парсить 12 сайтов вместо всех
        // let arr = result.urlset.url.slice(185, 186)
        let arr = result.urlset.url

        //Пишем в БД лог файлов с урлами
        let logFileData = new LogFileData({title: `${rootDir}/${item}`, size: `${result.urlset.url.length}`})
        logFileData.save(function (err) {
            if (err) console.log(err)
        })

        io.emit('app', {data: {title: `${rootDir}/${item}`, count: `${result.urlset.url.length}`}});

        arr.forEach(async (item) => {

            try {
                let proxyUrl = '';

                await https.get('https://api.getproxylist.com/proxy', (resp) => {
                    let data = '';

                    // A chunk of data has been recieved.
                    resp.on('data', (chunk) => {
                        data += chunk
                    })

                    // The whole response has been received. Print out the result.
                    resp.on('end', () => {
                        console.log(`${JSON.parse(data).ip}: ${JSON.parse(data).port}`)
                        proxyUrl = `${JSON.parse(data).ip}: ${JSON.parse(data).port}`
                    })

                }).on("error", (err) => {
                    console.log("Error: " + err.message)
                })


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
                        keywords: document.head.querySelector("[name~=keywords][content]").content
                    }
                })

                let log = `--- SUCCESS ---: ${item.loc[0]}`
                //Пишем в БД логи парсера
                let logData = new LogData({log: log})
                logData.save(function (err) {
                    if (err) console.log(err)
                });

                io.emit('app-url', {data: log})

                //Пишем в БД результаты работы парсера
                let msg = new PageData({pageData: result})
                msg.save(function (err) {
                    if (err) console.log(err)
                });
                browser.close()

            } catch (err) {

                let error = `---  ERROR ---: ${item.loc[0]}`
                //Пишем в БД лог ошибки
                let errorData = new LogData({log: error})
                errorData.save(function (err) {
                    if (err) console.log(err)
                });

                io.emit('app-url', {data: error})
                //Пишем в бд ошибку (с описанием)
                let msg = new ErrorData({text: err})
                msg.save(function (err) {
                    if (err) console.log(err)
                });
            }
        })
    })
}