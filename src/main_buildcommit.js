const fs = require("fs");
const path = require("path");
const version = require("../package").version;
const { newCommitPolsArray, compile } = require("pilcom");
const F = require("pil-stark").FGL;

const smLFSR = require("./setup.js");

const argv = require("yargs")
    .version(version)
    .usage("node main_buildcommit.js -i <input.json> -o <lfsr.commit>")
    .alias("i", "input")
    .alias("o", "output")
    .argv;

async function run() {

    const inputFile = typeof(argv.input) === "string" ?  argv.input.trim() : "input.json";
    const outputFile = typeof(argv.output) === "string" ?  argv.output.trim() : "lfsr.commit";

    const pil = await compile(F, path.join(__dirname, "lfsr.pil"));

    const input = JSON.parse(await fs.promises.readFile(inputFile, "utf8"));
    const cmPols =  newCommitPolsArray(pil);

    const result = await smLFSR.execute(cmPols.LFSR, input);
    console.log("Result: " + result);

    await cmPols.saveToFile(outputFile);

    console.log("File generated correctly");
}

run().then(()=> {
    process.exit(0);
}, (err) => {
    console.log(err.message);
    console.log(err.stack);
    process.exit(1);
});

