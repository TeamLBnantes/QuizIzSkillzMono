package fr.dawan.formation.AppQCMMono.Services;

import java.time.LocalDateTime;

import javax.persistence.NoResultException;

import org.mindrot.jbcrypt.BCrypt;

import fr.dawan.formation.AppQCMMono.Models.User;
import fr.dawan.formation.AppQCMMono.Persistence.Constantes;
import fr.dawan.formation.AppQCMMono.Persistence.UserDAO;

public class UserService {

	

	public boolean controlLogin(String email, String password) {
		UserDAO userDao = new UserDAO(Constantes.PERSISTENCE_UNIT_NAME);
		User userLogin = null;
		
		try {
			userLogin = userDao.searchByEmail(email);
		} catch (NoResultException ex) {
			System.out.println("Utilisateur non trouvé");
		}
	
		userDao.close();
		if (userLogin != null) {
			

			//if (password.equals(userLogin.getPassword())) {
			if (BCrypt.checkpw(password, userLogin.getPassword())) {
				return true;
			} else {
				return false;
			}
		} else {
			return false;
		}
		 
	}
	
	public User searchByEmail(String email) {
		UserDAO userDao = new UserDAO(Constantes.PERSISTENCE_UNIT_NAME);
		return userDao.searchByEmail(email);
	}

	public void createUser(User user) {
		UserDAO userDao = new UserDAO(Constantes.PERSISTENCE_UNIT_NAME);
		String pwd=BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());
		user.setPassword(pwd);
		user.setSignInDate(LocalDateTime.now());
		userDao.saveOrUpdate(user);
	}
	
}