package com.codyy.oc.statistic.bigscreen.dto.interact;

/**
 * 活跃学校
 * @author robot
 */
public class ActiveSchoolDto {
	/**
	 * 评课议课
	 */
	private int evaluationLessonCnt;
	/**
	 * 教案
	 */
	private int lessonCnt;
	/**
	 * 集体备课
	 */
	private int prepareLessonCnt;
	/**
	 * 学校名称
	 */
	private String schoolName;
	/**
	 * 评课议课+教案+集体备课
	 */
	private int totalCnt;

	public int getEvaluationLessonCnt() {
		return evaluationLessonCnt;
	}

	public void setEvaluationLessonCnt(int evaluationLessonCnt) {
		this.evaluationLessonCnt = evaluationLessonCnt;
	}

	public int getLessonCnt() {
		return lessonCnt;
	}

	public void setLessonCnt(int lessonCnt) {
		this.lessonCnt = lessonCnt;
	}

	public int getPrepareLessonCnt() {
		return prepareLessonCnt;
	}

	public void setPrepareLessonCnt(int prepareLessonCnt) {
		this.prepareLessonCnt = prepareLessonCnt;
	}

	public String getSchoolName() {
		return schoolName;
	}

	public void setSchoolName(String schoolName) {
		this.schoolName = schoolName;
	}

	public int getTotalCnt() {
		return totalCnt;
	}

	public void setTotalCnt(int totalCnt) {
		this.totalCnt = totalCnt;
	}
}
