import { crawlPage } from "./crawl.js";

async function main() {
    const args = process.argv;
    if (args.length < 3) {
        console.log('No URL given');
    } else if (args.length > 3) {
        console.log('More than one URL argument was given');
    } else {
        console.log(`Crawler search starting at ${args[2]}...`);
        const pages = await crawlPage(args[2]);
        /*for (const key of Object.keys(pages)) {
            console.log(`url: ${key}, count: ${pages[key]}`);
        }*/
        console.log(pages);
    }
};

main();