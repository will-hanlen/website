import vect from './vect'

// causes an overhang
const test1 = [
    {x: 50,  y: 220},
    {x: 100, y: 180},
    {x: 150, y: 120},
    {x: 200, y: 70},
    {x: 190+Math.random()*25, y: 81+Math.random()*25},
    {x: 250, y: 220},
    {x: 300, y: 220},
    {x: 350, y: 220},
]
// 2 overhangs
const test2 = [
    {x: 0, y: 180},
    {x: 50, y: 120},
    {x: 100, y: 70},
    {x: 90+Math.random()*25, y: 81+Math.random()*25},
    {x: 130, y: 170},
    {x: 150, y: 120},
    {x: 200, y: 70},
    {x: 190+Math.random()*25, y: 81+Math.random()*25},
    {x: 250, y: 220},
    {x: 320, y: 130},
]

function topoSurface(
    minX, // left-most X cord
    maxX, // right-most X cord
    startY, // Y cord of first point
    iterations, // number of lines that are generated
    steps, // number of points per line
    gap, // size of gap between lines
    amp1, // amplitude of the main curve
    amp2, // amplitude of the secondary curve
    freq1, // frequency of main curve
    freq2, // frequency of secondary curve
    steepest, // steepest allowed angle in rads
) {
    var surface = []

    // first curve
    var sine = []
    for (let i=0; i<=steps; i++) {
        const hps = 2
        const stepSize = Math.PI * hps / steps
        const x = i * (maxX-minX) / steps + minX
        const y = Math.sin(stepSize * i * freq1) * amp1 +
              (Math.sin(stepSize * i * freq2) * amp2) +
              startY
        sine.push({x, y})
    }

    var pCurve = {
        curve: sine,
        // curve: test2,
        marks: []
    }
    surface.push(pCurve)
    for (let j=0; j<iterations; j++) {
        pCurve = nCurve(pCurve, gap, minX, maxX, steepest, steps)
        surface.push(pCurve)
    }
    return surface
}

const nCurve = (
    pCurve, // previous curve, off which to build this one
    gap, // the space between this curve and the previous
    minX, // lowest allowed x coord
    maxX, // highest allowed x coord
    steepest, // steepest allowed angle
    steps,
) => {

    // naively propagate by offsetting
    const c1 = offset(pCurve, gap, steepest)


    // smooth out janky bits
    const c2 = smoothenCurve(c1, gap)

    // remove any looping
    const c3 = cutLoops(c2)

    // trim ends to be within minX and maxX
    // const c4 = trimEnds(c3, minX, maxX)

    // entend ends to match minX and maxX
    const c4 = alignEnds(c3, minX, maxX)

    const c5 = splitLong(c4, steps)

    return c5
}

const offset = (
    prevCurve, // the curve to base the offset on
    gap, // the distance of the offset
    steepest,
) => {
    const pCurve = prevCurve.curve
    const nextCurve = []
    for (let i=0; i<pCurve.length; i++) {

        const t = pCurve[i] // this point
        const p = pCurve[i - 1] || {x:0, y:t.y} // previous point
        const n = pCurve[i + 1] || {x:400, y:t.y} // next point
        const pp = pCurve[i - 2] || {x:0, y:0} // double previous point
        const nn = pCurve[i + 2] || {x:400, y:0} // double next point

        // angles of prev and next segments
        const a1 = Math.atan2(t.y - p.y, t.x - p.x) + Math.PI/2
        const a2 = Math.atan2(n.y - t.y, n.x - t.x) + Math.PI/2

        // avg angle
        const a = (a1 + a2) / 2

        // Don't propagate point if too crowded
        if (Math.abs(a1 - a2) > steepest) {
            continue
        }

        const dx1 = Math.cos(a1) * gap
        const dy1 = Math.sin(a1) * gap

        const dx2 = Math.cos(a2) * gap
        const dy2 = Math.sin(a2) * gap

        var dx = Math.cos(a) * gap
        var dy = Math.sin(a) * gap

        nextCurve.push({
            x: t.x + dx,
            y: t.y + dy,
            a, // angle of dx,dy
            t, // parent node
            p, // parent's previous
            n, // parent's next
            pp, nn, // double prev and next
            tg: {  // guide-point from parent
                x: t.x + dx,
                y: t.y + dy
            },
            pg: {  // guide-point from parent's previous
                x: t.x + dx1,
                y: t.y + dy1
            },
            ng: {  // guide-point from parent's next
                x: t.x + dx2,
                y: t.y + dy2
            }
        })
    }
    return {
        curve: nextCurve,
        marks: []
    }
}

