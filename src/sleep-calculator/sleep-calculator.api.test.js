import {saveSleepScore} from "./sleep-calulator.api";
import {SET_ERROR, SET_SUCCESS} from "./sleep-calulator.consts";

test('api returns success val', async () => {
    const val = await saveSleepScore(500);
    expect(val).toEqual({status:SET_SUCCESS})
});

test('api returns failure val', async () => {
    const val = await saveSleepScore(500, true);
    expect(val).toEqual(SET_ERROR)
});