package com.codyy.oc.statistic.bigscreen.controller;

import com.codyy.oc.base.controller.BaseController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

/**
 *
 * @author robot
 */
public class IndexController extends BaseController {
	@RequestMapping("/")
	public String index() {
		return "redirect:/interActive.html";
	}
}
