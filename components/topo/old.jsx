import React, { useRef, useEffect } from 'react'
import styles from './topo.module.css'


/*

General Idea: Auto-generated topographical map inspired art
- beautiful curves

Series of paralellish lines look good together.

A line is sine wave

A single line has these attributes:
- a starting coordinate (x, y)
- an ending coordinate (x, y)
- number of half phases
- the amplitude of the main curve
- the amplitude of the sine wave overlayed on the curve
- the offset of the sine wave overlayed on the curve
 */

function mod(n, m) {
  return ((n % m) + m) % m;
}

function slope(x1, y1, x2, y2) {
    const rise = y2 - y1
    const run = x2 - x1
    const slope = rise / run
    if (isNaN(slope)) return 10000
    return slope
}

function ninthGrade(x1, y1, x2, y2) {
    const m = slope(x1, y1, x2, y2)
    const b = y2 - (x2 * m)
    return {m, b}
}

function crossProduct(x1, y1, x2, y2) {
    return x1 * y2 - x2 * y1
}

function direction(x1, y1, x2, y2, x3, y3) {
    return crossProduct(x3 - x1, y3 - y1, x2 - x1, y2 - y1)
}
const markv = (ctx, x1, y1, x2, y2) => {
    ctx.beginPath()
    ctx.strokeStyle = "#ff000033"
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.lineWidth = 4
    ctx.stroke()
}
const mark = (ctx, x, y) => {
    ctx.beginPath()
    ctx.stokeStyle = "#00000000"
    ctx.fillStyle = "#ff000033"
    ctx.arc(x, y, 5, 0, Math.PI * 2)
    ctx.fill()
}

function intersect(x1, y1, x2, y2, x3, y3, x4, y4, ctx) {
    const d1 = direction(x3, y3, x4, y4, x1, y1)
    const d2 = direction(x3, y3, x4, y4, x2, y2)
    const d3 = direction(x1, y1, x2, y2, x3, y3)
    const d4 = direction(x1, y1, x2, y2, x4, y4)
    if (((d1 > 0 && d2 < 0) || (d1 < 0 && d2 > 0)) &&
        ((d3 > 0 && d4 < 0) || (d3 < 0 && d4 > 0)
        )) {
        const {m:m1, b:b1} = ninthGrade(x1, y1, x2, y2)
        const {m:m2, b:b2} = ninthGrade(x3, y3, x4, y4)
        const x_const = b2 - b1
        const x_coef = m1 - m2
        const x = x_const / x_coef
        const y = m1 * x + b1
        // mark(ctx, x, y)
        return {x, y}
    }
    return false
}

