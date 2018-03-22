package com.codyy.oc.statistic.bigscreen.dto.interact;

/**
 *
 * @author robot
 */
public class LessonClasslevelDto {
	/**
	 * 教案数量
	 */
	private int lessonCnt;
	/**
	 * 年级名称
	 */
	private String classLevelName;

	public int getLessonCnt() {
		return lessonCnt;
	}

	public void setLessonCnt(int lessonCnt) {
		this.lessonCnt = lessonCnt;
	}

	public String getClassLevelName() {
		return classLevelName;
	}

	public void setClassLevelName(String classLevelName) {
		this.classLevelName = classLevelName;
	}
}
