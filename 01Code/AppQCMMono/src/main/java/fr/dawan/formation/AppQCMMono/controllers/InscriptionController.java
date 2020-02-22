package fr.dawan.formation.AppQCMMono.controllers;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import fr.dawan.formation.AppQCMMono.Models.Designer;
import fr.dawan.formation.AppQCMMono.Models.User;
import fr.dawan.formation.AppQCMMono.Models.objectBooleanString;
import fr.dawan.formation.AppQCMMono.Services.DesignerService;
import fr.dawan.formation.AppQCMMono.Services.UserService;

@Controller
@RequestMapping("/inscription")
public class InscriptionController {

	@GetMapping("")
	public String Inscription() {
		return "inscription";
	}
	
	
	@PostMapping("")
	public String EnregistrerUser(User user, Model model) {
		objectBooleanString createResult;
		UserService userService = new UserService();
		
		createResult=userService.createUser(user);
		//possible de tester la valeur de retour de createUser
		// en fonction, si l'utilisateur n'a pas été cérer, possible de renvoyer sur eecran de création en disant pourquoi
		if (createResult.isAnswer()) {
			model.addAttribute("email", user.getEmail());
			return "login";
		}else {
			model.addAttribute("message", createResult.getComment());
			model.addAttribute(user);
			return "inscription";
		}
	}

	@GetMapping("/designer")
	public String inscriptionDesigner() {
		return "inscriptionDesigner";
	}
	
	@PostMapping("/designer")
	public String EnregistrementDesigner(			
			HttpSession session,
			Designer designer) {
		
		//unicité géré via jpa, joincolum dans la classe designer
		//unique = true
		
		UserService userService = new UserService();


		User user=(User) session.getAttribute("user");
		user.setDesigner(designer);
		designer.setUser(user);
		userService.saveOrUpdate(user);
		// je n'écrit pas le designer car j'ai mis une cascade sur le mappedBy de User
		return "home";
	}
	
}
