package com.codyy.oc.statistic.bigscreen.controller;

import com.codyy.oc.commons.vo.ReturnVo;
import com.codyy.oc.base.controller.BaseController;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResClasslevelDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResCurveGraphDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResGeneralDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResRatioGraphDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResRecentDataDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResSchoolDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResSourceDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResSubAreaDataDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResSubjectDto;
import com.codyy.oc.statistic.bigscreen.dto.resource.ResTypeRatioDto;
import com.codyy.oc.statistic.bigscreen.service.ResourceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 教学资源
 * @author robot
 */
@RequestMapping("/bigscreen/resource")
public class ResourceController extends BaseController {
	@Autowired
	private ResourceService resourceService;

	/**
	 * 资源使用情况
	 * @param areaCode 区域编码
	 * @return 资源使用情况数据
	 */
	@RequestMapping("/recentdata")
	@ResponseBody
	public ReturnVo<ResRecentDataDto> getRecentData(String areaCode) {
		ReturnVo<ResRecentDataDto> returnVo = new ReturnVo<>();
		ResRecentDataDto recentData = resourceService.getRecentData(areaCode);
		returnVo.setResult(recentData);
		return returnVo;
	}

	/**
	 * 资源使用情况-曲线图
	 * @param areaCode 区域编码
	 * @return 资源使用情况-曲线图数据
	 */
	@RequestMapping("/rescurvegraphdata")
	@ResponseBody
	public ReturnVo<ResCurveGraphDto> getResCurveGraphData(String areaCode) {
		ReturnVo<ResCurveGraphDto> returnVo = new ReturnVo<>();
		ResCurveGraphDto graphData = new ResCurveGraphDto();
		graphData.setCollectionData(resourceService.getCollectionYearData(areaCode));
		graphData.setDailyData(resourceService.getDailyYearData(areaCode));
		graphData.setDownloadData(resourceService.getDownloadYearData(areaCode));
		graphData.setUploadData(resourceService.getUploadYearData(areaCode));
		graphData.setViewData(resourceService.getViewYearData(areaCode));
		returnVo.setResult(graphData);
		return returnVo;
	}

	/**
	 * 资源使用情况-比例图-下载量
	 * @param areaCode 区域编码
	 * @return 下载量
	 */
	@RequestMapping("/downloadratiodata")
	@ResponseBody
	public ReturnVo<List<ResRatioGraphDto>> getDownloadRatioData(String areaCode) {
		ReturnVo<List<ResRatioGraphDto>> returnVo = new ReturnVo<>();
		List<ResRatioGraphDto> graphData = resourceService.getDownloadResTypeData(areaCode);
		returnVo.setResult(graphData);
		return returnVo;
	}

	/**
	 * 资源使用情况-比例图-收藏量
	 * @param areaCode 区域编码
	 * @return 收藏量
	 */
	@RequestMapping("/collectionratiodata")
	@ResponseBody
	public ReturnVo<List<ResRatioGraphDto>> getCollectionRatioData(String areaCode) {
		ReturnVo<List<ResRatioGraphDto>> returnVo = new ReturnVo<>();
		List<ResRatioGraphDto> graphData = resourceService.getCollectionResTypeData(areaCode);
		returnVo.setResult(graphData);
		return returnVo;
	}

	/**
	 * 资源使用情况-比例图-浏览量
	 * @param areaCode 区域编码
	 * @return 收藏量
	 */
	@RequestMapping("/viewratiodata")
	@ResponseBody
	public ReturnVo<List<ResRatioGraphDto>> getViewRatioData(String areaCode) {
		ReturnVo<List<ResRatioGraphDto>> returnVo = new ReturnVo<>();
		List<ResRatioGraphDto> graphData = resourceService.getViewResTypeData(areaCode);
		returnVo.setResult(graphData);
		return returnVo;
	}

	/**
	 * 资源使用情况-比例图-评论量
	 * @param areaCode 区域编码
	 * @return 收藏量
	 */
	@RequestMapping("/commentratiodata")
	@ResponseBody
	public ReturnVo<List<ResRatioGraphDto>> getCommentRatioData(String areaCode) {
		ReturnVo<List<ResRatioGraphDto>> returnVo = new ReturnVo<>();
		List<ResRatioGraphDto> graphData = resourceService.getCommentResTypeData(areaCode);
		returnVo.setResult(graphData);
		return returnVo;
	}

