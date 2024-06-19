import { crawlPage } from "./crawl.js";

function main() {
    const args = process.argv;
    if (args.length < 3) {
        console.log('No URL given');
    } else if (args.length > 3) {
        console.log('More than one URL argument was given');
    } else {
        console.log(`Crawler search starting at ${args[2]}...`);
        crawlPage(args[2]);
    }
};

main();