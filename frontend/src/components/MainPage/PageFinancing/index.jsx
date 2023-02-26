import React from "react";
import styles from "./index.module.css";
import * as d3 from "d3";

import skierSvg from '../../../assets/style/image/skierSvg.svg'

export default ({ mostFinance, avgFinance, mostFinanceYear, allFinance, dataFCP }) => {
    mostFinance = mostFinance ? JSON.parse(mostFinance) : {}
    mostFinanceYear = mostFinanceYear ? JSON.parse(mostFinanceYear) : {}
    dataFCP = dataFCP ? JSON.parse(dataFCP) : []

    const sizeSvg = {width:500, height:300}
    const ref = React.useRef(null);

    React.useEffect(() => {
        let _mostFinance = Object.entries(mostFinance)
        const svg = d3.select(ref.current);
        const margin = { top: 30, right: 20, bottom: 0, left: 50 };
        const width = sizeSvg.width - margin.left - margin.right;
        const height = sizeSvg.height - margin.top - margin.bottom;
        const g = svg.append("g").attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleTime()
            //Передаем объект, первым параметров, а вторым это функция итерации
            .domain(d3.extent(_mostFinance, d => new Date(d[0])))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(_mostFinance, d => Math.floor(d[1] / 1000 / 1000 / 1000))])
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
            .text("сумма финансирования в млрд");
   
        g.append("path")
            .datum(_mostFinance)
            .attr("fill", "none")
            .attr("stroke", 'orange')
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(d => x(new Date(d[0])))
                .y(d => y(Math.floor(d[1] / 1000 / 1000 / 1000)))
            );

        svg
            .append("rect")
            .attr("x", 10)
            .attr("y", 5)
            .attr("width", 10)
            .attr("height", 5)
            .attr("fill", 'orange');

        svg
            .append("text")
            .attr("class", 'textClassSvg')
            .attr("x", 30)
            .attr("y", 10)
            .attr("width", 300)
            .text('Сумма финансирования');

    })

    return (
        <div className={styles.PageFurthestFacility}>
            <div className={styles.blockPageFurthestFacility}>
                <div className={styles.info}>
                    <img src={skierSvg} />
                    <div className={styles.titleDesc}>
                        <h3>Самое большое финансирование было в {mostFinanceYear["year"]} году, сумма составила {Math.floor(mostFinanceYear["value"] / 1000 / 1000 / 1000)} млрд рублей.</h3>
                        <span>Общая сумма финансирование на спортивные объекты составила {Math.floor(allFinance / 1000 / 1000 / 1000)} млрд, в среднем {Math.floor(avgFinance / 1000 / 1000)} млн на 1 объект.</span>
                    </div>
                    <div className={styles.circleWhite}>
                        <span>За счет программы "{dataFCP[0]}" финансировано {dataFCP[1]?.count} объектов на сумму {Math.floor(dataFCP[1]?.summa / 1000 / 1000 / 1000)}млрд.</span>
                    </div>
                </div>

                <div className={styles.graffic}>
                    <svg className={styles.grafficDiv} ref={ref}  width={sizeSvg.width} height={sizeSvg.height}>
                        <g />
                    </svg>
                </div>
            </div>
        </div>


    );
};
