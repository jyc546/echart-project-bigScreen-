/**
 * Created by codyy on 2018/3/18.
 */
// 设置时间
let setTime = function() {
    let res = getCurrentTime();
    $(".currentTime").text(res.currentTime);
    $(".currentDate").text(res.currentDate);
    $(".currentWeek").text(res.currentWeek);
};
setTime();

// 定时更新时间
let timing = function() {
    setInterval(function() {
        setTime();
    }, 1000);
};
timing();

let areaName='china',baseAreaId='-1',areaCode='000000',manufacturerData=null,supplierData=null;
let BACK_ROOT='http://10.5.52.14/mockjsdata/197';
const myChart1 = echarts.init(document.getElementById("faultAnalysisChart"));
const myChart2 = echarts.init(document.getElementById("faultRankChart"));
const myChart3 = echarts.init(document.getElementById("mapChart"));
const myChart4 = echarts.init(document.getElementById("situationAnalysisChart"));
const myChart5 = echarts.init(document.getElementById("pieRateChart"));
const myChart6 = echarts.init(document.getElementById("distributeByStatusChart"));
const myChart7 = echarts.init(document.getElementById("distributeByServerChart"));
//请求echart的数据
const optionData=function(areaCode){
    // 近一年装备故障分析
    $.get(BACK_ROOT + '/bigscreen/service/equipmentfaultanalysis.do?areaCode='+areaCode).done(function (data) {
        var data=data.result;
        faultAnalysisChart(data);
    });
    // 厂商装备故障排行
    $.get(BACK_ROOT + '/bigscreen/service/equipmentfault.do?areaCode='+areaCode).done(function (data) {
        manufacturerData=data.result.manufacturer;
        supplierData=data.result.supplier;
        faultRankChart(supplierData);
    });
    //各地点装备故障情况
    $.get(BACK_ROOT + '/bigscreen/service/equipmentfaultstatus.do?areaCode='+areaCode).done(function (data) {
        // 填入数据
        var result=data.result;
        var Tpl='';
        for(var i=0;i<6;i++){
            Tpl+=
                '<tr>' +
                '<td>0'+(i+1)+'</td>' +
                '<td>'+result[i].addressName+'</td>' +
                '<td>'+result[i].faultCnt+'</td>' +
                '<td>'+result[i].faultRatio+'</td>' +
                '</tr>';
        }
        $('.faultConditionTable tbody').html(Tpl);
    });
    //map
    $.get(BACK_ROOT + '/bigscreen/service/mapequipmentcnt.do?areaCode='+areaCode).done(function (data) {
        var data=data.result;
        var Tpl='';
            Tpl+='<div>'+
                '<p class="count">'+data.count.allEquipmentCnt+'</p>'+
                '<p class="type">装备数</p>'+
                '</div>'+'<div>'+
                '<p class="count">'+data.count.faultCnt+'</p>'+
                '<p class="type">故障数</p>'+
                '</div>'+'<div>'+
                '<p class="count">'+data.count.repairCnt+'</p>'+
                '<p class="type">维修次数</p>'+
                '</div>'+'<div>'+
                '<p class="count">'+data.count.pendingCnt+'</p>'+
                '<p class="type">待处理</p>'+
                '</div>'+'<div>'+
                '<p class="count">'+data.count.processedCnt+'</p>'+
                '<p class="type">已处理</p>'+
                '</div>'+'<div>'+
                '<p class="count">'+data.count.untreatedCnt+'</p>'+
                '<p class="type">未处理</p>'+
                '</div>';
        $('.statistics').html(Tpl);
    });
    //各行政区故障情况分析
    $.get(BACK_ROOT + '/bigscreen/service/areafaultanalysis.do?areaCode='+areaCode).done(function (data) {
        var data=data.result;
        situationAnalysisChart(data);
    });
    //报修各种比率
    $.get(BACK_ROOT + '/bigscreen/service/rate.do?areaCode='+areaCode).done(function (data) {
        var data=data.result;
        pieRateChart(data);
    });
    //故障类型分布
    $.get(BACK_ROOT + '/bigscreen/service/faulttype.do?areaCode='+areaCode).done(function (data) {
        var data=data.result;
        distributeByStatusChart(data);
    });
    //报修服务分布
    $.get(BACK_ROOT + '/bigscreen/service/service.do?areaCode='+areaCode).done(function (data) {
        var data=data.result;
        distributeByServerChart(data);
    });
};
optionData(areaCode);

