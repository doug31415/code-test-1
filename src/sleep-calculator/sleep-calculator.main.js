import { useEffect, useState } from 'react';
import './sleep-calculator.css'
import { saveSleepScore } from './sleep-calulator.api';

function SleepCalculatorMain (){
    const [durInBed, setDurInBed] = useState(0);
    const [durInBedVals, setDurInBedVals] = useState([]);

    const [durAsleep, setDurAsleep] = useState(0);
    const [durAsleepVals, setDurAsleepVals] = useState([]);

    const [sleepScore, setSleepScore] = useState(0);

    const [loading, setLoading] = useState(false);


    useEffect(() =>  {
        const durations = getDurations();
        setDurInBedVals(durations);
        setDurAsleepVals([...durations]);
    }, []);

    useEffect( () =>  {
        const uploadSleepScore = async () => {
            console.log('uploadSleepScore');
            await saveSleepScore(sleepScore);
            setLoading(false);
        };

     uploadSleepScore();
    }, [sleepScore]);

    const getDurations = () =>{
        const vals = [];
        for(let i=0; i<24; i++){
            const valObj1 = {label: `${i} hrs`, value: i};
            const valObj2 = {label: `${i}.5 hrs`, value: i + .5};
            vals.push( valObj1, valObj2)
        }
        // add the last val for 24 hrs - no need for 24.5
        vals.push( {label: `24 hrs`, value: 24})
        return vals;
    }

    const updateDurInBed = evt => {
        setDurInBed(evt.target.value)
    }

    const updateDurAsleep = evt => {
        setDurAsleep(evt.target.value)
    }

    const calculateScore = evt => {
        const newSleepScore = 100 * durAsleep/durInBed;
        // round to two decimal places
        const trimmed = Math.round(newSleepScore * 100) / 100;

        if(sleepScore === trimmed){
            return;
        }
        
        setSleepScore(trimmed);
        setLoading(true);
    }

    return (
        <div className="sleep-calculator-wrapper">
            <h1>Calculate Your Sleep Score</h1>

            <div className="input-wrapper">
                <label>Duration in bed</label>
                <select name="durationInBed" id="durationInBed" onChange={updateDurInBed}>
                    {durInBedVals.length && durInBedVals.map(val =>
                        <option key={val.label} value={val.value}>{val.label}</option> )}
                </select>
            </div>
            <div className="input-wrapper">
                <label>Duration asleep</label>
                <select name="durationAsleep" id="durationAsleep" onChange={updateDurAsleep}>
                    {durAsleepVals.length && durAsleepVals.map(val =>
                        <option key={val.label} value={val.value}>{val.label}</option> )}
                </select>
            </div>

            <div className="input-wrapper">
                <button onClick={calculateScore}>Calculate</button>
            </div>

            {loading && (
                <div className="input-wrapper">
                    <label>Loading...</label>
                </div>
            )}

            {!loading && (
                <div className="input-wrapper">
                    <label>Sleep Score</label>
                    <label>{sleepScore}</label>
                </div>
            )}

            
        </div>
    )
}

export default SleepCalculatorMain;