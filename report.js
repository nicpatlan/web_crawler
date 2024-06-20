function printReport(pages) {
    const sortedPagesArray = Object.entries(pages).sort(([, a], [, b]) => b - a);
    for (const page of sortedPagesArray) {
        console.log(`Found ${page[1]} link(s) to URL: ${page[0]}`);
    }
}

export { printReport };