const Topo = (props) => {

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const w = ctx.canvas.width
        const h = ctx.canvas.height

        const stroke = 4

        ctx.clearRect(0, 0, w, h)

        ctx.lineJoin = "round"
        ctx.lineCap = "round"
        ctx.lineWidth = stroke * 2
        ctx.strokeStyle = 'black'
        ctx.strokeRect(0, 0, w, h)
        ctx.lineWidth = stroke

        propagateLine(ctx, sine, 100, 5)
    }, [])


    const steps = 100

    // Create the initial curve
    var sine = []
    for (let i=0; i<=steps; i++) {
        const hps = 2
        const stepSize = Math.PI * hps / steps
        const x = i * 400 / steps
        const y = Math.sin(stepSize * i) * 50 +
              (Math.sin(stepSize * i * 3) * 20) -
              100
        sine.push({x, y})
    }

    var test = [
        {x:10,  y:115},
        {x:50,  y:155},
        {x:100, y:176},
        {x:150, y:130},
        {x:200, y:115},
        {x:250, y:180},
        {x:300, y:176},
        {x:350, y:130},
        {x:390, y:150},
    ]

    var test2 = [
        {x:  40, y: 200},
        {x:  100, y: 190},
        {x: 5, y: 120},
        {x: 155, y: 80},
        {x: 200, y: 40},
        {x: 175, y: 80},
        {x: 300, y: 240},
        {x: 350, y: 120},
        {x: 360, y: 100},
    ]

    var test3 = [
        {x:  40, y: 200},
        {x:  100, y: 190},
        {x: 5, y: 120},
        {x: 155, y: 80},
        {x: 100, y: 40},
        {x: 175, y: 80},
        {x: 300, y: 240},
        {x: 350, y: 120},
        {x: 360, y: 100},
    ]

    const drawLine = (ctx, x1, y1, x2, y2, color, width) => {
        ctx.lineWidth = width
        ctx.strokeStyle = color
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.lineTo(x2, y2)
        ctx.stroke()
    }

    const drawGroup = (ctx, cs, noMain, d1, d2, dm) => {
        var oldX = cs[0].x
        var oldY = cs[0].y
        for (let i=0; i<cs.length; i++) {
            var c = cs[i]

            if (!noMain) drawLine(ctx, oldX, oldY, c.x, c.y, "black", 2)

            if (false) {
            // mark(ctx, c.x, c.y)
            if (d1) {
                drawLine(ctx, c.ox, c.oy, c.ox + c.dx1, c.oy+c.dy1, "red", 1)
            }
            if (d2) {
                drawLine(ctx, c.ox, c.oy, c.ox + c.dx2, c.oy+c.dy2, "red", 1)
            }

            if (dm) {
                drawLine(ctx, c.ox, c.oy, c.ox+c.dx, c.oy+c.dy, "green", 1)
            }
            }

            oldX = c.x
            oldY = c.y
        }
    }

    const deg = (rad) => rad * 57.29578

    const lenVect = (x1, y1, x2, y2) => {
        return Math.sqrt(Math.pow(y2 - y1, 2) + Math.pow(x2 - x1, 2))
    }

    const midVec = (x1, y1, x2, y2) => {
        return {
            x: (x1 + x2) / 2,
            y: (y1 + y2) / 2
        }
    }

    const spliceAtLongest = (ret, times) => {
        // add nodes to areas which are comparatively long
        for (let i=0; i<times; i++) {
            // find longest vector
            let soFarLen = 0
            let soFarVec = null
            let soFarInd = 0
            for (let j=0; j<ret.length-1; j++) {
                const p1 = ret[j]
                const p2 = ret[j+1]
                const thisLen = lenVect(p1.x, p1.y, p2.x, p2.y)
                if (thisLen > soFarLen) {
                    soFarLen = thisLen
                    soFarVec = [p1, p2]
                    soFarInd = j
                }
            }
            const [p1, p2] = soFarVec
            const lv = lenVect(p1.x, p1.y, p2.x, p2.y)
            const rness = 0.1
            const r1 = Math.random() * lv * rness
            const r2 = Math.random() * lv * rness
            const r3 = Math.random() * lv * rness
            const r4 = Math.random() * lv * rness
            const newVec = midVec(p1.x+r1, p1.y+r2, p2.x+r3, p2.y+r4)
            ret.splice(soFarInd+1, 0, newVec)
        }
        return ret
    }


    const nCurve = (prevCurve, dist=10, ctx) => {
        console.log("new shape")

        var ret = []

        const rn1 = 0.2
        dist = Math.floor(Math.random() * dist) * rn1 + dist
        var numUncuts = 0
        for (let i=0; i<prevCurve.length; i++) {
            const rn2 = 0.7
            dist += (Math.random() * 4 - 2) * rn2
            const {x: tx, y: ty} = prevCurve[i]
            const {x: px, y: py} = prevCurve[i - 1] || {x:0, y:ty}
            const {x: nx, y: ny} = prevCurve[i + 1] || {x:400, y:ty}
            const {x: ppx, y: ppy} = prevCurve[i - 2] || {x:0, y:0}
            const {x: nnx, y: nny} = prevCurve[i + 2] || {x:400, y:0}

            const a1 = Math.atan2(ty - py, tx - px) + Math.PI/2
            const a2 = Math.atan2(ny - ty, nx - tx) + Math.PI/2
            const a = (a1 + a2) / 2

            // Don't propagate node if too crowded
            if (Math.abs(a1 - a2) > 2.4) {
                numUncuts += 1
                continue
            }

            const dx1 = Math.cos(a1) * dist
            const dy1 = Math.sin(a1) * dist

            const dx2 = Math.cos(a2) * dist
            const dy2 = Math.sin(a2) * dist

            var dx = Math.cos(a) * dist
            var dy = Math.sin(a) * dist

            // detect overlap with prevLine
            // check intersect with dx, dy -> tx, ty : px, py -> ppx, ppy
            var overlap = intersect(tx+dx, ty+dy, tx, ty, px, py, ppx, ppy, ctx)
            if (overlap && overlap.x && overlap.y) {
                console.log(overlap)
                markv(ctx, tx+dx, ty+dy, tx, ty)
                markv(ctx, px, py, ppx, ppy)
                // mark(ctx, overlap.x, overlap.y)
                // mark(ctx, tx, ty)

                // mark(ctx, tx+dx, ty+dy)
                // mark(ctx, px, py)
                const aa = a - Math.PI/3
                const dxa = Math.cos(aa) * dist * 0.75
                const dya = Math.sin(aa) * dist * 0.75
                dx = dxa
                dy = dya
                // mark(ctx, tx+dx, ty+dy)
            }

            // detect overlap with nextLine
            // check intersect with dx, dy -> tx, ty : px, py -> ppx, ppy
            overlap = intersect(tx+dx, ty+dy, tx, ty, nx, ny, nnx, nny, ctx)
            if (overlap && overlap.x && overlap.y) {
                console.log("next")
                console.log(overlap)
                const aa = a + Math.PI/3
                const dxa = Math.cos(aa) * dist * 0.75
                const dya = Math.sin(aa) * dist * 0.75
                dx = dxa
                dy = dya
            }

            ret.push({
                x: tx + dx,
                y: ty + dy,
                ox: tx,
                oy: ty,
                dx1,
                dy1,
                dx2,
                dy2,
                dx,
                dy,
            })
        }

        // Add back from when too crowded
        ret = spliceAtLongest(ret, numUncuts)

        // ensure starting point is to the inside of the bound
        var toUnshift = []
        while (ret[0].x < prevCurve[0].x) {
            // console.log("while1")
            const old = ret.shift()
            toUnshift.push(prevCurve[0].x)
        }
        // console.log("toUnshift", toUnshift.length)
        if (toUnshift.length) {
            ret.unshift({x:toUnshift.pop(), y:ret[0].y})
        }
        ret = spliceAtLongest(ret, toUnshift.length)

        // ensure the ending point is to the inside of the bound
        var toPush = []
        while (ret[ret.length-1].x > prevCurve[prevCurve.length-1].x) {
            // console.log("while")
            const old = ret.pop()
            toPush.push(prevCurve[prevCurve.length-1].x)
        }
        // console.log("toPush", toPush)
        if (toPush.length) {
            ret.push({x:toPush.pop(), y:ret[ret.length-1].y})
        }
        ret = spliceAtLongest(ret, toPush.length)

        /*
        var len = prevCurve.length
        var first = prevCurve[len-1]
        var second = prevCurve[len-1]
        var a = Math.atan2(second.y - first.y, second.x - first.x) + Math.PI/2
        var d = [Math.cos(a) * dist, Math.sin(a) * dist]
        ret.push({
            x:first.x,
            y:first.y+d[1],
            oy: first.y,
            ox: first.x,
            dx: d[0],
            dy: d[1],
        })

        var len = prevCurve.length
        var f = prevCurve[0]
        var s = prevCurve[1]
        var dis = Math.sqrt(Math.pow(s.y-f.y,2)+Math.pow(s.x-f.x,2))
        var a = Math.atan2(s.y - f.y, s.x - f.x) + Math.PI/2
        var d = [Math.cos(a) * dist, Math.sin(a) * dist]
        var offset = Math.abs(Math.sin(a)*dis)
        ret.push({
            x:f.x,
            y:f.y+offset,
            oy: f.y,
            ox: f.x,
            dx: d[0],
            dy: d[1],
        })
          */

        ret = removeAllInters(ctx, ret)
        // console.log(ret.length)
        const stps = 5
        ret = spliceAtLongest(ret, steps-ret.length)
        return ret
    }

    const removeAllInters = (ctx, ret) => {
        var b = ret
        var numRemoved = 0
        while (b) {
            var newe = removeOneInters(ctx, b)
            if (newe) {
                b = newe
                numRemoved += 1
            }
            else {
                break
            }
        }
        // for (let h=0; h<numRemoved; h++) {
        return b
    }


    const removeOneInters = (ctx, ret) => {
        for (let i=1; i<ret.length; i++) {
            for (let j=1; j<ret.length; j++) {
                const a = ret[i]
                const b = ret[i-1]
                const c = ret[j]
                const d = ret[j-1]
                const inter = intersect(a.x, a.y, b.x, b.y, c.x, c.y, d.x, d.y, ctx)
                if (inter) {
                    // mark(ctx, inter.x, inter.y)
                    var early = Math.min(i, j)
                    var later = Math.max(i, j)
                    ret.splice(early, later-early, {x:inter.x, y:inter.y})
                    return ret
                }
            }
        }
        return false
    }

    const propagateLine = (ctx, initialCurve, n, dist) => {
        var a = initialCurve
        drawGroup(ctx, a)

        for (let i=0; i<n; i++) {
            a = nCurve(a, dist, ctx)
            drawGroup(ctx, a, false, false, false, true)
        }
    }

    return (
        <canvas
            className={styles.centered}
            ref={canvasRef}
            width="400"
            height="400"
            {...props} />
    )
}

export default Topo
