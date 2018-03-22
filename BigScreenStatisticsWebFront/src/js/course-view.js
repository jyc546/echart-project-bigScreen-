var areaCode='000000',
    dataType=$('.filter-type li.active').data('type'),
    option1Index=-1, option2Index=-1, option7Index=-1, option6Index=-1, option5Index=-1, option8Index=-1, option9Index=-1, option10Index=-1,
    num=0,
    sgTime=null,
    grandNum=0,
    areaName= 'china',
    grandTimes=null,
    featuresDataArr,
    baseAreaId='-1',
    subjectData=null,
    gradeData=null,
    adminData=null,
    classLevelData=null,
    trimester;

// 基于准备好的dom，初始化echarts实例
var myChart1 = echarts.init(document.getElementById('main1'));
var myChart2 = echarts.init(document.getElementById('main2'));
var myChart3 = echarts.init(document.getElementById('main3'));
var myChart4= echarts.init(document.getElementById('main4'));
var myChart5 = echarts.init(document.getElementById('main5'));
var myChart6= echarts.init(document.getElementById('main6'));
var myChart7= echarts.init(document.getElementById('main7'));
var myChart8 = echarts.init(document.getElementById('main8'));
var myChart9= echarts.init(document.getElementById('main9'));
var myChart10 = echarts.init(document.getElementById('main10'));
// 使用刚指定的配置项和数据显示图表。

//获取当前时间
getNowFormatDate();
//选择行政区
selectArea();
//根据参数填充页面，以及渲染地图
resetData(areaName,baseAreaId,areaCode);

function resetData(areaName,baseAreaId,areaCode){
    var jsonPath = areaMap[baseAreaId];
    $.get('resource/data/'+jsonPath).done(function (mapJson) {
        //渲染地图
        echarts.registerMap(areaName, mapJson);
        featuresDataArr = mapJson.features;
        CourseView(areaName,areaCode,featuresDataArr);
    });

}

function selectArea(){
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
            areaCode=$('.provinceitem.active').data('area-code');
            baseAreaId=$('.provinceitem.active').data('area-id');
            areaName=$('.provinceitem.active').data('name');

            var provinceitem = document.getElementById("provinceInputValue").value;

            if(provinceitem=='全部'){
                $('.areaName').html('中国');
            }else{
                $('.areaName').html(provinceitem);
            }
            $('.zcityItem .currentValue').val('请选择');
            $('.provinceContainer').hide();
            $('.cityContainer').hide();

            resetData(areaName,baseAreaId,areaCode);
        });

        $('.location').on('click', '.provinceitem',function (e) {
            e.preventDefault();
            e.stopPropagation();

            var province=$(this).text();

            $(this).addClass('active').siblings().removeClass('active');
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

            $(this).addClass('active').siblings().removeClass('active');
            areaCode=$('.cityitem.active').data('area-code');
            baseAreaId=$('.cityitem.active').data('area-id');
            areaName=$('.cityitem.active').data('name');

            var city=$(this).text();
            $('.zcityItem .currentValue').val(city);
            $('.areaName').html(city);
            $('.cityContainer').hide();

            resetData(areaName,baseAreaId,areaCode);
        });
    });
}

function CourseView(areaName,areaCode,featuresDataArr){
    // left
    /*-----------------------------------------------教室建设数据请求------------------------------------------*/
    classBuild(areaCode);
    /*-----------------------------------------------实时动态数据请求------------------------------------------*/
    livingData(areaCode);
    /*-----------------------------------------------学科分布年级分布数据请求------------------------------------------*/

    /*-----------------------------------------------学科分布年级分布数据请求------------------------------------------*/
    $.get(BACK_ROOT + '/bigscreen/classroom/classleveldata.do?areaCode='+areaCode).done(function (data) {
        gradeData=data.result;
        subjectGrade(gradeData);
    });
    $.get(BACK_ROOT + '/bigscreen/classroom/subjectdata.do?areaCode='+areaCode).done(function (data) {
        subjectData=data.result;
        subjectGrade(subjectData);
    });
// center
    /*-----------------------------------------------开课map数据请求------------------------------------------*/
    startCourseMap(areaName,areaCode);
    /*-----------------------------------------------互动课堂开课分析数据请求------------------------------------------*/
    interStartLesson(areaCode);
// right
    /*-----------------------------------------------授课分析数据请求------------------------------------------*/
    courseAnalysis(areaCode);
    /*-----------------------------------------------本周情况数据请求------------------------------------------*/
    thisWeek(areaCode);
    /*-----------------------------------------------行政区、教室排行数据请求------------------------------------------*/
    $.get(BACK_ROOT + '/bigscreen/classroom/teacherdata.do?areaCode='+areaCode).done(function (data) {
        classLevelData=data.result;
    });
    $.get(BACK_ROOT + '/bigscreen/classroom/subareadata.do?areaCode='+areaCode).done(function (data) {
        adminData=data.result;
        Grand(adminData);
    });
}