const cutLoops = (iter) => {
    var {curve, marks} = iter
    var oneLess = iter
    while (oneLess) {
        oneLess = removeOneLoop({curve, marks})
        if (oneLess) {
            curve = oneLess.curve
            marks = oneLess.marks
        }
        else {
            break
        }
    }
    return {curve, marks}
}

const removeOneLoop = (iter) => {
    var {curve, marks} = iter

    for (let i=1; i<curve.length; i++) {
        for (let j=1; j<curve.length; j++) {
            const a = curve[i]
            const b = curve[i-1]
            const c = curve[j]
            const d = curve[j-1]
            const loop = vect.intersect(a, b, c, d)
            if (loop) {
                marks.push({loop})
                var early = Math.min(i, j)
                var later = Math.max(i, j)
                curve.splice(early, later-early, {x: loop.x, y:loop.y})
                return {curve, marks}
            }
        }
    }
    return false
}

// Repoistions points whose guide-line crosses a parent line
const smoothenCurve = (iter, gap) => {
    var {curve, marks} = iter
    var oneLess = iter
    while (oneLess) {
        oneLess = smoothOne({curve, marks})
        if (oneLess) {
            curve = oneLess.curve
            marks = oneLess.marks
        }
        else {
            break
        }
    }
    return {curve, marks}
}

const smoothOne = (iter, gap) => {

    var {curve, marks} = iter

    for (let i=0; i<curve.length; i++) {
        var p1 = curve[i]

        const pOverlap = vect.intersect(p1, p1.t, p1.p, p1.pp)
        const nOverlap = vect.intersect(p1, p1.t, p1.n, p1.nn)

        // add push index to toRemove if overlapping
        if (pOverlap || nOverlap) {
            marks.push(pOverlap || nOverlap)
            curve.splice(i, 1)
            return {curve, marks}
        }
    }

    return false
}


const alignEnds = (iter, minX, maxX) => {
    var {curve, marks} = iter

    while(curve[1].x < minX) {
        curve.shift()
    }

    while(curve[curve.length - 1].x > maxX) {
        curve.pop()
    }

    return padEnds({curve, marks}, minX, maxX)
}

const padEnds = (iter, minX, maxX) => {
    let {curve, marks} = iter

    // Reposition the first point if it's inside the bounds
    if (curve[0].x > minX) {
        const first = curve[0]
        const stationary = curve[1]
        const ang = vect.angle(first, stationary)

        const xOff = minX - stationary.x
        const yOff = Math.tan(ang) * xOff

        const newLast = {
            x: stationary.x + xOff,
            y: stationary.y + yOff
        }
        // marks.push(newLast)
        curve[0] = newLast
    }

    // Reposition the last point if it's inside the bounds
    if (curve[curve.length - 1].x < maxX) {
        const last = curve[curve.length - 1]
        const stationary = curve[curve.length - 2]
        const ang = vect.angle(last, stationary)

        const xOff = maxX - stationary.x
        const yOff = Math.tan(ang) * xOff

        const newLast = {
            x: stationary.x + xOff,
            y: stationary.y + yOff
        }
        // marks.push(newLast)
        curve[curve.length - 1] = newLast
    }
    return {curve, marks}
}


const splitLong = (iter, steps) => {
    var {curve, marks} = iter
    const times = steps - curve.length
    // add nodes to areas which are comparatively long
    for (let i=0; i<times; i++) {
        // find longest vector
        let soFarLen = 0
        let soFarVec = null
        let soFarInd = 0
        for (let j=0; j<curve.length-1; j++) {
            const p1 = curve[j]
            const p2 = curve[j+1]
            const thisLen = vect.len(p1, p2)
            if (thisLen > soFarLen) {
                soFarLen = thisLen
                soFarVec = [p1, p2]
                soFarInd = j
            }
        }
        const [p1, p2] = soFarVec
        const lv = vect.len(p1, p2)
        const newVec = vect.mid(p1, p2)
        marks.push(newVec)
        curve.splice(soFarInd+1, 0, newVec)
    }
    return {curve, marks}
}



export default topoSurface
