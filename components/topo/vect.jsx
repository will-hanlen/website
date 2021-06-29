// Functions that act on one or more 2d vectors
// a 2d vector is an object with this shape:
// {
//     x: 52,
//     y: 41,
// }


// Angle between 2 points
function angle(p1, p2) {
    const a = Math.atan2(p2.y - p1.y, p2.x - p1.x)
    return a
}

const len = (p1, p2) => {
    return Math.sqrt(Math.pow(p2.y - p1.y, 2) + Math.pow(p2.x - p1.x, 2))
}

const mid = (p1, p2) => {
    return {
        x: (p1.x + p2.x) / 2,
        y: (p1.y + p2.y) / 2
    }
}


// Dot product of 2 segments
function dot(s1, s2) {
    return 0
}

// Cross product of 2 segments
function cross(x1, y1, x2, y2) {
    return x1 * y2 - x2 * y1
}

function direction(x1, y1, x2, y2, x3, y3) {
    return cross(x3 - x1, y3 - y1, x2 - x1, y2 - y1)
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

function intersect(p1, p2, p3, p4) {

    const {x:x1, y:y1} = p1
    const {x:x2, y:y2} = p2
    const {x:x3, y:y3} = p3
    const {x:x4, y:y4} = p4

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

        return {x, y}
    }
    return false
}

const vect = {
    intersect,
    len,
    angle,
    mid,
}

export default vect
