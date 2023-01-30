const {URL} = require('node:url')
const {JSDOM} = require('jsdom')

function normalizeURL(url){
    try{
        const normalize =  new URL(url.toLowerCase())
        return normalize
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
            if (new URL(item.href).protocol){
                urlList.push(item.href)
            }
            
        }catch (err){
            urlList.push(`${baseURL}/${item.href}`)
        }
        
    }
    return urlList.length > 0 ? urlList : null

}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}
