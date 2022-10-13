# PIL LFSR
Implementation of a Linear-Feedback Shift Register (LFSR) in PIL.

## TODOS

- [x] Generalize it to the setting where the taps are private inputs, so that you can generate a (zk-)STARK of a statement such as: <p style="text-align: center;"> The output of my LFSR is X, given a (secret) configuration C and a (possibly public) inital state X_0. </p>

- [ ] Generalize it to the setting were degree (number of bits) of the LFSR is chosen by the user.

## Resources

- Wikipedia is (almost) always helpful for doing basic cryptography [here](https://en.wikipedia.org/wiki/Linear-feedback_shift_register).
- Spanish explanation of LFSRs [here](https://www.fpgalover.com/software/lfsrs-cryptology-in-python-part-1). They use them to encrypt a song!