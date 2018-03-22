package com.codyy.oc.statistic.bigscreen.dto.classroom;

/**
 * 教室周次开课情况
 * @author robot
 */
public class ClassroomWeekStatusDto {
	/**
	 * 主讲教室
	 */
	private int masterRoomCnt;
	/**
	 * 计划开课
	 */
	private int planCourseCnt;
	/**
	 * 实际开课
	 */
	private int realCourseCnt;
	/**
	 * 接收教室
	 */
	private int receiveRoomCnt;
	/**
	 * 教室使用率
	 */
	private int usedRoomRatio;
	/**
	 * 有效授课
	 */
	private int validCourseCnt;
	/**
	 * 开课比
	 */
	private int validCourseRatio;

	public int getMasterRoomCnt() {
		return masterRoomCnt;
	}

	public void setMasterRoomCnt(int masterRoomCnt) {
		this.masterRoomCnt = masterRoomCnt;
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

	public int getReceiveRoomCnt() {
		return receiveRoomCnt;
	}

	public void setReceiveRoomCnt(int receiveRoomCnt) {
		this.receiveRoomCnt = receiveRoomCnt;
	}

	public int getUsedRoomRatio() {
		return usedRoomRatio;
	}

	public void setUsedRoomRatio(int usedRoomRatio) {
		this.usedRoomRatio = usedRoomRatio;
	}

	public int getValidCourseCnt() {
		return validCourseCnt;
	}

	public void setValidCourseCnt(int validCourseCnt) {
		this.validCourseCnt = validCourseCnt;
	}

	public int getValidCourseRatio() {
		return validCourseRatio;
	}

	public void setValidCourseRatio(int validCourseRatio) {
		this.validCourseRatio = validCourseRatio;
	}
}
