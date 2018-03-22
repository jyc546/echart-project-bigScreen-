var areaCode='000000',
    oTimer = null,
    timer = null,
    num = 0,
    num1 = 0,
    dataType = $('.filter-type li.active').data('type'),
    resourceDataType = $('.data-label li.active').data('type'),
    resourceClassLevelData = null,
    sourceData = null,
    viewratiodata = null,
    downloadratiodata = null,
    collectionratiodata = null,
    commentratiodata = null;
// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('main1'));
var myChart2 = echarts.init(document.getElementById('main2'));
var myChart3 = echarts.init(document.getElementById('main3'));
var myChart4 = echarts.init(document.getElementById('main4'));
var myChart5 = echarts.init(document.getElementById('main5'));
var myChart6 = echarts.init(document.getElementById('main6'));
// 使用刚指定的配置项和数据显示图表。
getNowFormatDate();
selectArea();
Teaching(areaCode);

function selectArea() {
    $.get('resource/data/data.json').done(function (data) {
        var provinceTpl = '', cityTpl = '';
        var provinces = data.map.data;

        for (var i = 0; i < provinces.length; i++) {
            provinceTpl += '<li class="provinceitem" values=' + provinces[i].areaName + ' data-area-code=' + provinces[i].areaCode + '>' + provinces[i].areaName + '</li>';
            if (provinces[i].areaCode == areaCode && provinces[i].data) {
                for (var j = 0; j < provinces[i].data.length; j++) {
                    cityTpl += '<li class="cityitem" values=' + provinces[i].data[j].areaName + ' data-area-code=' + provinces[i].data[j].areaCode + '>' + provinces[i].data[j].areaName + '</li>';
                }
            }
        }

        $('.provincelist').html(provinceTpl);
        $('.citylist').html(cityTpl);

        $('.location').hover(function () {
            $('.selectDom').show();
            // clearInterval(TimeClear1);
        });

        $("body").click(function (e) {
            if (!$(e.target).parents(".selectDom").length) {
                $(".selectDom").hide();
                $('.provinceContainer').hide();
                $('.cityContainer').hide();
            }
        });

        $('.location').on('click', '.zcityItem,.zProvinceItem', function () {
            $(this).find('.cityContainer').show();
            $(this).find('.provinceContainer').show();
        });

        $('.location').on('click', '.provinceTips', function () {
            areaCode = '000000';

            $('.currentValue').val('全部');
            $('.areaName').html('中国');
            $('.citylist').html('');
            $('.provinceContainer').hide();
            $('.cityContainer').hide();

            Teaching(areaCode);
        });

        $('.location').on('click','.cityTips',function () {

            areaCode=$('.provinceitem.active').data('area-code');

            var provinceitem = document.getElementById("provinceInputValue").value;

            if(provinceitem=='全部'){
                $('.areaName').html('中国');
            }else{
                $('.areaName').html(provinceitem);
            }
            $('.zcityItem .currentValue').val('请选择');
            $('.provinceContainer').hide();
            $('.cityContainer').hide();

            Teaching(areaCode);
        });

        $('.location').on('click', '.provinceitem', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).addClass('active').siblings().removeClass('active');
            var province = $(this).text();
            $('.zProvinceItem .currentValue').val(province);
            $('.areaName').html(province);
            $('.provinceContainer').hide();
            areaCode = $('.provinceitem.active').data('area-code');
            cityTpl = '';
            $('.zcityItem .currentValue').val('请选择');
            for (var i = 0; i < provinces.length; i++) {
                if (provinces[i].areaCode == areaCode && provinces[i].data) {
                    for (var j = 0; j < provinces[i].data.length; j++) {
                        // $('.zcityItem .currentValue').val(provinces[i].data[0].areaName);
                        $('.location .cityitem[values=' + provinces[i].data[0].areaName + ']').addClass('active').siblings().removeClass('active');
                        cityTpl += '<li class="cityitem" values=' + provinces[i].data[j].areaName + ' data-area-code=' + provinces[i].data[j].areaCode + '>' + provinces[i].data[j].areaName + '</li>';
                    }
                }
            }
            $('.citylist').html(cityTpl);
            Teaching(areaCode);
        });

        $('.location').on('click', '.cityitem', function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).addClass('active').siblings().removeClass('active');
            var city = $(this).text();
            $('.zcityItem .currentValue').val(city);
            $('.areaName').html(city);
            $('.cityContainer').hide();
            areaCode = $('.cityitem.active').data('area-code');
            Teaching(areaCode);
        });
    });
}

