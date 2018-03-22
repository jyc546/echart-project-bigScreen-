package com.codyy.oc.statistic.bigscreen.dto.interact;

/**
 * 活跃教师
 * @author robot
 */
public class ActiveTeacherDto {
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
	 * 教师名称
	 */
	private String teacherName;
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

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public int getTotalCnt() {
		return totalCnt;
	}

	public void setTotalCnt(int totalCnt) {
		this.totalCnt = totalCnt;
	}
}
