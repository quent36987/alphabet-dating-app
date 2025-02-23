export interface Activity {
  name: string;
  emoji: string;
}

export interface ActivitiesByLetter {
  [key: string]: Activity[];
}

export interface SelectedActivity {
  name: string;
  emoji: string;
  letter: string;
  photoUrl?: string;
}