// ----------------------------------------数据渲染方法
//教室建设
var classBuildTimer1,classBuildTimer2;
function classBuild(areaCode) {
    clearInterval(classBuildTimer1);
    clearInterval(classBuildTimer2);
    $.get(BACK_ROOT + '/bigscreen/classroom/classroomtypedata.do?areaCode='+areaCode).done(function (data) {
        var data=data.result,total={},originalData=[];
        if(data){
            total = {
                name: '互动教室数',
                value: data.masterRoomCnt+data.receiveRoomCnt
            };
            originalData = [{
                value: data.masterRoomCnt,
                name: '主讲教室'
            }, {
                value: data.receiveRoomCnt,
                name: '接收教室'
            }];
        }
        var colorList = ['#1ac9fb','#112958'];
// 总和
        echarts.util.each(originalData, function(item, index) {
            item.itemStyle = {
                normal: {
                    color: colorList[index]
                }
            };
        });
        option1={
            tooltip: {
                trigger: 'item',
                formatter: "<p class='center'>{b}</p><p class='center'>{c}</p>",
                transitionDuration:0,
                backgroundColor : 'rgba(83,93,105,0.8)',
                borderColor : '#535b69',
                borderRadius : 8,
                borderWidth: 2,
                padding: [5,10],
                position: ['50%', '50%']
            },
            graphic:{
                type: 'text',
                left: 'center', // 相对父元素居中
                top: 'middle',  // 相对父元素居中
                style: {
                    fill: '#1d70f2',
                    text: [
                        total.value
                    ],
                    font: '40px myFirstFont'
                }
            },
            series: [
                {
                    type:'pie',
                    radius: ['48%', '60%'],
                    hoverAnimation: false,
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:originalData
                }
            ],
            color:['#1ac9fb','#112958']
        };
        myChart1.setOption(option1);
        classBuildTimer1=hoverTurn(option1,myChart1,option1Index);
    });
    $.get(BACK_ROOT + '/bigscreen/classroom/dailycourseratiodata.do?areaCode='+areaCode).done(function (data) {
        var data=data.result,total={},originalData=[];
        // 总和
        if(data){
            total = {
                name: '常态化授课比',
                value: data.validCourseCnt+data.invalidCourseCnt
            };
            originalData = [{
                value: data.validCourseCnt,
                name: '有效授课数量'
            }, {
                value: data.invalidCourseCnt,
                name: '非有效授课数量'
            }];
        }

        option2 = {
            tooltip: {
                trigger: 'item',
                formatter: "<p class='center'>{b}</p><p class='center'>{c}</p>",
                transitionDuration:0,
                backgroundColor : 'rgba(83,93,105,0.8)',
                borderColor : '#535b69',
                borderRadius : 8,
                borderWidth: 2,
                padding: [5,10],
                position: ['50%', '50%']
            },
            graphic:{
                type: 'text',
                left: 'center', // 相对父元素居中
                top: 'middle',  // 相对父元素居中
                style: {
                    fill: '#1d70f2',
                    text: [
                        total.value
                    ],
                    font: '40px myFirstFont'
                }
            },
            series: [
                {
                    type:'pie',
                    radius: ['48%', '60%'],
                    hoverAnimation: false,
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: false,
                            position: 'center'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:originalData
                }
            ],
            color:['#14ad5d','#112958']
        };
        myChart2.setOption(option2);
        classBuildTimer2=hoverTurn(option2,myChart2,option2Index);
    });
}
//学科年级分布
var subjectGradeTimer;
function subjectGrade(data){
    clearInterval(subjectGradeTimer);
    var category=[],roomCnt=[];
    for(var i=0;i<data.length;i++){
        if( data[i].subjectName==null){
            category.push(data[i].classLevelName);
        }else{
            category.push(data[i].subjectName);
        }
        roomCnt.push(data[i].roomCnt);
    }
    option5= {
        title: {},
        tooltip: {
            trigger: 'item',
            transitionDuration:0,
            backgroundColor : 'rgba(83,93,105,0.8)',
            borderColor : '#535b69',
            borderRadius : 8,
            borderWidth: 2,
            padding: [5,10],
            showContent: true,
            formatter:'{b} : {c}'
        },
        grid: {
            show: false,
            top:'6%',
            left: '8%',
            right:'5%'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLine: {
                show:false,
                lineStyle: {
                    color: '#a5a6bb'
                }
            },
            axisLabel: {
                interval:0,
                show: true,
                inside: false,
                rotate: 45,
                margin: 2,
                textStyle: {
                    fontSize: 12,
                    color: '#a5a6bb'
                }
            },
            splitLine: {
                show:false
            },
            axisTick: {
                show: false
            },
            data: category,
            offset:15
        },
        yAxis: {
            type: 'value',
            axisLine: {
                show:false,
                lineStyle: {
                    color: '#a5a6bb'
                }
            },
            axisLabel: {
                margin:10,
                textStyle: {
                    fontSize: 12,
                    color: '#a5a6bb'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#273651',
                    width:1,
                    shadowColor: 'rgba(0, 0, 0, 0.7)',
                    shadowBlur: 10,
                    shadowOffsetX: 5,
                    opacity:'0.3'
                }
            },
            axisTick: {
                show: false
            }
            // data: ['5%', '10%', '15%', '20%', '25%']
        },
        series: [{
            type: 'line',
            smooth: false,
            symbolSize:6,
            lineStyle: {
                normal: {
                    width:2
                }
            },
            areaStyle: {
                normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: 'rgba(25, 153, 227, 0.7)'
                    }, {
                        offset: 0.8,
                        color: 'rgba(25, 153, 227, 0)'
                    }], false),
                    shadowColor: 'rgba(0, 0, 0, 0.1)',
                    shadowBlur: 10
                }
            },
            itemStyle: {
                normal: {
                    color: '#1999e3'
                }
            },
            data:roomCnt
        }]
    };
    myChart5.setOption(option5);
    subjectGradeTimer=hoverTurn(option5,myChart5,option5Index);
}
//实时动态
function livingData(areaCode) {
    $.get(BACK_ROOT + '/bigscreen/classroom/realtimecoursedata.do?areaCode='+areaCode).done(function (data) {
        var data=data.result,Tpl='';
        if(data){
            Tpl='<li>'+data.livingCourseCnt+'</li>'+
                '<li>'+data.finsiehdCourseCnt+'</li>'+
                '<li>'+data.unStartedCourseCnt+'</li>'+
                '<li>'+data.livingCourseCnt+'</li>';
        }
        $('.living-status .status-data').html(Tpl);
    });
    $.get(BACK_ROOT + '/bigscreen/classroom/realtimeroomdata.do?areaCode='+areaCode).done(function (data) {
        var data=data.result,
            textData=null,
            receiveRoomCnt=null,
            masterRoomCnt=null,
            faultRoomCnt=null;
        if(data != null){
            receiveRoomCnt=data.receiveRoomCnt;
            masterRoomCnt=data.masterRoomCnt;
            faultRoomCnt=data.faultRoomCnt;
            textData=receiveRoomCnt+masterRoomCnt;
        }
        placeHolderStyle = {
            normal: {
                borderWidth: 5,
                shadowBlur: 40,
                borderColor: "#132235",
                shadowColor: 'rgba(0, 0, 0, 0)', //边框阴影
                color: "#132235"
            }
        };
        option3 = {
            title:{
                show:true,
                text:textData+'间正在直播',
                right:2,
                top:40,
                textStyle:{
                    fontSize:16,
                    color:'#1abffa'
                }
            },
            color: ['#1abffa','#11a754'],
            tooltip: {
                show:false,
                trigger: 'item'
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: '5%',
                top: '40%',
                itemWidth: 10,
                itemHeight: 5,
                itemGap: 10,
                textStyle: {
                    color: ['#1abffa','#11a754'],
                    fontSize:12
                },
                data: ['接收教室 '+receiveRoomCnt,'主讲教室 '+masterRoomCnt]
            },
            series: [
                {
                    name: '接收教室 '+data.receiveRoomCnt,
                    type: 'pie',
                    clockWise: false,
                    radius: ['50%', '55%'],
                    center: ['30%','50%'],
                    clockWise: false, //顺时加载
                    hoverAnimation: false, //鼠标移入变大
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
                            borderColor: "#1c76f2",
                            shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                        }
                    },
                    data: [
                        {
                            value: data.receiveRoomCnt,
                            name: '接收教室'
                        },
                        {
                            value: data.receiveRoomCnt*20/100,
                            name: '',
                            itemStyle: placeHolderStyle
                        },
                        {
                            value:data.receiveRoomCnt*30/100,
                            name: '',
                            itemStyle: {
                                normal: {
                                    color: 'none',
                                    borderColor:'none'
                                }
                            }
                        }
                    ]
                }, {
                    name:'主讲教室 '+data.masterRoomCnt,
                    type: 'pie',
                    clockWise: false,
                    hoverAnimation: false,
                    radius: ['30%', '35%'],
                    center: ['30%','50%'],
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
                            borderColor: "#098c43",
                            shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                        }
                    },
                    data: [
                        {
                            value: data.masterRoomCnt,
                            name: '主讲教室'
                        },
                        {
                            value: data.masterRoomCnt*20/100,
                            name: '',
                            itemStyle: placeHolderStyle
                        },
                        {
                            value:data.masterRoomCnt*30/100,
                            name: '',
                            itemStyle: {
                                normal: {
                                    color: 'none',
                                    borderColor:'none'
                                }
                            }
                        }
                    ]
                }]
        };
        myChart3.setOption(option3);
        option4 = {
            title:{
                show:true,
                text:'未正常接入',
                right:4,
                top:40,
                textStyle:{
                    fontSize:16,
                    color:'#ff3761'
                }
            },
            color: ['#ff3761'],
            tooltip: {
                trigger: 'item',
                show:false
                // formatter:"<p class='center'>{b}</p><p class='center'>{c}</p>"
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: '15%',
                top: '40%',
                itemWidth: 10,
                itemHeight: 5,
                itemGap: 10,
                textStyle: {
                    color: '#ff3761',
                    fontSize:12
                },
                data: [''+faultRoomCnt]
            },
            series: [{
                name: ''+faultRoomCnt,
                type: 'pie',
                clockWise: false,
                radius: ['50%', '55%'],
                center: ['30%','50%'],
                hoverAnimation: false,
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
                        borderColor: "#ff3761",
                        shadowColor: 'rgba(0, 0, 0, 0)' //边框阴影
                    }
                },
                data: [
                    {
                        value: faultRoomCnt,
                        name: '未正常接入'
                    },
                    {
                        value: faultRoomCnt*20/100,
                        name: '',
                        itemStyle: placeHolderStyle
                    } ,{
                        value:faultRoomCnt*30/100,
                        name: '',
                        itemStyle: {
                            normal: {
                                color: 'none',
                                borderColor:'none'
                            }
                        }
                    }
                ]
            }]
        };
        myChart4.setOption(option4);
    });
}
//累计开课统计
function startCourseMap(areaName,areaCode) {
    $.get(BACK_ROOT + '/bigscreen/classroom/generaldata.do?areaCode='+areaCode).done(function (data) {
        var data=data.result,
            TplAllCourseCnt='',
            TplUnStartCourseCnt='',
            TplRealCourseRatio='',
            TplStudentCnt='';
        var Tpl='<li>'+
            '<p></p>'+
            '<span>跨区域互动</span>'+
            '</li>'+
            '<li>'+
            '<p></p>'+
            '<span>跨市互动</span>'+
            '</li>'+
            '<li>'+
            '<p></p>'+
            '<span>跨省互动</span>'+
            '</li>'+
            '<li>'+
            '<p></p>'+
            '<span>跨区县互动</span>'+
            '</li>'+
            '<li>'+
            '<p></p>'+
            '<span>跨国互动</span>'+
            '</li>';
        if(data){
            for(var i=0;i<data.allCourseCnt.toString().length;i++){
                TplAllCourseCnt+='<li>'+data.allCourseCnt.toString()[i]+'</li>';
            }
            for(var i=0;i<data.unStartCourseCnt.toString().length;i++){
                TplUnStartCourseCnt+='<li>'+data.unStartCourseCnt.toString()[i]+'</li>';
            }
            for(var i=0;i<data.realCourseRatio.toString().length;i++){
                TplRealCourseRatio+='<li>'+data.realCourseRatio.toString()[i]+'</li>';
            }
            for(var i=0;i<data.studentCnt.toString().length;i++){
                TplStudentCnt+='<li>'+data.studentCnt.toString()[i]+'</li>';
            }
            Tpl='<li>'+
                '<p>'+data.areaCourseCnt+'</p>'+
                '<span>跨区域互动</span>'+
                '</li>'+
                '<li>'+
                '<p>'+data.cityCourseRatio+'%</p>'+
                '<span>跨市互动</span>'+
                '</li>'+
                '<li>'+
                '<p>'+data.provinceCourseRatio+'%</p>'+
                '<span>跨省互动</span>'+
                '</li>'+
                '<li>'+
                '<p>'+data.prefectureCourseRatio+'%</p>'+
                '<span>跨区县互动</span>'+
                '</li>'+
                '<li>'+
                '<p>'+data.countryCourseRatio+'%</p>'+
                '<span>跨国互动</span>'+
                '</li>';
            $('.realCourseRatio').html(TplRealCourseRatio+'<li>%</li>');
        }else{
            $('.realCourseRatio').html(TplRealCourseRatio);
        }

        $('.allCourseCnt').html(TplAllCourseCnt);
        $('.unStartCourseCnt').html(TplUnStartCourseCnt);

        $('.studentCnt').html(TplStudentCnt);
        $('.bottom-data-count').html(Tpl);
    });

    $.get(BACK_ROOT + '/bigscreen/classroom/courselinedata.do?areaCode='+areaCode).done(function (data) {
        var data=data.result;
        var geoCoordMap =[];
        var dataFrom ;
        var finishedArray = [];
        if (data && data.length > 0) {
            finishedArray = [{id:data[0].toAreaCode,value:''}];
            dataFrom = data[0].toAreaCode;
            for (var i = 0; i < data.length; i++) {
                var obj = {};
                obj.id = data[i].fromAreaCode;
                obj.value = data[i].count;
                obj.name='';
                finishedArray.push(obj);
            }
        }
        $.each(finishedArray, function(i, series) {
            $.each(featuresDataArr, function(j, features) {
                if (series.id == features.id) {
                    series.name=features.properties.name;
                    geoCoordMap[features.id]=features.properties.cp;
                }
            });
        });
        myChart6.setOption({
            series: [{
                type: 'map',
                map:areaName
            }]
        });
        var convertData = function(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].id];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };
        option6 = {
            tooltip: {
                trigger: 'item',
                transitionDuration:0,
                backgroundColor : 'rgba(83,93,105,0.8)',
                borderColor : '#535b69',
                borderRadius : 8,
                borderWidth: 2,
                padding: [5,10]
            },
            toolbox: {
                show: false
            },
            geo: {
                map:areaName,
                type: 'map',
                left:'center',
                roam: false,
                label: {
                    normal: {
                        show: true,
                        color: '#12d7f7'
                    },
                    emphasis: {
                        show: false,
                        color: '#12d7f7'
                    }
                },
                itemStyle: {
                    borderSize:'2',
                    normal: {
                        color: '#072558',
                        borderColor: '#12d7f7',
                        borderSize:'2'
                    },
                    emphasis: {
                        color: '#2382c1'
                    }
                }
            },
            series: [
                {
                    name: '苏州市',
                    type: 'lines',
                    zlevel: 2,
                    symbolSize: 10,
                    effect: {
                        show: true,
                        period: 4,
                        symbol: 'arrow',
                        trailLength: 0,
                        symbolSize: 8

                    },
                    lineStyle: {
                        normal: {
                            color:'#12d7f7',
                            width: 1,
                            opacity:0.6,
                            curveness:0.2
                        }
                    },
                    data: finishedArray.map(function (dataItem) {
                        return {
                            fromName: dataFrom,
                            toName: dataItem.id,
                            coords: [
                                geoCoordMap[dataItem.id],
                                geoCoordMap[dataFrom]
                            ]
                        }
                    })
                },{
                    name: '供需占比',
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    data: convertData(finishedArray),
                    symbolSize: 8,
                    showEffectOn: 'render',
                    rippleEffect: {
                        period: 4,
                        scale: 5,
                        brushType: 'stroke'
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter:'{b}',
                            position: 'right',
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    symbol: 'circle',
                    itemStyle: {
                        normal: {
                            color: '#12d7f7',
                            shadowBlur: 20,
                            shadowColor: '#333'
                        }
                    }
                }, {
                    type: 'map',
                    mapType: 'china',
                    geoIndex: 0,
                    label: {
                        normal: {
                            show: true
                        },
                        emphasis: {
                            show: true
                        }
                    },
                    data: finishedArray
                }]
        };
        // var seriesDataArr = option6.series[0].data;
        // 读取的json文件里的json数组对象
        myChart6.setOption(option6);
        hoverTurn(option6,myChart6,option6Index);
    });
}
//互动课堂开课分析
var interStartLessonTime;
function interStartLesson(areaCode,trimester){
    trimester = $("#parent select option:checked").text();
    clearInterval(interStartLessonTime);
    $.get(BACK_ROOT + '/bigscreen/classroom/curvegraphdata.do?trimester='+trimester+'&areaCode='+areaCode).done(function (data) {
        var data=data.result;
        var planCourseCnt=[],startCourseRatioCnt=[],realCourseCnt=[];
        var weekCount = 20;
        var termCount = 6;
        var termTotal = ["2013-2014上学期", "2013-2014下学期", "2014-2015上学期", "2014-2015下学期", "2015-2016上学期", "2015-2016下学期"];
        var xData = function() {
            var data = [];
            for (var i = 0; i < weekCount; i++) {
                var j = i + 1;
                data.push(j);
            }
            return data;
        }();
        var maxData = function() {
            return 500;
        }();

        var termChoose = function() {

            var termdata = [];
            for (var i = 0; i < termCount; i++) {
                termdata.push(termTotal[i]);
            }
            return termdata;
        }();
        if(data.planCourseData){
            for(var i=0;i<data.planCourseData.length;i++){
                planCourseCnt.push(data.planCourseData[i].courseCnt);
            }
        }
        if(data.startCourseRatioData){
            for(var i=0;i<data.startCourseRatioData.length;i++){
                startCourseRatioCnt.push(data.startCourseRatioData[i].ratio);
            }
        }
        if(data.realCourseData){
            for(var i=0;i<data.realCourseData.length;i++){
                realCourseCnt.push(data.realCourseData[i].courseCnt);
            }
        }

        if(planCourseCnt.length == 0 && startCourseRatioCnt.length == 0 && realCourseCnt.length == 0) {
            myChart7.clear();
            return;
        }
        option7 =
            {
                "title": {
                    "text": "上学期互动课堂开课分析",
                    "subtext": "",
                    x: "24%",
                    y:'8%',
                    textStyle: {
                        color: '#1bb4f9',
                        fontSize: '18'
                    },
                    subtextStyle: {
                        color: '#90979c',
                        fontSize: '14'
                    }
                },
                "tooltip": {
                    "trigger": "axis",
                    transitionDuration:0,
                    backgroundColor : 'rgba(83,93,105,0.8)',
                    borderColor : '#535b69',
                    borderRadius : 8,
                    borderWidth: 2,
                    position : function(p) {
                        // 位置回调
                        return [p[0]-80, 80];
                    },
                    padding: [5,10],
                    axisPointer: {
                        type:'line',
                        lineStyle: {
                            type:'dashed',
                            color: '#ffff00'
                        }
                    },
                    formatter: function (params) {
                        var res='';
                        for (var i = 0, l = params.length; i < l; i++) {
                            res = '' + params[0].seriesName + ' : ' + params[0].value+'<br>'+'' +
                                params[1].seriesName + ' : ' + params[1].value+'<br>'+
                                params[2].seriesName + ' : ' + params[2].value.toFixed(2)*100+'%';
                        }
                        return res;
                    }
                },
                "grid": {
                    "borderWidth": 0,
                    "left": '45',
                    "right": '15',
                    "top": '100',
                    "bottom": '35',
                    textStyle: {
                        color: "#fff"
                    }
                },
                "legend": {
                    x:'right',
                    itemWidth: 8,
                    itemHeight: 12,
                    top: '30',
                    itemGap: 10,
                    textStyle: {
                        color: '#fff'
                    },
                    "data": ['计划开课', '实际开课', '实开课占比']
                },
                toolbox: {
                    show: true,
                    showTitle: false,
                    feature: {
                        magicType: {type: ['line']},
                        restore: {},
                        saveAsImage: {
                            backgroundColor:'#091529'
                        }
                    },
                    iconStyle:{
                        borderColor:'#ffffff'
                    }
                },
                "calculable": true,
                "xAxis": [{
                    "type": "category",
                    "axisLine": {
                        "show": false,
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    "splitLine": {
                        "show": false
                    },
                    "axisTick": {
                        "show": false
                    },
                    "splitArea": {
                        "show": false
                    },
                    "axisLabel": {
                        "interval": 0

                    },
                    "data": xData
                }],
                "yAxis": [
                    {
                        "type": "value",
                        max: maxData,
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
                    }, {
                        "name": "",
                        "type": "value",
                        "splitLine": {
                            "show": false
                        },
                        "axisLine": {
                            "show": false
                        },
                        "axisTick": {
                            "show": false
                        },
                        "axisLabel": {
                            show:false,
                            "interval": "auto"
                            // formatter: '{value} %'
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
                "series": [{
                    "name": "计划开课",
                    "type": "bar",
                    // "stack": "总量",
                    "showAllSymbol": true,
                    "symbol": 'circle',
                    "symbolSize": 5,
                    "barMaxWidth":12,
                    "barGap": "10%",
                    "itemStyle": {
                        "normal": {
                            "color": new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                offset: 0,
                                color: '#1ad1fc'
                            }, {
                                offset: 1,
                                color: '#1d79f3'
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
                    "data": planCourseCnt
                },
                    {
                        "name": "实际开课",
                        "showAllSymbol": true,
                        "symbol": 'circle',
                        "symbolSize": 5,
                        "type": "bar",
                        // "stack": "总量",
                        "barMaxWidth": 12,
                        "itemStyle": {
                            "normal": {
                                "color": new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
                                    offset: 0,
                                    color: '#4ed8a2'
                                }, {
                                    offset: 1,
                                    color: '#086c36'
                                }]),
                                "barBorderRadius": 0,
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
                        "data": realCourseCnt
                    }, {
                        "name": "实开课占比",
                        "type": "line",
                        yAxisIndex: 1,
                        symbolSize:8,
                        symbol: 'circle',
                        "itemStyle": {
                            "normal": {
                                "color": "#c47e26",
                                "barBorderRadius": 0,
                                "label": {
                                    "show": false,
                                    "position": "top",
                                    formatter: function(p) {
                                        return p.value *100 + ' %';
                                    }
                                }
                            }

                        },
                        "data": startCourseRatioCnt
                    }
                ]
            }
        myChart7.setOption(option7);
        interStartLessonTime=hoverTurn(option7,myChart7,option7Index);


    });
}
//授课分析
var courseAnalysisTimer,courseAnalysisTimer1;
function courseAnalysis(areaCode){
    clearInterval(courseAnalysisTimer);
    $.get(BACK_ROOT + '/bigscreen/classroom/faultratiodata.do?areaCode='+areaCode).done(function (data) {
        var data=data.result,dataGZ=[],dataAll=0;
        if(data){
            for(var i=0;i<3;i++){
                dataGZ.push({value:data[i].count,name:data[i].faultName})
                dataAll+=data[i].count;
            }
            // $('.echart-text li:first-child').append(dataAll);
        }
        $('.echart-text li:first-child').append('<p>'+dataAll+'</p>');
        option8={
            tooltip: {
                trigger: 'item',
                transitionDuration:0,
                backgroundColor : 'rgba(83,93,105,0.8)',
                borderColor : '#535b69',
                borderRadius : 8,
                borderWidth: 2,
                padding: [5,10],
                formatter: "<p class='center'>{b}</p><p class='center'>{c}({d}%)</p>"
            },
            title: {
                text: '',
                textStyle: {
                    color: '#fff',
                    fontSize: '18'
                },
                x: 'center',
                y: 'center'
            },
            series: [
                {
                    type:'pie',
                    radius: ['50%', '65%'],
                    avoidLabelOverlap: true,
                    hoverAnimation: true,
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                            color:'#fff',
                            fontSize: '8'
                        },
                        emphasis: {
                            show: false,
                            formatter: '{b} \n\n{d}%',
                            textStyle: {
                                fontSize: '18',
                                fontWeight: 'bold'
                            }
                        }

                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:dataGZ
                }
            ],
            color:['#ff4f47','#112958','#145689']
        };
        myChart8.setOption(option8);
        courseAnalysisTimer=hoverTurn(option8,myChart8,option8Index);
    });

    $.get(BACK_ROOT + '/bigscreen/classroom/validcoursedata.do?areaCode='+areaCode).done(function (data) {
        clearInterval(courseAnalysisTimer1);
        var data=data.result,dataSK=[],dataAll=0;
        if(data){
            dataSK=[
                {
                    value:data.validCourseCnt,
                    name:'有效授课数量'
                },
                {
                    value:data.invalidCourseCnt,
                    name:'无效授课数量'
                }
            ];
            dataAll=data.validCourseCnt+data.invalidCourseCnt;
        }
        $('.echart-text li:nth-child(2)').append('<p>'+dataAll+'</p>');
        option9={
            tooltip: {
                trigger: 'item',
                transitionDuration:0,
                backgroundColor : 'rgba(83,93,105,0.8)',
                borderColor : '#535b69',
                borderRadius : 8,
                borderWidth: 2,
                padding: [5,10],
                formatter: "<p class='center'>{b}</p><p class='center'>{c}({d}%)</p>"
            },
            title: {
                text: '',
                textStyle: {
                    color: '#fff',
                    fontSize: '18'
                },
                x: 'center',
                y: 'center'
            },
            series: [
                {
                    type:'pie',
                    radius: ['45%', '65%'],
                    hoverAnimation: false,
                    avoidLabelOverlap: true,
                    label: {
                        normal: {
                            show: false,
                            position: 'center',
                            color:'#fff',
                            fontSize: '8'
                        },
                        emphasis: {
                            show: false,
                            textStyle: {
                                fontSize: '18',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:dataSK
                }
            ],
            color:['#1ac9fb','#112958']
        };
        myChart9.setOption(option9);
        courseAnalysisTimer1=hoverTurn(option9,myChart9,option9Index);
    });

}
//本周情况
function thisWeek(areaCode) {
    $.get(BACK_ROOT + '/bigscreen/classroom/weekdata.do?areaCode='+areaCode).done(function (data) {
        var data=data.result,Tpl='',TplRate='';
        if(data){
            Tpl='<span>'+data.realCourseCnt+'</span>'+
                '<span>'+data.planCourseCnt+'</span>'+
                '<span>'+data.validCourseCnt+'</span>';
            TplRate='<span>'+data.masterRoomCnt+'</span>'+
                '<span>'+data.receiveRoomCnt+'</span>';
            $('.this-week-status .status_title span').html(data.validCourseRatio+'%');
            $('.use-rate .status_title span').html(data.usedRoomRatio+'%');
        }else{
            $('.this-week-status .status_title span').html('');
            $('.use-rate .status_title span').html('');
        }
        $('.this-week-status .data-count').html(Tpl);
        $('.use-rate .data-count').html(TplRate);
    });
}
//行政区和教师排行
var GrandTimer;
function Grand(data){
    clearInterval(GrandTimer);
    var areaName=[],realCourseCnt=[],planCourseCnt=[],CourseRate=[];
   if(data){
       for(var i=0;i<data.length;i++){
           if(data[i].areaName==null){
               areaName.push(data[i].teacherName);
           }else{
               areaName.push(data[i].areaName);
           }
           realCourseCnt.push(data[i].realCourseCnt);
           planCourseCnt.push(data[i].planCourseCnt);
           CourseRate.push('('+(data[i].realCourseCnt/data[i].planCourseCnt).toFixed(1)*100+'%)');
       }
   }
    option10= {
        grid: {
            left: '100',
            top:'20',
            right: '0',
            bottom: '0',
            containLabel: true
        },
        tooltip: {
            show:"true",
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'none' // 默认为直线，可选为：'line' | 'shadow'
            },
            transitionDuration:0,
            backgroundColor : 'rgba(83,93,105,0.8)',
            borderColor : '#535b69',
            borderRadius : 8,
            borderWidth: 2,
            padding: [5,10],
            formatter: "<p class='center'>{b}-计划开课：{c0}-实际开课：{c1}</p>"
        },
        xAxis:  {
            nameGap: -440,
            nameLocation: 'end',
            // offset:5,
            type: 'value',
            axisTick : {show: false},
            // max:210,
            axisLine: {
                show: false,
                lineStyle:{
                    color:'#90979c'
                }
            },
            splitLine: {
                show: false
            }
        },
        yAxis: [
            {
                type:'category',
                axisTick : {show: false},
                axisLine: {
                    show: false,
                    lineStyle:{
                        color:'#1bb9f9'
                    }
                },
                axisLabel: {
                    fontSize:'16'
                },
                data: areaName,
                offset:80
            }, {
                type: 'category',
                axisTick : {show: false},
                axisLine: {
                    show: false,
                    lineStyle:{
                        color:'#7e9bc6'
                    }
                },
                axisLabel: {
                    fontSize:'14'
                },
                offset:-340,
                nameGap: 20,
                data: CourseRate
            },{
                type: 'category',
                axisTick : {show: false},
                axisLine: {
                    show: false,
                    lineStyle:{
                        color:'#fff'
                    }
                },
                axisLabel: {
                    fontSize:'24',
                    fontFamily:'myFirstFont'
                },
                data: planCourseCnt,
                offset:15
            }
        ],
        series: [
            {
                name: '计划开课',
                type: 'bar',
                yAxisIndex:1,
                barWidth: '12',
                itemStyle:{
                    normal: {
                        show: true,
                        color: '#09152a',
                        borderType: 'solid',
                        barBorderRadius:50,
                        borderWidth:1,
                        borderColor:'#61738c'
                    }
                },
                barGap:'0%',
                barCategoryGap:'20%',
                data: planCourseCnt
            },
            {
                name: '实际开课',
                type: 'bar',
                barWidth: '6',
                label:{
                    normal:{
                        // show:true,
                        position:"right",
                        textStyle:
                            {
                                color:"#9EA7C4"
                            }
                    }
                },
                itemStyle:{
                    normal: {
                        show: true,
                        color: '#1bb2f9',
                        barBorderRadius:50,
                        borderWidth:0,
                        borderColor:'#333'
                    }
                },
                barGap:'0%',
                barCategoryGap:'20%',
                data:realCourseCnt,
                zLevel:'2'
            }
        ]
    };
    myChart10.setOption(option10);
    GrandTimer=hoverTurn(option10,myChart10,option10Index);
}

//---------------------------------------定时器
function sgDistributionTime(){
    $('.sg-distribution .filter-type li').eq(num).addClass('active').siblings().removeClass('active');
    dataType=$('.sg-distribution .filter-type li.active').data('type');
    if(dataType=='subject'){
        subjectGrade(subjectData);
    }else if(dataType=='grade'){
        subjectGrade(gradeData);
    }
    num++;
    if(num>=2){
        num=0;
    }
}

function grandTime(){
    $('.grand .filter-type li').eq(grandNum).addClass('active').siblings().removeClass('active');
    dataType=$('.grand .filter-type li.active').data('type');
    if(dataType=='admin'){
        Grand(adminData);
    }else if(dataType=='classLevel'){
        Grand(classLevelData);
    }
    grandNum++;
    if(grandNum>=2){
        grandNum=0;
    }
}
//echart hover定时器
function hoverTurn(a,b,c){
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

sgTime=setInterval(sgDistributionTime,10000);

grandTimes=setInterval(grandTime,10000);
//hover清除定时器
$('.sg-distribution .com-screen-content').hover(function () {
    clearInterval(sgTime);
},function () {
    sgTime=setInterval(sgDistributionTime,10000);
});

$('.grand .com-screen-content').hover(function () {
    clearInterval(grandTimes);
},function () {
    grandTimes=setInterval(grandTime,10000);
});
//数据类型切换
$('.filter-type').on('click','li',function () {
    $(this).addClass('active').siblings().removeClass('active');
    dataType=$(this).data('type');
    if(dataType=='subject'){
        subjectGrade(subjectData);
    }else if(dataType=='grade'){
        subjectGrade(gradeData);
    }else if(dataType=='admin'){
        Grand(adminData);
    }else if(dataType=='classLevel'){
        Grand(classLevelData);
    }
});

$("#parent select").on('change',function() {
    trimester = $("#parent select option:checked").text();
    interStartLesson(areaCode,trimester);
});