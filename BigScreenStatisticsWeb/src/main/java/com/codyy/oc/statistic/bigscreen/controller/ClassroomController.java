package com.codyy.oc.statistic.bigscreen.controller;

import com.codyy.oc.commons.vo.ReturnVo;
import com.codyy.oc.base.controller.BaseController;
import com.codyy.oc.statistic.bigscreen.dto.classroom.ClassroomWeekStatusDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.ClassroomTypeDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseAreaDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseClasslevelDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseCurveGraphDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseDistributionDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseFaultDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseGeneralDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseRatioWeekDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseStatusDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseSubjectDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseTeacherDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseValidityStatusDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseWeekDto;
import com.codyy.oc.statistic.bigscreen.service.ClassroomService;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;

/**
 * 课堂监管
 * @author robot
 */
@RequestMapping("/bigscreen/classroom")
public class ClassroomController extends BaseController {
	@Autowired
	private ClassroomService classroomService;

	/**
	 * 教室建设-互动教室类型
	 * @param areaCode 区域编码
	 * @return 互动教室类型
	 */
	@RequestMapping("/classroomtypedata")
	@ResponseBody
	public ReturnVo<ClassroomTypeDto> getClassroomTypeData(String areaCode) {
		ReturnVo<ClassroomTypeDto> returnVo = new ReturnVo<>();
		ClassroomTypeDto classType = classroomService.getClassroomTypeData(areaCode);
		returnVo.setResult(classType);
		return returnVo;
	}

	/**
	 * 常态化录播有效授课无效授课数量
	 * @param areaCode 区域编码
	 * @return 常态化录播有效授课无效授课数量
	 */
	@RequestMapping("/dailycourseratiodata")
	@ResponseBody
	public ReturnVo<CourseValidityStatusDto> getDailyCourseRatioData(String areaCode) {
		ReturnVo<CourseValidityStatusDto> returnVo = new ReturnVo<>();
		CourseValidityStatusDto courseStatus = classroomService.getDailyCourseRatioData(areaCode);
		returnVo.setResult(courseStatus);
		return returnVo;
	}

	/**
	 * 实时动态-课程状态数据
	 * @param areaCode 区域编码
	 * @return 实时动态-课程状态数据
	 */
	@RequestMapping("/realtimecoursedata")
	@ResponseBody
	public ReturnVo<CourseStatusDto> getRealtimeCourseData(String areaCode) {
		ReturnVo<CourseStatusDto> returnVo = new ReturnVo<>();
		CourseStatusDto courseStatus = classroomService.getRealtimeCourseData(areaCode);
		returnVo.setResult(courseStatus);
		return returnVo;
	}

	/**
	 * 实时动态-教室状态
	 * @param areaCode 区域编码
	 * @return 实时动态-教室状态
	 */
	@RequestMapping("/realtimeroomdata")
	@ResponseBody
	public ReturnVo<ClassroomTypeDto> getRealtimeRoomData(String areaCode) {
		ReturnVo<ClassroomTypeDto> returnVo = new ReturnVo<>();
		ClassroomTypeDto classType = classroomService.getClassroomAndFaultData(areaCode);
		returnVo.setResult(classType);
		return returnVo;
	}

	/**
	 * 查询区域教室学科分布数据
	 * @param areaCode 区域编码
	 * @return 区域教室学科分布数据
	 */
	@RequestMapping("/subjectdata")
	@ResponseBody
	public ReturnVo<List<CourseSubjectDto>> getSubjectData(String areaCode) {
		ReturnVo<List<CourseSubjectDto>> returnVo = new ReturnVo<>();
		List<CourseSubjectDto> subjectData = classroomService.getRoomSubjectData(areaCode);
		returnVo.setResult(subjectData);
		return returnVo;
	}

	/**
	 * 查询区域教室年级分布数据
	 * @param areaCode 区域编码
	 * @return 区域教室学科年级数据
	 */
	@RequestMapping("/classleveldata")
	@ResponseBody
	public ReturnVo<List<CourseClasslevelDto>> getClasslevelData(String areaCode) {
		ReturnVo<List<CourseClasslevelDto>> returnVo = new ReturnVo<>();
		List<CourseClasslevelDto> classlevelData = classroomService.getRoomClasslevelData(areaCode);
		returnVo.setResult(classlevelData);
		return returnVo;
	}

	/**
	 * 地图总览数据
	 * @param areaCode 区域编码
	 * @return 地图总览数据
	 */
	@RequestMapping("/generaldata")
	@ResponseBody
	public ReturnVo<CourseGeneralDto> getGeneralData(String areaCode) {
		ReturnVo<CourseGeneralDto> returnVo = new ReturnVo<>();
		CourseGeneralDto generalData = classroomService.getGeneralData(areaCode);
		returnVo.setResult(generalData);
		return returnVo;
	}

