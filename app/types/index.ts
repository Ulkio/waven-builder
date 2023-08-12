export interface Build {
  compagnons: Compagnon[] | [];
  anneaux: Anneau[] | [];
  brassard: Brassard | null;
  sorts: Sort[] | [];
  arme: Arme | null;
}

export interface Root {
  compagnons: Compagnons;
  sorts: Sorts;
  armes: Armes;
  anneaux: Anneaux;
  brassard: Brassard;
}

export interface Compagnons {
  compagnons: Compagnon[] | [];
}

export interface Compagnon {
  nom: string;
  rarete: string;
  image: string;
  iles: string[];
  patchs: PatchCompagnon[];
}

export interface PatchCompagnon {
  version: string;
  pv: number;
  at: number;
  cc: number;
  pm: number;
  effet: string;
  caracteristiques: CaracteristiqueCompagnons[];
  dons: DonCompagnons[];
  couts: Couts;
  sort?: string;
}

export interface CaracteristiqueCompagnons {
  taux: number;
  effet: string;
}

export interface DonCompagnons {
  nom: string;
  cout: any;
  effet: string;
  sort?: string;
}

export interface Couts {
  feu?: number;
  air?: number;
  terre?: number;
  eau?: number;
}

export interface Anneau {
  nom: string;
  rarete: string;
  image: string;
  iles: string[];
  patchs: PatchAnneaux[];
}
export interface Anneaux {
  anneau1: Anneau | null;
  anneau2: Anneau | null;
  anneau3: Anneau | null;
  anneau4: Anneau | null;
}

export interface PatchAnneaux {
  version: string;
  pouvoir: string;
  caracteristiques: CaracteristiqueAnneaux[];
  dons: DonAnneaux[];
  nom?: string;
  sort?: string;
}

export interface CaracteristiqueAnneaux {
  taux: number;
  effet: string;
}

export interface DonAnneaux {
  nom: string;
  cout: string;
  effet: string;
  sort: string;
}

export interface Brassard {
  nom: string;
  rarete: string;
  image: string;
  iles: string[];
  patchs: PatchBrassards[];
}

export interface PatchBrassards {
  version: string;
  pouvoir?: string;
  caracteristiques: CaracteristiqueBrassards[];
  dons: DonBrassards[];
  sort?: string;
}

export interface CaracteristiqueBrassards {
  taux: number;
  effet: string;
}

export interface DonBrassards {
  nom: string;
  cout: string;
  effet: string;
  sort: string;
}

export interface Sorts {
  sorts: Sort[];
}

export interface Sort {
  nom: string;
  element: string;
  source: string;
  image: string;
  patchs: PatchSorts[];
}
export interface DonSorts {
  nom: string;
  cout: string;
  effet: string;
  sort: string;
}
export interface PatchSorts {
  version: string;
  cout: number;
  effet: string;
  dons: any[];
  gains: Gains;
}

export interface Gains {
  feu?: number;
  air?: number;
  terre?: number;
  ether?: number;
  eau?: number;
  neutre?: number;
}
export interface Armes {
  armes: Arme[];
}

export interface Arme {
  nom: string;
  dieu: string;
  image: string;
  patchs: PatchArmes[];
}
export interface PatchArmes {
  version: string;
  effet: string;
  passifs: any[];
  pv: number;
  at: number;
  cc: number;
  pm: number;
}
