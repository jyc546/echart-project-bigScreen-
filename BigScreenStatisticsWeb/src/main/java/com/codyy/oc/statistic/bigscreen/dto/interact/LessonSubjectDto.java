package com.codyy.oc.statistic.bigscreen.dto.interact;

/**
 *
 * @author robot
 */
public class LessonSubjectDto {
	/**
	 * 教案数量
	 */
	private int lessonCnt;
	/**
	 * 学科名称
	 */
	private String subjectName;

	public int getLessonCnt() {
		return lessonCnt;
	}

	public void setLessonCnt(int lessonCnt) {
		this.lessonCnt = lessonCnt;
	}

	public String getSubjectName() {
		return subjectName;
	}

	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
}
