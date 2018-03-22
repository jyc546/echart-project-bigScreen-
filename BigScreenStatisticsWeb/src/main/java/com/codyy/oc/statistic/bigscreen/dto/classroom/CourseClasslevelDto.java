package com.codyy.oc.statistic.bigscreen.dto.classroom;

/**
 * 年级分布
 * @author robot
 */
public class CourseClasslevelDto {
	/**
	 * 年级名称
	 */
	private String classLevelName;
	/**
	 * 教室数量
	 */
	private int roomCnt;

	public String getClassLevelName() {
		return classLevelName;
	}

	public void setClassLevelName(String classLevelName) {
		this.classLevelName = classLevelName;
	}

	public int getRoomCnt() {
		return roomCnt;
	}

	public void setRoomCnt(int roomCnt) {
		this.roomCnt = roomCnt;
	}
}
