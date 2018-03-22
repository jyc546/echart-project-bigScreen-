package com.codyy.oc.statistic.bigscreen.dto.classroom;

/**
 * 实时动态
 * @author robot
 */
public class CourseStatusDto {
	/**
	 * 已开课数量
	 */
	private int finsiehdCourseCnt;
	/**
	 * 正在直播
	 */
	private int livingCourseCnt;
	/**
	 * 未开始
	 */
	private int unStartedCourseCnt;
	/**
	 * 观摩人数
	 */
	private int userCnt;

	public int getFinsiehdCourseCnt() {
		return finsiehdCourseCnt;
	}

	public void setFinsiehdCourseCnt(int finsiehdCourseCnt) {
		this.finsiehdCourseCnt = finsiehdCourseCnt;
	}

	public int getLivingCourseCnt() {
		return livingCourseCnt;
	}

	public void setLivingCourseCnt(int livingCourseCnt) {
		this.livingCourseCnt = livingCourseCnt;
	}

	public int getUnStartedCourseCnt() {
		return unStartedCourseCnt;
	}

	public void setUnStartedCourseCnt(int unStartedCourseCnt) {
		this.unStartedCourseCnt = unStartedCourseCnt;
	}

	public int getUserCnt() {
		return userCnt;
	}

	public void setUserCnt(int userCnt) {
		this.userCnt = userCnt;
	}
}
