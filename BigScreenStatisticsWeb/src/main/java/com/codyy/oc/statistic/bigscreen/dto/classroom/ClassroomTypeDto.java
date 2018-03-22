package com.codyy.oc.statistic.bigscreen.dto.classroom;

/**
 * 主讲教室接收教室占比
 * @author robot
 */
public class ClassroomTypeDto {
	/**
	 * 主讲教室数量
	 */
	private int masterRoomCnt;
	/**
	 * 接收教室数量
	 */
	private int receiveRoomCnt;
	/**
	 * 未正常接入
	 */
	private int faultRoomCnt;

	public int getMasterRoomCnt() {
		return masterRoomCnt;
	}

	public void setMasterRoomCnt(int masterRoomCnt) {
		this.masterRoomCnt = masterRoomCnt;
	}

	public int getReceiveRoomCnt() {
		return receiveRoomCnt;
	}

	public void setReceiveRoomCnt(int receiveRoomCnt) {
		this.receiveRoomCnt = receiveRoomCnt;
	}

	public int getFaultRoomCnt() {
		return faultRoomCnt;
	}

	public void setFaultRoomCnt(int faultRoomCnt) {
		this.faultRoomCnt = faultRoomCnt;
	}
}
