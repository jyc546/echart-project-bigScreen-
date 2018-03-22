package com.codyy.oc.statistic.bigscreen.controller;

import com.codyy.oc.commons.vo.ReturnVo;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.BaseClasslevelDto;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.BaseKnowledgeDto;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.BaseSubjectDto;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.CourseClasslevelDto;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.CourseCntDto;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.CourseGeneralDto;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.CourseRatingClassifyDto;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.CourseSubjectDto;
import com.codyy.oc.statistic.bigscreen.dto.behavioranalysis.CourseTeacherDto;
import com.codyy.oc.statistic.bigscreen.service.BehaviorAnalysisService;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Required;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 *
 * @author robot
 */
@RequestMapping("/bigscreen/behavioranalysis")
public class BehaviorAnalysisController {
	@Autowired
	private BehaviorAnalysisService behaviorAnalysisService;

	/**
	 * 课堂行为学科分布
	 * @param areaCode 区域编码
	 * @return 课堂行为学科分布数据
	 */
	@ResponseBody
	@RequestMapping("/coursesubjectdata")
	public ReturnVo<List<CourseSubjectDto>> getCourseSubjectData(String areaCode) {
		ReturnVo<List<CourseSubjectDto>> returnVo = new ReturnVo<>();
		List<CourseSubjectDto> subjectData = behaviorAnalysisService.getCourseSubjectData(areaCode);
		returnVo.setResult(subjectData);
		return returnVo;
	}

	/**
	 * 课堂行为年级分布
	 * @param areaCode 区域编码
	 * @return 课堂行为学科年级数据
	 */
	@ResponseBody
	@RequestMapping("/courseclassleveldata")
	public ReturnVo<List<CourseClasslevelDto>> getCourseClasslevelData(String areaCode) {
		ReturnVo<List<CourseClasslevelDto>> returnVo = new ReturnVo<>();
		List<CourseClasslevelDto> classlevelData = behaviorAnalysisService.getCourseClasslevelData(areaCode);
		returnVo.setResult(classlevelData);
		return returnVo;
	}

	/**
	 * 所有课程数据
	 * @param areaCode 区域编码
	 * @return 课程数据
	 */
	@RequestMapping("/allcoursedata")
	@ResponseBody
	public ReturnVo<List<CourseGeneralDto>> getAllCourseData(String areaCode) {
		ReturnVo<List<CourseGeneralDto>> returnVo = new ReturnVo<>();
		List<CourseGeneralDto> generalData = behaviorAnalysisService.getAllCourseData(areaCode);
		returnVo.setResult(generalData);
		return returnVo;
	}

	@ResponseBody
	@RequestMapping("/courseratingdata")
	public ReturnVo<CourseRatingClassifyDto> getCourseRatingData(String areaCode) {
		ReturnVo<CourseRatingClassifyDto> returnVo = new ReturnVo<>();
		CourseRatingClassifyDto courseData = behaviorAnalysisService.getCourseRatingData(areaCode);
		returnVo.setResult(courseData);
		return returnVo;
	}

	/**
	 * 教师排行
	 * @param areaCode 区域编码
	 * @return 教师排行数据
	 */
	@ResponseBody
	@RequestMapping("/courseteacherdata")
	public ReturnVo<List<CourseTeacherDto>> getCourseTeacherData(String areaCode) {
		ReturnVo<List<CourseTeacherDto>> returnVo = new ReturnVo<>();
		List<CourseTeacherDto> teacherData = behaviorAnalysisService.getCourseTeacherData(areaCode);
		returnVo.setResult(teacherData);
		return returnVo;
	}

	@ResponseBody
	@RequestMapping("/classleveldata")
	public ReturnVo<List<BaseClasslevelDto>> getClasslevelData(String areaCode) {
		ReturnVo<List<BaseClasslevelDto>> returnVo = new ReturnVo<>();
		List<BaseClasslevelDto> classlevelData = behaviorAnalysisService.getClasslevelData(areaCode);
		returnVo.setResult(classlevelData);
		return returnVo;
	}

	@ResponseBody
	@RequestMapping("/subjectdata")
	public ReturnVo<List<BaseSubjectDto>> getSubjectData(String areaCode, @RequestParam(required = true) String classlevelName) {
		ReturnVo<List<BaseSubjectDto>> returnVo = new ReturnVo<>();
		List<BaseSubjectDto> subjectData = behaviorAnalysisService.getSubjectData(areaCode, classlevelName);
		returnVo.setResult(subjectData);
		return returnVo;
	}

	@ResponseBody
	@RequestMapping("/knowledgesdata")
	public ReturnVo<List<BaseKnowledgeDto>> getKnowledgesData(String areaCode, @RequestParam(required = true) String classlevelName,
			@RequestParam(required = true) String subjectName) {
		ReturnVo<List<BaseKnowledgeDto>> returnVo = new ReturnVo<>();
		List<BaseKnowledgeDto> knowledgeData = behaviorAnalysisService.getKnowledgesData(areaCode, classlevelName, subjectName);
		returnVo.setResult(knowledgeData);
		return returnVo;
	}

	@ResponseBody
	@RequestMapping("/coursecntdata")
	public ReturnVo<CourseCntDto> getCourseCntData(String areaCode) {
		ReturnVo<CourseCntDto> returnVo = new ReturnVo<>();
		CourseCntDto courseCnt = behaviorAnalysisService.getCourseCntData(areaCode);
		returnVo.setResult(courseCnt);
		return returnVo;
	}
}
