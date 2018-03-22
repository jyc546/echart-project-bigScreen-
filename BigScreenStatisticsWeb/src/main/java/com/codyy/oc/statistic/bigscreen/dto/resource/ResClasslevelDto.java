package com.codyy.oc.statistic.bigscreen.dto.resource;

/**
 * 年级分布
 * @author robot
 */
public class ResClasslevelDto {
	/**
	 * 年级名称
	 */
	private String classLevelName;
	/**
	 * 资源数量
	 */
	private int resourceCnt;

	public String getClassLevelName() {
		return classLevelName;
	}

	public void setClassLevelName(String classLevelName) {
		this.classLevelName = classLevelName;
	}

	public int getResourceCnt() {
		return resourceCnt;
	}

	public void setResourceCnt(int resourceCnt) {
		this.resourceCnt = resourceCnt;
	}
}
