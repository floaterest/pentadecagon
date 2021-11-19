const ns = 'http://www.w3.org/2000/svg';

function svg(w: number, h: number){
    return $(document.createElementNS(ns, 'svg')).attr({
        width: w,
        height: h,
    });
}

function circle(cx: number, cy: number, r: number){
    return $(document.createElementNS(ns, 'circle')).attr({
        cx: cx,
        cy: cy,
        r: r,
    });
}

function line(x1: number, y1: number, x2: number, y2: number){
    return $(document.createElementNS(ns, 'line')).attr({
        x1: x1,
        y1: y1,
        x2: x2,
        y2: y2,
    });
}

function arc(r: number, x1: number, y1: number, x2: number, y2: number){
    return $(document.createElementNS(ns, 'path')).attr({
        d: `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`,
    });
}
