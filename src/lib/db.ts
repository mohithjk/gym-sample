export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  hasPaid: boolean;
  tier?: string;
}

export interface Workout {
  id: string;
  userId: string;
  date: string;
  type: string;
  notes: string;
}

export interface Notice {
  id: string;
  date: string;
  message: string;
}

const initializeDB = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify([
      { id: '1', name: 'Admin', email: 'admin@ironcore.com', role: 'admin', hasPaid: true }
    ]));
  }
  if (!localStorage.getItem('workouts')) {
    localStorage.setItem('workouts', JSON.stringify([]));
  }
  if (!localStorage.getItem('notices')) {
    localStorage.setItem('notices', JSON.stringify([
      { id: '1', date: new Date().toISOString(), message: 'Welcome to the new Ironcore Member Portal!' }
    ]));
  }
};

initializeDB();

export const db = {
  getUsers: (): User[] => JSON.parse(localStorage.getItem('users') || '[]'),
  
  saveUser: (user: User) => {
    const users = db.getUsers();
    const existing = users.findIndex(u => u.id === user.id);
    if (existing >= 0) users[existing] = user;
    else users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
  },
  
  getWorkouts: (userId: string): Workout[] => {
    const workouts: Workout[] = JSON.parse(localStorage.getItem('workouts') || '[]');
    return workouts.filter(w => w.userId === userId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
  
  saveWorkout: (workout: Workout) => {
    const workouts = JSON.parse(localStorage.getItem('workouts') || '[]');
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  },
  
  getNotices: (): Notice[] => {
    const notices: Notice[] = JSON.parse(localStorage.getItem('notices') || '[]');
    return notices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  },
  
  saveNotice: (notice: Notice) => {
    const notices = db.getNotices();
    notices.push(notice);
    localStorage.setItem('notices', JSON.stringify(notices));
  }
};
