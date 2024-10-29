// Sample data for the bar chart
const data = [10, 25, 15, 30, 45, 20, 35];

// Dimensions and margins
const margin = { top: 20, right: 30, bottom: 40, left: 40 };
const width = 500 - margin.left - margin.right;
const height = 300 - margin.top - margin.bottom;

// Create an SVG element
const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Create scales
const x = d3.scaleBand()
    .domain(data.map((d, i) => i)) // Map each data item to an index
    .range([0, width])
    .padding(0.2);

const y = d3.scaleLinear()
    .domain([0, d3.max(data)])
    .nice()
    .range([height, 0]);

// Add X-axis
svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickFormat((d, i) => `Label ${i + 1}`)); // Adds labels for each pillar

// Add Y-axis
svg.append("g")
    .call(d3.axisLeft(y));

// Create bars (pillars)
svg.selectAll(".bar")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d, i) => x(i))
    .attr("y", d => y(d))
    .attr("width", x.bandwidth())
    .attr("height", d => height - y(d))
    .attr("fill", "steelblue");