function Teaching(areaCode) {
    /*-----------------------------------------------资源使用情况数据请求------------------------------------------*/
// top
    resouceUseTop(areaCode);
// center
    resourceUseStatu(areaCode);
// 浏览量
    $.get(BACK_ROOT + '/bigscreen/resource/viewratiodata.do?areaCode=' + areaCode).done(function (data) {
        viewratiodata = data.result;
        fourCnt(viewratiodata);
    });
//下载量
    $.get(BACK_ROOT + '/bigscreen/resource/downloadratiodata.do?areaCode=' + areaCode).done(function (data) {
        downloadratiodata = data.result;
    });
//收藏量
    $.get(BACK_ROOT + '/bigscreen/resource/collectionratiodata.do?areaCode=' + areaCode).done(function (data) {
        collectionratiodata = data.result;
        // fourCnt(collectionratiodata);
    });
//评论量
    $.get(BACK_ROOT + '/bigscreen/resource/commentratiodata.do?areaCode=' + areaCode).done(function (data) {
        commentratiodata = data.result;
    });
    /*-----------------------------------------------资源总量数据请求------------------------------------------*/
    resourceAllData(areaCode);
    /*-----------------------------------------------资源统计图数据请求------------------------------------------*/
    areaResourceCountPic(areaCode);
    /*-----------------------------------------------资源来源数据请求------------------------------------------*/
    $.get(BACK_ROOT + '/bigscreen/resource/sourcedata.do?areaCode=' + areaCode).done(function (data) {
        sourceData = data.result;
    });
    /*-----------------------------------------------年级分布数据请求------------------------------------------*/
    $.get(BACK_ROOT + '/bigscreen/resource/classleveldata.do?areaCode=' + areaCode).done(function (data) {
        resourceClassLevelData = data.result;
        resourceUrl(resourceClassLevelData);
    });
    /*-----------------------------------------------学校排行数据请求------------------------------------------*/
    schoolRank(areaCode);
}
/*-----------------------------------------------资源使用情况数据请求------------------------------------------*/
function resouceUseTop(areaCode){
    $.get(BACK_ROOT + '/bigscreen/resource/recentdata.do?areaCode=' + areaCode).done(function (data) {
        var data = data.result,
            Tpl = '<li>' +
                '<p class="data-count"></p>' +
                '<span class="data-name">近30日资源增加量</span>' +
                '</li>' +
                '<li>' +
                '<p class="data-count"></p>' +
                '<span class="data-name">近30日资源浏览量</span>' +
                '</li>' +
                '<li>' +
                '<p class="data-count"></p>' +
                '<span class="data-name">近30日平均浏览量</span>' +
                '</li>' +
                '<li>' +
                '<p class="data-count"></p>' +
                '<span class="data-name">近30日下载量</span>' +
                '</li>' +
                '<li>' +
                '<p class="data-count"></p>' +
                '<span class="data-name">近30日收藏量</span>' +
                '</li>';
        if (data != null) {
            Tpl = '<li>' +
                '<p class="data-count">' + data.uploadCnt + '</p>' +
                '<span class="data-name">近30日资源增加量</span>' +
                '</li>' +
                '<li>' +
                '<p class="data-count">' + data.viewCnt + '</p>' +
                '<span class="data-name">近30日资源浏览量</span>' +
                '</li>' +
                '<li>' +
                '<p class="data-count">' + data.viewAvg + '</p>' +
                '<span class="data-name">近30日平均浏览量</span>' +
                '</li>' +
                '<li>' +
                '<p class="data-count">' + data.downloadCnt + '</p>' +
                '<span class="data-name">近30日下载量</span>' +
                '</li>' +
                '<li>' +
                '<p class="data-count">' + data.collectionCnt + '</p>' +
                '<span class="data-name">近30日收藏量</span>' +
                '</li>';
        }
        $('.com-screen-content .use-data').html(Tpl);
    });
}

