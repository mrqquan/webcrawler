const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML} = require('./crawl.js')
const {URL} = require('node:url')

describe("Normalize URL Tests", () => {
    test('Valid Camel Case URL', () => {
        expect(normalizeURL("https://wagsLane.Dev/path")).toStrictEqual(new URL("https://wagslane.dev/path"))
    });

    test('Valid Upper Case URL', () => {
    
        expect(normalizeURL("HTTPS://WAGSLANE.DEV/PATH")).toStrictEqual(new URL("https://wagslane.dev/path"))
    });

    test('Invalid URL', () => {
        expect(normalizeURL("wagsLane")).toBeNull()
    });

    test('Invalid URL', () => {
        expect(normalizeURL("123445678.90")).toBeNull()
    });
})

describe("Get URL from HTML Tests", () => {
    test('HTML Body has URLs', () => {
        const body =  (`<body>
        <a href="https://blog.boot.dev"><span>Go to Boot.dev</span></a>
        <a href="about.html"><span>Go to Boot.dev</span></a>
        <a href="https://dmitripavlutin.com/parse-url-javascript/">Parse Url</a>
    </body>`)
        
        expect(getURLsFromHTML(body,"https://blog.boot.dev")).toEqual([
            'https://blog.boot.dev/',
            'https://blog.boot.dev/about.html',
            'https://dmitripavlutin.com/parse-url-javascript/'
        ])
    })

    test('HTML Body has no URL', () => {
        const body =  (`<body></body>`)
        
        expect(getURLsFromHTML(body,"https://blog.boot.dev")).toBeNull()
    })
})