package com.codyy.oc.statistic.bigscreen.dto.classroom;

/**
 * 学科分布
 * @author robot
 */
public class CourseSubjectDto {
	/**
	 * 教室数量
	 */
	private int roomCnt;
	/**
	 * 学科名称
	 */
	private String subjectName;

	public int getRoomCnt() {
		return roomCnt;
	}

	public void setRoomCnt(int roomCnt) {
		this.roomCnt = roomCnt;
	}

	public String getSubjectName() {
		return subjectName;
	}

	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
}