var resourceUseStatuTime;
function resourceUseStatu(areaCode) {
    clearInterval(resourceUseStatuTime);
    $.get(BACK_ROOT + '/bigscreen/resource/rescurvegraphdata.do?areaCode=' + areaCode).done(function (data) {
        var data = data.result;
        var uploadCnt = [];
        var downloadCnt = [];
        var collectionCnt = [];
        var dailyCnt = [];
        var viewCnt = [];
        if (data.uploadData != null) {
            for (var i = 0; i < data.uploadData.length; i++) {
                uploadCnt.push(data.uploadData[i].count);
            }
        }
        if (data.downloadData != null) {
            for (var i = 0; i < data.downloadData.length; i++) {
                downloadCnt.push(data.downloadData[i].count);
            }
        }
        if (data.collectionData != null) {
            for (var i = 0; i < data.collectionData.length; i++) {
                collectionCnt.push(data.collectionData[i].count);
            }
        }
        if (data.dailyData != null) {
            for (var i = 0; i < data.dailyData.length; i++) {
                dailyCnt.push(data.dailyData[i].count);
            }
        }
        if (data.viewData != null) {
            for (var i = 0; i < data.viewData.length; i++) {
                viewCnt.push(data.viewData[i].count);
            }
        }
        option1 = {
            title: {
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: '#F1F1F3'
                },
                left: '6%'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function (params, ticket, callback) {
                    var res = '';
                    for (var i = 0, l = params.length; i < l; i++) {
                        res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>';
                    }
                    return res;
                },
                transitionDuration: 0,
                backgroundColor: 'rgba(83,93,105,0.8)',
                borderColor: '#535b69',
                borderRadius: 8,
                borderWidth: 2,
                padding: [5, 10],
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        type: 'dashed',
                        color: '#ffff00'
                    }
                }
            },
            legend: {
                icon: 'circle',
                itemWidth: 8,
                itemHeight: 8,
                itemGap: 10,
                top: '16',
                right: '10',
                data: ['浏览', '收藏', '上传', '下载', '录制'],
                textStyle: {
                    fontSize: 12,
                    color: '#a0a8b9'
                }
            },
            grid: {
                top: '46',
                left: '45',
                right: '45',
                // bottom: '10%',
                containLabel: false
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel: {
                    interval: 0,
                    show: true,
                    inside: false,
                    margin: 2,
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#a0a8b9'
                    }
                },
                axisTick: {
                    show: false
                },
                data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                offset: 10
            }],
            yAxis: [{
                type: 'value',
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#a0a8b9'
                    }
                },
                axisLabel: {
                    margin: 10,
                    textStyle: {
                        fontSize: 14
                    }
                },
                splitLine: {
                    lineStyle: {
                        color: '#2b3646'
                    }
                },
                axisTick: {
                    show: false
                }
            }],
            series: [{
                name: '浏览',
                type: 'line',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(137, 189, 27, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(137, 189, 27, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#1cc840'
                    }
                },
                data: viewCnt
            }, {
                name: '收藏',
                type: 'line',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 136, 212, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 136, 212, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#43bbfb'
                    }
                },
                data: collectionCnt
            }, {
                name: '上传',
                type: 'line',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(219, 50, 51, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(219, 50, 51, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#eb5690'
                    }
                },
                data: uploadCnt
            }, {
                name: '下载',
                type: 'line',
                smooth: true,
                showSymbol: false,
                lineStyle: {
                    normal: {
                        width: 2
                    }
                },
                areaStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: 'rgba(0, 150, 220, 0.3)'
                        }, {
                            offset: 0.8,
                            color: 'rgba(0, 150, 51, 0)'
                        }], false),
                        shadowColor: 'rgba(0, 0, 0, 0.1)',
                        shadowBlur: 10
                    }
                },
                itemStyle: {
                    normal: {
                        color: '#fe9c43'
                    }
                },
                data: downloadCnt
            },
                {
                    name: '录制',
                    type: 'line',
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        normal: {
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: 'rgba(0, 50, 151, 0.3)'
                            }, {
                                offset: 0.8,
                                color: 'rgba(0, 50, 151, 0)'
                            }], false),
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowBlur: 10
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#154bc7'
                        }
                    },
                    data: dailyCnt
                },
            ]
        };
        myChart1.setOption(option1);
        var option1Index = -1;
        resourceUseStatuTime=hoverTurn(option1, myChart1, option1Index);
    });
}