// 近一年装备故障分析
let faultAnalysisChart = function(data) {
    var repairRatio=[],faultRatio=[],faultData=[];
    if(data){
        for(var i=0;i<data.length;i++){
            repairRatio.push(data[i].repairRatio);
            faultRatio.push(data[i].faultRatio);
            faultData.push(data[i].faultCnt);
        }
    }
    let monthCount = 12;
    let xData = function() {
        var data = [];
        for (var i = 0; i < monthCount; i++) {
            var j = i + 1;
            data.push(j);
        }
        return data;
    }();
    let option = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                crossStyle: {
                    color: "white"
                }
            }
        },
        textStyle: {
            color: "#a0a8b9"
        },
        legend: {
            icon: 'circle',
            itemWidth: 8,
            itemHeight: 8,
            itemGap: 10,
            x:'right',
            data: ['维修率', '故障率', '故障数'],
            textStyle: {
                fontSize: 12,
                color: '#fff'
            }
        },
        grid: {
            left: "35",
            bottom: "60",
            right:'30',
            top:'15%'
        },
        xAxis: [
            {
                type: "category",
                name: "",
                data: xData,
                axisPointer: {
                    type: "shadow"
                },
                axisLabel: {
                    formatter: "{value}",
                    interval: 0
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
        ],
        yAxis: [
            {
                type: "value",
                min: 0,
                // max: 250,
                // interval: 50,
                axisLabel: {
                    formatter: "{value}"
                },
                splitLine:{
                    show: true,
                    lineStyle:{
                        color:'#242847'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            },{
                type: "value",
                show: true,
                lineStyle:{
                    color:'#242847'
                },
                axisLabel: {
                    formatter: "{value}"
                },
                splitLine:{
                    show: false,
                    lineStyle:{
                        color:'#242847'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                }
            }
        ],
        series: [
            {
                name: "维修率",
                type: "line",
                yAxisIndex: 1,
                data: repairRatio,
                itemStyle: {
                    normal: {
                        "color": "#ffaa00"
                    }
                },
                smooth: true,
                symbol: 'circle',
                showSymbol: false
            },
            {
                name: "故障率",
                type: "line",
                yAxisIndex: 1,
                data: faultRatio,
                itemStyle: {
                    normal: {
                        "color": "#1dc942"
                    }
                },
                smooth: true,
                showSymbol: false
            },
            {
                name: "故障数",
                type: "bar",
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: "#0182e8"
                        },
                        {
                            offset: 1,
                            color: "#021b4d"
                        }
                    ]),
                    barBorderRadius: 5
                },
                barWidth: "10px",
                data: faultData
            }
        ]
    };
    myChart1.setOption(option);
};

