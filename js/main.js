import { renderMiddles } from './middles'
import { renderPerspectiveLeft, renderPerspectiveRight } from './perspective';

let svg = d3.select('svg');
let width = +d3.select('svg').attr('width');
let height = +d3.select('svg').attr('height');
let g = svg.append('g')
    .attr('transform', `translate(${width / 2}, ${height / 2})`);

d3.json('./js/data.json', (error, data) => {
    console.log(data);
    let middles = renderMiddles(g, data.episodes);
    let pleft = renderPerspectiveLeft(g, data.themes);
    let pright = renderPerspectiveRight(g, data.perspectives);
});
