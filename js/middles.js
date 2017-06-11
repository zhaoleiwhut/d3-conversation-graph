/**
 * 渲染中间的坐标
 * @param  {[type]} g    [description]
 * @param  {[type]} data [description]
 * @return {[type]}      [description]
 */
export const renderMiddles = (g, data) => {
    let width = +d3.select('svg').attr('width');
    let height = +d3.select('svg').attr('height');
    let outerRadius = (Math.min(width, height) * 0.5) - 40;
    let innerRadius = outerRadius - 30;

    const length = data.length;

    const middles = g.append('g')
        .attr('class', 'middles')
        .selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'middle')
        .each(function(d, i) {
            let gg = d3.select(this);
            let y = (13 * i) - 390;
            gg.append('rect')
                .attr('fill', '#000')
                .attr('x', '-100')
                .attr('y', y)
                .attr('width', '200')
                .attr('height', '16');
            gg.append('text')
                .attr('fill', '#fff')
                .attr('x', '-90')
                .attr('y', y + 10)
                .text(d.name);
        });
    return middles;
};