// 厂商装备故障排行
let faultRankChart = function(data) {
    var companyName=[],faultCnt=[],faultRatio=[],faultCntValue=[];
    let xMax=1000;
    if(data){
        for (var i = 0; i < data.length; i++) {
            companyName.push(data[i].companyName);
            faultRatio.push(data[i].faultRatio+'%');
            faultCnt.push(data[i].faultCnt);
            faultCntValue.push({value:data[i].faultCnt});
            if (xMax <= data[i].faultCnt[i]) {
                xMax = data[i].faultCnt[i];
            } else {
                xMax = xMax;
            }
        }
    }
    let option = {
        tooltip: {
            show: true,
            formatter: "{b} <br> {c}件"
        },
        grid: {
            borderWidth: 0,
            left: '100',
            right: '68',
            top: '0',
            bottom: '20',
            textStyle: {
                color: "#fff"
            }
        },
        xAxis: [{
            axisTick: {
                show: false
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisLabel: {
                show:false,
            }
        }],
        yAxis: [{
            type: 'category',
            data: companyName,
            axisTick: {
                show: false
            },
            axisLine: {
                textStyle: {
                    color: '#19adeb'
                },
                show: false
            },
            axisLabel: {
                color: '#19adeb'
            }
        }, {
            type: 'category',
            data: faultCnt,
            axisTick: {
                show: false
            },
            axisLine: {
                textStyle: {
                    color: '#19adeb'
                },
                show: false
            },
            axisLabel: {
                color: '#fff',
                fontSize:'16'
            },
            offset:10,
            zlevel: 2
        }, {
            type: 'category',
            data: faultRatio,
            axisTick: {
                show: false
            },
            axisLine: {
                textStyle: {
                    color: '#19adeb'
                },
                show: false
            },
            axisLabel: {
                color: '#718eb7',
                fontSize:'16'
            },
            offset:-35,
            zlevel: 2
        }],
        series: [{
            name: ' ',
            type: 'bar',
            barWidth: 16,
            silent: true,
            itemStyle: {
                normal: {
                    color: '#1c3658'
                }

            },
            barGap: '-100%',
            barCategoryGap: '50%',
            data: faultCnt.map(function(d) {
                return xMax
            })
        }, {
            name: ' ',
            type: 'bar',
            barWidth: 16,
            label: {
                normal: {
                    show: true,
                    position: 'top',
                    formatter: '{c}%'
                }
            },
            itemStyle: {
                normal: {
                    barBorderRadius: [0, 0, 0, 0],
                    color: {
                        type: 'bar',
                        colorStops: [{
                            offset: 0,
                            color: '#1368fb' // 0% 处的颜色
                        }, {
                            offset: 1,
                            color: '#1acffc' // 100% 处的颜色
                        }],
                        globalCoord: false // 缺省为 false

                    }
                }
            },
            data: faultCntValue
        }]
    };
    myChart2.setOption(option);
};

//map
let mapChart = function(areaName) {
    let geoCoordMap = {
        '上海': [121.4648, 31.2891],
        '东莞': [113.8953, 22.901],
        '东营': [118.7073, 37.5513],
        '中山': [113.4229, 22.478],
        '临汾': [111.4783, 36.1615],
        '临沂': [118.3118, 35.2936],
        '丹东': [124.541, 40.4242],
        '丽水': [119.5642, 28.1854],
        '乌鲁木齐': [87.9236, 43.5883],
        '佛山': [112.8955, 23.1097],
        '保定': [115.0488, 39.0948],
        '兰州': [103.5901, 36.3043],
        '包头': [110.3467, 41.4899],
        '北京': [116.4551, 40.2539],
        '北海': [109.314, 21.6211],
        '南京': [118.8062, 31.9208],
        '南宁': [108.479, 23.1152],
        '南昌': [116.0046, 28.6633],
        '南通': [121.1023, 32.1625],
        '厦门': [118.1689, 24.6478],
        '台州': [121.1353, 28.6688],
        '合肥': [117.29, 32.0581],
        '呼和浩特': [111.4124, 40.4901],
        '咸阳': [108.4131, 34.8706],
        '哈尔滨': [127.9688, 45.368],
        '唐山': [118.4766, 39.6826],
        '嘉兴': [120.9155, 30.6354],
        '大同': [113.7854, 39.8035],
        '大连': [122.2229, 39.4409],
        '天津': [117.4219, 39.4189],
        '太原': [112.3352, 37.9413],
        '威海': [121.9482, 37.1393],
        '宁波': [121.5967, 29.6466],
        '宝鸡': [107.1826, 34.3433],
        '宿迁': [118.5535, 33.7775],
        '常州': [119.4543, 31.5582],
        '广州': [113.5107, 23.2196],
        '廊坊': [116.521, 39.0509],
        '延安': [109.1052, 36.4252],
        '张家口': [115.1477, 40.8527],
        '徐州': [117.5208, 34.3268],
        '德州': [116.6858, 37.2107],
        '惠州': [114.6204, 23.1647],
        '成都': [103.9526, 30.7617],
        '扬州': [119.4653, 32.8162],
        '承德': [117.5757, 41.4075],
        '拉萨': [91.1865, 30.1465],
        '无锡': [120.3442, 31.5527],
        '日照': [119.2786, 35.5023],
        '昆明': [102.9199, 25.4663],
        '杭州': [119.5313, 29.8773],
        '枣庄': [117.323, 34.8926],
        '柳州': [109.3799, 24.9774],
        '株洲': [113.5327, 27.0319],
        '武汉': [114.3896, 30.6628],
        '汕头': [117.1692, 23.3405],
        '江门': [112.6318, 22.1484],
        '沈阳': [123.1238, 42.1216],
        '沧州': [116.8286, 38.2104],
        '河源': [114.917, 23.9722],
        '泉州': [118.3228, 25.1147],
        '泰安': [117.0264, 36.0516],
        '泰州': [120.0586, 32.5525],
        '济南': [117.1582, 36.8701],
        '济宁': [116.8286, 35.3375],
        '海口': [110.3893, 19.8516],
        '淄博': [118.0371, 36.6064],
        '淮安': [118.927, 33.4039],
        '深圳': [114.5435, 22.5439],
        '清远': [112.9175, 24.3292],
        '温州': [120.498, 27.8119],
        '渭南': [109.7864, 35.0299],
        '湖州': [119.8608, 30.7782],
        '湘潭': [112.5439, 27.7075],
        '滨州': [117.8174, 37.4963],
        '潍坊': [119.0918, 36.524],
        '烟台': [120.7397, 37.5128],
        '玉溪': [101.9312, 23.8898],
        '珠海': [113.7305, 22.1155],
        '盐城': [120.2234, 33.5577],
        '盘锦': [121.9482, 41.0449],
        '石家庄': [114.4995, 38.1006],
        '福州': [119.4543, 25.9222],
        '秦皇岛': [119.2126, 40.0232],
        '绍兴': [120.564, 29.7565],
        '聊城': [115.9167, 36.4032],
        '肇庆': [112.1265, 23.5822],
        '舟山': [122.2559, 30.2234],
        '苏州': [120.6519, 31.3989],
        '莱芜': [117.6526, 36.2714],
        '菏泽': [115.6201, 35.2057],
        '营口': [122.4316, 40.4297],
        '葫芦岛': [120.1575, 40.578],
        '衡水': [115.8838, 37.7161],
        '衢州': [118.6853, 28.8666],
        '西宁': [101.4038, 36.8207],
        '西安': [109.1162, 34.2004],
        '贵阳': [106.6992, 26.7682],
        '连云港': [119.1248, 34.552],
        '邢台': [114.8071, 37.2821],
        '邯郸': [114.4775, 36.535],
        '郑州': [113.4668, 34.6234],
        '鄂尔多斯': [108.9734, 39.2487],
        '重庆': [107.7539, 30.1904],
        '金华': [120.0037, 29.1028],
        '铜川': [109.0393, 35.1947],
        '银川': [106.3586, 38.1775],
        '镇江': [119.4763, 31.9702],
        '长春': [125.8154, 44.2584],
        '长沙': [113.0823, 28.2568],
        '长治': [112.8625, 36.4746],
        '阳泉': [113.4778, 38.0951],
        '青岛': [120.4651, 36.3373],
        '韶关': [113.7964, 24.7028]
    };
    let BJData = [
        [{
            name: '上海',
            value: 100
        }, {
            name: '杭州'
        }],
        [{
            name: '广州',
            value: 70
        }, {
            name: '杭州'
        }],
        [{
            name: '哈尔滨',
            value: 30
        }, {
            name: '杭州'
        }],
        [{
            name: '青岛',
            value: 50
        }, {
            name: '杭州'
        }],
        [{
            name: '南昌',
            value: 20
        }, {
            name: '杭州'
        }],
        [{
            name: '银川',
            value: 10
        }, {
            name: '杭州'
        }],
        [{
            name: '拉萨',
            value: 80
        }, {
            name: '杭州'
        }],
        [{
            name: '西安',
            value: 55
        }, {
            name: '杭州'
        }],
        [{
            name: '乌鲁木齐',
            value: 90
        }, {
            name: '杭州'
        }]
    ];
    let convertData = function(data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push([{
                    coord: fromCoord,
                    value: dataItem[0].value
                }, {
                    coord: toCoord
                }]);
            }
        }
        return res;
    };

    let color = ['#a6c84c', '#ffa022', '#46bee9'];
    let series = [];
    [
        ['杭州', BJData]
    ].forEach(function(item, i) {
        series.push(
            {
                type: 'effectScatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    period: 4,
                    brushType: 'stroke',
                    scale: 4
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        offset: [5, 0],
                        formatter: '{b}'
                    },
                    emphasis: {
                        show: true
                    }
                },
                symbol: 'circle',
                symbolSize: function(val) {
                    return 4 + val[2] / 10;
                },
                itemStyle: {
                    normal: {
                        show: false,
                        color: '#f00'
                    }
                },
                data: item[1].map(function(dataItem) {
                    return {
                        name: dataItem[0].name,
                        value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
                    };
                })
            },
            //被攻击点
            {
                type: 'scatter',
                coordinateSystem: 'geo',
                zlevel: 2,
                rippleEffect: {
                    period: 4,
                    brushType: 'stroke',
                    scale: 4
                },
                label: {
                    normal: {
                        show: true,
                        position: 'right',
                        //			                offset:[5, 0],
                        color: '#00ffff',
                        formatter: '{b}',
                        textStyle: {
                            color: "#00ffff"
                        }
                    },
                    emphasis: {
                        show: true
                    }
                },
                symbol: 'pin',
                symbolSize: 30,
                itemStyle: {
                    normal: {
                        show: true,
                        color: '#9966cc'
                    }
                },
                data: [{
                    name: item[0],
                    value: geoCoordMap[item[0]].concat([100]),
                }]
            }
        );
    });

    let option = {
        visualMap: {
            show:false,
            min: 0,
            max: 100,
            calculable: true,
            color: ['#a6c84c', '#ffa022', '#46bee9'],
            textStyle: {
                color: '#fff'
            }
        },
        geo: {
            map: areaName,
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: false,
            layoutCenter: ['50%', '53%'],
            layoutSize: "108%",
            itemStyle: {
                normal: {
                    areaColor:'#034cb9',
                    color: 'rgba(51, 69, 89, .5)',
                    borderColor: '#0ec7ff'
                },
                emphasis: {
                    color: '#2695f0'
                }
            }
        },
        series: series
    };
    myChart3.setOption(option);
};
mapChart(areaName);

