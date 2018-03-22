package com.codyy.oc.statistic.bigscreen.dto.interact;

/**
 * 行政区域教研数据
 * @author robot
 */
public class SubAreaDto {
	/**
	 * 教研活动
	 */
	private int acvitityCnt;

	/**
	 * 教案
	 */
	private int lessonCnt;
	/**
	 * 行政区代码
	 */
	private String areaCode;
	/**
	 * 行政区名称
	 */
	private String areaName;

	public int getAcvitityCnt() {
		return acvitityCnt;
	}

	public void setAcvitityCnt(int acvitityCnt) {
		this.acvitityCnt = acvitityCnt;
	}

	public int getLessonCnt() {
		return lessonCnt;
	}

	public void setLessonCnt(int lessonCnt) {
		this.lessonCnt = lessonCnt;
	}

	public String getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}

	public String getAreaName() {
		return areaName;
	}

	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}
}
