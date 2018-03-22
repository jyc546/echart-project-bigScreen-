var areaCode='000000',
    option1Index=-1,
    option2Index=-1,
    option3Index=-1,
    option4Index=-1,
    classlevelName='一年级',
    subjectName='数学';
// 基于准备好的dom，初始化echarts实例
var myChart1= echarts.init(document.getElementById('main1'));
var myChart2 = echarts.init(document.getElementById('main2'));
var myChart3 = echarts.init(document.getElementById('main3'));
var myChart4 = echarts.init(document.getElementById('main4'));
var myChart5 = echarts.init(document.getElementById('main5'));
var myChart6 = echarts.init(document.getElementById('main6'));

getNowFormatDate();
classLevel(areaCode);
selectArea();
CourseDoing(areaCode,classlevelName,subjectName);

function selectArea(){
    $.get('resource/data/data.json').done(function (data) {
        var provinceTpl='',cityTpl='';
        var provinces=data.map.data;
        for(var i=0;i<provinces.length;i++){
            provinceTpl+='<li class="provinceitem" values='+provinces[i].areaName+' data-area-code='+provinces[i].areaCode+'>'+provinces[i].areaName+'</li>';
            if(provinces[i].areaCode==areaCode && provinces[i].data){
                for(var j=0;j<provinces[i].data.length;j++){
                    cityTpl+='<li class="cityitem" values='+provinces[i].data[j].areaName+' data-area-code='+provinces[i].data[j].areaCode+'>'+provinces[i].data[j].areaName+'</li>';
                }
            }
        }
        $('.provincelist').html(provinceTpl);
        $('.citylist').html(cityTpl);

        $('.location').hover(function () {
            $('.selectDom').show();
            // clearInterval(TimeClear1);
        });

        $("body").click(function(e){
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
            areaCode='000000';

            $('.currentValue').val('全部');
            $('.areaName').html('中国');
            $('.citylist').html('');
            $('.provinceContainer').hide();
            $('.cityContainer').hide();

            CourseDoing(areaCode,classlevelName,subjectName);
        });

        $('.location').on('click','.cityTips',function () {

            areaCode=$('.provinceitem.active').data('area-code');

            var provinceitem = document.getElementById("provinceInputValue").value;

            if(provinceitem=='全部'){
                // areaCode='000000';
                $('.areaName').html('中国');
            }else{
                $('.areaName').html(provinceitem);
            }
            $('.zcityItem .currentValue').val('全部');
            $('.provinceContainer').hide();
            $('.cityContainer').hide();

            CourseDoing(areaCode,classlevelName,subjectName);
        });

        $('.location').on('click', '.provinceitem',function (e) {
            e.preventDefault();
            e.stopPropagation();
            $(this).addClass('active').siblings().removeClass('active');
            var province=$(this).text();
            console.log(province);
            $('.zProvinceItem .currentValue').val(province);
            $('.areaName').html(province);
            $('.provinceContainer').hide();
            areaCode=$('.provinceitem.active').data('area-code');
            cityTpl='';
            $('.zcityItem .currentValue').val('请选择');
            for(var i=0;i<provinces.length;i++){
                if(provinces[i].areaCode==areaCode && provinces[i].data){
                    for(var j=0;j<provinces[i].data.length;j++){
                        // $('.zcityItem .currentValue').val(provinces[i].data[0].areaName);
                        $('.location .cityitem[values='+provinces[i].data[0].areaName+']').addClass('active').siblings().removeClass('active');
                        cityTpl+='<li class="cityitem" values='+provinces[i].data[j].areaName+' data-area-code='+provinces[i].data[j].areaCode+'>'+provinces[i].data[j].areaName+'</li>';
                    }
                }
            }
            $('.citylist').html(cityTpl);
            CourseDoing(areaCode,classlevelName,subjectName);
        });

        $('.location').on('click', '.cityitem', function (e) {
            e.preventDefault();
            e.stopPropagation();
            var city=$(this).text();

            areaCode=$(this).data('area-code');

            $(this).addClass('active').siblings().removeClass('active');
            $('.zcityItem .currentValue').val(city);
            $('.areaName').html(city);
            $('.cityContainer').hide();

            CourseDoing(areaCode,classlevelName,subjectName);
        });

    });
}

