let cheerio = require("cheerio");
const xml2js = require('xml2js')
const fs = require('fs')
const https = require('https');
const PageData = require('../../config').pageData

// const proxy = require('./proxyArr').proxy

function downloadPage(url) {
    return new Promise((resolve, reject) => {
        let proxyUrl = '';
        let options = {};
        https.get('https://api.getproxylist.com/proxy?apiKey=0b0cd4c3f63c807e148c97c6d70dc0d54b998370', (resp) => {
            let data = '';

            // A chunk of data has been recieved.
            resp.on('data', (chunk) => {
                data += chunk
            })

            // The whole response has been received. Print out the result.
            resp.on('end', () => {
                proxyUrl = `${JSON.parse(data).ip}: ${JSON.parse(data).port}`

                //добовлние прокси в конец массива


                fs.appendFileSync("proxy.txt", `\n${proxyUrl}`  )
                console.log(proxyUrl)

                options = {
                    headers: {
                        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
                    },
                    proxy: proxyUrl,
                };
                let request = require('request')
                request = request.defaults({jar: true})
                request(options, function () {
                    request(url, (error, response, body) => {
                        if (error) console.log(error)

                        try {

                            const $ = cheerio.load(body);
                            const webpageTitle = $("title").text();
                            const metaDescription =  $('meta[name=description]').attr("content");
                            const keywords =  $('meta[name=keywords]').attr("content");
                            const result = {
                                site: url,
                                title: webpageTitle,
                                description: metaDescription,
                                keywords: keywords,
                            }

                            let log = `--- SUCCESS ---: ${result.site}`
                            console.log(log)


                            // //Пишем в БД результаты работы парсера
                            let msg = new PageData({pageData: result})
                           msg.save()
                            resolve(body);
                        } catch (error) {
                            reject(error)
                        }
                    });
                });
            })

        }).on("error", (err) => {
            console.log("Error: " + err.message)
        })

    });
}

exports.parseFile = (rootDir, item) => {

    console.log(`start ${item}`)
    const parser = new xml2js.Parser()
    let content = fs.readFileSync(`C:\\inetpub\\wwwroot\\parser\\parser\\urls\\${item}`, 'utf8')

    parser.parseString(content, (err, result) => {
        ( async ()=>{

            let length = result.urlset.url.length

            let arr = result.urlset.url.slice(686 + 251 + 233, length)

            let counter = 0;
            let size = arr.length

            for (var item = 0; item < size; item++) {

                console.log(counter)
                try {
                    await downloadPage(arr[item].loc[0])
                        .then(() => counter++)
                } catch (err) {

                    console.log(err)
                    let error = `---  ERROR  ---: ${arr[item].loc[0]}`
                    console.log(error)
                }

                if (counter === size) {
                    console.log("=========== THE END =========")
                }
            }
        })()
    })
}