package com.codyy.oc.statistic.bigscreen.controller;

import com.alibaba.fastjson.JSON;
import com.codyy.oc.commons.vo.ReturnVo;
import com.codyy.oc.base.controller.BaseController;
import com.codyy.oc.statistic.bigscreen.service.StatisticDataService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author robot
 */
@RequestMapping("/bigscreen")
public class StatisticDataController extends BaseController {
	private Logger LOGGER = Logger.getLogger(StatisticDataController.class);
	@Autowired
	private StatisticDataService statisticDataService;

	@RequestMapping("/loaddata")
	@ResponseBody
	public ReturnVo<Object> loadData(String bigScreen, String block, String areaCode) {
		ReturnVo<Object> returnVo = new ReturnVo<>();
		String data = statisticDataService.readDataOrTemplateFromFile(bigScreen, block, areaCode);
		Object obj = JSON.parse(data);
		returnVo.setResult(obj);
		return returnVo;
	}

	@RequestMapping("/loadremarksdata")
	@ResponseBody
	public ReturnVo<Object> loadRemarksData(String bigScreen, String block) {
		ReturnVo<Object> returnVo = new ReturnVo<>();
		String data = statisticDataService.readRemarksDataFromFile(bigScreen, block);
		Object obj = JSON.parse(data);
		returnVo.setResult(obj);
		return returnVo;
	}

	@RequestMapping("/savedata")
	@ResponseBody
	public ReturnVo<Void> saveData(String bigScreen, String block, String areaCode, String data) {
		ReturnVo<Void> returnVo = new ReturnVo<>();
		statisticDataService.saveDataToFile(bigScreen, block, areaCode, data);
		return returnVo;
	}

}
