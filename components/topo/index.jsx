import react, { useRef, useState, useEffect} from 'react'
import LineCanvas from './LineCanvas'
import PropTypes from 'prop-types'
import styles from './topo.module.css'

const Slider = ({ name, value, min, max, step, updater }) => {

    const handleChange = (e) => {
        const newNum = parseFloat(e.target.value)
        updater(newNum)
    }

    return (
        <label className={styles.knob}>
            <span>{name}</span>
            <input type="number"
                   value={value}
                   min={min}
                   max={max}
                   step={step}
                   onChange={handleChange}
            />
            <input type="range"
                   value={value}
                   min={min}
                   max={max}
                   step={step}
                   onChange={handleChange}
        />
        </label>
    )
}

const Checkbox = ({ name, value, updater }) => {

    const handleChange = (e) => {
        updater(!value)
    }

    return (
        <label className={styles.knob}>
            <span>{name}</span>
            <input type="checkbox"
                   checked={value}
                   onChange={handleChange}
            />
        </label>
    )
}

function LineCanvasController() {

    const [lineWidth, setLineWidth] = useState(6)
    const [gapSize, setGapSize] = useState(35)
    const [steps, setSteps] = useState(7)
    const [iterations, setIterations] = useState(1)
    const [minX, setMinX] = useState(40)
    const [maxX, setMaxX] = useState(360)
    const [startY, setStartY] = useState(100)
    const [amp1, setAmp1] = useState(10)
    const [amp2, setAmp2] = useState(40)
    const [freq1, setFreq1] = useState(1.3)
    const [freq2, setFreq2] = useState(3)
    const [steepest, setSteepest] = useState(2.4)
    const [border, setBorder] = useState(true)
    const [debug, setDebug] = useState(true)

    return (
        <>
            <h3 className={styles.sec}>Global</h3>
            <form className={styles.controls}>
                <Slider
                    updater={setLineWidth}
                    value={lineWidth}
                    name="Line Width"
                    min={1}
                    max={100}
                    step={1}
                />
                <Checkbox name="Border" updater={setBorder} value={border} />
                <Checkbox name="Debug" updater={setDebug} value={debug} />
            </form>

            <h3 className={styles.sec}>Topo</h3>
            <form className={styles.controls}>
                <Slider
                    updater={setGapSize}
                    value={gapSize}
                    name="Gap Size"
                    min={0}
                    max={200}
                    step={1}
                />
                <Slider
                    updater={setSteps}
                    value={steps}
                    name="Steps"
                    min={4}
                    max={200}
                    step={1}
                />
                <Slider
                    updater={setMinX}
                    value={minX}
                    name="Min X"
                    min={0}
                    max={400}
                    step={1}
                />
                <Slider
                    updater={setMaxX}
                    value={maxX}
                    name="Max X"
                    min={0}
                    max={400}
                    step={1}
                />
                <Slider
                    updater={setIterations}
                    value={iterations}
                    name="iterations"
                    min={1}
                    max={200}
                    step={1}
                />
                <Slider
                    updater={setStartY}
                    value={startY}
                    name="start Y"
                    min={-200}
                    max={200}
                    step={1}
                />
                <Slider
                    updater={setAmp1}
                    value={amp1}
                    name="amp 1"
                    min={0}
                    max={200}
                    step={1}
                />
                <Slider
                    updater={setAmp2}
                    value={amp2}
                    name="amp 2"
                    min={0}
                    max={10}
                    step={1}
                />
                <Slider
                    updater={setFreq1}
                    value={freq1}
                    name="freq 1"
                    min={0}
                    max={10}
                    step={0.1}
                />
                <Slider
                    updater={setFreq2}
                    value={freq2}
                    name="freq 2"
                    min={0}
                    max={20}
                    step={0.1}
                />
                <Slider
                    updater={setSteepest}
                    value={steepest}
                    name="Steepest Angle"
                    min={0}
                    max={4}
                    step={0.05}
                />
            </form>

            <LineCanvas
                linewidth={lineWidth}
                gapsize={gapSize}
                showborder={border ? 1 : 0}
                steps={steps}
                iterations={iterations}
                minx={minX}
                maxx={maxX}
                starty={startY}
                amp1={amp1}
                amp2={amp2}
                freq1={freq1}
                freq2={freq2}
                debug={debug ? 1: 0}
                steepest={steepest}
            />
        </>
    )
}

export default LineCanvasController
