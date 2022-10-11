module.exports.buildConstants = async function (pols) {
    const N = pols.ISBEFORELAST.length;

    for (let i = 0; i < N; i++) {
        pols.ISBEFORELAST[i] = i == N-2 ? 1n : 0n;
    }
};

module.exports.execute = async function (pols, input) {
    const N = pols.state[0].length;

    let start_state = ""
    for (let i = 0; i < pols.state.length; i++) {
        pols.state[i][0] = BigInt(input[i]);
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

    // TBD: What should I output?
    let final_state = ""
    for (let i = 0; i < pols.state.length; i++) {
        final_state += pols.state[i][N-1];
    }

    return [final_state, period];
};
