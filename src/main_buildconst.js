const path = require("path");
const version = require("../package").version;
const { newConstantPolsArray, compile } = require("pilcom");
const F = require("pil-stark").FGL;

const smLFSR = require("./setup.js");



const argv = require("yargs")
    .version(version)
    .usage("node main_buildconst.js -o <lfsr.const>")
    .alias("o", "output")
    .argv;

async function run() {

    const outputFile = typeof(argv.output) === "string" ?  argv.output.trim() : "lfsr.const";

    const pil = await compile(F, path.join(__dirname, "lfsr.pil"));

    const constPols = newConstantPolsArray(pil);

    await smLFSR.buildConstants(constPols.LFSR);

    await constPols.saveToFile(outputFile);

    console.log("File generated correctly");
}

run().then(()=> {
    process.exit(0);
}, (err) => {
    console.log(err.message);
    console.log(err.stack);
    process.exit(1);
});