//各行政区故障情况分析
let situationAnalysisChart = function(data) {
    var areaName=[],repairRatio=[],faultRatio=[],faultCnt=[];
    if(data){
        for(var i=0;i<data.length;i++){
            areaName.push(data[i].areaName);
            repairRatio.push(data[i].repairRatio);
            faultRatio.push(data[i].faultRatio);
            faultCnt.push(data[i].faultCnt);
        }
    }
    let option = {
        tooltip: {
            trigger: "axis",
            axisPointer: {
                type: "cross",
                crossStyle: {
                    color: "white"
                }
            }
        },
        textStyle: {
            color: "#a0a8b9"
        },
        grid: {
            left: "8%",
            bottom: "16%"
        },
        legend: {
            itemWidth: 8,
            itemHeight: 12,
            data: ["故障数", "故障率", "维修率"],
            textStyle: {
                color: "#fff"
            },
            right: "2%",
            top: "0%"
        },
        dataZoom: [ {
            show: true,
            height: 8,
            width:'50%',
            xAxisIndex: [0],
            bottom: 5,
            left:'center',
            start: 20,
            end: 80,
            fillerColor:'#1e7eb0',
            dataBackground:{
                areaStyle:{
                    color:'#222e43'
                }
            },
            handleStyle:{
                color: "#1e7eb0"
            },
            textStyle: {
                color: "#fff"
            },
            borderColor: "#222e43",
            borderRadius : 8,
            borderWidth: 2
        }],
        xAxis: [
            {
                type: "category",
                name: "",
                data: areaName,
                axisPointer: {
                    type: "shadow"
                },
                axisLabel: {
                    formatter: "{value}"
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine:{
                    show:false
                }

            }
        ],
        yAxis: [
            {
                type: "value",
                name: "故障数",
                axisLabel: {
                    formatter: "{value}"
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine:{
                    show:false
                }
            },
            {
                type: "value",
                name: "",
                min: 0,
                max: 100,
                interval: 20,
                axisLabel: {
                    formatter: "{value}%"
                },
                axisTick: {
                    show: false
                },
                axisLine: {
                    show: false
                },
                splitLine:{
                    show:false
                }
            }
        ],
        series: [
            {
                name:'故障数',
                type:'bar',
                barWidth : 10,
                stack: '数量',
                itemStyle:{
                    color:'#0190fc'
                },
                data:faultCnt
            },
            {
                name:'故障率',
                type:'line',
                itemStyle:{
                    color:'#ff00ff'
                },
                data:faultRatio
            },
            {
                name:'维修率',
                type:'line',
                itemStyle:{
                    color:'#ff9f25'
                },
                data:repairRatio
            }
        ]
    };
    myChart4.setOption(option);
};

//报修各种比率
let pieRateChart = function(data) {
    var badCnt=[],faultCnt=[],outCnt=[],repairCnt=[];
    if(data){
        badCnt=data.badCnt;
        faultCnt=data.faultCnt;
        outCnt=data.outCnt;
        repairCnt=data.repairCnt;
    }
    let placeHolderStyle = {
        normal: {
            borderWidth: 5,
            shadowBlur: 40,
            borderColor: "#1b2556",
            shadowColor: 'rgba(0, 0, 0, 0)', //边框阴影
            // borderWidth: 5,
            color: "#1b2556"
            // borderWidth: 0
        }

    };
    let option ={
        color: ['#2bdeff', '#1897fe', '#9f51ff', '#ff32e4', "#fd3744"],
        tooltip: {
            trigger: 'item',
            formatter: "{a}:<br/>{b}(起)"

        },
        legend: {
            icon: 'circle',
            orient: 'vertical',
            right: '120',
            top: '5%',
            itemWidth:8,itemHeight:8,
            itemGap:5,
            textStyle:{
                color:'#999'
            },
            data: ['不良率', '故障率', '维修率', '淘汰率']
        },
        series: [{
            name: '不良率',
            type: 'pie',
            clockWise: false, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: ['93%', '95%'],
            itemStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: '#1ac3fb'
                    }, {
                        offset: 1,
                        color: '#1c76f2'
                    }]),
                    label: {
                        show: false,
                        textStyle: {
                            fontSize: 24
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    borderWidth: 5,
                    shadowBlur: 40,
                    borderColor: "#1d72f2",
                    shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                }
            },
            data: [
                {
                value: badCnt,
                name: '44'
                }, {
                value: badCnt*20/100,
                name: '',
                itemStyle: placeHolderStyle
                }, {
                value: badCnt*30/100,
                name: '',
                itemStyle: {
                    normal: {
                        color: 'none',
                        borderColor:'none'
                    }
                }
                }]
        }, {
            name: '故障率',
            type: 'pie',
            clockWise: false,
            radius: ['79%', '81%'],
            hoverAnimation: false,
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                        textStyle: {
                            fontSize: 24
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    borderWidth: 5,
                    shadowBlur: 40,
                    borderColor: "#2f9443",
                    shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                }
            },
            data: [
                {
                value: faultCnt,
                name: '44'
            }, {
                value: faultCnt*20/100,
                name: '',
                itemStyle: placeHolderStyle
            }, {
                value: faultCnt*30/100,
                name: '',
                itemStyle: {
                    normal: {
                        color: 'none',
                        borderColor:'none'
                    }
                }
            }]
        }, {
            name: '维修率',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            radius: ['65%', '67%'],
            itemStyle: {
                normal: {
                    label: {
                        show: false
                    },
                    labelLine: {
                        show: false
                    },
                    borderWidth: 5,
                    shadowBlur: 40,
                    borderColor: "#f6345f",
                    shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                }
            },
            data: [{
                value: repairCnt,
                name: '44'
            }, {
                value: repairCnt*20/100,
                name: '',
                itemStyle: placeHolderStyle
            }, {
                value: repairCnt*30/100,
                name: '',
                itemStyle: {
                    normal: {
                        color: 'none',
                        borderColor:'none'
                    }
                }
            }]
        }, {
            name: '淘汰率',
            type: 'pie',
            clockWise: false,
            hoverAnimation: false,
            radius: ['51%', '53%'],
            itemStyle: {
                normal: {
                    label: {
                        show: false,
                        textStyle: {
                            fontSize: 24
                        }
                    },
                    labelLine: {
                        show: false
                    },
                    borderWidth: 5,
                    shadowBlur: 40,
                    borderColor: "#e8b62d",
                    shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                }
            },
            data: [{
                value: outCnt,
                name: '44'
            }, {
                value: outCnt*20/100,
                name: '',
                itemStyle: placeHolderStyle
            }, {
                value: outCnt*30/100,
                name: '',
                itemStyle: {
                    normal: {
                        color: 'none',
                        borderColor:'none'
                    }
                }
            }]
        }
        ]
    };
    myChart5.setOption(option);
};