function CourseDoing(areaCode,classlevelName,subjectName){
// left
    /*-----------------------------------------------学科分布数据请求------------------------------------------*/
    courseSubject(areaCode);
    /*-----------------------------------------------年级分布数据请求------------------------------------------*/
    courseClassLevel(areaCode);
    /*-----------------------------------------------累计开课总量数据请求------------------------------------------*/
    startCourseCount(areaCode);
    /*-----------------------------------------------知识点分布数据请求------------------------------------------*/
    knowledgeGradeSubject(areaCode,classlevelName,subjectName);
    /*-----------------------------------------------学生偏好数据请求------------------------------------------*/
    studentFavor(areaCode);
    /*-----------------------------------------------教师排行榜数据请求------------------------------------------*/
    teacherRank(areaCode);
}

// ----------------------------------------数据渲染方法
//-----------------学科分布
var courseSubjectTime;
function courseSubject(areaCode){
    $.get(BACK_ROOT + '/bigscreen/behavioranalysis/coursesubjectdata.do?areaCode='+areaCode).done(function (data) {
        clearInterval(courseSubjectTime);
        var data=data.result;
        var subjectData=[],speakTeach=[],talking=[],balance=[],exercise=[],plate=[];
        if(data){
            for(var i=0;i<data.length;i++){
                subjectData.push(data[i].subjectName);
                for(var j=0;j<data[i].courses.length;j++){
                    if(data[i].courses[j].instructMode=='teaching'){
                        speakTeach.push(data[i].courses[j].courseCnt);
                    }else if(data[i].courses[j].instructMode=='interaction'){
                        talking.push(data[i].courses[j].courseCnt);
                    }else if(data[i].courses[j].instructMode=='balance'){
                        balance.push(data[i].courses[j].courseCnt);
                    }else if(data[i].courses[j].instructMode=='exercise'){
                        exercise.push(data[i].courses[j].courseCnt);
                    }else if(data[i].courses[j].instructMode=='blackboard'){
                        plate.push(data[i].courses[j].courseCnt);
                    }
                }
            }
        }
        option1= {
            title: {
                //text: '教育资源统计趋势图',
                textStyle: {
                    fontWeight: 'normal',
                    fontSize: 16,
                    color: '#F1F1F3'
                },
                left: '6%'
            },
            tooltip: {
                trigger: 'axis',
                transitionDuration:0,
                backgroundColor : 'rgba(83,93,105,0.8)',
                borderColor : '#535b69',
                borderRadius : 8,
                borderWidth: 2,
                padding: [5,10],
                axisPointer: {
                    type:'line',
                    lineStyle: {
                        type:'dashed',
                        color: '#ffff00'
                    }
                },
                formatter: function (params) {
                    var res = '';
                    for (var i = 0, l = params.length; i < l; i++) {
                        res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>';
                    }
                    return res;
                }
            },
            legend: {
                icon: 'circle',
                itemWidth: 8,
                itemHeight: 8,
                itemGap: 10,
                x:'right',
                data: ['讲授型', '对话型', '平衡型','练习型','板块型'],
                textStyle: {
                    fontSize: 12,
                    color: '#fff'
                }
            },
            grid: {
                left: '0',
                top:'50',
                right: '10',
                bottom: '70',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                boundaryGap: false,
                axisLabel :{
                    interval:0,
                    show: true,
                    inside: false,
                    rotate: 45,
                    margin: 2,
                    formatter: null,
                    showMinLabel: null,
                    showMaxLabel: null,
                    textStyle: {
                        fontSize: 12
                    }
                },
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#a5a6bb'
                    }
                },
                axisTick: {
                    show: false
                },
                offset:5,
                data:subjectData
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
                    margin:10,
                    textStyle: {
                        fontSize: 12
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
            series: [
                {
                name: '讲授型',
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
                        color: '#eb5690'
                    }
                },
                data: speakTeach
            },
                {
                name: '对话型',
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
                        color: '#23c53f'
                    }
                },
                data: talking
            },
                {
                name: '平衡型',
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
                        color: '#43bbfb'
                    }
                },
                data: balance
            },
                {
                name: '练习型',
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
                        color: '#ff9d41'
                    }
                },
                data: exercise
            },
                {
                    name: '板块型',
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
                            color: '#1cc840'
                        }
                    },
                    data: plate
                }
            ]
        };
