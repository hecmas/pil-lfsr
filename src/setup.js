const { FGL } = require("pil-stark");

module.exports.buildConstants = async function (pols) {
    const N = pols.ISBEFORELAST.length;

    for (let i = 0; i < N; i++) {
        pols.ISBEFORELAST[i] = i == N-2 ? 1n : 0n;
    }
};

module.exports.execute = async function (pols, input) {
    const N = pols.state0.length;

    pols.state0[0] = BigInt(input[0]);
    pols.state1[0] = BigInt(input[1]);
    pols.state2[0] = BigInt(input[2]);
    pols.state3[0] = BigInt(input[3]);
    pols.state4[0] = BigInt(input[4]);
    pols.state5[0] = BigInt(input[5]);
    pols.state6[0] = BigInt(input[6]);
    pols.state7[0] = BigInt(input[7]);
    pols.state8[0] = BigInt(input[8]);
    pols.state9[0] = BigInt(input[9]);

    const start_state = [pols.state0[0], pols.state1[0], pols.state2[0], pols.state3[0], pols.state4[0], pols.state5[0], pols.state6[0], pols.state7[0], pols.state8[0], pols.state9[0]].join("");
    let period = 1;

    for (let i = 1; i < N-1; i++) {
        pols.state0[i] = pols.state9[i - 1] + pols.state6[i-1] - BigInt(2)*pols.state9[i-1]*pols.state6[i-1];
        pols.state1[i] = pols.state0[i-1];
        pols.state2[i] = pols.state1[i-1];
        pols.state3[i] = pols.state2[i-1];
        pols.state4[i] = pols.state3[i-1];
        pols.state5[i] = pols.state4[i-1];
        pols.state6[i] = pols.state5[i-1];
        pols.state7[i] = pols.state6[i-1];
        pols.state8[i] = pols.state7[i-1];
        pols.state9[i] = pols.state8[i-1];
        let intermediate_state = [pols.state0[i], pols.state1[i], pols.state2[i], pols.state3[i], pols.state4[i], pols.state5[i], pols.state6[i], pols.state7[i], pols.state8[i], pols.state9[i]].join("");
        
        // Sanity check
        if (intermediate_state == start_state) {
            console.log("Period found at " + i);
            break;
        }
        period++;
    }

    pols.state0[N-1] = pols.state0[N-2];
    pols.state1[N-1] = pols.state1[N-2];
    pols.state2[N-1] = pols.state2[N-2];
    pols.state3[N-1] = pols.state3[N-2];
    pols.state4[N-1] = pols.state4[N-2];
    pols.state5[N-1] = pols.state5[N-2];
    pols.state6[N-1] = pols.state6[N-2];
    pols.state7[N-1] = pols.state7[N-2];
    pols.state8[N-1] = pols.state8[N-2];
    pols.state9[N-1] = pols.state9[N-2];

    // TBD: What should I output?
    const final_state = [pols.state0[N-1], pols.state1[N-1], pols.state2[N-1], pols.state3[N-1], pols.state4[N-1], pols.state5[N-1], pols.state6[N-1], pols.state7[N-1], pols.state8[N-1], pols.state9[N-1]].join("");
    return [final_state, period];
};