//故障类型分布
let distributeByStatusChart = function(data) {
    var faultCntTypeName=[];
    if(data){
        for(var i=0;i<data.length;i++){
            faultCntTypeName.push({name:data[i].typeName,value:data[i].faultCnt});
        }
    }
    let option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        graphic:{
            type: 'text',
            left: 'center', // 相对父元素居中
            top: 'middle',  // 相对父元素居中
            style: {
                fill: 'white',
                text: [125876],
                fontSize: '28'
            }
        },
        series: [
            {
                name: "",
                type: "pie",
                hoverAnimation: true,
                radius: ["50%", "70%"],
                avoidLabelOverlap: false,
                label: {
                    formatter:'{a|{d}%}\n{b}',
                    show: true,
                    position: "outside",
                    color:'#0139bc',
                    verticalAlign:'top',
                    fontSize:'16',
                    rich:{
                        a:{
                            color: '#b4bad2',
                            lineHeight: 22,
                            align: 'left'
                        }
                    }
                },
                labelLine: {
                    show: true,
                    length:20,
                    length2:50,
                    lineStyle:{
                        color:'#0053ff'
                    }
                },
                data: faultCntTypeName,
                color:['#906eff','#3752e5','#3677f4','#09e2fd','#fd8966','#d8a849']
            }
        ]
    };
    myChart6.setOption(option);
};
//报修服务分布
let distributeByServerChart = function(data) {
    var textName=[],serviceCnt=[];
    if(data){
        for(var i=0;i<data.length;i++){
            textName.push({text:data[i].serviceTypeName});
            serviceCnt.push(data[i].serviceCnt);
        }
    }

    let option = {
        tooltip: {},
        radar: [
            {
                indicator: textName,
                startAngle: 30,
                splitNumber: 4,
                shape: 'circle',
                name: {
                    formatter:'{value}',
                    textStyle: {
                        color:'#1ab1ef'
                    }
                },
                splitArea: {
                    show:true,
                    areaStyle: {
                        color: ['#051d64','#041d64', '#03185f','#021358'],
                        shadowColor: '#0f3ba8',
                        shadowBlur: 10
                    }
                },
                axisLine: {
                    lineStyle: {
                        color: '#2c8ebe',
                        type:'dashed'
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: 'transparent'
                    }
                }
            }

        ],
        series: [
            {
                name: '服务分布',
                type: 'radar',
                itemStyle: {
                    color:'#1f9cf5'
                },
                label: {
                    normal: {
                        show: true,
                        color:'white'
                    }
                },
                areaStyle: {
                    normal: {
                        opacity: 0.7,
                        color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                            {
                                color: '#093574',
                                offset: 0
                            },
                            {
                                color: '#093574',
                                offset: 1
                            }
                        ])
                    }
                },
                data: [
                    {
                        value: serviceCnt

                    }
                ]
            }

        ]
    }
    myChart7.setOption(option);
};


