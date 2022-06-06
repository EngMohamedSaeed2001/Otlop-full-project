import React, {useEffect, useState} from 'react'
import {
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';

import {Line} from 'react-chartjs-2';
import Api from "../../Apis/Base"

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
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
const LineChart = (props) => {

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
            fetch('http://localhost:8080/admin/getAllOrderDetails', opt).then((data) => {
                const res = data.json();
                return res
            }).then((res) => {

                const order = [];
                const price = [];
                const colors = [];


                Object.entries(res).map(function (obj1, ind) {
                    order.push(obj1[1].userEmail)
                    price.push(obj1[1].orderPrice)

                })

                for (let i = 0; i < order.length; i++) {

                    let randomColor = 'rgb(' + (Math.floor((256 - 299) * Math.random()) + 230) + ',' +
                        (Math.floor((256 - 229) * Math.random()) + 230) + ',' +
                        (Math.floor((256 - 229) * Math.random()) + 230) + ')';

                    colors.push(randomColor)
                }


                setData(
                    {
                        datasets: [{
                            label: order,
                            data: price,
                            backgroundColor: colors,
                            hoverOffset: 4
                        },
                        ],
                        labels: order,
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
        responsive: true,
        scales: {},
        legend: {
            labels: {
                fontSize: 25,
            },
        },
    }

    return (
        <div>
            <Line
                data={data}
                height={400}
                options={options}

            />
        </div>
    )
}

export default LineChart