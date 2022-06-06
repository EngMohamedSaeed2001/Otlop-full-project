import React, {useEffect, useState} from 'react'
import {BarElement, Chart as ChartJS,} from 'chart.js';

import {Bar} from 'react-chartjs-2';
import Api from "../../Apis/Base";

ChartJS.register(
    BarElement,
);


let opt = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json;charset=utf-8',
        'Access-Control-Allow-Credentials': "true",
        'Access-Control-Allow-Headers': "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization",
        'Access-Control-Allow-Origin': "*",
        'Authorization': `Bearer ${Api.token}`,
    }
}
const BarChart = (props) => {
    const [data, setData] = useState({
        datasets: [{
            data: [10, 20, 30],
            backgroundColor: [
                'red',
                'blue',
                'yellow'
            ]
        },
        ],
        hoverOffset: 4,
        labels: [
            'Red',
            'Yellow',
            'Blue'
        ],
    })


    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:8080/admin/getAllOpinion', opt).then((data) => {
                const res = data.json();
                return res
            }).then((res) => {

                const opinion = [];
                const size = [];
                const colors = [];


                Object.entries(res).map(function (obj1, ind) {
                    opinion.push(obj1[1].opinion)
                    size.push(obj1[1].rate)

                })

                console.log(opinion)
                for (let i = 0; i < 6; i++) {

                    let randomColor = 'rgb(' + (Math.floor((256 - 299) * Math.random()) + 230) + ',' +
                        (Math.floor((256 - 229) * Math.random()) + 230) + ',' +
                        (Math.floor((256 - 229) * Math.random()) + 230) + ')';

                    colors.push(randomColor)
                }
                console.log(colors)


                setData(
                    {
                        datasets: [{
                            label: size,
                            data: size,
                            backgroundColor: colors,
                            hoverOffset: 4
                        },
                        ],
                        labels: opinion,
                    }
                )

            }).catch(e => {
                console.log("error", e)
            })
        }
        fetchData();
    }, [])


    var options = {
        maintainAspectRatio: false,
        scales: {},
        responsive: true,
        legend: {
            labels: {
                fontSize: 25,
            },
        },
    }

    return (
        <div>
            <Bar
                data={data}
                height={400}
                options={options}

            />
        </div>
    )
}

export default BarChart