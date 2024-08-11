import Gallery from "../views/pages/gallery";
import Leaderboard from "../views/pages/leaderboard";
import Lobby from "../views/pages/lobby";
import Login from "../views/pages/login";
import Profile from "../views/pages/profile";
import SignUp from "../views/pages/sign-up";

const routes = {
  '/': Lobby,
  '/collection': Gallery,
  '/leaderboard': Leaderboard,
  '/profile': Profile,
  '/login': Login,
  '/sign-up': SignUp,
}

export default routes;