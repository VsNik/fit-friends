export enum RouteName {
  Home = '/',
  Intro = '/intro',
  Login = '/login',
  Signup = '/signup',
  Question = '/question',
  Account = '/account',
  Trainings = '/trainings',
  TrainingCard = '/trainings/:id',
  NotFound = '/not-found',
  Users = '/users',
  UserCard = '/users/:id',
  Friends = '/friends',
  Purchases = '/purchases',
  Orders = '/orders',
  MyTrainings = '/my-trainings',
  AddTraining = '/raining/add',
}


export enum ApiRoute {
  Notifications = '/alerts',
  Orders = '/orders/:id',
  Reviews = '/reviews/:id',
}

export enum ApiAuthRoute {
  Login = '/auth/login',
  Signup = '/auth/signup',
  User = '/auth/create/user/:id',
  Coach = '/auth/create/coach/:id',
  Logout = '/auth/logout',
  Check = '/auth/check',
}

export enum ApiBalanceRoute {
  All = '/balance',
  ShowBalance = '/balance/:id',
  Dismission = '/balance/:id/dismission',
}

export enum ApiInvite {
  Invites = '/invitations',
  Invite = '/invitations/:id',
}

export enum ApiTrainings {
  All = '/trainings',
  Show = '/trainings/:id',
  VideoRemove = '/trainings/:id/remove/video',
  VideoUpload = '/trainings/:id/upload/video',
  ForYou = '/trainings/for-user',
  Popular = '/trainings/popular',
  Special = '/trainings/special',
  ForCoach = '/trainings/:id/coach',
  Orders = '/trainings/orders',
}

export enum ApiUsers {
  All = '/users',
  Show = '/users/:id/show',
  Certificate = '/users/certificate',
  CertificateRemove = '/users/certificate/remove',
  ToFriend = '/users/:id/follow',
  RemoveFriendForCoach = '/users/:id/coach-unfollow',
  Subscribe = '/users/:id/subscribe',
  Company = '/users/company',
  FriendsUser = '/users/friends-user',
  FriendsCoach = '/users/friends-coach',
}

