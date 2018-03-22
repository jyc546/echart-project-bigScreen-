package com.codyy.oc.statistic.bigscreen.dto.behavioranalysis;

/**
 *
 * @author robot
 */
public class CourseGeneralDto {
	/**
	 * 授课类型(blackboard:板块型,interaction:对话型,exercise:练习型,teaching:讲授型,balance:平衡型)
	 */
	private String instructMode;
	/**
	 * 教师行为和学生行为转换率
	 */
	private double ch;
	/**
	 * 教师行为（含T和D）所占比率
	 */
	private double rt;

	/**
	 * 年级名称
	 */
	private String semesterName;

	public String getInstructMode() {
		return instructMode;
	}

	public void setInstructMode(String instructMode) {
		this.instructMode = instructMode;
	}

	public double getCh() {
		return ch;
	}

	public void setCh(double ch) {
		this.ch = ch;
	}

	public double getRt() {
		return rt;
	}

	public void setRt(double rt) {
		this.rt = rt;
	}

	public String getSemesterName() {
		return semesterName;
	}

	public void setSemesterName(String semesterName) {
		this.semesterName = semesterName;
	}
}
