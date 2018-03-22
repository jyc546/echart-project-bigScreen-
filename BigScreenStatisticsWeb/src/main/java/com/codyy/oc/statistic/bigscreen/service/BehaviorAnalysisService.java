package com.codyy.oc.statistic.bigscreen.service;

import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.BaseClasslevelDto;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.BaseKnowledgeDto;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.BaseSubjectDto;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.CourseClasslevelDto;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.CourseCntDto;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.CourseGeneralDto;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.CourseRatingClassifyDto;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.CourseSubjectDto;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.CourseTeacherDto;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import static com.alibaba.fastjson.JSON.parseArray;
import static com.alibaba.fastjson.JSON.parseObject;

/**
 *
 * @author robot
 */
@Service
public class BehaviorAnalysisService {
    @Autowired
    private StatisticDataService statisticDataService;
    private String bigScreen = "behavioranalysis";

    /**
     * 课堂行为学科分布
     * @param areaCode 区域编码
     * @return 课堂行为学科分布数据
     */
    public List<CourseSubjectDto> getCourseSubjectData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "coursesubject", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return parseArray(data, CourseSubjectDto.class);
    }

    /**
     * 课堂行为年级分布
     * @param areaCode 区域编码
     * @return 课堂行为学科年级数据
     */
    public List<CourseClasslevelDto> getCourseClasslevelData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "courseclasslevel", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return parseArray(data, CourseClasslevelDto.class);
    }

    /**
     * 查询所有课程数据
     * @param areaCode 区域编码
     * @return 课程数据
     */
    public List<CourseGeneralDto> getAllCourseData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "allcourse", areaCode);
        if(StringUtils.isBlank(data)) {
            return new ArrayList<>();
        }
        return parseArray(data, CourseGeneralDto.class);
    }

    public CourseRatingClassifyDto getCourseRatingData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "courserating", areaCode);
        if(StringUtils.isBlank(data)) {
            return new CourseRatingClassifyDto();
        }
        return parseObject(data, CourseRatingClassifyDto.class);
    }

    /**
     * 教师排行
     * @param areaCode 区域编码
     * @return 教师排行数据
     */
    public List<CourseTeacherDto> getCourseTeacherData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "courseteacher", areaCode);
        List<CourseTeacherDto> courseTeacherDatas = parseArray(data, CourseTeacherDto.class);
        if (CollectionUtils.isEmpty(courseTeacherDatas)) {
            return new ArrayList<>();
        }

        for (CourseTeacherDto courseTeacherData : courseTeacherDatas) {
            int goodCourseCnt = courseTeacherData.getGoodCourseCnt();
            int totalCourseCnt = courseTeacherData.getTotalCourseCnt();
            int courseRat = goodCourseCnt / totalCourseCnt;
            courseTeacherData.setGoodCourseRatio(courseRat);
        }
        Collections.sort(courseTeacherDatas, new Comparator<CourseTeacherDto>() {
            @Override
            public int compare(CourseTeacherDto o1, CourseTeacherDto o2) {
                return o1.getGoodCourseRatio() < o2.getGoodCourseRatio() ? 1 : -1;
            }
        });
        return parseArray(data, CourseTeacherDto.class);
    }

    public List<BaseClasslevelDto> getClasslevelData(String areaCode) {
        List<BaseClasslevelDto> classlevelData = getClasslevelData2(areaCode);
        if (CollectionUtils.isNotEmpty(classlevelData)) {
            for (BaseClasslevelDto classlevel : classlevelData) {
                classlevel.setSubjects(null);
            }
        }
        return classlevelData;
    }

    public List<BaseSubjectDto> getSubjectData(String areaCode, String classlevelName) {
        List<BaseSubjectDto> subjectDatas = this.getSubjectData2(areaCode, classlevelName);
        if (CollectionUtils.isNotEmpty(subjectDatas)) {
            for (BaseSubjectDto subject : subjectDatas) {
                subject.setKnowledges(null);
            }
        }
        return subjectDatas;
    }

    public List<BaseKnowledgeDto> getKnowledgesData(String areaCode, String classlevelName, String subjectName) {
        List<BaseSubjectDto> subjectDatas = this.getSubjectData2(areaCode, classlevelName);
        if (CollectionUtils.isEmpty(subjectDatas)) {
            return new ArrayList<>();
        }

        for (BaseSubjectDto subject : subjectDatas) {
            if (subjectName.equals(subject.getSubjectName())) {
                return subject.getKnowledges();
            }
        }
        return new ArrayList<>();
    }

    private List<BaseClasslevelDto> getClasslevelData2(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "knowledges", areaCode);
        return parseArray(data, BaseClasslevelDto.class);
    }

    public List<BaseSubjectDto> getSubjectData2(String areaCode, String classlevelName) {
        List<BaseClasslevelDto> classlevelDatas = this.getClasslevelData2(areaCode);
        if (CollectionUtils.isEmpty(classlevelDatas)) {
            return new ArrayList<>();
        }

        for (BaseClasslevelDto classlevel : classlevelDatas) {
            if (classlevelName.equals(classlevel.getClasslevelName())) {
                return classlevel.getSubjects();
            }
        }
        return new ArrayList<>();
    }

    public CourseCntDto getCourseCntData(String areaCode) {
        String data = statisticDataService.readDataFromFile(bigScreen, "coursecnt", areaCode);
        return parseObject(data, CourseCntDto.class);
    }
}
