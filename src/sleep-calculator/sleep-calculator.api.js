import { SET_ERROR, SET_SUCCESS} from "./sleep-calulator.consts";

// eslint-disable-next-line no-unused-vars
let sleepScore = 0;

const pauser = ms => {
    return new Promise( resolve => setTimeout(resolve, ms));
}

export const saveSleepScore = async (val, showErr=false) => {
    try {
        await pauser(1000);
        if(showErr) {
            throw new Error(SET_ERROR);
        }

        sleepScore = val;
        // const { data } = await axios.patch('/score');
        return {status: SET_SUCCESS};
    } catch (err) {
        console.error(err);
        const errMsg = SET_ERROR;
        return errMsg;
    }
};