	@RequestMapping("/courselinedata")
	@ResponseBody
	public ReturnVo<List<CourseDistributionDto>> getCourseLineData(String areaCode) {
		ReturnVo<List<CourseDistributionDto>> returnVo = new ReturnVo<>();
		List<CourseDistributionDto> courseDistributionDate = classroomService.getCourseDistributionData(areaCode);
		returnVo.setResult(courseDistributionDate);
		return returnVo;
	}

	/**
	 * 互动课堂开课分析
	 * @param areaCode 区域编码
	 * @param trimester 学期
	 * @return 互动课堂开课分析数据
	 */
	@RequestMapping("/curvegraphdata")
	@ResponseBody
	public ReturnVo<CourseCurveGraphDto> getCurveGraphData(String areaCode, String trimester) {
		ReturnVo<CourseCurveGraphDto> returnVo = new ReturnVo<>();
		CourseCurveGraphDto graphDate = new CourseCurveGraphDto();
		List<CourseWeekDto> planCourses = classroomService.getPlanCourseWeekDate(areaCode, trimester);
		List<CourseWeekDto> realCourses = classroomService.getRealCourseWeekDate(areaCode, trimester);
		graphDate.setPlanCourseData(planCourses);
		graphDate.setRealCourseData(realCourses);

		// 计算实开课占比
		if (CollectionUtils.isNotEmpty(planCourses) && CollectionUtils.isNotEmpty(realCourses)) {
			int maxLength = Math.min(planCourses.size(), realCourses.size());

			List<CourseRatioWeekDto> startCourseRatios = new ArrayList<>(maxLength);
			for (int i = 0; i < maxLength; i++) {
				CourseRatioWeekDto startCourseRatio = new CourseRatioWeekDto();
				startCourseRatio.setWeek(i + 1);
				startCourseRatio.setRatio((planCourses.get(i).getCourseCnt() + 0.0) / realCourses.get(i).getCourseCnt());
				startCourseRatios.add(startCourseRatio);
			}
			graphDate.setStartCourseRatioData(startCourseRatios);
		}
		returnVo.setResult(graphDate);
		return returnVo;
	}

	/**
	 * 授课分析-授课情况
	 * @param areaCode 区域编码
	 * @return 授课分析-授课情况数据
	 */
	@RequestMapping("/validcoursedata")
	@ResponseBody
	public ReturnVo<CourseValidityStatusDto> getValidCourseData(String areaCode) {
		ReturnVo<CourseValidityStatusDto> returnVo = new ReturnVo<>();
		CourseValidityStatusDto courseStatus = classroomService.getValidCourseData(areaCode);
		returnVo.setResult(courseStatus);
		return returnVo;
	}

	/**
	 * 授课分析-故障
	 * @param areaCode 区域编码
	 * @return 授课分析-故障数据
	 */
	@RequestMapping("/faultratiodata")
	@ResponseBody
	public ReturnVo<List<CourseFaultDto>> getDaultRatioData(String areaCode) {
		ReturnVo<List<CourseFaultDto>> returnVo = new ReturnVo<>();
		List<CourseFaultDto> courseFaultDate = classroomService.getCourseDaultRatioData(areaCode);
		returnVo.setResult(courseFaultDate);
		return returnVo;
	}

	/**
	 * 教室、课程本周情况
	 * @param areaCode 区域编码
	 * @return 教室、课程本周情况数据
	 */
	@RequestMapping("/weekdata")
	@ResponseBody
	public ReturnVo<ClassroomWeekStatusDto> getWeekData(String areaCode) {
		ReturnVo<ClassroomWeekStatusDto> returnVo = new ReturnVo<>();
		ClassroomWeekStatusDto courseWeekData = classroomService.getCourseWeekData(areaCode);
		returnVo.setResult(courseWeekData);
		return returnVo;
	}

	/**
	 * 行政区排行
	 * @param areaCode 区域编码
	 * @return 行政区排行
	 */
	@RequestMapping("/subareadata")
	@ResponseBody
	public ReturnVo<List<CourseAreaDto>> getSubAreaData(String areaCode) {
		ReturnVo<List<CourseAreaDto>> returnVo = new ReturnVo<>();
		List<CourseAreaDto> areaCourseData = classroomService.getCourseSubAreaData(areaCode);
		returnVo.setResult(areaCourseData);
		return returnVo;
	}

	/**
	 * 教师排行
	 * @param areaCode 区域编码
	 * @return 教师排行数据
	 */
	@RequestMapping("/teacherdata")
	@ResponseBody
	public ReturnVo<List<CourseTeacherDto>> getTeacherData(String areaCode) {
		ReturnVo<List<CourseTeacherDto>> returnVo = new ReturnVo<>();
		List<CourseTeacherDto> teacherCourseData = classroomService.getCourseTeacherData(areaCode);
		returnVo.setResult(teacherCourseData);
		return returnVo;
	}
}
