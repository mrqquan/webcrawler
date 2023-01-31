const { crawlPage } = require("./crawl")
const {printReport} = require("./report")

function main(){
    args = process.argv.slice(2)
    if(args.length == 1){
        console.log(`Crawler is starting at ${args[0]}`)
    }else{
        console.log(`Expected 2 args but ${args.length} were provided`)
        return
    }
    baseURL = args[0]
    crawlPage(baseURL,baseURL,null).then(data => printReport(data))
}

main()