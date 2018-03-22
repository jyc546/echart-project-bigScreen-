package com.codyy.oc.statistic.bigscreen.dto.classroom;

/**
 * 教师上课数量
 * @author robot
 */
public class CourseTeacherDto {
	/**
	 * 计划开课数
	 */
	private int planCourseCnt;
	/**
	 * 实际开课数
	 */
	private int realCourseCnt;
	/**
	 * 教师名称
	 */
	private String teacherName;

	public int getPlanCourseCnt() {
		return planCourseCnt;
	}

	public void setPlanCourseCnt(int planCourseCnt) {
		this.planCourseCnt = planCourseCnt;
	}

	public int getRealCourseCnt() {
		return realCourseCnt;
	}

	public void setRealCourseCnt(int realCourseCnt) {
		this.realCourseCnt = realCourseCnt;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}
}
