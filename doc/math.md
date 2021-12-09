# A Geometrical Approach
![](assets/o.svg)

Consider this figure. We need to find the coordinates of all points (`A` to `G`, along with others) in terms of `r` (the radius of circle `O`). To make the process easier, let's assume the center of the circle (point `O`) is at `(0,0)`

<details>
    <summary>tl;dr spoiler</summary>

![](assets/vars.svg)
</details>

## A and B
![](assets/ab.svg)

## C and D
![](assets/BOC.svg)

![](assets/cd.svg)

## E
![](assets/AOM.svg)

![](assets/e.svg)

(we also need to find `|AE|` for point [`F`](#f))

![](assets/ae.svg)

## F
![](assets/AOF.svg)

![](assets/f.svg)

- The reason why ![](assets/triv.svg) is trivial and left as an exercise to the reader.
    <details><summary>spoiler</summary>

    ![](assets/trivial.svg)
    </details>

## G
![](assets/POG.svg)

![](assets/g.svg)

# An Algebraic Approach
This is a zoomed-in view of the arc `FG`. Because we are considering the stroke widths, we need to find the 4 intersections (`y1` to `y4`) of the 4 graphs using algebra.
Let the stroke width of the center circle be `2c` and the others, `2s`. 

![](assets/hl.png)

![](assets/alg.svg)

![](assets/ys.svg)

# Implementation
> the code where these maths are implemented is in [`stores.ts`](../src/stores.ts)