// 使用刚指定的配置项和数据显示图表。
        myChart1.setOption(option1);
        courseSubjectTime=hoverTurn(option1,myChart1,option1Index);
    });
}
//-----------------年级分布
var courseClassTime;
function courseClassLevel(areaCode) {
    $.get(BACK_ROOT + '/bigscreen/behavioranalysis/courseclassleveldata.do?areaCode='+areaCode).done(function (data) {
        clearInterval(courseClassTime);
        var data=data.result;
        var classlevelName=[],Teaching=[],interaction=[],balance=[],execise=[],blackboard=[];
        if(data){
            for(var i=0;i<data.length;i++){
                classlevelName.push(data[i].classlevelName);
                for(var j=0;j<data[i].courses.length;j++){
                    if(data[i].courses[j].instructMode=='teaching'){
                        Teaching.push(data[i].courses[j].courseCnt);
                    }else if(data[i].courses[j].instructMode=='interaction'){
                        interaction.push(data[i].courses[j].courseCnt);
                    }else if(data[i].courses[j].instructMode=='balance'){
                        balance.push(data[i].courses[j].courseCnt);
                    }else if(data[i].courses[j].instructMode=='exercise'){
                        execise.push(data[i].courses[j].courseCnt);
                    }else if(data[i].courses[j].instructMode=='blackboard'){
                        blackboard.push(data[i].courses[j].courseCnt);
                    }
                }
            }
        }
        option2 = {
            tooltip : {
                trigger: 'axis',
                transitionDuration:0,
                backgroundColor : 'rgba(83,93,105,0.8)',
                borderColor : '#535b69',
                borderRadius : 8,
                borderWidth: 2,
                padding: [5,10],
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter: function (params) {
                    var res = '';
                    for (var i = 0, l = params.length; i < l; i++) {
                        res += '' + params[i].seriesName + ' : ' + params[i].value + '<br>';
                    }
                    return res;
                }
            },
            grid: {
                left: '0',
                top:'50',
                right: '2',
                bottom: '20',
                containLabel: true
            },
            legend: {
                x:'right',
                itemWidth: 8,
                itemHeight: 4,
                itemGap: 10,
                data: ['讲授型', '对话型', '平衡型','练习型', '板块型'],
                textStyle: {
                    fontSize: 12,
                    color: '#fff'
                }
            },
            yAxis:  {
                type: 'value',
                show:true,
                splitLine: {show: false},
                axisLine: {
                    show:false,
                    lineStyle: {
                        color: '#7e848f'
                    }
                },
                axisTick:{
                    show:false
                }
            },
            xAxis: {
                type: 'category',
                data: classlevelName,
                axisLine: {
                    show:false,
                    lineStyle: {
                        color: '#7e848f'
                    }
                },
                axisLabel: {
                    show:true,
                    interval: 0
                },
                axisTick:{
                    show:false
                },
                splitLine:{
                    show:false
                }
            },
            series: [
                {
                    name: '讲授型',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            position: 'insideRight'
                        }
                    },
                    barWidth :'15',
                    data: Teaching
                },
                {
                    name: '对话型',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            position: 'insideRight'
                        }
                    },
                    barWidth :'15',
                    data: interaction
                },
                {
                    name: '平衡型',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            position: 'insideRight'
                        }
                    },
                    barWidth :'15',
                    data: balance
                },
                {
                    name: '练习型',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            // show: true,
                            position: 'insideRight'
                        }
                    },
                    barWidth :'15',
                    data: execise
                },
                {
                    name: '板块型',
                    type: 'bar',
                    stack: '总量',
                    label: {
                        normal: {
                            // show: true,
                            position: 'insideRight'
                        }
                    },
                    barWidth :'15',
                    data: blackboard
                }
            ],
            color: ['#3134d1','#4a4df0','#0190fc','#01defd','#54f4cd']
        };
        myChart2.setOption(option2);
        courseClassTime=hoverTurn(option2,myChart2,option2Index);
    });
}
//-----------------开课总量
var option3Time;
function startCourseCount(areaCode) {
    $.get(BACK_ROOT + '/bigscreen/behavioranalysis/coursecntdata.do?areaCode='+areaCode).done(function (data) {
        var data=data.result,
            TplAllCourseCnt='',
            TplChAvg='',
            TplRtAvg='';
        if(data){
            for(var i=0;i<data.allCourseCnt.toString().length;i++){
                TplAllCourseCnt+='<li>'+data.allCourseCnt.toString()[i]+'</li>';
            }
            for(var i=0;i<data.chAvg.toString().length;i++){
                TplChAvg+='<li>'+data.chAvg.toString()[i]+'</li>';
            }
            for(var i=0;i<data.rtAvg.toString().length;i++){
                TplRtAvg+='<li>'+data.rtAvg.toString()[i]+'</li>';
            }
            $('.allCourseCnt').html(TplAllCourseCnt);
            $('.chAvg').html(TplChAvg);
            $('.rtAvg').html(TplRtAvg);
        }else{
            $('.allCourseCnt').html('<li>0</li>');
            $('.chAvg').html('<li>0</li>');
            $('.rtAvg').html('<li>0</li>');
        }

    });
    $.get(BACK_ROOT + '/bigscreen/behavioranalysis/allcoursedata.do?areaCode='+areaCode).done(function (data) {
        clearInterval(option3Time);
        var data=data.result;
        var primary=[],juniorHighSchool=[],highSchool=[];
        if(data){
            for(var i=0;i<data.length;i++){
                if(data[i].semesterName=='小学'){
                    primary.push([data[i].ch, data[i].rt, data[i].semesterName]);
                }if(data[i].semesterName=='初中'){
                    juniorHighSchool.push([data[i].ch,data[i].rt,data[i].semesterName]);
                }if(data[i].semesterName=='高中'){
                    highSchool.push([data[i].ch,data[i].rt,data[i].semesterName]);
                }
            }
            option3 = {
                color: ['#1cc840', '#43bbfb','#eb5690'],
                legend: {
                    top:'5%',
                    show:true,
                    itemWidth: 5,
                    itemHeight: 5,
                    shadowColor: 'rgba(77, 57, 122, 1.5)',
                    shadowOffsetY: 5,
                    right: 10,
                    data: ['小学', '初中','高中'],
                    textStyle: {
                        fontSize: 12,
                        color: '#a5a6bb'
                    }
                },
                grid: {
                    left: '39',
                    // right: '4%',
                    bottom: '28',
                    containLabel: true
                },
                xAxis: {
                    name:'Rt',
                    // max:1,
                    axisTick : {show: false},
                    axisLine: {
                        lineStyle:{
                            color: '#2b3646'
                        }
                    },
                    axisLabel:{
                        color: '#a5a6bb',
                        fontSize:'16'
                    },
                    nameTextStyle: {
                        color: '#a5a6bb',
                        fontSize:'20'
                    },
                    splitLine: {
                        show: false
                    }
                },
                yAxis: {
                    name:'Ch',
                    // max:1,
                    axisTick : {show: false},
                    axisLine: {
                        lineStyle:{
                            color:'#2b3646'
                        }
                    },
                    axisLabel:{
                        color: '#a5a6bb',
                        fontSize:'16'
                    },
                    nameTextStyle: {
                        color: '#a5a6bb',
                        fontSize:'20'
                    },
                    splitLine: {
                        show: true,
                        lineStyle:{
                            color: '#2b3646'
                        }
                    },
                    scale: true
                },
                series: [{
                    name: '小学',
                    data: primary,
                    type: 'scatter',
                    symbolSize: function(data) {
                        // console.log(data);
                        return Math.sqrt(data[1])*20;
                    },
                    label: {
                        normal: {
                            show: true,
                            formatter: "",
                            position: 'top'
                        },
                        emphasis: {
                            show: true,
                            formatter: function(param) {
                                return param.data[2];
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 5,
                            shadowColor: 'rgba(22, 75, 50, 1.5)',
                            shadowOffsetY: 5,
                            color: '#1cc840'
                        }
                    }
                }, {
                    name: '初中',
                    data: juniorHighSchool,
                    type: 'scatter',
                    symbolSize: function(data) {
                        return Math.sqrt(data[0])*20;
                    },
                    label: {
                        normal: {
                            show: true,
                            formatter: "",
                            position: 'top'
                        },
                        emphasis: {
                            show: true,
                            formatter: function(param) {
                                return param.data[2];
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 5,
                            shadowColor: 'rgba(52, 16, 76, 1.5)',
                            shadowOffsetY: 5,
                            color: '#43bbfb'
                        }
                    }
                }, {
                    name: '高中',
                    data: highSchool,
                    type: 'scatter',
                    symbolSize: function(data) {
                        return Math.sqrt(data[0])*20;
                    },
                    label: {
                        normal: {
                            show: true,
                            formatter: "",
                            position: 'top'
                        },
                        emphasis: {
                            show: true,
                            formatter: function(param) {
                                return param.data[2];
                            },
                            position: 'top'
                        }
                    },
                    itemStyle: {
                        normal: {
                            shadowBlur: 5,
                            shadowColor: 'rgba(77, 57, 122, 1.5)',
                            shadowOffsetY:5,
                            color: '#eb5690'
                        }
                    }
                }]
            };
            myChart3.setOption(option3);
        }else{
            myChart3.clear();
        }
        option3Time=hoverTurn(option3,myChart3,option3Index);
    });
}
//-----------------知识点分布
//年级
function classLevel(areaCode){
    $.get(BACK_ROOT + '/bigscreen/behavioranalysis/classleveldata.do?areaCode=' + areaCode).done(function (data) {
        var data=data.result;
        $('.knowledge-distribution .grade select').html('');
        for(var i=0; i<data.length;i++){
            $('.knowledge-distribution .grade select').append('<option value='+data[i].classlevelName+'>'+data[i].classlevelName+'</option>')
            subject(areaCode,data[i].classlevelName);
        }
    });
}
//学科
function subject(areaCode,classlevelName){
    $.get(BACK_ROOT + '/bigscreen/behavioranalysis/subjectdata.do?areaCode=' + areaCode + '&classlevelName=' + classlevelName).done(function (data) {
        var data=data.result;
        $('.knowledge-distribution .subject select').html('');
        for(var i=0; i<data.length;i++){
            $('.knowledge-distribution .subject select').append('<option value='+data[i].subjectName+'>'+data[i].subjectName+'</option>')
        }
    });
}
//知识点筛选
var myChart4Time;
function knowledgeGradeSubject(areaCode,classlevelName,subjectName){
    clearInterval(myChart4Time);
    $.get(BACK_ROOT + '/bigscreen/behavioranalysis/knowledgesdata.do?areaCode=' + areaCode + '&classlevelName=' + classlevelName + '&subjectName=' + subjectName).done(function (data) {
        var data=data.result;
        var JosnList = [];
        for(var i=0;i<data.length;i++){
            JosnList.push({name:data[i].knowledgeName,value:i});
        }
        option4= {
            title: {
                // text: '',
                link: 'https://www.baidu.com/s?wd=' + encodeURIComponent('ECharts'),
                x: 'center',
                textStyle: {
                    fontSize: 23
                }
            },
            tooltip: {
                transitionDuration:0,
                backgroundColor : 'rgba(83,93,105,0.8)',
                borderColor : '#535b69',
                borderRadius : 8,
                borderWidth: 2,
                padding: [5,10],
                show: true,
                formatter: "{a} <br/>{b}: {c}"
            },
            series: [{
                name: '知识点分布',
                type: 'wordCloud',
                //size: ['9%', '99%'],
                sizeRange: [6, 66],
                //textRotation: [0, 45, 90, -45],
                rotationRange: [0, 0],
                //shape: 'circle',
                textPadding: 0,
                autoSize: {
                    enable: true,
                    minSize: 6
                },
                textStyle: {
                    normal: {
                        color: function() {
                            return 'rgb(' + [
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160),
                                    Math.round(Math.random() * 160)
                                ].join(',') + ')';
                        }
                    },
                    emphasis: {
                        shadowBlur: 10,
                        shadowColor: '#333'
                    }
                },
                data:JosnList
            }]
        };
        myChart4.setOption(option4);
        myChart4Time=hoverTurn(option4,myChart4,option4Index);
    });
}
//-----------------学生偏好
function studentFavor(areaCode) {
    $.get(BACK_ROOT + '/bigscreen/behavioranalysis/courseratingdata.do?areaCode='+areaCode).done(function (data) {
        var data=data.result;
        var typeName=[],GeneralCourses,VeryGoodCourses,generalCoursesData=[],veryGoodCoursesData=[];
        if(data.generalCourses) {
            GeneralCourses = data.generalCourses;
            for (var i = 0; i < GeneralCourses.length; i++) {
                if (GeneralCourses[i].instructMode == 'teaching') {
                    GeneralCourses[i].instructMode = '讲授型';
                } else if (GeneralCourses[i].instructMode == 'interaction') {
                    GeneralCourses[i].instructMode = '对话型';
                } else if (GeneralCourses[i].instructMode == 'balance') {
                    GeneralCourses[i].instructMode = '平衡型';
                } else if (GeneralCourses[i].instructMode == 'exercise') {
                    GeneralCourses[i].instructMode = '练习型';
                } else if (GeneralCourses[i].instructMode == 'blackboard') {
                    GeneralCourses[i].instructMode = '板块型';
                }
                generalCoursesData.push(GeneralCourses[i].courseCnt);
                typeName.push({name: GeneralCourses[i].instructMode});
            }
        }else {
            myChart5.clear();
        }
        if(data.veryGoodCourses) {
            VeryGoodCourses=data.veryGoodCourses;
            for(var i=0;i<VeryGoodCourses.length;i++){
                veryGoodCoursesData.push(VeryGoodCourses[i].courseCnt);
            }
        }else{
            myChart5.clear();
        }
        option5= {
            title: {
            },
            tooltip: {
                trigger: 'item',
                transitionDuration:0,
                backgroundColor : 'rgba(83,93,105,0.8)',
                borderColor : '#535b69',
                borderRadius : 8,
                borderWidth: 2,
                padding: [5,10]
            },
            legend: {
                icon: 'circle',
                itemWidth: 8,
                itemHeight: 8,
                itemGap: 10,
                x:'right',
                data: ['好评', '一般'],
                textStyle: {
                    fontSize: 14,
                    color: '#a0a8b9'
                }
            },
            radar: {
                shape: 'circle',
                splitNumber: 4,
                name: {
                    formatter:'{value}',
                    textStyle: {
                        color:'#1bb9f9',
                        fontSize:16,
                        fontStyle: '400'
                    }
                },
                indicator: typeName,
                splitArea: {
                    areaStyle: {
                        color: ['rgba(14,52,111,0.8)','rgba(14,52,111,0.6)', 'rgba(14,52,111,0.4)', 'rgba(14,52,111,0.1)'],
                        // shadowColor: 'rgba(10, 30, 63, 0.3)',
                        shadowBlur: 10
                    }
                },
                axisLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '#132f4c'
                    }
                },
                splitLine: {
                    lineStyle: {
                        normal: {
                            type: 'solid'
                        },
                        color: 'rgba(14, 58, 125,0.3)'
                    }
                }
            },
            series: [
                {
                name: '一般',
                type: 'radar',
                symbolSize: 10,
                itemStyle: {
                    normal: {
                        color: 'rgba(241,220,72,1)'
                    }
                },
                areaStyle: {normal: {
                    color: 'rgba(241,220,72,0.2)'
                }},
                data : [
                    {
                        value : generalCoursesData,
                        name : '一般'
                    }
                ]
                },
                {
                    name: '好评',
                    type: 'radar',
                    symbolSize: 10,
                    itemStyle: {
                        normal: {
                            color: 'rgba(28,155,246,1)'
                        }
                    },
                    areaStyle: {normal: {
                        color: 'rgba(22,102,161,0.2)'
                    }},
                    data : [
                        {
                            value : veryGoodCoursesData,
                            name : '好评'
                        }
                    ]
                }
            ]
        };
        myChart5.setOption(option5,true);
    });
}
//-----------------教师排行榜
function teacherRank(areaCode) {
    $.get(BACK_ROOT + '/bigscreen/behavioranalysis/courseteacherdata.do?areaCode='+areaCode).done(function (data) {
        var data=data.result;
        var _boyActual = [];
        var _bgshow=[];
        var max=0;
        var _college =[];
        var dataleft=[];
        if(data && data.length > 0){
            for(var i=0;i<data.length;i++){
                _college.push(data[i].teacherName);
                dataleft.push(data[i].totalCourseCnt);
                if(max<=data[i].totalCourseCnt){
                    max=data[i].totalCourseCnt;
                }else{
                    max=max;
                }
                _bgshow.push(data[i].goodCourseCnt);
                _boyActual.push('('+data[i].goodCourseRatio+'%)');
            }
        } else {
            myChart6.clear();
            return;
        }

        var _boyShould = [max, max, max,max,max,max,max,max,max];
        option6 = {
            tooltip: {
                show:"true",
                trigger: 'item',
                transitionDuration:0,
                backgroundColor : 'rgba(83,93,105,0.8)',
                borderColor : '#535b69',
                borderRadius : 8,
                borderWidth: 2,
                padding: [5,10],
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                },
                formatter:"{b} : {c}"
            },
            grid: {
                show: false,
                zlevel: 0,
                z: 2,
                top:'10%',
                bottom:'10%',
                left: '20%',
                right:'5%'
            },
            xAxis: {
                type: 'value',
                show: true,
                // max: 700,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: 'rgba(255,255,255,0.5)'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    fontSize:'12'
                },
                splitLine: {
                    show: false
                }
            },
            yAxis: [
                {
                type: 'category',
                position: "left",
                data: dataleft,
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: '#fff'
                    }
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    fontSize:'24',
                    fontFamily:'myFirstFont'
                },
                splitLine: {
                    show: false
                }
            },
                {
                type: 'category',
                position: "left",
                data: _college,
                nameGap: 20,
                offset: 35,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    color:'#1bb9f9',
                    fontSize:'16'
                },
                splitLine: {
                    show: false
                }
            },
                {
                type: 'category',
                position: "left",
                data: _boyActual,
                nameGap: 20,
                offset:-445,
                axisLine: {
                    show: false
                },
                axisTick: {
                    show: false
                },
                axisLabel: {
                    show: true,
                    color:'#6f8ab2',
                    fontSize:'16'
                },
                splitLine: {
                    show: false
                }
            }
            ],
            series: [
                {
                    name: '',
                    type: 'bar',
                    barWidth: 5,
                    silent: true,
                    yAxisIndex: 0,
                    label: {
                        normal: {
                            show: false,
                            color:'#7e9bc6',
                            fontSize:'14',
                            position: 'right'
                        }
                    },
                    itemStyle: {
                        normal: {
                            color: '#3134d1',
                            barBorderRadius: 20
                        }
                    },
                    data: _boyShould
                },  {
                    name: '',
                    type: 'bar',
                    barWidth: 5,
                    silent: false,
                    yAxisIndex: 1,
                    itemStyle: {
                        normal: {
                            barBorderRadius: 5,
                            color: '#1c9bfb',
                            label: {
                                show: true,
                                position: 'insideRight',
                                formatter: '   ',
                                backgroundColor: '#1c9bfb',
                                distance: 0,
                                // borderColor: 'rgba(255, 255, 255, 0.3)',
                                borderWidth: 5,
                                borderRadius: 5
                            }
                        }
                    },
                    data: _bgshow
                }]
        };
        myChart6.setOption(option6);
    });
}

//echart hover定时器
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
$(".grade select").on('change',function() {
    classlevelName = $(".grade select option:checked").text();
    subjectName = $(".subject select option:checked").text();
    knowledgeGradeSubject(areaCode,classlevelName,subjectName);
});

$(".subject select").on('change',function() {
    classlevelName = $(".grade select option:checked").text();
    subjectName = $(".subject select option:checked").text();
    knowledgeGradeSubject(areaCode,classlevelName,subjectName);
});

myChart4.on('click', function(params) {
    window.open('https://www.baidu.com/s?wd=' + encodeURIComponent(params.name));
});