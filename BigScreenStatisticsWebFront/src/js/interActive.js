var areaCode='000000',
    year,
    dataType=$('.filter-type li.active').data('type'),
    oTimer = null,num = 0,
    currentIndex = -1,
    areaName= 'china',
    baseAreaId='-1',
    subjectResult = null,
    classResult = null,
    subjectdata=null,
    classleveldata=null;
// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('acting_teacher'));
var myChart2 = echarts.init(document.getElementById('admin_teach'));
var myChart3 = echarts.init(document.getElementById('teach_count_pic'));
var myChart4 = echarts.init(document.getElementById('teach_research1'));
var myChart5 = echarts.init(document.getElementById('teach_research2'));
var myChart6 = echarts.init(document.getElementById('teach_research3'));
// 使用刚指定的配置项和数据显示图表。

//获取当前时间
getNowFormatDate();
//选择行政区
selectArea();
//根据参数填充页面，以及渲染地图
resetData(areaName,baseAreaId,areaCode);

function resetData(areaName,baseAreaId,areaCode) {
    var jsonPath = areaMap[baseAreaId];
    //渲染地图
    $.get('resource/data/'+jsonPath).done(function (mapJson) {
        echarts.registerMap(areaName, mapJson);
        var featuresDataArr = mapJson.features;
        //渲染各个模块
        interActive(areaName,areaCode,featuresDataArr);
    });
}

