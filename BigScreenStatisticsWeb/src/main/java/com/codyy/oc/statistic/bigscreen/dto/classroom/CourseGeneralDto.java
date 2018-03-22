package com.codyy.oc.statistic.bigscreen.dto.classroom;

/**
 * 地图数据
 * @author robot
 */
public class CourseGeneralDto {
	/**
	 * 累计开课总量
	 */
	private int allCourseCnt;
	/**
	 * 夸区域互动
	 */
	private int areaCourseCnt;
	/**
	 * 跨市互动
	 */
	private int cityCourseRatio;
	/**
	 * 夸国互动
	 */
	private int countryCourseRatio;
	/**
	 * 夸区县互动
	 */
	private int prefectureCourseRatio;
	/**
	 * 跨省互动
	 */
	private int provinceCourseRatio;
	/**
	 * 开课占比
	 */
	private int realCourseRatio;
	/**
	 * 受益学生
	 */
	private int studentCnt;
	/**
	 * 计划开课
	 */
	private int unStartCourseCnt;

	public int getAllCourseCnt() {
		return allCourseCnt;
	}

	public void setAllCourseCnt(int allCourseCnt) {
		this.allCourseCnt = allCourseCnt;
	}

	public int getAreaCourseCnt() {
		return areaCourseCnt;
	}

	public void setAreaCourseCnt(int areaCourseCnt) {
		this.areaCourseCnt = areaCourseCnt;
	}

	public int getCityCourseRatio() {
		return cityCourseRatio;
	}

	public void setCityCourseRatio(int cityCourseRatio) {
		this.cityCourseRatio = cityCourseRatio;
	}

	public int getCountryCourseRatio() {
		return countryCourseRatio;
	}

	public void setCountryCourseRatio(int countryCourseRatio) {
		this.countryCourseRatio = countryCourseRatio;
	}

	public int getPrefectureCourseRatio() {
		return prefectureCourseRatio;
	}

	public void setPrefectureCourseRatio(int prefectureCourseRatio) {
		this.prefectureCourseRatio = prefectureCourseRatio;
	}

	public int getProvinceCourseRatio() {
		return provinceCourseRatio;
	}

	public void setProvinceCourseRatio(int provinceCourseRatio) {
		this.provinceCourseRatio = provinceCourseRatio;
	}

	public int getRealCourseRatio() {
		return realCourseRatio;
	}

	public void setRealCourseRatio(int realCourseRatio) {
		this.realCourseRatio = realCourseRatio;
	}

	public int getStudentCnt() {
		return studentCnt;
	}

	public void setStudentCnt(int studentCnt) {
		this.studentCnt = studentCnt;
	}

	public int getUnStartCourseCnt() {
		return unStartCourseCnt;
	}

	public void setUnStartCourseCnt(int unStartCourseCnt) {
		this.unStartCourseCnt = unStartCourseCnt;
	}
}
