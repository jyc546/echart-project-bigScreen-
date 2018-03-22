package com.codyy.oc.statistic.bigscreen.dto.behavioranalysis;

/**
 *
 * @author robot
 */
public class CourseTeacherDto {
	/**
	 * 好评课程数量
	 */
	private int goodCourseCnt;
	/**
	 * 课程好评率
	 */
	private double goodCourseRatio;
	/**
	 * 教师名称
	 */
	private String teacherName;
	/**
	 * 授课总数
	 */
	private int totalCourseCnt;

	public int getGoodCourseCnt() {
		return goodCourseCnt;
	}

	public void setGoodCourseCnt(int goodCourseCnt) {
		this.goodCourseCnt = goodCourseCnt;
	}

	public double getGoodCourseRatio() {
		return goodCourseRatio;
	}

	public void setGoodCourseRatio(double goodCourseRatio) {
		this.goodCourseRatio = goodCourseRatio;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public int getTotalCourseCnt() {
		return totalCourseCnt;
	}

	public void setTotalCourseCnt(int totalCourseCnt) {
		this.totalCourseCnt = totalCourseCnt;
	}
}
