function printReport(pages){
    console.log("\n--- Web Crawling Report ---")
    const sortedArray = Object.entries(pages).sort((a,b) => b[1] - a[1])

    for (page of sortedArray){
        console.log(`Found ${page[1]} internal links to ${page[0]}`)
    }

}


module.exports = {
    printReport
}
