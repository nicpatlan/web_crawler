function main() {
    const args = process.argv;
    if (args.length < 3) {
        throw new Error('No URL given');
    } else if (args.length > 3) {
        throw new Error('More than one URL argument was given');
    } else {
        console.log(`Crawler search starting at ${args[2]}...`);
    }
};

main();