import React from "react";
import styles from "./index.module.css";
import * as d3 from "d3";

import swimSvg from '../../../assets/style/image/swimSvg.svg'
import getRandomColor from "../../../utils/getRandomColor";

export default ({ most, bestYear, lessYear, yearBuilding }) => {
    most = most ? JSON.parse(most) : []
    yearBuilding = yearBuilding ? Object.entries(JSON.parse(yearBuilding)) : []
    console.log(yearBuilding)
    const ref = React.useRef(null);

    React.useEffect(() => {
        const colorForFacility = yearBuilding.reduce((all, cur) => {
            let objectFacility = Object.entries(cur[1])

            objectFacility.forEach(el => {
                all[el[0]] = getRandomColor()
            })

            return all
        }, {})

        const svg = d3.select(ref.current);
        const margin = { top: 110, right: 20, bottom: 30, left: 50 };
        const width = 500 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleTime()
            //Передаем объект, первым параметров, а вторым это функция итерации
            .domain(d3.extent(yearBuilding, d => d[0]))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(yearBuilding, d => Object.entries(d[1]).reduce((all, cur) => all < cur[1] ? cur[1] : all, 0))])
            .range([height, 0]);

        g.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x));

        g.append("g")
            .call(d3.axisLeft(y))
            .append("text")
            .attr("fill", "#000")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", "0.71em")
            .attr("text-anchor", "end")
            .text("Количество объектов");

        // console.log(Object.entries(colorForFacility))

        for (const [year, typeFacility] of yearBuilding) {
            let arrayTypeFacility = Object.entries(typeFacility)
            for (let i = 0; i < arrayTypeFacility.length; i++) {
                // console.log(arrayTypeFacility[i], colorForFacility[arrayTypeFacility[i][0]])
                g.append("path")
                    .datum(yearBuilding)
                    .attr("fill", "none")
                    .attr("stroke", colorForFacility[arrayTypeFacility[i][0]])
                    .attr("stroke-linejoin", "round")
                    .attr("stroke-linecap", "round")
                    .attr("stroke-width", 1.5)
                    .attr("d", d3.line()
                        .x(d => x(d[0]))
                        .y(d => {
                            let typeFac = Object.entries(d[1]).find(el => el[0] == arrayTypeFacility[i][0])
                            return y(typeFac ? typeFac[1] : 0)
                        })
                    );
            }

        }



        // g.append("path")
        //     .datum(yearBuilding)
        //     .attr("fill", "none")
        //     .attr("stroke", "orange")
        //     .attr("stroke-linejoin", "round")
        //     .attr("stroke-linecap", "round")
        //     .attr("stroke-width", 1.5)
        //     .attr("d", d3.line()
        //         .x(d => x(d[0]))
        //         .y(d => y(d.sports_facilities))
        //     );

        let xi = 0;
        let yi = 0;
        for (const [typeFacility, color] of Object.entries(colorForFacility)) {
            let y = yi
            let x = xi % 2
            svg
                .append("rect")
                .attr("x", 10 + 270 * x)
                .attr("y", 5 + 10 * y)
                .attr("width", 10)
                .attr("height", 5)
                .attr("fill", color);

            svg
                .append("text")
                .attr("class", 'textClassSvg')
                .attr("x", 30 + 270 * x)
                .attr("y", 10 + 10 * y)
                .attr("width", 300)
                .text(typeFacility);

            xi++
            if (Number.isInteger(xi / 2))
                yi++
        }

    })

    return (
        <div className={styles.PageMostFacility}>
            <div className={styles.blockPageMostFacility}>
                <div className={styles.info}>
                    <img src={swimSvg} />
                    <div>
                        <h3>В {bestYear} году больше всего построилось спортивных объектов</h3>
                        <span>Из них {most.map(e => `${e[1]} ${e[0]}`).join(", ")}. </span>
                        <span>Меньше всего в {lessYear} году. </span>
                    </div>
                </div>

                <div className={styles.graffic}>
                    <svg ref={ref} width={500} height={300}>
                        <g />
                    </svg>
                </div>
            </div>
        </div>


    );
};