var fourCntTimer,option2Index;
function fourCnt(data) {
    clearInterval(fourCntTimer);
    var resourceCountData = [];
    if (data && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
            if (data[i].resourceType == 'video') {
                data[i].resourceType = '视频'
            } else if (data[i].resourceType == 'doc') {
                data[i].resourceType = '文档'
            } else if (data[i].resourceType == 'pic') {
                data[i].resourceType = '图片'
            } else if (data[i].resourceType == 'audio') {
                data[i].resourceType = '音频'
            }
            resourceCountData.push({value: data[i].count, name: data[i].resourceType});
            $('.teacher-rate').html(data[i].teacherUseRatio + '%');
            $('.student-rate').html(data[i].studentUseRatio + '%');
        }
    } else {
        $('.teacher-rate').html('0%');
        $('.student-rate').html('0%');
    }

    var a = 0;
    var scale = 1;
    var borderColor = '#021421';
    for (var i = 0; i < resourceCountData.length; i++) {
        a += resourceCountData[i].value;
    }
    var blank = a * 30 / 100;
    resourceCountData.push({
        value: blank,
        name: '',
        label: {
            normal: {
                show: false
            },
            emphasis: {
                show: false
            }
        },
        itemStyle: {
            normal: {
                color: 'none',
                borderColor: 'none'
            }
        }
    });
    option2 = {
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%"
        },
        color: ['#1c8ef5', '#1d6ef2', '#eb7e34', '#1aa1ed'],
        series: [{
            name: '访问来源',
            type: 'pie',
            startAngle: -135,
            avoidLabelOverlap: false,
            hoverAnimation: false,
            radius: ['78%', '70%'],
            center: ['46%', '45%'],
            data: resourceCountData,
            label: {
                normal: {
                    show: false,
                    position: 'center',
                    color: '#fff',
                    fontSize: '8'
                },
                emphasis: {
                    show: true,
                    formatter: '{b} \n\n{d}%',
                    textStyle: {
                        fontSize: '16'
                        // fontWeight: 'bold'
                    }
                }
            },
            itemStyle: {
                normal: {
                    borderColor: borderColor,
                    borderWidth: 4 * scale
                },
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }]
    };
    myChart2.setOption(option2);
    option2Index = -1;
    fourCntTimer=hoverTurn(option2, myChart2, option2Index);
}
//    资源类型定时器
function resourceType() {
    $('.data-label li').eq(num).addClass('active').siblings().removeClass('active');
    $('.active-data-label').html($('.canvas-pic-two .data-label li.active').html());
    urlType();
    num++;
    if (num >= 4) {
        num = 0;
    }
}
//    资源类型不同调用不同地址resouceTypeUrl
function urlType() {
    resourceDataType = $('.data-label li.active').data('type');
    if (resourceDataType == 1) {
        fourCnt(viewratiodata);
    } else if (resourceDataType == 2) {
        fourCnt(downloadratiodata);
    } else if (resourceDataType == 3) {
        fourCnt(collectionratiodata);
    } else if (resourceDataType == 4) {
        fourCnt(commentratiodata);
    }
}
/*-----------------------------------------------资源总量数据请求------------------------------------------*/
var resourceAllDataTime,option3Index;
function resourceAllData(areaCode) {
    clearInterval(resourceAllDataTime);
    $.get(BACK_ROOT + '/bigscreen/resource/generaldata.do?areaCode=' + areaCode).done(function (data) {
        var data = data.result,
            tplOne = '', tplTwo = '', Tpl = '<li>浏览量' +
                '<p class="top"></p>' +
                '<p class="bottom"></p>' +
                '</li>' +
                '<li>收藏量' +
                '<p class="top"></p>' +
                '<p class="bottom"></p></li>' +
                '<li>下载量' +
                '<p class="top"></p>' +
                '<p class="bottom"></p>' +
                '</li>',
            resourceCnt, activeUserCnt;

        if (data) {
            resourceCnt = data.resourceCnt.toString();
            activeUserCnt = data.activeUserCnt.toString();
            for (var i = 0; i < resourceCnt.length; i++) {
                tplOne += '<li>' + resourceCnt[i] + '</li>';
            }
            for (var i = 0; i < activeUserCnt.length; i++) {
                tplTwo += '<li>' + activeUserCnt[i] + '</li>';
            }
            Tpl = '<li>浏览量' +
                '<p class="top">' + data.viewCnt + '</p>' +
                '<p class="bottom">' + data.viewAvg + '</p>' +
                '</li>' +
                '<li>收藏量' +
                '<p class="top">' + data.collectionCnt + '</p>' +
                '<p class="bottom">' + data.collectionAvg + '</p></li>' +
                '<li>下载量' +
                '<p class="top">' + data.downloadCnt + '</p>' +
                '<p class="bottom">' + data.downloadAvg + '</p>' +
                '</li>';
        }

        $('.re-top-right .six-border').append(Tpl);
        $('.re-all-data.one').html(tplOne);
        $('.re-all-data.two').html(tplTwo)
    });

    $.get(BACK_ROOT + '/bigscreen/resource/resourceratiodata.do?areaCode=' + areaCode).done(function (data) {
        var data = data.result, Tpl = '', total = 0;
        if (data) {
            for (var i = 0; i < data.length; i++) {
                total += data[i].count;
            }
            for (var i = 0; i < data.length; i++) {
                data[i].count = (data[i].count / total * 100).toFixed(1);
                if (data[i].resourceType == 'video') {
                    data[i].resourceType = '视频'
                } else if (data[i].resourceType == 'doc') {
                    data[i].resourceType = '文档'
                } else if (data[i].resourceType == 'pic') {
                    data[i].resourceType = '图片'
                } else if (data[i].resourceType == 'audio') {
                    data[i].resourceType = '音频'
                }
                Tpl +=
                    '<tr>' +
                    '<td>' + data[i].resourceType + '：</td>' +
                    '<td>' + data[i].count + '%</td>' +
                    '</tr>';
            }
        }
        $('.inner-pie table').html(Tpl);
    });

    $.get(BACK_ROOT + '/bigscreen/resource/subjectdata.do?areaCode=' + areaCode).done(function (data) {
        var data = data.result, subjectName = [];
        if (data) {
            for (var i = 0; i < data.length; i++) {
                subjectName.push({name: data[i].subjectName, value: data[i].resourceCnt, selected: true});
            }
        }
        option3 = {
            color: ['#4bc965', '#e0b455', '#eb4d4e', '#9c90ff', '#2774ba', '#2ecec4', '#abb659', '2a86aa'],
            tooltip: {
                trigger: 'item',
                transitionDuration:0,
                backgroundColor : 'rgba(83,93,105,0.8)',
                borderColor : '#535b69',
                borderRadius : 8,
                borderWidth: 2,
                padding: [5,10],
                formatter: "{b}: {c} ({d}%)"
            },
            series: [
                {    // 饼图的属性配置
                    name: 'outPie',
                    type: 'pie',
                    center: ['52%', '40%'],
                    radius: ['70%', '65.5%'],
                    hoverAnimation: false,
                    // avoidLabelOverlap: false,
                    startAngle: 20,
                    zlevel: 0,
                    itemStyle: {
                        normal: {
                            borderColor: "#192342",
                            borderWidth: 10
                        },
                        emphasis: {
                            shadowBlur: 2,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.8)'
                        }
                    },
                    // 图形样式
                    label: {
                        normal: {
                            show: true,
                            formatter: function (param) {
                                return param.name + '(' + param.value + ')';
                            },
                            position: 'top',
                            fontSize: '14'
                        },
                        emphasis: {
                            show: true,
                            formatter: function (param) {
                                return param.name + '(' + param.value + ')';
                            },
                            textStyle: {
                                fontSize: '16',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data: subjectName
                }
            ]
        };
        myChart3.setOption(option3);
        option3Index = -1;
        resourceAllDataTime=hoverTurn(option3, myChart3, option3Index);
    });
}
/*-----------------------------------------------资源统计图数据请求------------------------------------------*/
var areaResourceCountPicTime;
function areaResourceCountPic(areaCode) {
    clearInterval(areaResourceCountPicTime);
    $.get(BACK_ROOT + '/bigscreen/resource/subareagraphdata.do?areaCode=' + areaCode).done(function (data) {
        var data = data.result;
        var uploadCnt = [];
        var downloadCnt = [];
        var collectionCnt = [];
        var dailyCnt = [];
        var viewCnt = [];
        var areaNameS = [];
        if (data.uploadData) {
            for (var i = 0; i < data.uploadData.length; i++) {
                uploadCnt.push(data.uploadData[i].count);
                areaNameS.push(data.uploadData[i].areaName);
            }
        }
        if (data.downloadData) {
            for (var i = 0; i < data.downloadData.length; i++) {
                downloadCnt.push(data.downloadData[i].count);
            }
        }
        if (data.collectionData) {
            for (var i = 0; i < data.collectionData.length; i++) {
                collectionCnt.push(data.collectionData[i].count);
            }
        }
        if (data.dailyData) {
            for (var i = 0; i < data.dailyData.length; i++) {
                dailyCnt.push(data.dailyData[i].count);
            }
        }
        if (data.viewData) {
            for (var i = 0; i < data.viewData.length; i++) {
                viewCnt.push(data.viewData[i].count);
            }
        }
        option4 = {
            "title": {
                x: "1%",
                y: "20",
                "text": "资源统计图",
                textStyle: {
                    color: '#1bb4f9',
                    fontSize: '22',
                    fontWeight: '400'
                }
            },
            "tooltip": {
                "trigger": "axis",
                transitionDuration: 0,
                backgroundColor: 'rgba(83,93,105,0.8)',
                borderColor: '#535b69',
                borderRadius: 8,
                borderWidth: 2,
                padding: [5, 10],
                formatter: function (params, ticket, callback) {
                    var res = '';
                    for (var i = 0, l = params.length; i < l; i++) {
                        res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>';
                    }
                    return res;
                },
                axisPointer: {
                    type: 'line',
                    lineStyle: {
                        type: 'dashed',
                        color: '#ffff00'
                    }
                }
            },
            "grid": {
                "borderWidth": 0,
                "top": '100',
                "left": '3%',
                "right": '3%',
                "bottom": '40',
                textStyle: {
                    color: "#fff"
                }
            },
            "legend": {
                right: '24',
                top: "24",
                itemWidth: 8,
                itemHeight: 12,
                textStyle: {
                    color: '#fff'
                },
                "data": ['上传总量', '下载总量', '收藏量', '常态化录制资源', '浏览量']
            },
            "calculable": true,
            xAxis: [{
                'type': 'category',
                "axisTick": {
                    "show": false
                },
                "axisLine": {
                    "show": false,
                    lineStyle: {
                        color: '#868c96'
                    }
                },
                "axisLabel": {
                    "interval": 0
                },
                "splitArea": {
                    "show": false
                },
                'data': areaNameS,
                splitLine: {
                    show: false
                }
            }],
            "yAxis": [
                {
                    "type": "value",
                    offset: -14,
                    "splitLine": {
                        "show": false
                    },
                    "axisLine": {
                        "show": false,
                        lineStyle: {
                            color: '#868c96'
                        }
                    },
                    "axisTick": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0

                    },
                    "splitArea": {
                        "show": false
                    }
                }, {
                    "type": "value",
                    offset: -20,
                    "splitLine": {
                        "show": false
                    },
                    "axisLine": {
                        "show": false,
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    "axisTick": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0
                    },
                    "splitArea": {
                        "show": false
                    }
                }],
            dataZoom: [
                {
                show: true,
                height: 8,
                width:'50%',
                xAxisIndex: [0],
                bottom: 5,
                left:'center',
                start: 5,
                end: 95,
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
                },
                {
                    type: "inside",
                    show: true,
                    height: 8,
                    start: 1,
                    end: 35
                }
            ],
            "series": [
                {
                    "name": "上传总量",
                    "type": "bar",
                    "barMaxWidth": 10,
                    "barGap": "10%",
                    itemStyle: {//图形样式
                        normal: {
                            "color": '#4a4df0'
                        }
                    },
                    "data": uploadCnt
                }, {
                    "name": "下载总量",
                    "type": "bar",
                    // "stack": "总量",
                    "barMaxWidth": 10,
                    "barGap": "10%",
                    itemStyle: {//图形样式
                        normal: {
                            // barBorderRadius: [5, 5, 0, 0],
                            "color": '#0190fc'
                        }
                    },
                    "data": downloadCnt
                }, {
                    "name": "收藏量",
                    "type": "bar",
                    "barMaxWidth": 10,
                    "barGap": "10%",
                    itemStyle: {//图形样式
                        normal: {
                            "color": '#54f4cd'
                        }
                    },
                    "data": collectionCnt
                }, {
                    "name": "常态化录制资源",
                    "type": "bar",
                    "barMaxWidth": 10,
                    "barGap": "10%",
                    itemStyle: {//图形样式
                        normal: {
                            "color": '#01defd'
                        }
                    },
                    "data": dailyCnt
                }, {
                    "name": "浏览量",
                    type: 'line',
                    yAxisIndex: 1,
                    // smooth: true,
                    showAllSymbol: true,
                    symbol: 'circle',
                    symbolSize: 8,
                    "itemStyle": {
                        "normal": {
                            "color": '#dd8c25',
                            "barBorderRadius": 2,
                            "label": {
                                "show": false,
                                "position": "top",
                                formatter: function (p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            }
                        }
                    },
                    "data": viewCnt
                }
            ]
        };
        myChart4.setOption(option4);
        var option4Index = -1;
        areaResourceCountPicTime=hoverTurn(option4, myChart4, option4Index);
    });
}

function resourceUrl(data) {
    var indicatorData = [], valueData = [];
    if(data.length!=0){
        for (var i = 0; i < data.length; i++) {
            if (data[i].classLevelName == null) {
                indicatorData.push({name: data[i].resourceSource})
            } else {
                indicatorData.push({name: data[i].classLevelName});
            }
            valueData.push(data[i].resourceCnt);
        }
        option5 = {
            tooltip: {
                transitionDuration: 0,
                backgroundColor: 'rgba(83,93,105,0.8)',
                borderColor: '#535b69',
                borderRadius: 8,
                borderWidth: 2,
                padding: [5, 10]
            },
            radar: {
                shape: 'circle',
                splitNumber: 4,
                name: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#1bb9f9',
                        fontSize: 16
                    }
                },
                indicator: indicatorData,
                center: ['50%', '50%'],
                radius: 150,
                splitArea: {
                    areaStyle: {
                        color: ['rgba(11,35,74,0.7)', 'rgba(11,32,67,0.6)', 'rgba(11,30,62,0.4)', 'rgba(14,29,63,0.2)'],
                        shadowColor: 'rgba(11,32,67,0.6)',
                        shadowBlur: 1
                    }
                },
                axisLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#132f4c',
                        textStyle: {
                            color: '#19a3de'
                        }
                    }
                },
                axisLabel: {
                    color: '#19a3de'
                },
                splitLine: {
                    lineStyle: {
                        normal: {
                            type: 'solid'
                        },
                        shadowColor: 'rgba(12,30,64,1)',
                        shadowBlur: 1,
                        color: 'rgba(11,37,78,1)'
                    }
                }
            },
            series: [{
                type: 'radar',
                symbolSize: 10,
                name:'资源来源',
                itemStyle: {
                    normal: {
                        color: 'rgba(28,155,246,1)'
                    }
                },
                areaStyle: {
                    normal: {
                        color: 'rgba(13, 58, 95, 0.5)'
                    }
                },
                data: [{value: valueData}]
            }]
        };
        myChart5.setOption(option5,true);
    }else{
        myChart5.clear();
    }


}
/*-----------------------------------------------学校排行数据请求------------------------------------------*/
function schoolRank(areaCode){
    $.get(BACK_ROOT + '/bigscreen/resource/schooldata.do?areaCode=' + areaCode).done(function (data) {
        var data = data.result, schoolName = [], resourceCnt = [], total = 0, max = 0;
        if (data) {
            for (var i = 0; i < data.length; i++) {
                schoolName.push(data[i].schoolName);
                resourceCnt.push(data[i].resourceCnt);
                if (max <= data[i].resourceCnt) {
                    max = data[i].resourceCnt;
                } else {
                    max = max;
                }
                total += data[i].resourceCnt;
            }
            var maxData = [max, max, max, max, max, max, max, max];
        }

        option6 = {
            grid: {
                left: '40',
                top: '0',
                right: '24',
                bottom: '10',
                containLabel: true
            },
            xAxis: [{
                show: false
            }],
            yAxis: [{
                splitLine: {show: false},
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#1798cf'
                    }
                },
                axisLabel: {
                    fontSize: '16'
                },
                axisTick: {
                    show: false
                },
                offset: 20,
                data: schoolName
            }, {
                splitLine: {show: false},
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisLabel: {
                    fontSize: '24',
                    fontFamily: 'myFirstFont'
                },
                axisTick: {
                    show: false
                },
                offset: 50,
                data: resourceCnt
            }, {
                name: '',
                nameGap: '50',
                nameTextStyle: {
                    color: '#ffffff',
                    fontSize: '24'
                },
                axisLine: {
                    lineStyle: {
                        color: 'rgba(0,0,0,0)'
                    }
                },
                data: []
            }],
            series: [{
                name: '条',
                type: 'bar',
                yAxisIndex: 0,
                data: resourceCnt,
                label: {
                    normal: {
                        show: false,
                        position: 'right',
                        formatter: function (param) {
                            // return param.value + '%';
                            return param.value;
                        },
                        textStyle: {
                            color: '#fff',
                            fontSize: '16'
                        }
                    }
                },
                barWidth: 6,
                itemStyle: {
                    normal: {
                        barBorderRadius: 6,
                        color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                            offset: 0,
                            color: '#1d6bf1'
                        }, {
                            offset: 1,
                            color: '#1ad0fc'
                        }])
                    }
                },
                z: 2
            }, {
                name: '白框',
                type: 'bar',
                yAxisIndex: 1,
                barGap: '-100%',
                data: maxData,
                barWidth: 10,
                itemStyle: {
                    normal: {
                        color: '#0a182e',
                        barBorderRadius: 10
                    }
                },
                z: 1
            }, {
                name: '外框',
                type: 'bar',
                yAxisIndex: 2,
                barGap: '-100%',
                data: maxData,
                barWidth: 12,
                itemStyle: {
                    normal: {
                        color: "#4e6a8c",
                        borderColor: '#4e6a8c',
                        barBorderRadius: 12
                    }
                },
                z: 0
            }, {
                name: '内圆',
                type: 'scatter',
                hoverAnimation: false,
                data: [0, 0, 0, 0, 0, 0, 0, 0],
                yAxisIndex: 2,
                symbolSize: 14,
                itemStyle: {
                    normal: {
                        color: '#1367fb',
                        opacity: 1
                    }
                },
                z: 3
            }, {
                name: '外圆',
                type: 'scatter',
                hoverAnimation: true,
                data: [0, 0, 0, 0, 0, 0, 0, 0],
                yAxisIndex: 2,
                symbolSize: 20,
                itemStyle: {
                    normal: {
                        color: '#0a182e',
                        borderColor: '#4e6a8c',
                        opacity: 1
                    }
                },
                z: 0
            }]
        };
        var option6Index = -1;
        myChart6.setOption(option6);
        hoverTurn(option6, myChart6, option6Index);
    });
}

