package com.codyy.oc.statistic.bigscreen.dto.interact;

/**
 * 整体情况
 * @author robot
 * @date 2018/2/9
 */
public class GeneralDto {
	/**
	 * 教案总量
	 */
	private int allLessonCnt;
	/**
	 * 优秀教案
	 */
	private int excellentLessonCnt;
	/**
	 * 活跃人数
	 */
	private int activeUserCnt;
	/**
	 * 集体备课
	 */
	private int prepareLessonCnt;
	/**
	 * 评课议课
	 */
	private int evaluationLessonCnt;

	public int getAllLessonCnt() {
		return allLessonCnt;
	}

	public void setAllLessonCnt(int allLessonCnt) {
		this.allLessonCnt = allLessonCnt;
	}

	public int getExcellentLessonCnt() {
		return excellentLessonCnt;
	}

	public void setExcellentLessonCnt(int excellentLessonCnt) {
		this.excellentLessonCnt = excellentLessonCnt;
	}

	public int getActiveUserCnt() {
		return activeUserCnt;
	}

	public void setActiveUserCnt(int activeUserCnt) {
		this.activeUserCnt = activeUserCnt;
	}

	public int getPrepareLessonCnt() {
		return prepareLessonCnt;
	}

	public void setPrepareLessonCnt(int prepareLessonCnt) {
		this.prepareLessonCnt = prepareLessonCnt;
	}

	public int getEvaluationLessonCnt() {
		return evaluationLessonCnt;
	}

	public void setEvaluationLessonCnt(int evaluationLessonCnt) {
		this.evaluationLessonCnt = evaluationLessonCnt;
	}
}
