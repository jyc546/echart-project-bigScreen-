package com.codyy.oc.statistic.bigscreen.dto.classroom;

import java.util.ArrayList;
import java.util.List;

/**
 * 互动课堂开课分析
 * @author robot
 */
public class CourseCurveGraphDto {
	/**
	 * 计划开课
	 */
	private List<CourseWeekDto> planCourseData = new ArrayList<>();
	/**
	 * 实际开课
	 */
	private List<CourseWeekDto> realCourseData = new ArrayList<>();
	/**
	 * 实开课占比
	 */
	private List<CourseRatioWeekDto> startCourseRatioData = new ArrayList<>();

	public List<CourseWeekDto> getPlanCourseData() {
		return planCourseData;
	}

	public void setPlanCourseData(List<CourseWeekDto> planCourseData) {
		this.planCourseData = planCourseData;
	}

	public List<CourseWeekDto> getRealCourseData() {
		return realCourseData;
	}

	public void setRealCourseData(List<CourseWeekDto> realCourseData) {
		this.realCourseData = realCourseData;
	}

	public List<CourseRatioWeekDto> getStartCourseRatioData() {
		return startCourseRatioData;
	}

	public void setStartCourseRatioData(List<CourseRatioWeekDto> startCourseRatioData) {
		this.startCourseRatioData = startCourseRatioData;
	}
}
