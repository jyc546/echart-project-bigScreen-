package com.codyy.oc.statistic.bigscreen.dto.interact;

/**
 *
 * @author robot
 */
public class StatusDataDto {
	/**
	 * 已结束
	 */
	private int finishedCnt;
	/**
	 * 进行中
	 */
	private int processingCnt;
	/**
	 * 未开始
	 */
	private int unStartedCnt;
	/**
	 * 教研类型(PREPARE:集体备课，EVALUATION:评课议课)
	 */
	private String lessonType;

	public int getFinishedCnt() {
		return finishedCnt;
	}

	public void setFinishedCnt(int finishedCnt) {
		this.finishedCnt = finishedCnt;
	}

	public int getProcessingCnt() {
		return processingCnt;
	}

	public void setProcessingCnt(int processingCnt) {
		this.processingCnt = processingCnt;
	}

	public int getUnStartedCnt() {
		return unStartedCnt;
	}

	public void setUnStartedCnt(int unStartedCnt) {
		this.unStartedCnt = unStartedCnt;
	}

	public String getLessonType() {
		return lessonType;
	}

	public void setLessonType(String lessonType) {
		this.lessonType = lessonType;
	}
}
