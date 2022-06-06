import {useEffect, useState} from 'react';
import {ArcElement, Chart as ChartJs, Legend, Title, Tooltip} from 'chart.js';
import {Pie} from 'react-chartjs-2';

ChartJs.register(
    Tooltip, Title, ArcElement, Legend
);


const PieChart = () => {
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
    });


    useEffect(() => {
        const fetchData = () => {
            fetch('http://localhost:8080/getAllCategory').then((data) => {
                const res = data.json();
                return res
            }).then((res) => {

                const cat = [];
                const item = [];
                const colors = [];


                Object.entries(res).map(function (obj1, ind) {
                    cat.push(obj1[1].categoryName)
                    item.push(obj1[1].items.length)

                })

                for (let i = 0; i < cat.length; i++) {


                    let randomColor = 'rgb(' + (Math.floor((256 - 299) * Math.random()) + 230) + ',' +
                        (Math.floor((256 - 229) * Math.random()) + 230) + ',' +
                        (Math.floor((256 - 229) * Math.random()) + 230) + ')';


                    colors.push(randomColor)
                }


                setData(
                    {
                        datasets: [{
                            data: item,
                            backgroundColor: colors,
                            hoverOffset: 4
                        },
                        ],
                        labels: cat,
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
        <div style={{width: '45%', height: '40%', margin: "auto"}}>

            <Pie data={data} options={options}/>
        </div>
    )
}

export default PieChart
