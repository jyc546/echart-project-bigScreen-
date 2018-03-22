package com.codyy.oc.statistic.bigscreen.dto.resource;

/**
 * 学校排行
 * @author robot
 */
public class ResSchoolDto {
	/**
	 * 资源数量
	 */
	private int resourceCnt;
	/**
	 * 学校名称
	 */
	private String schoolName;

	public int getResourceCnt() {
		return resourceCnt;
	}

	public void setResourceCnt(int resourceCnt) {
		this.resourceCnt = resourceCnt;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}
}