function timeTab() {
    $('.filter-type li').eq(num1).addClass('active').siblings().removeClass('active');
    dataType = $('.filter-type li.active').data('type');
    if (dataType == 1) {
        resourceUrl(resourceClassLevelData);
    } else if (dataType == 2) {
        resourceUrl(sourceData);
    }
    num1++;
    if (num1 >= 2) {
        num1 = 0;
    }
}

function hoverTurn(a, b, c) {
    var intervalVal =setInterval(function () {
        var dataLen = a.series[0].data.length;
        // 取消之前高亮的图形
        b.dispatchAction({
            type: 'downplay',
            seriesIndex: 0,
            dataIndex: c
        });
        c = (c + 1) % dataLen;
        // 高亮当前图形
        b.dispatchAction({
            type: 'highlight',
            seriesIndex: 0,
            dataIndex: c
        });
        // 显示 tooltip
        b.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: c
        });
    }, 2000);
    return intervalVal;
}

function getNowFormatDate() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    var Hour =  date.getHours();       // 获取当前小时数(0-23)
    var Minute =  date.getMinutes();     // 获取当前分钟数(0-59)
    var Second = date.getSeconds();     // 获取当前秒数(0-59)
    var show_day=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
    var day=date.getDay();
    if (Hour<10) {
        Hour = "0" + Hour;
    }
    if (Minute <10) {
        Minute = "0" + Minute;
    }
    if (Second <10) {
        Second = "0" + Second;
    }
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = '<div><p>'+year + '年' + month +'月' + strDate+'号</p><p>'+show_day[day]+'</p></div>';
    var HMS = Hour + ':' + Minute +':' + Second;
    $('.nowTime li:nth-child(1)').html(HMS);
    $('.nowTime li:nth-child(2)').html(currentdate);
    setTimeout(getNowFormatDate,1000);//每隔1秒重新调用一次该函数
}

timer = setInterval(timeTab, 3000);

oTimer = setInterval(resourceType, 10000);

//    资源类型点击切换
$('.data-label').on('click', 'li', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.active-data-label').html($('.canvas-pic-two .data-label li.active').html());
    urlType();
});

//    hover清除定时器
$('.data-label').hover(function () {
    clearInterval(oTimer);
}, function () {
    oTimer = setInterval(resourceType, 10000);
});

$('.resource-origin .com-screen-content').hover(function () {
    clearInterval(timer);
}, function () {
    timer = setInterval(timeTab, 3000);
});
$('#main2').hover(function () {
    clearInterval(fourCntTimer);
    clearInterval(oTimer);
}, function () {
    oTimer = setInterval(resourceType, 10000);
});

$('.filter-type').on('click', 'li', function () {
    $(this).addClass('active').siblings().removeClass('active');
    dataType = $(this).data('type');
    if (dataType == 1) {
        resourceUrl(resourceClassLevelData);
    } else if (dataType == 2) {
        resourceUrl(sourceData);
    }
});

