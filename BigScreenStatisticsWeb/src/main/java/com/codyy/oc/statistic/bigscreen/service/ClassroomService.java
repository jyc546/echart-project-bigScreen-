package com.codyy.oc.statistic.bigscreen.service;

import com.codyy.oc.statistic.bigscreen.dto.classroom.ClassroomWeekStatusDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.ClassroomTypeDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseAreaDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseClasslevelDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseDistributionDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseFaultDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseGeneralDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseStatusDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseSubjectDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseTeacherDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseValidityStatusDto;
import com.codyy.oc.statistic.bigscreen.dto.classroom.CourseWeekDto;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static com.alibaba.fastjson.JSON.parseArray;
import static com.alibaba.fastjson.JSON.parseObject;

/**
 *
 * @author robot
 */
@Service
public class ClassroomService {
	@Autowired
	private StatisticDataService statisticDataService;
	private String bigScreen = "classroom";

	/**
	 * 查询区域主讲教室接收教室个数
	 * @param areaCode 区域编码
	 * @return 区域主讲教室接收教室个数
	 */
	public ClassroomTypeDto getClassroomTypeData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "classroomtype", areaCode);
		if(StringUtils.isBlank(data)) {
			return new ClassroomTypeDto();
		}
		return parseObject(data, ClassroomTypeDto.class);
	}

	/**
	 * 查询常态化录播有效授课及无效授课数量
	 * @param areaCode 区域编码
	 * @return 常态化录播有效授课及无效授课数量
	 */
	public CourseValidityStatusDto getDailyCourseRatioData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "dailycourseratio", areaCode);
		if(StringUtils.isBlank(data)) {
			return new CourseValidityStatusDto();
		}
		return parseObject(data, CourseValidityStatusDto.class);
	}

	/**
	 * 实时动态-课程状态数据
	 * @param areaCode 区域编码
	 * @return 实时动态-课程状态数据
	 */
	public CourseStatusDto getRealtimeCourseData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "realtimecourse", areaCode);
		if(StringUtils.isBlank(data)) {
			return new CourseStatusDto();
		}
		return parseObject(data, CourseStatusDto.class);
	}

	/**
	 * 查询区域主讲主讲教室、接收教室及接入失败教室数量
	 * @param areaCode 区域编码
	 * @return 教室数量
	 */

	public ClassroomTypeDto getClassroomAndFaultData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "realtimeroom", areaCode);
		if(StringUtils.isBlank(data)) {
			return new ClassroomTypeDto();
		}
		return parseObject(data, ClassroomTypeDto.class);
	}

	/**
	 * 查询区域教室学科分布数据
	 * @param areaCode 区域编码
	 * @return 区域教室学科分布数据
	 */
	public List<CourseSubjectDto> getRoomSubjectData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "subject", areaCode);
		if(StringUtils.isBlank(data)) {
			return new ArrayList<>();
		}
		return parseArray(data, CourseSubjectDto.class);
	}

	/**
	 * 查询区域教室年级分布数据
	 * @param areaCode 区域编码
	 * @return 区域教室学科年级数据
	 */
	public List<CourseClasslevelDto> getRoomClasslevelData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "classlevel", areaCode);
		if(StringUtils.isBlank(data)) {
			return new ArrayList<>();
		}
		return parseArray(data, CourseClasslevelDto.class);
	}

	/**
	 * 地图总览数据
	 * @param areaCode 区域编码
	 * @return 地图总览数据
	 */
	public CourseGeneralDto getGeneralData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "general", areaCode);
		if(StringUtils.isBlank(data)) {
			return new CourseGeneralDto();
		}
		return parseObject(data, CourseGeneralDto.class);
	}

	/**
	 * 接收到主讲教室的指向关系数据
	 * @param areaCode 区域编码
	 * @return 接收到主讲教室的指向关系数据
	 */
	public List<CourseDistributionDto> getCourseDistributionData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "courseline", areaCode);
		if(StringUtils.isBlank(data)) {
			return new ArrayList<>();
		}
		return parseArray(data, CourseDistributionDto.class);
	}

	/**
	 * 计划开课周次数据
	 * @param areaCode 区域编码
	 * @param trimester 学期
	 * @return 计划开课周次数据
	 */
	public List<CourseWeekDto> getPlanCourseWeekDate(String areaCode, String trimester) {
		String data = statisticDataService.readDataFromFile(bigScreen, "plancourse", areaCode);
		if (StringUtils.isBlank(data)) {
			return new ArrayList<>();
		}
		Map allCourseWeekData = parseObject(data, Map.class);
		if(allCourseWeekData.get(trimester)==null) {
			return new ArrayList<>();
		}
		return parseArray(allCourseWeekData.get(trimester).toString(), CourseWeekDto.class);
	}

	/**
	 * 实际开课周次数据
	 * @param areaCode 区域编码
	 * @param trimester 学期
	 * @return 实际开课周次数据
	 */
	public List<CourseWeekDto> getRealCourseWeekDate(String areaCode, String trimester) {
		String data = statisticDataService.readDataFromFile(bigScreen, "realcourse", areaCode);
		if (StringUtils.isBlank(data)) {
			return new ArrayList<>();
		}
		Map allCourseWeekData = parseObject(data, Map.class);
		if(allCourseWeekData.get(trimester)==null) {
			return new ArrayList<>();
		}
        return parseArray(allCourseWeekData.get(trimester).toString(), CourseWeekDto.class);
	}

	/**
	 * 有效、无效授课数据
	 * @param areaCode 区域编码
	 * @return 有效、无效授课数据
	 */
	public CourseValidityStatusDto getValidCourseData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "validcourse", areaCode);
		if(StringUtils.isBlank(data)) {
			return new CourseValidityStatusDto();
		}
		return parseObject(data, CourseValidityStatusDto.class);
	}

	/**
	 * 授课故障数据
	 * @param areaCode 区域编码
	 * @return 授课故障数据
	 */
	public List<CourseFaultDto> getCourseDaultRatioData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "faultratio", areaCode);
		if(StringUtils.isBlank(data)) {
			return new ArrayList<>();
		}
		return parseArray(data, CourseFaultDto.class);
	}

	/**
	 * 教室、课程本周情况
	 * @param areaCode 区域编码
	 * @return 教室、课程本周情况数据
	 */
	public ClassroomWeekStatusDto getCourseWeekData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "week", areaCode);
		if(StringUtils.isBlank(data)) {
			return new ClassroomWeekStatusDto();
		}
		return parseObject(data, ClassroomWeekStatusDto.class);
	}

	/**
	 * 子行政区开课数据
	 * @param areaCode 父区域编码
	 * @return 子行政区开课数据
	 */
	public List<CourseAreaDto> getCourseSubAreaData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "subarea", areaCode);
		if(StringUtils.isBlank(data)) {
			return new ArrayList<>();
		}
		return parseArray(data, CourseAreaDto.class);
	}

	/**
	 * 教师上课数据
	 * @param areaCode 区域编码
	 * @return 教师上课数据
	 */
	public List<CourseTeacherDto> getCourseTeacherData(String areaCode) {
		String data = statisticDataService.readDataFromFile(bigScreen, "teacher", areaCode);
		if(StringUtils.isBlank(data)) {
			return new ArrayList<>();
		}
		return parseArray(data, CourseTeacherDto.class);
	}
}
