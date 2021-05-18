import React, { useEffect } from "react";
const d3 = require("d3");

const Visual = () => {
	useEffect(() => {
		const canvas = d3.select("#canvas");

		let url =
			"https://gist.githubusercontent.com/josejbocanegra/d3b9e9775ec3a646603f49bc8d3fb90f/raw/3a39300c2a2ff8644a52e22228e900251ec5880a/population.json";

		fetch(url)
			.then((response) => {
				return response.json();
			})
			.then((list) => {
				return list;
			})
			.then((list) => {
				let tooltip = d3
					.select("#canvas")
					.append("div")
					.style("position", "absolute")
					.style("z-index", "300")
					.style("visibility", "hidden")
					.style("background", "#ffffff");

				let data = list;
				const width = 700;
				const height = 500;
				const margin = { top: 10, left: 50, bottom: 40, right: 10 };
				const iwidth = width - margin.left - margin.right;
				const iheight = height - margin.top - margin.bottom;

				const svg = canvas.append("svg");
				svg.attr("width", width);
				svg.attr("height", height);

				let g = svg
					.append("g")
					.attr("transform", `translate(${margin.left},${margin.top})`);

				const y = d3.scaleLinear().domain([0, 1000000]).range([iheight, 0]);

				const x = d3
					.scaleBand()
					.domain(data.map((d) => d.name))
					.range([0, iwidth])
					.padding(0.1);

				const bars = g.selectAll("rect").data(
					data.map((d) => {
						return { name: d.name, value: d.value };
					})
				);

				bars
					.enter()
					.append("rect")
					.attr("class", "bar")
					.style("fill", "red")
					.attr("x", (d) => {
						return x(d.name);
					})
					.attr("y", (d) => {
						return y(d.value);
					})
					.attr("height", (d) => iheight - y(d.value))
					.attr("width", x.bandwidth());

				g.append("g")
					.classed("x--axis", true)
					.call(d3.axisBottom(x))
					.attr("transform", `translate(0, ${iheight})`);

				g.append("g").classed("y--axis", true).call(d3.axisLeft(y));
			});
	}, []);

	return <div id="canvas"></div>;
};

export default Visual;
