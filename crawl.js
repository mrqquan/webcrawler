const {URL} = require('node:url')
const {JSDOM} = require('jsdom')


function normalizeURL(url){
    try{
        const normalize =  new URL(url)
        let fullPath = `${normalize.host}${normalize.pathname}`
        if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
            return fullPath.slice(0,-1)
        }
        return fullPath
    }catch (TypeError){
        console.log("Invalid URL provided")
        return null
    }
}

function getURLsFromHTML(htmlBody, baseURL){

    dom = new JSDOM(htmlBody)
    const urlList = []
    for (item of dom.window.document.querySelectorAll('a')){
        try {
            if (item.href.slice(0,1) === '/'){
                urlList.push(new URL(item.href,baseURL).href)
            }else{
                urlList.push(new URL(item.href).href)
            }
            
        }catch (err){
            console.log(`${err.message}: ${item.href}`)
        }
        
    }
    return urlList.length > 0 ? urlList : null

}

async function crawlPage(baseURL,currentURL, pages){

    const current = new URL(currentURL)
    const base = new URL(baseURL)
    let pagesDict = {}
    if (pages){
        pagesDict = pages
    }
    
    if (current.hostname === base.hostname){
        //console.log(`Current Page is on the base domain: ${base.host}`)
    }else{
        return pagesDict
    }

    const normalizeCurrent = normalizeURL(currentURL)

    if (pagesDict[normalizeCurrent]){
        pagesDict[normalizeCurrent] += 1
        return pagesDict
    }else{
        pagesDict[normalizeCurrent] = 1
    }

    console.log(`Crawling ${currentURL}...`)
    try{
        const response = await fetch(currentURL)
        if (response.status > 399){
            console.log(`HTTP Error, status code: ${response.status}`)
            return
        }

        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')){
            console.log(`Non-html responses: ${contentType}`)
            return
        }

        let htmlBody = ""
        htmlBody = await response.text()
        
        for (url of getURLsFromHTML(htmlBody,baseURL)){
            pages = await crawlPage(baseURL,url,pagesDict)
        }
    }catch (err){
        console.log(err.message)
    }

    return pagesDict

}

module.exports = {
    normalizeURL,
    getURLsFromHTML,
    crawlPage
}
