const groupTicks = (startAngle, endAngle, step) => {
    return d3.range(startAngle, endAngle, step).map((value) => {
        return { value, angle: value };
    });
};

const renderTick = (g, data, reverse = false) => {
    let width = +d3.select('svg').attr('width');
    let height = +d3.select('svg').attr('height');
    let outerRadius = (Math.min(width, height) * 0.5) - 40;
    let innerRadius = outerRadius - 30;
    const length = data.length;
    let groupTick = g.append('g')
        .attr('class', 'ticks')
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'tick')
        .attr('transform', (d, i) => {
            if (reverse) {
                return `rotate(${(i / length * 180 - 90)}) translate(${-outerRadius},0)`;
            } else {
                return `rotate(${(i / length * 180 - 90)}) translate(${outerRadius},0)`;
            }
        });

    groupTick.append('line')
        .attr('class', 'tick-line')
        .attr('x2', () => (reverse ? -6 : 6));

    groupTick
        .append('text')
        .attr('x', () => (reverse ? -8 : 8))
        .attr('dy', '.35em')
        .style('text-anchor', (d) => { return reverse ? 'end' : null; })
        .text(d => d.name);
};

/**
 * 渲染两边
 * @param  {[type]} g    [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const renderPerspectiveLeft = (g, data) => {
    let width = +d3.select('svg').attr('width');
    let height = +d3.select('svg').attr('height');
    let outerRadius = (Math.min(width, height) * 0.5) - 40;
    let innerRadius = outerRadius - 30;
    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
    const color = d3.scaleOrdinal()
        .domain(d3.range(4))
        .range(['#000000', '#FFDD89', '#957244', '#F26223']);

    const length = data.length;

    const middles = g.append('g')
        .attr('class', 'perspectives')
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'perspective')
        .append('path')
        .style('fill', (d, i) => color(i))
        .style('stroke', (d, i) => d3.rgb(color(i)).darker())
        .attr('d', (d, i) => {
            arc.startAngle((i * Math.PI) / length)
                .endAngle(((i + 1) * Math.PI) / length);
            // console.log(d, i);
            return arc();
        });
    renderTick(g, data);
    return middles;
};

export const renderPerspectiveRight = (g, data) => {
    let width = +d3.select('svg').attr('width');
    let height = +d3.select('svg').attr('height');
    let outerRadius = (Math.min(width, height) * 0.5) - 40;
    let innerRadius = outerRadius - 30;
    const arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);
    const color = d3.scaleOrdinal()
        .domain(d3.range(4))
        .range(['#000000', '#FFDD89', '#957244', '#F26223']);

    const length = data.length;

    const middles = g.append('g')
        .attr('class', 'perspectives')
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'perspective')
        .append('path')
        .style('fill', (d, i) => color(i))
        .style('stroke', (d, i) => d3.rgb(color(i)).darker())
        .attr('d', (d, i) => {
            arc.startAngle(Math.PI + ((i * Math.PI) / length))
                .endAngle(Math.PI + (((i + 1) * Math.PI) / length));
            // console.log(d, i);
            return arc();
        });
    renderTick(g, data, true);
    return middles;
};