	/**
	 * 资源总览
	 * @param areaCode 区域编码
	 * @return 资源总览
	 */
	@RequestMapping("/generaldata")
	@ResponseBody
	public ReturnVo<ResGeneralDto> getGeneralData(String areaCode) {
		ReturnVo<ResGeneralDto> returnVo = new ReturnVo<>();
		ResGeneralDto generalData = resourceService.getGeneralData(areaCode);
		returnVo.setResult(generalData);
		return returnVo;
	}

	/**
	 * 资源总览-学科
	 * @param areaCode 区域编码
	 * @return 资源总览-学科
	 */
	@RequestMapping("/subjectdata")
	@ResponseBody
	public ReturnVo<List<ResSubjectDto>> getSubjectData(String areaCode) {
		ReturnVo<List<ResSubjectDto>> returnVo = new ReturnVo<>();
		List<ResSubjectDto> subjectData = resourceService.getSubjectData(areaCode);
		returnVo.setResult(subjectData);
		return returnVo;
	}

	/**
	 * 资源总览-比例图
	 * @param areaCode 区域编码
	 * @return 资源总览-比例图
	 */
	@RequestMapping("/resourceratiodata")
	@ResponseBody
	public ReturnVo<List<ResTypeRatioDto>> getResourceRatioData(String areaCode) {
		ReturnVo<List<ResTypeRatioDto>> returnVo = new ReturnVo<>();
		List<ResTypeRatioDto> graphData = resourceService.getResourceRatioData(areaCode);
		returnVo.setResult(graphData);
		return returnVo;
	}

	/**
	 * 资源来源
	 * @param areaCode 区域编码
	 * @return 资源来源
	 */
	@ResponseBody
	@RequestMapping("/sourcedata")
	public ReturnVo<List<ResSourceDto>> getSourceData(String areaCode) {
		ReturnVo<List<ResSourceDto>> returnVo = new ReturnVo<>();
		List<ResSourceDto> sourceData = resourceService.getSourceData(areaCode);
		returnVo.setResult(sourceData);
		return returnVo;
	}

	/**
	 * 子区域资源曲线图
	 * @param areaCode 父区域编码
	 * @return 子区域资源曲线图数据
	 */
	@ResponseBody
	@RequestMapping("/subareagraphdata")
	public ReturnVo<ResSubAreaDataDto> getSubAreaGraphData(String areaCode) {
		ReturnVo<ResSubAreaDataDto> returnVo = new ReturnVo<>();
		ResSubAreaDataDto graphData = new ResSubAreaDataDto();
		graphData.setCollectionData(resourceService.getSubAreaCollectionedResCount(areaCode));
		graphData.setDailyData(resourceService.getSubAreaDailyResCount(areaCode));
		graphData.setDownloadData(resourceService.getSubAreaDownloadedResCount(areaCode));
		graphData.setUploadData(resourceService.getSubAreaUploadResCount(areaCode));
		graphData.setViewData(resourceService.getSubAreaViewedResCount(areaCode));
		returnVo.setResult(graphData);
		return returnVo;
	}

	/**
	 * 资源年级分数据
	 * @param areaCode 区域编码
	 * @return 资源年级分数据
	 */
	@ResponseBody
	@RequestMapping("/classleveldata")
	public ReturnVo<List<ResClasslevelDto>> getClasslevelData(String areaCode) {
		ReturnVo<List<ResClasslevelDto>> returnVo = new ReturnVo<>();
		List<ResClasslevelDto> classlevelData = resourceService.getResClasslevelData(areaCode);
		returnVo.setResult(classlevelData);
		return returnVo;
	}

	/**
	 * 资源学校分数据
	 * @param areaCode 区域编码
	 * @return 资源学校分数据
	 */
	@ResponseBody
	@RequestMapping("/schooldata")
	public ReturnVo<List<ResSchoolDto>> getSchoolData(String areaCode) {
		ReturnVo<List<ResSchoolDto>> returnVo = new ReturnVo<>();
		List<ResSchoolDto> schoolData = resourceService.getResSchoolData(areaCode);
		returnVo.setResult(schoolData);
		return returnVo;
	}
}
