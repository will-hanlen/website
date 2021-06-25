import react, { useRef, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import styles from './topo.module.css'
import topoSurface from './topo'

const LineCanvas = (props) => {

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const ctx = canvas.getContext('2d')

        const w = ctx.canvas.width
        const h = ctx.canvas.height

        // Clear canvas befor re-drawing and reset style
        ctx.clearRect(0, 0, w, h)
        ctx.lineJoin = "round"
        ctx.lineCap = "round"
        ctx.strokeStyle = 'black'

        // Draw outer border if 'border' prop is true
        if (props.showborder) {
            ctx.lineJoin = "miter"
            ctx.lineWidth = props.linewidth * 2
            ctx.strokeRect(
                0,
                0,
                w,
                h,
            )
        }

        // default line width
        ctx.lineWidth = props.linewidth


        // Generate the surface
        const surface = topoSurface(
            props.minx,
            props.maxx,
            props.starty,
            props.iterations,
            props.steps,
            props.gapsize,
            props.amp1,
            props.amp2,
            props.freq1,
            props.freq2,
            props.steepest,
        )

        // Draw the surface
        drawSurface(ctx, surface)
    })


    // Draw one line segment
    // Uses current ctx color and width
    // This is never called manually
    const drawSegment = (ctx, p1, p2, color="black", width=props.linewidth) => {
        ctx.strokeStyle = color
        ctx.lineWidth = width

        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.stroke()
    }

    // Draw one mark
    const drawMark = (ctx, point, color="#ff000055", radius=props.linewidth) => {
        ctx.fillStyle = color
        ctx.beginPath()
        ctx.arc(point.x, point.y, radius, 0, 2*Math.PI)
        ctx.fill()
    }

    // Draws one curve
    // Points is an array of points
    // options.color = the color of the line
    // options.width = the width of the line
    const drawCurve = (ctx, points) => {
        // draw the curve
        for (let i=1; i<points.length; i++) {
            const a = points[i-1]
            const b = points[i]
            // draw the main segment
            drawSegment(ctx, a, b)

            // draw the debugging segments
            if (props.debug && a.t && a.ng && a.pg) {
                drawSegment(ctx, a, a.t, "#0000ff55", 1)
                drawSegment(ctx, a, a.pg, "#ff000055", 1)
                drawSegment(ctx, a, a.ng, "#00ff0055", 1)
            }
        }
    }

    // Draw a surface (one or more lines)
    // surface.curves = array of points making the curve
    // surface.marks = array of points to mark. only draw if 'marks'
    const drawSurface = (ctx, surface) => {

        // Draw all the lines
        surface.forEach(curve => {
            drawCurve(ctx, curve.curve)
            curve?.marks.forEach(m => {
                if (props.debug) drawMark(ctx, m)
            })
        })
    }

    return (
        <canvas
            className={styles.centered}
            ref={canvasRef}
            width="400"
            height="400"
            {...props}
        />
    )
}

LineCanvas.propTypes = {
    linewidth: PropTypes.number.isRequired,
    gapsize: PropTypes.number.isRequired,
    steps: PropTypes.number.isRequired,
    showborder: PropTypes.number.isRequired,
    minx: PropTypes.number.isRequired,
    maxx: PropTypes.number.isRequired,
    starty: PropTypes.number.isRequired,
    iterations: PropTypes.number.isRequired,
    debug: PropTypes.number.isRequired,
    steepest: PropTypes.number.isRequired,
}

export default LineCanvas
