package fr.dawan.formation.AppQCMMono.controllers;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import fr.dawan.formation.AppQCMMono.Models.User;

@Controller
@RequestMapping("/home")
public class HomeController {
	
	@GetMapping(value= {"", "/"})
	public String hello(HttpSession session, Model model) {
		
		User user = (User)session.getAttribute("user");
		
		// on récupère l'attribut "user" dans la session
		// s'il existe, on lui dit bonjour, en le passant dans le modèle
		if (user != null) {
			model.addAttribute("message", "Bonjour " 
				+ user.getFirstName());
		}
		
		// on renvoie le nom de la jsp
		return "home";
	}
}