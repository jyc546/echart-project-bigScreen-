package com.codyy.oc.statistic.bigscreen.dto.resource;

/**
 * 资源总览-学科
 * @author robot
 */
public class ResSubjectDto {
	/**
	 * 资源数量
	 */
	private int resourceCnt;
	/**
	 * 学科名称
	 */
	private String subjectName;

	public int getResourceCnt() {
		return resourceCnt;
	}

	public void setResourceCnt(int resourceCnt) {
		this.resourceCnt = resourceCnt;
	}

	public String getSubjectName() {
		return subjectName;
	}

	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
}