function selectArea() {
    $.get('resource/data/data.json').done(function (data) {
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

        $('.location').hover(function () {
            $('.selectDom').show();
        });

        $("body").on('click',function(e){
            if(!$(e.target).parents(".selectDom").length){
                $(".selectDom").hide();
                $('.provinceContainer').hide();
                $('.cityContainer').hide();
            }
        });

        $('.location').on('click','.zcityItem,.zProvinceItem',function () {
            $(this).find('.cityContainer').show();
            $(this).find('.provinceContainer').show();
        });

        $('.location').on('click','.provinceTips',function () {
            clearInterval(oTimer);

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

        $('.location').on('click','.cityTips',function () {
            clearInterval(oTimer);

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

        $('.location').on('click', '.provinceitem',function (e) {
            e.preventDefault();
            e.stopPropagation();
            clearInterval(oTimer);
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
                        $('.location .cityitem[values='+provinces[i].data[0].areaName+']').addClass('active').siblings().removeClass('active');
                        cityTpl+='<li class="cityitem" values='+provinces[i].data[j].areaName+' data-area-id='+provinces[i].data[j].id+' data-name='+provinces[i].data[j].name+' data-area-code='+provinces[i].data[j].areaCode+'>'+provinces[i].data[j].areaName+'</li>';
                    }
                }
            }
            $('.citylist').html(cityTpl);
            resetData(areaName,baseAreaId,areaCode);
        });

        $('.location').on('click', '.cityitem', function (e) {
            e.preventDefault();
            e.stopPropagation();
            clearInterval(oTimer);
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

function interActive(areaName,areaCode,featuresDataArr) {
    year=$("#parent select option:checked").text();
    // LEFT
    /*------------------------------------互动教研数据请求------------------------------------------*/
    interact(areaCode);
    /*------------------------------------活跃学校------------------------------------------*/
    activeSchool(areaCode);
    /*------------------------------------活跃教师数据-----------------------------------*/
    activeTeacher(areaCode);
    // CENTER
    /*------------------------------------行政区教研数据统计数据----------------------------*/
    adminTeachCount(areaName,areaCode,featuresDataArr);
    /* -----------------------------------教研统计趋势图数据--------------------------------*/
    teachCountPic(year,areaCode);
    // RIGHT
    /* -----------------------------------互动教研开设情况--------------------------------*/
    interTeach(areaCode);
    /* -----------------------------------教研分布-教案学科数据------------------------------------*/
    $.get(BACK_ROOT + '/bigscreen/interact/lessonsubjectdata.do?areaCode='+ areaCode).done(function (data) {
         subjectResult = data.result;
         jiaoan(subjectResult);
    });
    /* -----------------------------------教研分布-教案年级数据----------------------------------------*/
    $.get(BACK_ROOT + '/bigscreen/interact/lessonclassleveldata.do?areaCode='+ areaCode).done(function (data) {
         classResult=data.result;
    });

    /* ------------------------教研分布-评课议课学科集体备课（内圆）数据--------------------------------*/
    $.get(BACK_ROOT + '/bigscreen/interact/subjectdata.do?areaCode='+areaCode).done(function (data) {
        subjectdata=data.result;
        prepare(subjectdata);
    });
    /* ------------------------教研分布-评课议课年级集体备课（内圆）数据--------------------------------*/
    $.get(BACK_ROOT + '/bigscreen/interact/classleveldata.do?areaCode='+areaCode).done(function (data) {
        classleveldata=data.result;
    });
}
// ----------------------------------------数据渲染方法
//互动教研整体情况
function interact(areaCode) {
    $.get(BACK_ROOT + '/bigscreen/interact/generaldata.do?areaCode='+areaCode).done(function (data) {
        // 填入数据
        var interActiveStatusData=data.result;
        var interActiveStatusTpl='';
        if(interActiveStatusData !=null){
            interActiveStatusTpl+=
                '<div class="content-item">' +
                '<span>'+interActiveStatusData.allLessonCnt+'</span>' +
                '<p>教案总量</p>' +
                '</div>'+
                '<div class="content-item">' +
                '<span>'+interActiveStatusData.excellentLessonCnt+'</span>' +
                '<p>优秀教案</p>' +
                '</div>'+
                '<div class="content-item">' +
                '<span>'+interActiveStatusData.activeUserCnt+'</span>' +
                '<p>活跃人数</p>' +
                '</div>'+
                '<div class="content-item">' +
                '<span>'+interActiveStatusData.prepareLessonCnt+'</span>' +
                '<p>集体备课</p>' +
                '</div>'+
                '<div class="content-item">' +
                '<span>'+interActiveStatusData.evaluationLessonCnt+'</span>' +
                '<p>评课议课</p>' +
                '</div>';
        }
        $('.interact-status .com-screen-content').html(interActiveStatusTpl);
    });
}
//活跃学校
function activeSchool(areaCode) {
    $.get(BACK_ROOT + '/bigscreen/interact/activeschooldata.do?areaCode='+areaCode).done(function (data) {
        // 填入数据
        var result=data.result;
        var Tpl='';
        for(var i=0;i<result.length;i++){
            Tpl+=
                '<tr>' +
                '<td>0'+(i+1)+'</td>' +
                '<td>'+result[i].schoolName+'</td>' +
                '<td>'+result[i].lessonCnt+'</td>' +
                '<td>'+result[i].prepareLessonCnt+'</td>' +
                '<td>'+result[i].evaluationLessonCnt+'</td>' +
                '</tr>';
        }
        $('.acting-school tbody').html(Tpl);
    });
}
//活跃教师
var activeTeacherInterval;
function activeTeacher(areaCode) {
    clearInterval(activeTeacherInterval);
    $.get(BACK_ROOT + '/bigscreen/interact/activeteacherdata.do?areaCode='+areaCode).done(function (data) {
        // 填入数据
        var result=data.result;
        var actingTeacherYLData=[],
            actingTeacherYRData=[],
            actingTeacherSeries1= [],
            actingTeacherSeries2= [],
            actingTeacherSeries3=[];
        if(result){
            for(var i=0;i<result.length;i++){
                var j=result.length-i-1;
                actingTeacherYLData.push(result[j].teacherName);
                actingTeacherYRData.push(result[j].totalCnt);
                actingTeacherSeries1.push(result[j].lessonCnt);
                actingTeacherSeries2.push(result[j].prepareLessonCnt);
                actingTeacherSeries3.push(result[j].evaluationLessonCnt);
            }
        }
        option1= {
            tooltip : {
                trigger: 'axis',
                showDelay: 0,
                hideDelay: 50,
                transitionDuration:0,
                backgroundColor : 'rgba(83,93,105,0.8)',
                borderColor : '#535b69',
                borderRadius : 8,
                borderWidth: 2,
                // position: [10, 10],
                padding: [10,5],
                position : function(p) {
                    // 位置回调
                    return [p[0]-10, p[1] - 45];
                },
                textStyle : {
                    color: '#fff',
                    decoration: 'none',
                    // fontFamily: 'Verdana, sans-serif',
                    fontSize: 14
                },
                formatter: function (params,ticket,callback) {
                    var res='';
                    // var res = 'Function formatter : <br/>' + params[0].name;
                    for (var i = 0, l = params.length; i < l; i++) {
                        res += '' + params[i].seriesName + ' : ' + params[i].value+'<br>';
                    }
                    return res;
                },
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'none'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '15%',
                right: '12%',
                top: '15',
                bottom: '32',
                containLabel: false
            },
            xAxis:  {
                type: 'value',
                axisTick : {show: false},
                axisLine: {
                    show: false,
                    lineStyle:{
                        color:'#868c97'
                    }
                },
                axisLabel: {
                    show: true,
                    interval: 'auto',
                    // fontFamily: 'sans-serif',
                    fontSize: 12
                },
                splitLine: {
                    show: false
                }
            },
            yAxis:[
                {
                    type: 'category',
                    axisTick : {show: false},
                    axisLine: {
                        show: false,
                        lineStyle:{
                            color:'#1bb9f9'
                        }
                    },
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        // fontFamily: 'sans-serif',
                        fontSize: 16
                    },
                    data: actingTeacherYLData
                },
                {
                    type: 'category',
                    axisTick : {show: false},
                    axisLine: {
                        show: false,
                        lineStyle:{
                            color:'#fff'
                        }
                    },
                    axisLabel: {
                        show: true,
                        interval: 'auto',
                        fontSize: 16
                    },
                    offset: 20,
                    data: actingTeacherYRData
                }
            ] ,
            series: [
                {
                    name: '教案数量',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 4,
                    silent: false,
                    itemStyle:{
                        normal: {
                            barBorderRadius: 10,
                            show: true,
                            color: '#1df2e5',
                            label: {
                                show: true,
                                position: 'insideRight',
                                formatter: '   ',
                                backgroundColor: '#1df2e5',
                                distance: 0,
                                borderWidth: 2,
                                borderRadius: 15
                            }
                        }
                    },
                    data: actingTeacherSeries1
                    // barGap: 20
                },
                {
                    name: '集体备课',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 4,
                    silent: false,
                    itemStyle:{
                        normal: {
                            show: true,
                            color: '#1c9bfb',
                            label: {
                                show: true,
                                position: 'insideRight',
                                formatter: '   ',
                                backgroundColor: '#1c9bfb',
                                distance: 0,
                                borderWidth: 2,
                                borderRadius: 15
                            }
                        }
                    },
                    data:actingTeacherSeries2
                    // barGap: 20
                },
                {
                    name: '评课议课',
                    type: 'bar',
                    stack: '总量',
                    barWidth: 4,
                    silent: false,
                    itemStyle:{
                        normal: {
                            barBorderRadius: 4,
                            show: true,
                            color: '#3134d1'
                        }
                    },
                    data: actingTeacherSeries3
                    // barGap: 20
                }
            ]
        }
        myChart1.setOption(option1);
        var optionIndex=-1;
        activeTeacherInterval = hoverTurn(option1,myChart1,optionIndex);
    });
}
//行政区教研数据统计
var adminTeachCountInterval;
function adminTeachCount(areaName,areaCode,featuresDataArr){
    clearInterval(adminTeachCountInterval);
    $.get(BACK_ROOT + '/bigscreen/interact/subareadata.do?areaCode='+areaCode).done(function (data) {
        // debugger
        // 填入数据
        var data=data.result;
        // 完成的项目
        var finishedArray = [];
        for (var i = 0; i < data.length; i++) {
            var obj = {};
            obj.name = data[i].areaName;
            // obj.value = data[i].finishedPro;
            obj.id = data[i].areaCode;
            obj.acvitityCnt = data[i].acvitityCnt;
            obj.lessonCnt = data[i].lessonCnt;
            finishedArray.push(obj);
        }
        var  adminTeachOption= {
            tooltip: {
                trigger: 'item',
                showDelay: 0,
                hideDelay: 50,
                transitionDuration:0,
                backgroundColor : 'rgba(86,94,118,0.8)',
                borderRadius : 8,
                padding: [10,5],
                textStyle : {
                    color: '#fff',
                    decoration: 'none',
                    fontSize: 14
                },
                formatter: function(params){
                    var res = params.data.name+'<br/>';
                    var myseries = adminTeachOption.series;
                    for (var i = 0; i < myseries.length; i++) {
                        for(var j=0;j<myseries[i].data.length;j++){
                            if(myseries[i].data[j].name==params.name){
                                res+= '教研活动: '+myseries[i].data[j].acvitityCnt+'</br>' +
                                    '教案数量: '+myseries[i].data[j].lessonCnt;
                            }
                        }
                    }
                    return res;
                }
            },
            series: [
                {
                    map:areaName,
                    type: 'map',
                    selectedMode : 'single',
                    left:'center',
                    label: {
                        normal: {
                            show: false
                            // image: 'images/btn01.jpg',
                            // 这里可以是图片的 URL，
                            // 或者图片的 dataURI，
                            // 或者 HTMLImageElement 对象，
                            // 或者 HTMLCanvasElement 对象。
                            ,
                            width:5,
                            height:10,
                            // borderWidth: 10,
                            borderRadius: 15
                        },
                        emphasis: {
                            show: true,
                            label: {
                                normal: {
                                    show: false,
                                    color:'#fff',
                                    position: ['30%', '50%']
                                }
                            }

                        }
                    },
                    itemStyle: {
                        borderSize:'2',
                        normal: {
                            areaColor: '#1e6bc0',
                            borderColor: '#253a8f',
                            borderSize:'2'
                        },
                        emphasis: {
                            areaColor: '#1e6bc0'
                        }
                    },
                    data:finishedArray
                }
            ],
            color: ['#fff', 'gold', 'yellow', 'green', 'lightgreen', 'lightgrey']
        };
        // 获取根据后台数据组装的option数组
        var seriesDataArr = adminTeachOption.series[0].data;
        // 读取的json文件里的json数组对象
        // 循环后台获取的地图信息与读取的json数据作比较（根据areacode），然后修改name
        $.each(seriesDataArr, function(i, series) {
            $.each(featuresDataArr, function(j, features) {
                if (series.id == features.id) {
                    features.properties.name = series.name;
                }
            });
        });
        var adminTeachOptionIndex=-1;
        myChart2.setOption(adminTeachOption);
        adminTeachCountInterval=hoverTurn(adminTeachOption,myChart2,adminTeachOptionIndex);

        var Tpl='',Tpls='';
        if(data.length>0){
            for(var i=0;i<6;i++){
                Tpl+='<div class="bubble0'+(i+1)+' pa">' +
                    '<div class="pa"> ' +
                    '<span>'+data[i].acvitityCnt+'</span>' +
                    '<p>教研活动</p>' +
                    '<span class="lessonCnts">'+data[i].lessonCnt+'</span>' +
                    '<p>教案</p> ' +
                    '</div> ' +
                    '<span class="admin-point">'+data[i].areaName+'</span>' +
                    '</div>';
            }
            $('.admin-teach-data-count .bumbles').html(Tpl);
        }else{
            for(var i=0;i<6;i++){
                Tpls+='<div class="bubble0'+(i+1)+' pa">' +
                    '<div class="pa"> ' +
                    '<span></span>' +
                    '<p>教研活动</p>' +
                    '<span class="lessonCnts"></span>' +
                    '<p>教案</p> ' +
                    '</div> ' +
                    '<span class="admin-point"></span>' +
                    '</div>';
            }
            $('.admin-teach-data-count .bumbles').html(Tpls);
        }
    });
}
//教研统计趋势图
var teachCountPicInterval;
function teachCountPic(year,areaCode){
    clearInterval(teachCountPicInterval);
    $.get(BACK_ROOT + '/bigscreen/interact/trendstaticdata.do?year='+year+'&areaCode='+areaCode).done(function (data) {
        // 填入评课议课数据
        var result=data.result;
        var teachCountPicSeries1 = [];
        var teachCountPicSeries3 = [];
        var teachCountPicSeries4 = [];
        var teachCountPicSeries2 = [];
        if(result){
            for(var i=0;i<result.uploadData.length;i++){
                teachCountPicSeries1.push(result.uploadData[i].lessonCnt);
            }
            for(var i=0;i<result.downloadData.length;i++){
                teachCountPicSeries2.push(result.downloadData[i].lessonCnt);
            }
            for(var i=0;i<result.prepareData.length;i++){
                teachCountPicSeries3.push(result.prepareData[i].lessonCnt);
            }
            for(var i=0;i<result.evaluationData.length;i++){
                teachCountPicSeries4.push(result.evaluationData[i].lessonCnt);
            }
        }

        teachCountPicOption= {
            "title": {
                x: "126",
                y:"0",
                text:"教研统计趋势图",
                textStyle: {
                    color: '#1bb4f9',
                    fontSize: '22',
                    fontWeight:'400'
                },
                subtextStyle: {
                    color: '#90979c',
                    fontSize: '22'
                }
            },
            "tooltip": {
                "trigger": "axis",
                transitionDuration:0,
                backgroundColor : 'rgba(83,93,105,0.8)',
                borderColor : '#535b69',
                borderRadius : 8,
                borderWidth: 2,
                padding: [5,10],
                formatter: function (params,ticket,callback) {
                    var res='';
                    for (var i = 0, l = params.length; i < l; i++) {
                        res += '' + params[i].seriesName + ' : ' + params[i].value+'<br>';
                    }
                    return res;
                },
                axisPointer: {
                    type:'line',
                    lineStyle: {
                        type:'dashed',
                        color: '#ffff00'
                    }
                }
            },
            "grid": {
                "borderWidth": 0,
                "left": '6%',
                "right": '5%',
                "top": '28%',
                // "bottom": '15%',
                textStyle: {
                    color: "#fff"
                }
            },
            "legend": {
                x: 'right',
                top: '20',
                itemWidth: 10,
                itemHeight: 15,
                itemGap: 10,
                textStyle: {
                    color: '#fff'
                },
                "data": ['集体备课', '评课议课', '教案上传','教案下载']
            },
            toolbox: {
                top: '-7',
                show: true,
                showTitle: false,
                feature: {
                    magicType: {
                        type: ['line']
                    },
                    restore: {},
                    saveAsImage: {
                        backgroundColor:'#091529'
                    }
                },
                iconStyle:{
                    borderColor: '#bbbec8'
                }
            },
            "calculable": true,
            xAxis: [{
                'type': 'category',
                "axisLine": {
                    show:false,
                    lineStyle: {
                        color: '#90979c'
                    }
                },
                "axisTick": {
                    "show": false
                },
                'axisLabel': {
                    'interval': 0
                },
                'data': [
                    '1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月',
                    '9月', '10月', '11月', '12月'
                ],
                splitLine: {
                    show: false
                }
            }],
            "yAxis": [
                {
                "type": "value",
                "splitLine": {
                    "show": false
                },
                "axisLine": {
                    show:false,
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
                "max":500,
                "splitArea": {
                    "show": false
                }
            }, {
                "type": "value",
                "splitLine": {
                    "show": false
                },
                "axisLine": {
                    show:false,
                    lineStyle: {
                        color: '#90979c'
                    }
                },
                "axisTick": {
                    "show": false
                },
                "axisLabel": {
                    "interval": 0,

                },
                "max":500,
                "splitArea": {
                    "show": false
                }
                // name: '数量',

            }],
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
                    "name": "教案上传",
                    type: 'line',
                    yAxisIndex: 1,
                    showAllSymbol: true,
                    symbol: 'circle',
                    symbolSize: 5,
                    "itemStyle": {
                        "normal": {
                            "color":"#ff9f25",
                            "barBorderRadius": 0,
                            "label": {
                                "show": false,
                                "position": "top",
                                formatter: function(p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            },
                            "emphasis": {
                                "label": {
                                    "show": true,
                                    // "position":'top',
                                    // distance: 5,
                                    "color":"#fff",
                                    // offset: [...],
                                    "formatter":function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        }
                    },
                    "data": teachCountPicSeries1
                },
                {
                    "name": "教案下载",
                    type: 'line',
                    yAxisIndex: 1,
                    // smooth: true,
                    showAllSymbol: true,
                    symbol: 'circle',
                    symbolSize: 5,

                    "itemStyle": {
                        "normal": {
                            "color":'#eb0dfe',
                            "barBorderRadius": 0,
                            "label": {
                                "show": false,
                                "position": "top",
                                formatter: function(p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            },
                            "emphasis": {
                                "label": {
                                    "show": true,
                                    // "position":'top',
                                    // distance: 5,
                                    color:'#fff',
                                    // offset: [...],
                                    formatter:function(p) {
                                        return p.value > 0 ? (p.value) : '';
                                    }
                                }
                            }
                        }
                    },
                    "data": teachCountPicSeries2
                },
                {
                    "name": "集体备课",
                    "type": "bar",
                    "stack": "总量",
                    "showAllSymbol": true,
                    "symbol": 'circle',
                    "symbolSize": 5,
                    "barMaxWidth": 10,
                    "barGap": "5%",
                    "itemStyle": {
                        "normal": {
                            "color": new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#1acafb'
                            }, {
                                offset: 1,
                                color: '#1c84f4'
                            }]),
                            "label": {
                                "show": true,
                                "textStyle": {
                                    "color": "#fff"
                                },
                                "position": "top",
                                formatter: function(p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            }
                        }
                    },
                    "data": teachCountPicSeries3
                },
                {
                    "name": "评课议课",
                    "type": "bar",
                    // "stack": "总量",
                    "showAllSymbol": true,
                    "symbol": 'circle',
                    "symbolSize": 5,
                    "barMaxWidth": 10,
                    "barGap": "5%",
                    "itemStyle": {
                        "normal": {
                            "color": new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#51dcac'
                            }, {
                                offset: 1,
                                color: '#107842'
                            }]),
                            "label": {
                                "show": true,
                                "textStyle": {
                                    "color": "#61defc"
                                },
                                "position": "top",
                                formatter: function(p) {
                                    return p.value > 0 ? (p.value) : '';
                                }
                            }
                        }
                    },
                    "data": teachCountPicSeries4
                }
            ]
        };
        myChart3.setOption(teachCountPicOption);
        var teachCountPicOptionIndex=-1;
        teachCountPicInterval = hoverTurn(teachCountPicOption,myChart3,teachCountPicOptionIndex);
    });

}
//互动教研开课状态
function interTeach(areaCode){
    $.get(BACK_ROOT + '/bigscreen/interact/statusdata.do?areaCode='+areaCode).done(function (data) {
        // 填入评课议课数据
        var prepareTpl='',evaluationTpl='';
        var result=data.result;
        if(result){
            for(var i=0;i<result.length;i++){
                if(result[i].lessonType=='PREPARE'){
                    prepareTpl='<span>'+result[i].unStartedCnt+'</span> ' +
                        '<span>'+result[i].processingCnt+'</span> ' +
                        '<span>'+result[i].finishedCnt+'</span>';
                }
                if(result[i].lessonType=='EVALUATION'){
                    evaluationTpl='<span>'+result[i].unStartedCnt+'</span> ' +
                        '<span>'+result[i].processingCnt+'</span> ' +
                        '<span>'+result[i].finishedCnt+'</span>';
                }
            }
        }
        $('.prepare-lessonCnt .data-count').html(prepareTpl);
        $('.evaluation-lessonCnt .data-count').html(evaluationTpl);
    });
}
//教案
var jiaoanInterval;
function jiaoan(result){
    clearInterval(jiaoanInterval);
    var teachResearchData1=[];
    if(result !=null){
        $('#teach_research1').show();
        for(var i=0;i<result.length;i++){
            if(result[i].subjectName==null){
                teachResearchData1.push({value:result[i].lessonCnt,name:result[i].classLevelName});
            }else{
                teachResearchData1.push({value:result[i].lessonCnt,name:result[i].subjectName});
            }
        }
        teachResearchOption1 = {
            tooltip: {
                trigger: 'item',
                transitionDuration:0,
                backgroundColor : 'rgba(83,93,105,0.8)',
                borderColor : '#535b69',
                borderRadius : 8,
                borderWidth: 2,
                padding: [5,10],
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            title: {
                text: '教案',
                textStyle: {
                    color: '#fff',
                    fontSize: '26',
                    fontWeight:'400'
                },
                x: 'center',
                y: 'center'
            },
            series: [
                {
                    name:'教案数量',
                    type:'pie',
                    radius: ['50%', '66%'],
                    label: {
                        normal: {
                            formatter: '{b}{c}'
                        }
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '18',
                            color:'#666666'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: true
                        }
                    },
                    data:teachResearchData1
                }
            ],
            color: ['#fd2c8c', '#fde649', '#1d70f2', '#01c2c9','#0594fb'],
        };
        myChart4.setOption(teachResearchOption1);
    }else{
        myChart4.clear();
        $('#teach_research1').hide();
    }
    jiaoanInterval = hoverTurn(teachResearchOption1,myChart4,currentIndex);
}
//评课议课
function prepare(result){
    var teachResearchSeriesData1=[];
    var teachResearchSeriesData2=[];
    var textName=[];
    var lessonCnt1=0,lessonCnt2=0;
    var teachResearchSeriesData3=[];
    for (var i = 0; i < result.prepares.length; i++) {
        teachResearchSeriesData1.push(result.prepares[i].lessonCnt);
        if (result.prepares[i].subjectName == null) {
            textName.push({text: result.prepares[i].classLevelName});
        } else {
            textName.push({text: result.prepares[i].subjectName});
        }
    }
    for(var i=0;i<result.prepares.length;i++){
        lessonCnt1+= result.prepares[i].lessonCnt;
    }
    for(var i=0;i<result.evaluations.length;i++){
        teachResearchSeriesData2.push(result.evaluations[i].lessonCnt);
    }
    for(var i=0;i<result.evaluations.length;i++){
        lessonCnt2+=result.evaluations[i].lessonCnt;
    }
    teachResearchSeriesData3.push({value:lessonCnt1, name:'集体备课'},{value:lessonCnt2, name:'评课议课'});
    if(lessonCnt1||lessonCnt2){
        teachResearchOption3 = {
            tooltip: {
                trigger: 'item',
                transitionDuration:0,
                backgroundColor : 'rgba(83,93,105,0.8)',
                borderColor : '#535b69',
                borderRadius : 8,
                borderWidth: 2,
                padding: [5,10],
                show:true,
                formatter: "{b}: {c} ({d}%)"
            },
            series: [
                {
                    type:'pie',
                    radius: ['90%', '95%'],
                    label: {
                        normal: {
                            show: true,
                            position: 'left',
                            color:'#fff'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:teachResearchSeriesData3
                }
            ],
            color: ['#1d70f2','#fde649']
        };
        myChart6.setOption(teachResearchOption3);
    }else{
        myChart6.clear()
    }
    if(textName.length>0||teachResearchSeriesData1.length>0||teachResearchSeriesData2.length>0){
        teachResearchOption2= {
            radar: [
                {
                    indicator:textName,
                    center: ['50%', '55%'],
                    radius: 95,
                    startAngle: 90,
                    splitNumber: 4,
                    shape: 'circle',
                    name: {
                        formatter:'{value}',
                        textStyle: {
                            color:'#fff'
                        }
                    },
                    splitArea: {
                        areaStyle: {
                            color: ['rgba(14,52,111,0.9)','rgba(14,52,111,0.8)', 'rgba(14,52,111,0.6)', 'rgba(14,52,111,0.4)', 'rgba(14,52,111,0.2)'],
                            // shadowColor: 'rgba(11, 38, 78, 0.3)',
                            shadowBlur: 10
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            type: 'dashed',
                            color: 'rgba(17,51,78,1)'
                        }
                    },
                    splitLine: {
                        lineStyle: {
                            color: 'rgba(14, 58, 125,0.5)'
                        }
                    }
                }
            ],
            series: [
                {
                    name: '雷达图',
                    type: 'radar',
                    symbol: 'none',
                    itemStyle: {
                        emphasis: {
                            lineStyle: {
                                width: 4
                            }
                        }
                    },
                    data: [
                        {
                            value: teachResearchSeriesData1,
                            name: '图一',
                            lineStyle: {
                                normal: {
                                    color: '#fde649'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: 'rgba(62, 102, 111, 0.5)'
                                }
                            }
                        },
                        {
                            value: teachResearchSeriesData2,
                            name: '图二',
                            lineStyle: {
                                normal: {
                                    color: 'rgba(28, 155, 246, 0.5)'
                                }
                            },
                            areaStyle: {
                                normal: {
                                    color: 'rgba(14, 64, 108, 0.5)'
                                }
                            }
                        }
                    ]
                }
            ]
        };
        myChart5.setOption(teachResearchOption2);
    }else{
        myChart5.clear();
    }

    /* -------------------------------教研分布-评课议课集体备课（外圆）数据--------------------------------*/
}

//定时器
function TimeTab(){
    $('.filter-type li').eq(num).addClass('active').siblings().removeClass('active');
    dataType=$('.filter-type li.active').data('type');
    if(dataType=='subject'){
        jiaoan(subjectResult);
        prepare(subjectdata);
    }else if(dataType=='classLevel'){
        jiaoan(classResult);
        prepare(classleveldata);
    }
    num++;
    if(num>=2){
        num=0;
    }
}
//echart hover定时器
function hoverTurn(a,b,c){
    var intervalVal = setInterval(function () {
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
//获取当前时间
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

//--------------------------------------交互操作
$("#parent select").on('change',function() {
    year = $("#parent select option:checked").text();
    teachCountPic(year,areaCode);
});

oTimer = setInterval(TimeTab,8000);
//hover清除定时器
$('.Teach-research-distribution .com-screen-content').hover(function(){
    clearInterval(oTimer);
}, function(){
    oTimer=setInterval(TimeTab,8000);
});
//数据类型切换
$('.filter-type').on('click','li',function () {
    $(this).addClass('active').siblings().removeClass('active');
    dataType=$(this).data('type');
    if(dataType=='subject'){
        jiaoan(subjectResult);
        prepare(subjectdata);
    }else if(dataType=='classLevel'){
        jiaoan(classResult);
        prepare(classleveldata);
    }
});