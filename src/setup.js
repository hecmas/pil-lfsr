module.exports.buildConstants = async function (pols) {
    const N = pols.ISBEFORELAST.length;

    for (let i = 0; i < N; i++) {
        pols.ISBEFORELAST[i] = i == N-2 ? 1n : 0n;

        const binary = i.toString(2).padStart(10, '0');
        pols.INPUT0[i] = BigInt(binary[0]);
        pols.INPUT1[i] = BigInt(binary[1]);
        pols.INPUT2[i] = BigInt(binary[2]);
        pols.INPUT3[i] = BigInt(binary[3]);
        pols.INPUT4[i] = BigInt(binary[4]);
        pols.INPUT5[i] = BigInt(binary[5]);
        pols.INPUT6[i] = BigInt(binary[6]);
        pols.INPUT7[i] = BigInt(binary[7]);
        pols.INPUT8[i] = BigInt(binary[8]);
        pols.INPUT9[i] = BigInt(binary[9]);
        pols.OUTPUT[i] = BigInt(binary[0]) ^ BigInt(binary[1]) ^ BigInt(binary[2]) ^ BigInt(binary[3]) ^ BigInt(binary[4]) ^ BigInt(binary[5]) ^ BigInt(binary[6]) ^ BigInt(binary[7]) ^ BigInt(binary[8]) ^ BigInt(binary[9]);
    }
};

module.exports.execute = async function (pols, input) {
    const N = pols.state[0].length;

    for (let i = 0; i < pols.state.length; i++) {
        pols.taps[i][0] = BigInt(input.taps[i]);
    }

    for (let i=1; i < N; i++) {
        for (let j = 0; j < pols.state.length; j++) {
            pols.taps[j][i] = pols.taps[j][i-1];
        }
    }

    let start_state = ""
    for (let i = 0; i < pols.state.length; i++) {
        pols.state[i][0] = BigInt(input.state[i]);
        start_state += pols.state[i][0];
    }

    let period = 1;
    for (let i = 1; i < N-1; i++) {
        pols.state[0][i] = pols.state[9][i - 1] + pols.state[6][i-1] - BigInt(2)*pols.state[9][i-1]*pols.state[6][i-1];

        for (let j = 1; j < pols.state.length; j++) {
            pols.state[j][i] = pols.state[j-1][i-1];
        }

        let intermediate_state = ""
        for (let j = 0; j < pols.state.length; j++) {
            intermediate_state += pols.state[j][i];
        }
        
        // Sanity check
        if (intermediate_state == start_state) {
            console.log("Period found at " + i);
            break;
        }
        period++;
    }

    for (let i = 0; i < pols.state.length; i++) {
        pols.state[i][N-1] = pols.state[i][N-2];
    }

    for (let i = 0; i < N; i++) {
        pols.xor[i] = pols.taps[0][i]*pols.state[0][i] ^ pols.taps[1][i]*pols.state[1][i] ^ pols.taps[2][i]*pols.state[2][i] ^ pols.taps[3][i]*pols.state[3][i] ^ pols.taps[4][i]*pols.state[4][i] ^ pols.taps[5][i]*pols.state[5][i] ^ pols.taps[6][i]*pols.state[6][i] ^ pols.taps[7][i]*pols.state[7][i] ^ pols.taps[8][i]*pols.state[8][i] ^ pols.taps[9][i]*pols.state[9][i];
    }

    // TBD: What should I output?
    let final_state = ""
    for (let i = 0; i < pols.state.length; i++) {
        final_state += pols.state[i][N-1];
    }

    return [final_state, period];
};