//图例适应屏幕变化
let chartResize = function(){
    myChart1.resize();
    myChart2.resize();
    myChart3.resize();
    myChart4.resize();
    myChart5.resize();
    myChart6.resize();
    myChart7.resize();
};
window.onresize = debounce(chartResize,500);

resetData(areaName,baseAreaId,areaCode);
function resetData(areaName,baseAreaId,areaCode) {
    var jsonPath = areaMap[baseAreaId];
    //渲染地图
    $.get('../'+jsonPath).done(function (mapJson) {
        echarts.registerMap(areaName, mapJson);
        var featuresDataArr = mapJson.features;
        //渲染各个模块
        mapChart(areaName);
    });
}

selectArea();

function selectArea() {
    $.get("../data.json").done(function (data) {
        var provinceTpl='',cityTpl='';
        var provinces=data.map.data;

        for(var i=0;i<provinces.length;i++){
            provinceTpl+='<li class="provinceitem" values='+provinces[i].areaName+' data-area-code='+provinces[i].areaCode+' data-area-id='+provinces[i].id+' data-name='+provinces[i].name+'>'+provinces[i].areaName+'</li>';
            if(provinces[i].areaCode==areaCode && provinces[i].data){
                for(var j=0;j<provinces[i].data.length;j++){
                    cityTpl+='<li class="cityitem" values='+provinces[i].data[j].areaName+' data-area-code='+provinces[i].data[j].areaCode+' data-area-id='+provinces[i].data[j].id+' data-name='+provinces[i].data[j].name+'>'+provinces[i].data[j].areaName+'</li>';
                }
            }
        }

        $('.provincelist').html(provinceTpl);
        $('.citylist').html(cityTpl);

        $('.site').hover(function () {
            $('.selectDom').show();
        });

        $("body").on('click',function(e){
            if(!$(e.target).parents(".selectDom").length){
                $(".selectDom").hide();
                $('.provinceContainer').hide();
                $('.cityContainer').hide();
            }
        });

        $('.site').on('click','.zcityItem,.zProvinceItem',function () {
            $(this).find('.cityContainer').show();
            $(this).find('.provinceContainer').show();
        });

        $('.site').on('click','.provinceTips',function () {
            areaCode='000000';
            areaName='china';
            baseAreaId='-1';

            $('.currentValue').val('全部');
            $('.areaName').html('中国');
            $('.citylist').html('');
            $('.provinceContainer').hide();
            $('.cityContainer').hide();

            resetData(areaName,baseAreaId,areaCode);
        });

        $('.site').on('click','.cityTips',function () {
            areaCode=$('.provinceitem.active').data('area-code');
            baseAreaId=$('.provinceitem.active').data('area-id');
            areaName=$('.provinceitem.active').data('name');

            var provinceitem = document.getElementById("provinceInputValue").value;

            if(provinceitem=='全部'){
                $('.areaName').html('中国');
            }else{
                $('.areaName').html(provinceitem);
            }
            $('.zcityItem .currentValue').val('全部');
            $('.provinceContainer').hide();
            $('.cityContainer').hide();

            resetData(areaName,baseAreaId,areaCode);
        });

        $('.site').on('click', '.provinceitem',function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).addClass('active').siblings().removeClass('active');
            var province=$(this).text();
            $('.zProvinceItem .currentValue').val(province);
            $('.areaName').html(province);
            $('.provinceContainer').hide();
            areaCode=$('.provinceitem.active').data('area-code');
            baseAreaId=$('.provinceitem.active').data('area-id');
            areaName=$('.provinceitem.active').data('name');
            cityTpl='';
            $('.zcityItem .currentValue').val('请选择');
            for(var i=0;i<provinces.length;i++){
                if(provinces[i].areaCode==areaCode && provinces[i].data){
                    for(var j=0;j<provinces[i].data.length;j++){
                        // $('.zcityItem .currentValue').val(provinces[i].data[0].areaName);
                        $('.site .cityitem[values='+provinces[i].data[0].areaName+']').addClass('active').siblings().removeClass('active');
                        cityTpl+='<li class="cityitem" values='+provinces[i].data[j].areaName+' data-area-id='+provinces[i].data[j].id+' data-name='+provinces[i].data[j].name+' data-area-code='+provinces[i].data[j].areaCode+'>'+provinces[i].data[j].areaName+'</li>';
                    }
                }
            }
            $('.citylist').html(cityTpl);
            resetData(areaName,baseAreaId,areaCode);
        });

        $('.site').on('click', '.cityitem', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).addClass('active').siblings().removeClass('active');
            var city=$(this).text();
            $('.zcityItem .currentValue').val(city);
            $('.areaName').html(city);
            $('.cityContainer').hide();
            areaCode=$('.cityitem.active').data('area-code');
            baseAreaId=$('.cityitem.active').data('area-id');
            areaName=$('.cityitem.active').data('name');
            resetData(areaName,baseAreaId,areaCode);
        });
    });
}

//数据类型切换
$('.filter-type').on('click','li',function () {
    $(this).addClass('active').siblings().removeClass('active');
    dataType=$(this).data('type');
    if(dataType=='manufacturer'){
        faultRankChart(manufacturerData);
    }else if(dataType=='supplier'){
        faultRankChart(supplierData);
    }
});
