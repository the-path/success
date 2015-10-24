import routes from './routes';
import Router from 'react-router';


export default Router.create({
  routes: routes,
  location: Router.HashLocation
});
