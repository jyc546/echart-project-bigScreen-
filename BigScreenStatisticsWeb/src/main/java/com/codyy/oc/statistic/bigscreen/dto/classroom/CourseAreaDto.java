package com.codyy.oc.statistic.bigscreen.dto.classroom;

/**
 * 行政区内开课数量
 * @author robot
 */
public class CourseAreaDto {
	/**
	 * 区域名称
	 */
	private String areaName;
	/**
	 * 计划开课数
	 */
	private int planCourseCnt;
	/**
	 * 实际开课数
	 */
	private int realCourseCnt;

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

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
}
